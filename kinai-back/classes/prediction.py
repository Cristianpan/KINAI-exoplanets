from tensorflow.keras.models import load_model
import joblib
import numpy as np
import os

# ===========================
# 🔹 Clase para manejar modelos
# ===========================
class Predict:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.models_dir = os.path.join(base_dir, '..', 'ai_models')

        # Cargamos los modelos al iniciar (para no cargarlos en cada petición)
        self.deep_model = load_model(os.path.join(self.models_dir, 'deep_model.h5'))
        self.fast_model = joblib.load(os.path.join(self.models_dir, 'fast_model.pkl'))

    def deep_predict(self, features):
        """
        Realiza predicción con el modelo profundo (.h5)
        """
        X = np.array([features], dtype=float)
        pred = self.deep_model.predict(X)
        return pred.tolist()

    def fast_predict(self, features):
        if isinstance(features, np.ndarray) and features.ndim == 2:
            X = features.astype(float)
        else:
            X = np.array([features], dtype=float)
        
        pred = self.fast_model.predict(X)
        return pred.tolist()

# Instancia global de Predict
predictor = Predict()