from flask import Flask, request, jsonify
from classes.prediction import predictor

app = Flask(__name__)

# ===========================
# 🔹 Rutas de la API
# ===========================

@app.route("/")
def home():
    return "<h2>API de predicción lista ✅</h2>"

# ---- DEEP MODEL (TensorFlow / Keras)
@app.post("/deep-predict")
def deep_predict():
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Falta el campo 'features' en el cuerpo del POST"}), 400

    features = data["features"]
    result = predictor.deep_predict(features)
    return jsonify({"prediction": result})

# ---- FAST MODEL (Scikit-Learn)
@app.post("/fast-predict")
def fast_predict():
    data = request.get_json()
    if not data or "features" not in data:
        return jsonify({"error": "Falta el campo 'features' en el cuerpo del POST"}), 400

    features = data["features"]
    result = predictor.fast_predict(features)
    return jsonify({"prediction": result})

# ===========================
# 🔹 Iniciar servidor
# ===========================
if __name__ == "__main__":
    app.run(debug=True)