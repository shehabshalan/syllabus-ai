# Fail on first error
set -e

# Generate openapi schema
cd api/
pwd
poetry run python -m app.scripts.generate_openapi

cd ..
pwd

# # Generate client bindings
cd client 
pwd
npx openapi-codegen gen api
cd ..