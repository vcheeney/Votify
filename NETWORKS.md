# But how would one go about using this application on a different network? 🤔

This document aims to answer that question.

- [Prerequisites](#prerequisites)
- [Choose your network](#choose-your-network)
- [Getting access to a node](#getting-access-to-a-node)
- [Retrieving the chairperson's private key](#retrieving-the-chairpersons-private-key)
- [Setting the environment variables](#setting-the-environment-variables)
- [Configuring hardhat](#configuring-hardhat)
- [Defining the candidates](#defining-the-candidates)
- [Running the deployment script](#running-the-deployment-script)
- [Setting the environment variables](#setting-the-environment-variables-1)
- [Launching the web app](#launching-the-web-app)

## Prerequisites

1. An Ethereum account that contains funds on the targeted network
2. Access to a node on the targeted network

# Deploying the smart contract

## Choose your network

First thing is to choose your targeted network. One can choose to deploy to the main net ($) or use any [test network](https://ethereum.org/en/developers/docs/networks/#testnets).

Note: Luckily, there exist [test networks](https://ethereum.org/en/developers/docs/networks/#testnets) for which there are a variety of _faucets_ that allow developers to get funds for free. Now, those faucets services come and go. Therefore, the best way to find a recent & functioning faucet on a given network is to search Google.

## Getting access to a node

The easiest way to get access to an Ethereum node is to use a service such as [infura.io](https://infura.io/). Sign up and then create a new project. In the project settings, you'll see a section where you can select your network and get the associated endpoint, this is all you need.

![Node](/misc/deployment-instructions/node.png)

In this tutorial, we'll use the Rinkeby test net.

## Retrieving the chairperson's private key

The chairperson is the user that deploys the ballot smart contract. This person must have funds in his account as there are going to be fees incurred by this transaction.

To retrieve the chairperson's private keys, complete the following steps in MetaMask:

1. Select the user
2. Click on the three little vertical dots
3. Click on **Account details**
4. Click on **Export private key**
5. Enter the wallet password
6. Copy the private key

![Retrieving private key](/misc/deployment-instructions/private-key.png)

## Setting the environment variables

In the `hardhat` subdirectory, run the following command:

```sh
cp .env.example .env
```

Then, paste the Ethereum node HTTPS URL and the chairperson private key in their proper variable:

```sh
# hardhat/.env
ETHEREUM_NODE_RPC_URL="https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
CHAIRPERSON_PRIVATE_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## Configuring hardhat

If you chose a network other than **rinkeby**, you may want to change the `rinkeby` key in the networks specified in the `hardhat.config.ts` file:

```ts
...
const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    rinkeby: { // <-- this key
      url: process.env.ETHEREUM_NODE_RPC_URL || "",
      accounts:
        process.env.CHAIRPERSON_PRIVATE_KEY !== undefined
          ? [process.env.CHAIRPERSON_PRIVATE_KEY]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
...
```

It is not necessary but it would make the whole process more understandable.

## Defining the candidates

Open up the `hardhat/scripts/deploy.ts` file and define the candidates:

```ts
async function main() {
  ...
  const names = ["Dave", "Eve", "Frank"]; // <-- Here!
  const formattedNames = names.map(ethers.utils.formatBytes32String);
  ...
  console.log("Ballot deployed to:", ballot.address);
}
```

## Running the deployment script

The last step is to run the deployment script targeting the test network:

```bash
npx hardhat run scripts/deploy.ts --network rinkeby
```

Note: The `rinkeby` value here 👆 refers to the `rinkeby` network in the `hardhat.config.ts` file.

When you run this command, make sure to save the returned smart contract address as it will be useful when we configure the web app:

![Ballot deployed](/misc/deployment-instructions/ballot-deployed.png)

# Configuring the web app

## Setting the environment variables

Create the production `.env.prod` file with the following command:

```sh
cp .env.example .env.prod
```

Then, replace the values of:

- `BALLOT_CONTRACT_ADDRESS`
- `CHAIRPERSON_ACCOUNT` (Note that this is its public key)
- `CHAIRPERSON_PRIVATE_KEY`
- `ETHEREUM_NODE_RPC_URL` (The Ethereum node used to deploy the smart contract. The web app will use it to make calls to the smart contract from the backend)

## Launching the web app

Run the web app without the local blockchain using:

```sh
docker-compose -f dc.database.yml -f dc.database.prod.yml -f dc.web.yml --env-file .env.prod up
```

If you navigate to the results page, you should see the candidates you previously defined in the [deployment script](#defining-the-candidates).

![Web app on another network](/misc/deployment-instructions/deployed.png)

# Possible improvements

In the future, the following actions could be taken to make the process smoother:

1. Build a contract deployment UI so that any user could deploy a ballot smart contract without having to dive into the code to manually _hardcode_ the proposals.
2. Similarly, a UI could also help with the assignment of allowed voters. For now, only the users generated by our seeding script may send "write" transactions to the smart contract.
