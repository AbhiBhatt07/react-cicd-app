# ----------------------
# Stage 1: Build the React app
# ----------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install ALL dependencies (prod + dev, needed for TypeScript & Vite)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# ----------------------
# Stage 2: Run with Nginx
# ----------------------
FROM nginx:alpine

# Copy build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional) Custom Nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
