# Stage 1: Build the Angular application
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files first for better Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build Angular
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built artifacts
COPY --from=build /app/dist/Landing_Page/browser/ /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
