FROM node:16.15.0

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]