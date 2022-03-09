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

> 🚨 If changes are made to the smart contract's code, shutdown the docker environment with **docker-compose down** before rebuilding the containers with **docker-compose build** and relaunching with **docker-compose up**.

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

In another terminal, run the following commands:

```sh
# Move into the web project subdirectory
cd web

# Start the production application
npm run start

# If you would rather run the development server, run:
npm run dev

# Keep this terminal open for as long as you want the app alive
```

#### Seeding

You can insert randomly generated users for testing using the seeding script.

```bash
# Move into the web project subdirectory
cd web

# Run the seed script
npm run seed
```

and follow the instructions from the script.
