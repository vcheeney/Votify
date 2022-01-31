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
    - [Local development blockchain](#local-development-blockchain-1)
      - [Launching local blockchain](#launching-local-blockchain)
      - [Configuring MetaMask to access the local blockchain](#configuring-metamask-to-access-the-local-blockchain)
    - [Database](#database-1)
    - [Web application](#web-application-1)

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

#### Local development blockchain

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the hardhat subdirectory
$ cd hardhat

# Install the dependencies
$ npm install

# Compile the smart contract
$ npx hardhat compile

# You can now close this terminal
```

#### Database

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the database subdirectory
$ cd database

# Create the .env file from the template
$ cp database.env.template database.env

# You can now close this terminal
```

#### Web application

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the web project subdirectory
$ cd web

# Install the project dependencies
$ npm install

# Create the .env file from the template
$ cp .env.example .env

# Get the compiled contract from the hardhat project
$ npm run syncContract

# Build the project
$ npm run build

# You can now close this terminal
```

<!-- USAGE EXAMPLES -->

### Usage

#### Local development blockchain

##### Launching local blockchain

Open a terminal at the root of the project and run the following commands:

```sh
# Move into the Hardhat subdirectory
$ cd hardhat

# Start the Hardhat local development blockchain
$ npx hardhat node

# Keep this terminal open for as long as you want the local blockchain alive
# Note: You'll see a list of 20 test accounts that will be useful in later steps...
```

In another terminal:

```sh
# Move into the Hardhat subdirectory
$ cd hardhat

# Deploy the smart contract
$ npx hardhat run scripts/deploy.ts --network localhost
# output: [...]
# output: Ballot deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

# You can close this terminal after completing the following step 👇
```

Copy the contract address from the response into the `web/.env` file:

```sh
...
# Copy/paste the contract address from the contract deployment step (see README)
BALLOT_CONTRACT_ADDRESS="0x5fbdb2315678afecb367f032d93f642f64180aa3"
...
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

#### Database

Open a terminal at the root of the project and run the following command:

```sh
docker-compose up

# Keep this terminal open for as long as you want to keep the database alive
```

In another terminal:

```sh
# Move into the web project subdirectory
cd web

# Run the prisma migrations
$ npx prisma migrate reset

# You can now close this terminal
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
