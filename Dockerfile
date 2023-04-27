# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the port for the Node.js application
EXPOSE 4000

# Set the MongoDB Atlas connection URI as an environment variable
ENV MONGODB_URI=$MONGODB_URI

# Start the Node.js application and connect to MongoDB Atlas
CMD ["npm", "start"]
