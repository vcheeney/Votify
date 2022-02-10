#!/bin/sh
echo "🔗📜 Launching the local blockchain and deploying the smart contract...";

# Change to the correct directory
cd /usr/src/blockchain;

# Start the smart contract deployment script
# (Will retry every X seconds until it succeeds or Y attempts are made)
# See the X and Y values in the script itself
sh docker/deploy.sh &  PIDDEPLOY=$!

# Run the hardhat local blockchain
npm run node