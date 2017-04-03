FROM node:7 
RUN npm install pm2 -g
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 80
CMD ["pm2-docker", "app.js"]
