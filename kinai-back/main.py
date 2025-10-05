import os
from flask import Flask
from flask_cors import CORS
from app.routes.prediction_routes import prediction_blueprint
from config import config

app = Flask(__name__)

# Configuration
config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

# Configure CORS
CORS(app, origins=['http://localhost:3000', 'http://127.0.0.1:3000'])

# Register blueprints
app.register_blueprint(prediction_blueprint)

if __name__ == "__main__":
    app.run(
        host='0.0.0.0', 
        port=app.config['PORT'], 
        debug=app.config['DEBUG']
    )