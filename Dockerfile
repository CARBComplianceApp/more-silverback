# Use Node.js for the build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies and build the app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

# Copy custom nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
