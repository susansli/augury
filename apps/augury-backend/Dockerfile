# Use the official Node.js image as the base image
FROM node:21.7.3-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /apps/augury-backend

# Copy package.json and package-lock.json
COPY /package.json /pnpm-lock.yaml ./

# Copy the rest of the app's code
COPY . .

# Install dependencies
RUN pnpm install

RUN npx nx build augury-backend

RUN npx nx reset

# Expose the port the app runs on
EXPOSE 3333

# Start the application
CMD ["npx", "nx", "run", "augury-backend:start-nodemon"]
