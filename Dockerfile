FROM node:alpine

WORKDIR /docs

RUN npm install -g docsify-cli@latest

COPY . .

EXPOSE 3587

ENTRYPOINT docsify serve . --port 3587 --theme dark
