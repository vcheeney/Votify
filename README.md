# Votify

## Table of contents <!-- omit in toc -->

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [Software](#software)
  - [Installation](#installation)
    - [Local development blockchain](#local-development-blockchain)
    - [Database](#database)
    - [Web application](#web-application)
  - [Usage](#usage)
    - [Database & local blockchain](#database--local-blockchain)
      - [Configuring MetaMask to access the local blockchain](#configuring-metamask-to-access-the-local-blockchain)
      - [Running the initial Prisma migration](#running-the-initial-prisma-migration)
    - [Web application](#web-application-1)
  - [Seeding](#seeding)

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot](misc/screenshot.png)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

#### Software

- Node v16 or above
- NPM
- Docker and docker-compose
- A web browser (Chrome for example) with [MetaMask](https://metamask.io/) installed

### Installation

First, clone the repository with the following command:

```sh
git clone git@github.com:vcheeney/voting-platform.git
```

Then, continue on with the following instructions to setup and configure each part of the project.

> **TIP: Quick Setup**
>
> Setup everything automagically with our setup script 👌
>
> ```
> sh scripts/setup.sh
> ```
>
> You can then skip to the [Usage](#usage) section.

#### Local development blockchain

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the hardhat subdirectory
cd hardhat

# Install the dependencies
npm install

# Compile the smart contract
npx hardhat compile

# You can now close this terminal
```

#### Database

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the database subdirectory
cd database

# Create the .env file from the template
cp database.env.template database.env

# You can now close this terminal
```

#### Web application

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the web project subdirectory
cd web

# Install the project dependencies
npm install

# Create the .env file from the template
cp .env.example .env

# Get the compiled contract from the hardhat project
npm run syncContract

# Build the project
npm run build

# You can now close this terminal
```

<!-- USAGE EXAMPLES -->

### Usage

#### Database & local blockchain

Open a terminal at the root of the project and run the following command:

```sh
docker-compose up

# Keep this terminal open for the duration of your working session
```

##### Configuring MetaMask to access the local blockchain

In your web browser:

1. Open the MetaMask extension by clicking on its icon in the browser toolbar
2. Click on "Add Network"
3. Fill the requested fields with the following information:
   - **Network Name**: Hardhat
   - **New RPC URL**: http://127.0.0.1:8545/
   - **Chain ID**: 31337
   - **Currency Symbol**: _leave empty_
   - **Block Explorer URL**: _leave empty_
4. Click on "Save"

In the MetaMask extension:

1. Select the Hardhat network that you just configured
2. Import the first account from the list that appeared when you previously ran `npx hardhat node` in your other terminal (which should still be open)
3. **Optional:** Rename the account to _Chairperson_ or any other familiar name.

##### Running the initial Prisma migration

Before executing the next command, wait for the following message in your terminal:
`"LOG: database system is ready to accept connections"`

In another terminal:

```sh
# Move into the web project subdirectory
cd web

# Clean your database and run the migrations
npx prisma migrate reset
# ? Are you sure you want to reset your database? All data will be lost. » (y/N)
y

```

#### Web application

In an other terminal, run the following commands:

```sh
# Move into the web project subdirectory
cd web

# Start the production application
npm run start

# If you would rather run the development server, run:
npm run dev

# Keep this terminal open for as long as you want the app alive
```

### Seeding

You can insert randomly generated users for testing using the seeding script.

```bash
# Move into the web project subdirectory
cd web

# Run the seed script
npm run seed
```

and follow the instructions from the script.
