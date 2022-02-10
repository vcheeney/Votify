FROM node:14-alpine
WORKDIR ./usr/src/blockchain
COPY . .
RUN npm ci
COPY ./docker/entrypoint.sh /usr/local/bin
COPY ./docker/deploy.sh /usr/local/bin
ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]