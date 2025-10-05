"""
Prediction routes for KINAI Exoplanets API
"""
import json
import io
from flask import Blueprint, request, jsonify, send_file
from classes.prediction import predictor
from app.schemas import get_schema
from app.services.unified_csv_service import process_csv_with_predictions, get_prediction_summary

prediction_blueprint = Blueprint("prediction", __name__, url_prefix="/")


@prediction_blueprint.route("/deep-predict", methods=["POST"])
def deep_predict():
    """
    Endpoint para procesar predicciones con Deep Learning
    
    Soporta:
    - CSV con esquemas dinámicos
    - JSON con features (legacy)
    """
    try:
        # Verificar si es una petición con archivo CSV o con features JSON (legacy)
        if 'csv_file' in request.files:
            # Nuevo flujo: procesamiento de CSV
            csv_file = request.files['csv_file']
            if csv_file.filename == '':
                return jsonify({"error": "No file selected"}), 400
            
            # Verificar extensión del archivo
            if not csv_file.filename.lower().endswith('.csv'):
                return jsonify({"error": "File must be a CSV"}), 400
            
            # Leer el contenido del CSV
            csv_content = csv_file.read()
            
            # Obtener parámetros desde el formulario
            column_mapping_str = request.form.get('column_mapping')
            schema_str = request.form.get('schema')
            schema_name = request.form.get('schema_name', 'default')
            return_summary = request.form.get('return_summary', 'false').lower() == 'true'
            
            if not column_mapping_str:
                return jsonify({"error": "Missing column mapping (column_mapping)"}), 400
            
            try:
                column_mapping = json.loads(column_mapping_str)
            except json.JSONDecodeError:
                return jsonify({"error": "Column mapping is not valid JSON"}), 400
            
            # Determinar el esquema a usar
            schema = None
            if schema_str:
                try:
                    schema = json.loads(schema_str)
                except json.JSONDecodeError:
                    return jsonify({"error": "Schema is not valid JSON"}), 400
            else:
                try:
                    schema = get_schema(schema_name)
                except ValueError as e:
                    return jsonify({"error": str(e)}), 400
            
            # Procesar según el tipo de respuesta solicitada
            if return_summary:
                response, status = get_prediction_summary(csv_content, column_mapping, schema, 'deep')
                return jsonify(response), status
            else:
                csv_bytes, status = process_csv_with_predictions(csv_content, column_mapping, schema, 'deep')
                
                if status != 200:
                    return jsonify(csv_bytes), status
                
                output = io.BytesIO(csv_bytes)
                output.seek(0)
                
                return send_file(
                    output,
                    mimetype='text/csv',
                    as_attachment=True,
                    download_name='deep_predictions.csv'
                )
        else:
            # Flujo legacy: procesamiento con features JSON
            data = request.get_json()
            if not data or "features" not in data:
                return jsonify({"error": "Missing 'features' field in POST body"}), 400

            features = data["features"]
            result = predictor.deep_predict(features)
            return jsonify({"prediction": result})
            
    except Exception as e:
        return jsonify({"error": f"Error interno del servidor: {str(e)}"}), 500


@prediction_blueprint.route("/fast-predict", methods=["POST"])

def fast_predict():
    """
    Endpoint limpio para procesar predicciones con Modelo Rápido usando JSON en el body
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        features = data.get("features")
        if features is None:
            return jsonify({"error": "Missing 'features' field"}), 400

        result = predictor.fast_predict(features)
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
