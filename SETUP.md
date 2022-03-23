## 💿 Manual setup steps

### Installation

First, clone the repository with the following command:

```sh
git clone git@github.com:vcheeney/voting-platform.git
```

Then, continue with the following instructions to set up and configure each part of the project.

> **🏁 Quick Setup**
>
> Install everything automagically with our setup script 👌
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

# You can now close this terminal
```

<!-- USAGE EXAMPLES -->

### Usage

#### Database & local blockchain

Open a terminal at the root of the project and run the following command:

```sh
docker-compose -f dc.local-blockchain.yml -f dc.database.yml up

# Keep this terminal open for the duration of your working session
```

> 🚨 If changes are made to the smart contract's code, shutdown the blockchain container with **`docker-compose -f dc.local-blockchain.yml down`** before rebuilding it with **`docker-compose -f dc.local-blockchain.yml build`** and relaunching with the command listed above. Also, make sure to sync the contract to the frontend to have the latest types. To do so, run **`npm run syncContract`** from the **`web`** directory.

#### Web application

> 🚨 If changes are made to the **`.env`** file at the root of the repository, make sure that these changes are reflected properly in the **`web/.env`** file.

##### Running the initial Prisma migration

Before executing the next command, wait for the following message in the terminal that you used to run _docker-compose up_:
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

##### Seeding the database with default users

You can insert randomly generated users for testing using the seeding script.

```bash
# Move into the web project subdirectory
cd web

# Run the seed script
npm run seed
```

##### Running the web app

In another terminal, run the following commands:

```sh
# Move into the web project subdirectory
cd web

# Run the app in development
npm run dev

# Keep this terminal open for as long as you want the app alive
```
