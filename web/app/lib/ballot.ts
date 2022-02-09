import { ethers } from "ethers";
import invariant from "tiny-invariant";
import { Ballot__factory } from "../../types/ethers-contracts";

export async function giveRightToVote(account: string) {
  const providerUrl = process.env.ETHEREUM_NODE_RPC_URL;
  const chairpersonAccount = process.env.CHAIRPERSON_ACCOUNT;
  const contractAddress = process.env.BALLOT_CONTRACT_ADDRESS;

  invariant(providerUrl, "No provider url");
  invariant(chairpersonAccount, "No chairperson account");
  invariant(contractAddress, "No contract address");

  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const signer = provider.getSigner(chairpersonAccount);
  const ballot = Ballot__factory.connect(contractAddress, signer);
  try {
    const res = await ballot.giveRightToVote(account);
    // TODO: retrieve the cost of the transaction?
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
