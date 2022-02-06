import { ethers } from "hardhat";

async function main() {
  const [chairperson, ...voters] = await ethers.getSigners();

  const address =
    process.env.CONTRACT_ADDRESS ||
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const ballot = await ethers.getContractAt("Ballot", address);

  await Promise.all(
    voters.slice(0, 5).map(async (v) => {
      console.log("Giving right to vote to:", v.address);
      await ballot.giveRightToVote(v.address);
    })
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
