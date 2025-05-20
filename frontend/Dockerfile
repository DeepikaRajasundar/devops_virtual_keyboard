FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Ensure node_modules binaries are executable (usually not needed but safe)
RUN chmod -R 755 ./node_modules/.bin

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
