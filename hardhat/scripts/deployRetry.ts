import { ethers } from "hardhat";

const DELAY_SECONDS = 5;
const MAX_ATTEMPTS = 10;

async function main() {
  const names = ["Alice", "Bob", "Charlie"];
  const formattedNames = names.map(ethers.utils.formatBytes32String);

  // We get the contract to deploy
  const BallotFactory = await ethers.getContractFactory("Ballot");

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      console.log(`Trying to deploy the contract...`);
      const ballot = await BallotFactory.deploy(formattedNames);
      await ballot.deployed();
      console.log("Ballot deployed to:", ballot.address);
      break;
    } catch (error) {
      console.log(`Network is not ready yet (${i}).`);
      console.log(`Retrying in ${DELAY_SECONDS}. (${i + 1}/${MAX_ATTEMPTS})`);
      await timeout(DELAY_SECONDS);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function timeout(seconds: number) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
