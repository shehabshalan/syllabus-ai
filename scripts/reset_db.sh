# Fail on error
set -e

# Remove the old db (force them to stop if running)
docker container rm -f syllabus_db >> /dev/null 2>&1

# Start dev db
docker run --name syllabus_db -p "5432:5432" -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=postgres -d postgres
