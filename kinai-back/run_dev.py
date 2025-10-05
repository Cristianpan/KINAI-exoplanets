#!/usr/bin/env python3
"""
Development script to run the application in development mode
"""
import os
import main
app = main.app

if __name__ == "__main__":
    # Configure environment variables for development
    os.environ['FLASK_ENV'] = 'development'
    
    print("🚀 Starting development server...")
    print("📍 URL: http://localhost:5000")
    print("🔧 Mode: Development (Debug enabled)")
    print("📋 Available routes:")
    print("   - GET  /schemas (available schemas)")
    print("   - GET  /schemas/<name> (specific schema)")
    print("   - POST /deep-predict (deep model)")
    print("   - POST /fast-predict (fast model)")
    print("\n" + "="*50)
    
    app.run(
        host='127.0.0.1',  # localhost only in development
        port=5000,
        debug=True
    )
