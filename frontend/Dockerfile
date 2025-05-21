# Stage 1: Build React App
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Fix for OpenSSL error in Node.js 17+ builds
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

# Optional: Make node_modules binaries executable
RUN chmod -R 755 ./node_modules/.bin

RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy build output from the previous stage to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
