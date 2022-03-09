FROM node:16-alpine

# Set the working directory
WORKDIR ./usr/src/blockchain

# Install the dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Copy the project files
COPY ./ .
COPY ./docker/entrypoint.sh /usr/local/bin
COPY ./docker/deploy.sh /usr/local/bin

# Set the entry point
ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]