FROM node:12.6-alpine

WORKDIR /runtime/rsc

COPY ["./package*", "./"]

RUN apk add --no-cache git=2.20.1-r0 \
 && npm install --production 

COPY ["./scripts/spawn", "../"]

COPY ["./build/", "./"]

CMD [ "node", "./app/main.js" ]
