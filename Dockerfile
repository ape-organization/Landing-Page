# =========================
# Stage 1: Build Angular
# =========================
FROM node:22.22.3-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular
RUN npm run build


# =========================
# Stage 2: Nginx
# =========================
FROM nginx:alpine

# Copy Angular build output
COPY --from=build /app/dist/ape-app/ /usr/share/nginx/html/

# Expose HTTP
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
