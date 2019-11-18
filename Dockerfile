FROM node:latest

RUN mkdir -p app

WORKDIR /app

COPY . .
RUN npm install -g pm2\
    typescript\
    express\
    concurrently\
      tslint

COPY package*.json ./

EXPOSE 3000

CMD ["pm2-runtime","start"]