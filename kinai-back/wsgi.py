"""
WSGI entry point for the KINAI Exoplanets API
This file allows the Flask application to be served by WSGI servers like Gunicorn
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the app from the main.py file
try:
    from main import app
except ImportError as e:
    # Fallback: try to import from app.py directly
    try:
        from app import app
    except ImportError:
        # Last resort: try to import using importlib
        import importlib.util
        spec = importlib.util.spec_from_file_location("main_app", "main.py")
        main = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(main)
        app = main.app

# This is the WSGI application that servers like Gunicorn will use
application = app

if __name__ == "__main__":
    app.run()
