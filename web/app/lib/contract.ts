import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Ballot, Ballot__factory } from "../../types/ethers-contracts";

export type Proposal = {
  id: number;
  name: string;
  voteCount: number;
};

export function useBallot() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [ballot, setBallot] = useState<Ballot>();

  useEffect(() => {
    const ballotAddress = window.ENV.BALLOT_CONTRACT_ADDRESS;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ballot = Ballot__factory.connect(ballotAddress, provider);
    setBallot(ballot);

    ballot.chairperson().then((chairperson) => {
      console.log("Accessing ballot contract from the web application.");
      console.log("Contract address:", ballot.address);
      console.log("Chairperson: ", chairperson);
    });

    ballot.proposalsAmount().then(async (amount) => {
      const proposals: Proposal[] = [];
      for (let i = 0; i < amount.toNumber(); i++) {
        const proposal = await ballot.proposals(i);
        const proposalNameInBytes = proposal.name;
        const proposalName = ethers.utils.toUtf8String(proposalNameInBytes);
        const proposalCountBigNumber = proposal.voteCount;
        const proposalCount = proposalCountBigNumber.toNumber();
        proposals.push({
          id: i,
          name: proposalName,
          voteCount: proposalCount,
        });
      }
      setProposals(proposals);
    });
  }, []);

  return {
    ballot,
    proposals,
  };
}
