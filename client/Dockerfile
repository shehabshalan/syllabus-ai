# Docker for the client which is running react using vite
FROM node:18-slim

# Create the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies

RUN npm install


# Copy the application files
COPY . .

# Expose the port
EXPOSE 5173

# Run the application
CMD ["npm", "run", "dev"]