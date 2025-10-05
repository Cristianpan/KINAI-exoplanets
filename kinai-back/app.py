import os
from flask import Flask
from flask_cors import CORS
from app.routes.prediction_routes import prediction_blueprint
from config import config
from dotenv import load_dotenv

app = Flask(__name__)

# Configuration
load_dotenv()
origins = os.getenv("ALLOWED_ORIGINS", "")
origins = origins.split(",")

config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

# Configure CORS
CORS(app, origins=origins)

# Register blueprints
app.register_blueprint(prediction_blueprint)

if __name__ == "__main__":
    app.run(
        host='0.0.0.0', 
        port=app.config['PORT'], 
        debug=app.config['DEBUG']
    )