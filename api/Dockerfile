# Set the base image to python:3.12-slim
FROM python:3.12-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PATH="/root/.local/bin:$PATH"

# Install system dependencies including poetry
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential \
    && curl -sSL https://install.python-poetry.org | python3 - \
    && apt-get remove -y curl \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create the working directory
WORKDIR /app

# Copy the poetry files and install dependencies
COPY pyproject.toml poetry.lock ./

RUN poetry install

# Copy the application files
COPY . .

# Expose the port
EXPOSE 8000

# Run the application
CMD ["poetry", "run", "fastapi", "run", "app/main.py"]