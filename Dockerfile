# =========================
# Stage 1: Build Angular
# =========================
FROM node:22.22.3-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build application
RUN npm run build


# =========================
# Stage 2: Nginx
# =========================
FROM nginx:alpine

# Copy Angular build output
COPY --from=build /app/dist/Landing_Page/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
