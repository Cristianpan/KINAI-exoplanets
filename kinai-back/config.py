"""
Configuración para la aplicación Flask
"""
import os

class Config:
    """Configuración base"""
    JSON_SORT_KEYS = False

class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    FLASK_ENV = 'development'
    PORT = 5000

class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    FLASK_ENV = 'production'
    PORT = int(os.environ.get('PORT', 8000))

# Configuración por defecto
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
