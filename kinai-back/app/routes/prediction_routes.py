"""
Prediction routes for KINAI Exoplanets API - Simplified Version with Pandas
"""

import pandas as pd
import numpy as np
from flask import Blueprint, request, jsonify
from classes.prediction import predictor

prediction_blueprint = Blueprint("prediction", __name__, url_prefix="/")


@prediction_blueprint.route("/deep-predict", methods=["POST"])
def deep_predict():
    try:
        data = request.get_json()
        print(f"Deep predict - Received data: {data}")
        if not data:
            return jsonify({"error": "No data received"}), 400

        if "csvData" not in data:
            return jsonify({"error": "Missing 'csvData' field"}), 400

        csv_data = data["csvData"]
        if "rows" not in csv_data or "headers" not in csv_data:
            return jsonify({"error": "Missing 'rows' or 'headers' in csvData"}), 400

        df = pd.DataFrame(csv_data["rows"], columns=csv_data["headers"])

        numeric_columns = []
        for col in df.columns:
            if col != "":  # Ignorar columnas vacías
                try:
                    df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)
                    numeric_columns.append(col)
                except:
                    # Si no se puede convertir a numérico, usar 0
                    df[col] = 0.0
                    numeric_columns.append(col)

        if not numeric_columns:
            return jsonify({"error": "No numeric columns found for prediction"}), 400

        features_df = df[numeric_columns]

        predictions = []
        errors = []
        for index, row in features_df.iterrows():
            try:
                features = row.values.tolist()
                print(f"Deep predict - Row {index}: features = {features}")
                prediction = predictor.deep_predict(features)
                print(f"Deep predict - Row {index}: prediction = {prediction}")
                predictions.append(prediction[0])  # Tomar el primer elemento del array
            except Exception as e:
                error_msg = f"Row {index}: {str(e)}"
                print(f"Deep predict error - {error_msg}")
                errors.append(error_msg)
                predictions.append(None)  # Marcar como error

        return jsonify(
            {
                "predictions": predictions,
                "total_predictions": len(predictions),
                "successful_predictions": len(
                    [p for p in predictions if p is not None]
                ),
                "errors": errors,
                "dataframe_info": {
                    "total_rows": len(df),
                    "numeric_columns": numeric_columns,
                    "column_count": len(numeric_columns),
                },
            }
        )

    except Exception as e:
        return jsonify({"error": f"Error interno del servidor: {str(e)}"}), 500


@prediction_blueprint.route("/fast-predict", methods=["POST"])
def fast_predict():
    try:
        print("=== DEBUG: /fast-predict endpoint called ===")
        data = request.get_json()
        print(f"Data received: {type(data)}")
        if data:
            print(f"Keys in data: {list(data.keys())}")
        if not data:
            return jsonify({"error": "No data received"}), 400

        if "csvData" not in data:
            return jsonify({"error": "Missing 'csvData' field"}), 400

        csv_data = data["csvData"]
        if "rows" not in csv_data or "headers" not in csv_data:
            return jsonify({"error": "Missing 'rows' or 'headers' in csvData"}), 400

        df = pd.DataFrame(csv_data["rows"], columns=csv_data["headers"])

        xs = df.loc[:, "ror":"transit_epoch"].to_numpy()
        preds = predictor.fast_predict(xs)

        df["prediction"] = preds
        result_df = df[["search_id", "prediction"]]
        result_json = result_df.to_dict(orient="records")

        return jsonify({"results": result_json})

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
