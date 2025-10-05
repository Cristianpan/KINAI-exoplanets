import os
from flask import Flask, request, jsonify
from classes.prediction import predictor
from config import config

app = Flask(__name__)

config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])


@app.route("/")
def home():
    return "<h2>API de predicción lista ✅</h2>"

@app.post("/deep-predict")
def deep_predict():
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Falta el campo 'features' en el cuerpo del POST"}), 400

    features = data["features"]
    result = predictor.deep_predict(features)
    return jsonify({"prediction": result})

@app.post("/fast-predict")
def fast_predict():
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Falta el campo 'features' en el cuerpo del POST"}), 400

    features = data["features"]
    result = predictor.fast_predict(features)
    return jsonify({"prediction": result})


if __name__ == "__main__":
    app.run(
        host='0.0.0.0', 
        port=app.config['PORT'], 
        debug=app.config['DEBUG']
    )