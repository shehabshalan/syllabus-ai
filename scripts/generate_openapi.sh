# Fail on first error
set -e

# Generate openapi schema
cd ..
cd api/
pwd
poetry run python -m app.scripts.generate_openapi
