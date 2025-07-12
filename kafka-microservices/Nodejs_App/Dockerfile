FROM node:18-alpine3.19

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install


# Only copy backend code (no test.txt, no frontend, no node_modules from host)
COPY data-stream-backend.js ./
COPY oas.json ./
COPY producer-service ./producer-service
COPY consumer-service ./consumer-service
COPY alert-service ./alert-service


ENV MONGO_URI=uriPlaceholder
ENV MONGO_USERNAME=usernamePlaceholder
ENV MONGO_PASSWORD=passwordPlaceholder


# Expose backend port (changed to 4001 for data-stream-backend.js)
EXPOSE 4001

CMD [ "node", "data-stream-backend.js" ]