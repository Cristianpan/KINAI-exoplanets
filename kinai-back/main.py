import os
from flask import Flask
from app.routes.schema_routes import schema_blueprint
from app.routes.prediction_routes import prediction_blueprint
from config import config

app = Flask(__name__)

# Configuration
config_name = os.getenv('FLASK_ENV', 'development')
app.config.from_object(config[config_name])

# Register blueprints
app.register_blueprint(schema_blueprint)
app.register_blueprint(prediction_blueprint)

if __name__ == "__main__":
    app.run(
        host='0.0.0.0', 
        port=app.config['PORT'], 
        debug=app.config['DEBUG']
    )