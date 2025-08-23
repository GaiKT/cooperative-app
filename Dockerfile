# Use the official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the current directory contents into the container at /app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run the app in development mode
CMD ["npm", "run", "dev"]
