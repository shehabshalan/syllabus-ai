# Fail on error
set -e

# Start the container if it exists, or create and run it if it doesn't
if docker ps -a --format '{{.Names}}' | grep -q '^arshifak_db$'; then
    echo "Starting existing container 'arshifak_db'..."
    docker start arshifak_db
else
    echo "Creating and starting new container 'arshifak_db'..."
    docker run --name arshifak_db -p "5432:5432" -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres

fi
