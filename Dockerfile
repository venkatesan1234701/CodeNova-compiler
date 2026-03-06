FROM node:20

RUN apt-get update && apt-get install -y python3

WORKDIR /app

COPY . .

RUN npm install

CMD ["node","backend/server.js"]