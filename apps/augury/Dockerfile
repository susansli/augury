# Use the official Node.js image as the base image
FROM node:21.7.3-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /apps/augury

# Copy package.json and package-lock.json
COPY /package.json /pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the app's code
COPY . .

# Build the application
RUN npx nx build augury

# Expose the port the app runs on
EXPOSE 4200

# Start the application
CMD ["npx", "nx", "serve", "augury", "--host", "0.0.0.0"]
