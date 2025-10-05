"""
Unified CSV Prediction service for KINAI Exoplanets API
Handles both fast and deep learning predictions
"""
import pandas as pd
import numpy as np
import io
import sys
import os
import json

# Add the root directory to the Python path to import classes
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from classes.prediction import predictor


def validate_schema(schema):
    """
    Validate that the schema contains required fields
    
    Args:
        schema: List of column schema objects
        
    Returns:
        tuple: (is_valid, error_message)
    """
    if not isinstance(schema, list):
        return False, "Schema must be a list"
    
    required_fields = ['id', 'label', 'dataType']
    
    for i, column in enumerate(schema):
        if not isinstance(column, dict):
            return False, f"Column {i} must be a dictionary"
        
        for field in required_fields:
            if field not in column:
                return False, f"Column {i} missing required field: {field}"
    
    return True, None


def extract_column_info(schema):
    """
    Extract column information from schema
    
    Args:
        schema: List of column schema objects
        
    Returns:
        dict: Dictionary with column info
    """
    column_info = {
        'required_columns': [],
        'data_types': {},
        'numeric_columns': [],
        'categorical_columns': [],
        'json_columns': []
    }
    
    for column in schema:
        column_id = column['id']
        data_type = column['dataType']
        
        column_info['required_columns'].append(column_id)
        column_info['data_types'][column_id] = data_type
        
        if data_type in ['number', 'integer', 'float']:
            column_info['numeric_columns'].append(column_id)
        elif data_type == 'json':
            column_info['json_columns'].append(column_id)
        else:
            column_info['categorical_columns'].append(column_id)
    
    return column_info


def process_csv_with_predictions(csv_content, column_mapping, schema=None, model_type='fast'):
    """
    Process CSV file with column mapping and return predictions
    
    Args:
        csv_content: CSV file content as bytes
        column_mapping: Dictionary mapping CSV columns to expected model features
        schema: Optional schema definition for flexible column handling
        model_type: 'fast' or 'deep' - which model to use for predictions
        
    Returns:
        tuple: (processed_csv_bytes, status_code)
    """
    try:
        # Read CSV from bytes
        csv_buffer = io.StringIO(csv_content.decode('utf-8'))
        df = pd.read_csv(csv_buffer)
        
        # Determine required columns based on schema or use default
        if schema:
            # Validate schema
            is_valid, error_msg = validate_schema(schema)
            if not is_valid:
                return {"error": f"Invalid schema: {error_msg}"}, 400
            
            # Extract column information from schema
            column_info = extract_column_info(schema)
            required_columns = column_info['required_columns']
            numeric_columns = column_info['numeric_columns']
            categorical_columns = column_info['categorical_columns']
            json_columns = column_info['json_columns']
        else:
            # Use default schema for backward compatibility
            required_columns = [
                'search_id', 'num_planet', 'disposition', 'ror', 'stellar_mass',
                'ss_gravity', 'period', 'duration', 'transit_epoch', 'global_view', 'local_view'
            ]
            numeric_columns = ['search_id', 'num_planet', 'ror', 'stellar_mass', 'ss_gravity', 
                              'period', 'duration', 'transit_epoch', 'global_view', 'local_view']
            categorical_columns = ['disposition']
            json_columns = []
        
        # Check if all required columns are mapped
        mapped_columns = set(column_mapping.keys())
        missing_columns = set(required_columns) - mapped_columns
        
        if missing_columns:
            return {
                "error": f"Missing the following columns in mapping: {', '.join(missing_columns)}"
            }, 400
        
        # Check if mapped CSV columns exist in the dataframe
        csv_columns = set(df.columns)
        mapped_csv_columns = set(column_mapping.values())
        missing_csv_columns = mapped_csv_columns - csv_columns
        
        if missing_csv_columns:
            return {
                "error": f"The following columns do not exist in CSV: {', '.join(missing_csv_columns)}"
            }, 400
        
        # Rename columns according to mapping
        df_mapped = df.rename(columns={v: k for k, v in column_mapping.items()})
        
        # Select only the required columns for the model
        features_df = df_mapped[required_columns].copy()
        
        # Handle missing values based on data types
        for col in numeric_columns:
            if col in features_df.columns:
                features_df[col] = pd.to_numeric(features_df[col], errors='coerce').fillna(0)
        
        for col in categorical_columns:
            if col in features_df.columns:
                features_df[col] = features_df[col].astype(str).fillna('unknown')
        
        for col in json_columns:
            if col in features_df.columns:
                # For JSON columns, try to parse or convert to string
                try:
                    features_df[col] = features_df[col].apply(
                        lambda x: json.loads(x) if isinstance(x, str) and x.startswith('{') else x
                    )
                except:
                    features_df[col] = features_df[col].astype(str).fillna('{}')
        
        # Make predictions for each row
        predictions = []
        for index, row in features_df.iterrows():
            try:
                # Convert row to list for prediction, handling JSON columns
                features = []
                for col in required_columns:
                    value = row[col]
                    if col in json_columns and isinstance(value, (dict, list)):
                        # For JSON columns, convert to string representation
                        features.append(json.dumps(value))
                    else:
                        features.append(value)
                
                # Choose prediction method based on model type
                if model_type == 'deep':
                    prediction = predictor.deep_predict(features)
                else:
                    prediction = predictor.fast_predict(features)
                
                predictions.append(prediction)
            except Exception as e:
                # If prediction fails for a row, add None
                predictions.append(None)
        
        # Add predictions to the original dataframe with appropriate column name
        prediction_column = 'ai_deep_prediction' if model_type == 'deep' else 'ai_prediction'
        df[prediction_column] = predictions
        
        # Create result CSV
        result_csv_buffer = io.StringIO()
        df.to_csv(result_csv_buffer, index=False)
        result_csv_bytes = result_csv_buffer.getvalue().encode('utf-8')
        
        return result_csv_bytes, 200
        
    except Exception as e:
        return {
            "error": f"Error processing CSV: {str(e)}"
        }, 500


def get_prediction_summary(csv_content, column_mapping, schema=None, model_type='fast'):
    """
    Get summary statistics of predictions without returning the full CSV
    
    Args:
        csv_content: CSV file content as bytes
        column_mapping: Dictionary mapping CSV columns to expected model features
        schema: Optional schema definition for flexible column handling
        model_type: 'fast' or 'deep' - which model to use for predictions
        
    Returns:
        tuple: (summary_dict, status_code)
    """
    try:
        # Read CSV from bytes
        csv_buffer = io.StringIO(csv_content.decode('utf-8'))
        df = pd.read_csv(csv_buffer)
        
        # Determine required columns based on schema or use default
        if schema:
            # Validate schema
            is_valid, error_msg = validate_schema(schema)
            if not is_valid:
                return {"error": f"Invalid schema: {error_msg}"}, 400
            
            # Extract column information from schema
            column_info = extract_column_info(schema)
            required_columns = column_info['required_columns']
            numeric_columns = column_info['numeric_columns']
            categorical_columns = column_info['categorical_columns']
            json_columns = column_info['json_columns']
        else:
            # Use default schema for backward compatibility
            required_columns = [
                'search_id', 'num_planet', 'disposition', 'ror', 'stellar_mass',
                'ss_gravity', 'period', 'duration', 'transit_epoch', 'global_view', 'local_view'
            ]
            numeric_columns = ['search_id', 'num_planet', 'ror', 'stellar_mass', 'ss_gravity', 
                              'period', 'duration', 'transit_epoch', 'global_view', 'local_view']
            categorical_columns = ['disposition']
            json_columns = []
        
        # Validate and process
        mapped_columns = set(column_mapping.keys())
        missing_columns = set(required_columns) - mapped_columns
        
        if missing_columns:
            return {
                "error": f"Missing the following columns in mapping: {', '.join(missing_columns)}"
            }, 400
        
        # Rename columns and process
        df_mapped = df.rename(columns={v: k for k, v in column_mapping.items()})
        features_df = df_mapped[required_columns].copy()
        
        # Handle missing values based on data types
        for col in numeric_columns:
            if col in features_df.columns:
                features_df[col] = pd.to_numeric(features_df[col], errors='coerce').fillna(0)
        
        for col in categorical_columns:
            if col in features_df.columns:
                features_df[col] = features_df[col].astype(str).fillna('unknown')
        
        for col in json_columns:
            if col in features_df.columns:
                try:
                    features_df[col] = features_df[col].apply(
                        lambda x: json.loads(x) if isinstance(x, str) and x.startswith('{') else x
                    )
                except:
                    features_df[col] = features_df[col].astype(str).fillna('{}')
        
        # Make predictions
        predictions = []
        successful_predictions = 0
        
        for index, row in features_df.iterrows():
            try:
                # Convert row to list for prediction, handling JSON columns
                features = []
                for col in required_columns:
                    value = row[col]
                    if col in json_columns and isinstance(value, (dict, list)):
                        features.append(json.dumps(value))
                    else:
                        features.append(value)
                
                # Choose prediction method based on model type
                if model_type == 'deep':
                    prediction = predictor.deep_predict(features)
                else:
                    prediction = predictor.fast_predict(features)
                
                predictions.append(prediction)
                if prediction is not None:
                    successful_predictions += 1
            except Exception as e:
                predictions.append(None)
        
        # Calculate statistics
        valid_predictions = [p for p in predictions if p is not None]
        
        summary = {
            "total_rows": len(df),
            "successful_predictions": successful_predictions,
            "failed_predictions": len(df) - successful_predictions,
            "prediction_stats": {
                "mean": float(np.mean(valid_predictions)) if valid_predictions else None,
                "std": float(np.std(valid_predictions)) if valid_predictions else None,
                "min": float(np.min(valid_predictions)) if valid_predictions else None,
                "max": float(np.max(valid_predictions)) if valid_predictions else None,
            },
            "sample_predictions": valid_predictions[:5],  # First 5 predictions as sample
            "schema_used": "custom" if schema else "default"
        }
        
        # Add model type for deep learning
        if model_type == 'deep':
            summary["model_type"] = "deep_learning"
        
        return summary, 200
        
    except Exception as e:
        return {
            "error": f"Error generating summary: {str(e)}"
        }, 500
