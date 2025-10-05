"""
Schema definitions for KINAI Exoplanets API
"""

DEFAULT_SCHEMA = [
    {
        "id": "search_id",
        "label": "Search ID",
        "description": "Unique identifier for the search",
        "required": True,
        "dataType": "string",
        "example": "2451545.0"
    },
    {
        "id": "num_planet",
        "label": "Number of Planet",
        "description": "Planet number in the system",
        "required": True,
        "dataType": "number",
        "example": "1"
    },
    {
        "id": "disposition",
        "label": "Disposition",
        "description": "Planet disposition status",
        "required": True,
        "dataType": "number",
        "example": "1"
    },
    {
        "id": "ror",
        "label": "Radius Ratio",
        "description": "Planet-to-star radius ratio",
        "required": True,
        "dataType": "number",
        "example": "0.1"
    },
    {
        "id": "stellar_mass",
        "label": "Stellar Mass",
        "description": "Mass of the host star",
        "required": True,
        "dataType": "number",
        "example": "1.0"
    },
    {
        "id": "ss_gravity",
        "label": "Surface Gravity",
        "description": "Surface gravity of the star",
        "required": True,
        "dataType": "number",
        "example": "4.44"
    },
    {
        "id": "period",
        "label": "Orbital Period",
        "description": "Orbital period in days",
        "required": True,
        "dataType": "number",
        "example": "365.25"
    },
    {
        "id": "duration",
        "label": "Transit Duration",
        "description": "Transit duration in hours",
        "required": True,
        "dataType": "number",
        "example": "13.0"
    },
    {
        "id": "transit_epoch",
        "label": "Transit Epoch",
        "description": "Time of transit in Julian days",
        "required": True,
        "dataType": "number",
        "example": "2451545.0"
    },
    {
        "id": "global_view",
        "label": "Global View",
        "description": "Global view parameters",
        "required": True,
        "dataType": "json",
        "example": "{}"
    },
    {
        "id": "local_view",
        "label": "Local View",
        "description": "Local view parameters",
        "required": True,
        "dataType": "json",
        "example": "{}"
    }
]

EXTENDED_SCHEMA = [
    {
        "id": "search_id",
        "label": "ID",
        "description": "Observation time (days, hours, or timestamps)",
        "required": True,
        "dataType": "string",
        "example": "2451545.0"
    },
    {
        "id": "num_planet",
        "label": "No. of Planet",
        "description": "Observed light flux (normalized or in specific units)",
        "required": True,
        "dataType": "number",
        "example": "0.9998"
    },
    {
        "id": "disposition",
        "label": "Disposition",
        "description": "Observed light flux (normalized or in specific units)",
        "required": True,
        "dataType": "number",
        "example": "0.9998"
    },
    {
        "id": "ror",
        "label": "Ratio Planet - Star",
        "description": "Uncertainty in flux measurement",
        "required": True,
        "dataType": "number",
        "example": "0.0001"
    },
    {
        "id": "stellar_mass",
        "label": "Stellar Mass",
        "description": "Quality indicator of the measurement",
        "required": True,
        "dataType": "number",
        "example": "0"
    },
    {
        "id": "ss_gravity",
        "label": "Stelar Gravity",
        "description": "Quality indicator of the measurement",
        "required": True,
        "dataType": "number",
        "example": "0"
    },
    {
        "id": "global_view",
        "label": "Global View",
        "description": "Quality indicator of the measurement",
        "required": True,
        "dataType": "json",
        "example": "0"
    },
    {
        "id": "local_view",
        "label": "Local View",
        "description": "Quality indicator of the measurement",
        "required": True,
        "dataType": "json",
        "example": "0"
    }
]

# Diccionario de esquemas disponibles
AVAILABLE_SCHEMAS = {
    "default": DEFAULT_SCHEMA,
    "extended": EXTENDED_SCHEMA
}

def get_schema(schema_name="default"):
    """
    Get schema by name
    
    Args:
        schema_name: Name of the schema to retrieve
        
    Returns:
        dict: Schema configuration
    """
    if schema_name not in AVAILABLE_SCHEMAS:
        raise ValueError(f"Schema '{schema_name}' not found. Available schemas: {list(AVAILABLE_SCHEMAS.keys())}")
    
    return AVAILABLE_SCHEMAS[schema_name]

def get_available_schemas():
    """
    Get list of available schema names
    
    Returns:
        dict: Available schemas with their metadata
    """
    return {
        "schemas": {
            name: {
                "name": name,
                "description": f"{name.title()} schema for exoplanet data",
                "column_count": len(schema)
            }
            for name, schema in AVAILABLE_SCHEMAS.items()
        }
    }
