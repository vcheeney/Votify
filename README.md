![Homepage](misc/preview.png)

# Votify <a href="#-project-status"><img src="https://img.shields.io/badge/Status-Archived (Apr 2022)-lightgrey?style=for-the-badge" align="right"></a>

A decentralized voting platform prototype.

## Table of contents <!-- omit in toc -->

- [☀ Introduction](#-introduction)
- [🎯 Motivation](#-motivation)
  - [⛓ Create a complete blockchain (Web3) application](#-create-a-complete-blockchain-web3-application)
  - [🌐 Test out the new REMIX.RUN react web framework](#-test-out-the-new-remixrun-react-web-framework)
  - [🎨 Give another shot to MUI](#-give-another-shot-to-mui)
- [📷 Preview](#-preview)
- [💿 Setup](#-setup)
  - [Prerequisites](#prerequisites)
    - [Software](#software)
  - [Installation & Usage](#installation--usage)
      - [Accessing the app](#accessing-the-app)
      - [Configuring MetaMask to access the local blockchain (Hardhat network)](#configuring-metamask-to-access-the-local-blockchain-hardhat-network)
      - [Using seed profiles to register as a voter](#using-seed-profiles-to-register-as-a-voter)
- [🛠 Technologies Used](#-technologies-used)
- [🧪 Tests](#-tests)
- [🚦 Project Status](#-project-status)
  - [💭 I learned...](#-i-learned)
  - [🗺 What next?](#-what-next)
- [✉ Contact](#-contact)
  - [Victor's socials](#victors-socials)
  - [Antoine's socials](#antoines-socials)

## ☀ Introduction

For my last university semester, I had to dedicate 18h/week to a project, just like my previous semester where I worked on [RunApp](https://github.com/vcheeney/RunApp).

This semester, I wanted to explore the world of crypto, but more on that later.

As I started planning out this idea, I quickly met [Antoine Gagnon](https://antoineg.dev/), a very smart peer that I somehow never crossed paths with during my whole university studies.

I could not have asked for a better partner.

This repository is the product of our labour.

In the end, we built the POC of a decentralized voting platform that runs on the Ethereum blockchain. This includes:

1. The development, testing and deployment of a ballot smart
2. The design and implementation of web3 DAPP that interacts with a smart contract (the web application used for voting and seeing the results)

## 🎯 Motivation

My goals for this project were to...

### ⛓ Create a complete blockchain (Web3) application

Blockchain and Web3 are rapidly growing in popularity thanks to cryptocurrencies, NFTs and other financial applications. Nonetheless, the properties of blockchain do have the potential to serve other purposes like verifiable voting, supply chain monitoring, identity verification, etc.

### 🌐 Test out the new REMIX.RUN react web framework

I'm a big fan of NextJS, but as responsible developers, it is always a good idea to stay aware of what other frameworks have to offer.

### 🎨 Give another shot to MUI

I used MUI in some old projects that never saw the light of day, but I was not a fan of the default Material Design styles. Therefore, when I discovered TailwindCSS, I quickly moved over. Recently, MUI received a [major update](https://mui.com/blog/material-ui-is-now-mui/) that highly improved the theme customization ability. I was desperate to try out!

## 📷 Preview

https://user-images.githubusercontent.com/23345182/158018954-4e8ca714-eb61-4311-9e74-ab6c880a7e1a.mp4

## 💿 Setup

### Prerequisites

#### Software

- Node v16 or above
- NPM
- Docker and docker-compose
- A web browser (Chrome for example) with [MetaMask](https://metamask.io/) installed

### Installation & Usage

First, clone the repository with the following command:

```sh
git clone git@github.com:vcheeney/voting-platform.git
```

Then, setup the environment variables (tip: copy/paste our `.env.example` file, the default values work just fine):

```sh
cp .env.example .env
```

Finally, run everything with docker-compose:

```sh
docker-compose -f dc.local-blockchain.yml -f dc.database.yml -f dc.database.prod.yml -f dc.web.yml up
```

For development purposes, follow the more thorough [manual setup steps](SETUP.md).

In order to deploy the smart contract to a different network, follow the [instructions here](NETWORKS.md).

##### Accessing the app

Once everything is loaded properly, the web app will be accessible at http://localhost:3000/.

##### Configuring MetaMask to access the local blockchain (Hardhat network)

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

##### Using seed profiles to register as a voter

As you may notice in the docker-compose output window, the web app generates seed users for you to register as. When asked to register your account, you can use a secret code and date of birth combination in the `web/prisma/seed-users.json` file.

## 🛠 Technologies Used

- [Remix 1.1.1](https://remix.run/) - Full stack web framework
- [Ethers 5.5.3](https://docs.ethers.io/v5/) - JavaScript library to interact with smart contracts
- [MUI 5.3.0](https://mui.com/) - React components library
- [Prisma 3.8.1](docs_url) - TypeScript ORM
- [Hardhat 2.8.3](https://hardhat.org/) - Ethereum development environment
- [Solidity 0.8.12](https://docs.soliditylang.org/en/v0.8.12/) - EVM compatible smart contract development language
- [Typechain 5.2.0](https://github.com/dethcrypto/TypeChain) - Package to generate TS types for smart contracts
- [Mocha 9.1.0](https://mochajs.org/) - JavaScript test framework
- [Chai 4.3.6](https://www.chaijs.com/) - TDD assertion library
- [Waffle 3.4.0](https://getwaffle.io/) - Chai matchers for smart contracts

## 🧪 Tests

When developing smart contracts, it is very important to do proper testing so that no funds are lost in production. To run the tests, do the following:

```bash
# Move into the hardhat subdirectory
cd hardhat

# Run the tests
npx hardhat test
```

## 🚦 Project Status

<img src="https://img.shields.io/badge/Status-Archived (Apr 2022)-lightgrey?style=for-the-badge"/>

I archived this project in April 2022 as it served its purpose. 👍

I learned a lot about web3 and other web related topics during this school semester.

### 💭 I learned...

- how to write & test a Solidity smart contract
- how to listen to events emitted from a smart contract
- how to create transactions from a backend server using a custom signer (i.e.: there is no MetaMask there)
- how to deploy a smart contract on a public testnet
- what to do when encountering the "Nonce too high" error when working with a local hardhat network
- how to use nested routes in the Remix application framework
- the benefits of using Prisma to create and maintain our data schema:
  - Simple management of migrations
  - Autogenerated TypeScript client to interact with our data
  - Simple tool to explore/modify data in our database (Prisma Studio)
- how to use the theming feature of MUI to create a unique design system
- how to properly use environment variables when working with a Docker Compose setup
- how to set up VS Code so that we have consistent EOL
- about the [SCRE.IO](https://scre.io/) chrome extension to record my screen very easily (this makes good PR previews)

### 🗺 What next?

I'm excited to move on from this project to explore new horizons in the blockchain/crypto space.

## ✉ Contact

### Victor's socials

[hello@victorc.dev](mailto:hello@victorc.dev)

[@vcheeney](https://github.com/vcheeney)

https://victorc.dev/

### Antoine's socials

[hello@antoineg.dev](mailto:hello@antoineg.dev)

[@antoinegag](https://github.com/antoinegag)

[@antoine_dev](https://twitter.com/antoineg_dev)

https://antoineg.dev/
