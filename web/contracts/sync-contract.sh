set -e # stop the script if any command returns an error

# Give proper warning
echo "⚠️  FRIENDLY WARNING 😊"
echo "Make sure you have already compiled the contract in the hardhat project"
echo "See the README at the root directory for instructions"
echo ""

# Create the compiled contracts directory in the web project
mkdir -p contracts

# Copy the compiled contract
cp -r ../hardhat/artifacts/contracts/Ballot.sol/Ballot.json contracts/Ballot.json

# Generate the types
npx typechain --target=ethers-v5 "contracts/Ballot.json"

echo ""
echo "Done ✅"