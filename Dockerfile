FROM node:12.6-alpine

WORKDIR /usr/runtime

COPY ["./build/", "./package*", "./"]

RUN npm install --production

CMD [ "node", "./app/main.js" ]
