import json

from app.main import app
from fastapi.openapi.utils import get_openapi


def generate_openapi_json():
    openapi_schema = get_openapi(
        title="SyllabusAI API",
        version="1.0.0",
        description="AI powered learning",
        routes=app.routes,
    )

    with open("openapi.json", "w") as file:
        json.dump(openapi_schema, file, indent=4)


if __name__ == "__main__":
    generate_openapi_json()
