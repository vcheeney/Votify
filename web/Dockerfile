FROM node:16-alpine

# Set the working directory
WORKDIR /usr/server/app

# Install the dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci

# Copy the project files
COPY ./ .

# Generate the Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build
ENV NODE_ENV=production

# Set the entry point
COPY ./docker/entrypoint.sh /usr/local/bin
COPY ./docker/run-migration.sh /usr/local/bin
COPY ./docker/run-seed.sh /usr/local/bin
ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]