"""
Schema routes for KINAI Exoplanets API
"""
from flask import Blueprint, jsonify
from app.schemas import get_schema, get_available_schemas

schema_blueprint = Blueprint("schema", __name__, url_prefix="/schemas")


@schema_blueprint.route("", methods=["GET"])
def get_schemas():
    """
    Get available schemas for CSV processing
    
    Returns:
        JSON with available schemas and their metadata
    """
    try:
        return jsonify(get_available_schemas()), 200
    except Exception as e:
        return jsonify({"error": f"Error getting schemas: {str(e)}"}), 500


@schema_blueprint.route("/<schema_name>", methods=["GET"])
def get_schema_by_name(schema_name):
    """
    Get specific schema by name
    
    Args:
        schema_name: Name of the schema (default, extended, etc.)
        
    Returns:
        JSON with the requested schema
    """
    try:
        schema = get_schema(schema_name)
        return jsonify({
            "schema_name": schema_name,
            "schema": schema,
            "column_count": len(schema)
        }), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        return jsonify({"error": f"Error getting schema: {str(e)}"}), 500
