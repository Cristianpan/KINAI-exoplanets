"""
WSGI entry point for the KINAI Exoplanets API
This file allows the Flask application to be served by WSGI servers like Gunicorn
"""

from app import app

if __name__ == "__main__":
    app.run()
