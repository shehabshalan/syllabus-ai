# Docker for the client which is running next.js
FROM node:18-slim

# Set environment variables
# ENV NODE_ENV=production

# Create the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]