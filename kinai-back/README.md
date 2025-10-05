# KINAI Exoplanets API

Exoplanet prediction API using Machine Learning models (TensorFlow/Keras and Scikit-Learn).

## 🚀 Local Development

### Installation
```bash
pip install -r requirements.txt
```

### Run in development
```bash
# Option 1: Using the development script (recommended)
python run_dev.py

# Option 2: Directly with Flask
python app.py

# Option 3: With Flask CLI
flask run --debug
```

### Environment variables for development
Create a `.env` file in the project root:
```env
FLASK_ENV=development
PORT=5000
```

## 🌐 Production

### Render.com
**Build Command:**
```bash
pip install -r requirements.txt
```

**Start Command:**
```bash
gunicorn --bind 0.0.0.0:$PORT wsgi:app
```

**Environment Variables:**
- `FLASK_ENV=production`
- `PORT=8000` (or the port assigned by Render)

## 📋 API Endpoints

- `GET /` - Home page
- `POST /deep-predict` - Deep model prediction (TensorFlow)
- `POST /fast-predict` - Fast model prediction (Scikit-Learn)

### Usage Example:
```bash
curl -X POST http://localhost:5000/fast-predict \
  -H "Content-Type: application/json" \
  -d '{"features": [1.2, 3.4, 5.6, 7.8]}'
```

### Request Format:
```json
{
  "features": [1.2, 3.4, 5.6, 7.8, ...]
}
```

### Response Format:
```json
{
  "prediction": 0.85
}
```

## 🔧 Project Structure
```
kinai-back/
├── app.py              # Main Flask application
├── wsgi.py             # Production entry point
├── run_dev.py          # Development script
├── config.py           # Environment configurations
├── requirements.txt    # Dependencies
├── ai_models/          # ML models
│   ├── deep_model.h5   # TensorFlow model
│   └── fast_model.pkl  # Scikit-Learn model
├── classes/            # Prediction classes
│   └── prediction.py   # Prediction logic
└── README.md           # This file
```

## 🛠️ Development Features

- **Automatic environment detection** (development/production)
- **Debug mode** enabled in development
- **Hot reload** for code changes
- **Detailed logging** and error messages
- **CORS enabled** for frontend integration

## 🚀 Quick Start

1. **Clone the repository**
2. **Install dependencies:** `pip install -r requirements.txt`
3. **Run development server:** `python run_dev.py`
4. **Open browser:** `http://localhost:5000`
5. **Test API endpoints** using curl or Postman

## 📊 Model Information

- **Deep Model**: TensorFlow/Keras neural network for complex predictions
- **Fast Model**: Scikit-Learn model for quick predictions
- **Input**: Feature vectors (numerical data)
- **Output**: Probability scores (0-1 range)