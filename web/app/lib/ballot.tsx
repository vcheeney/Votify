import { ethers } from "ethers";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { VoteEvent } from "types/ethers-contracts/Ballot";
import { TypedListener } from "types/ethers-contracts/common";
import { Ballot, Ballot__factory } from "../../types/ethers-contracts";
import invariant from "tiny-invariant";

export type Proposal = {
  id: number;
  name: string;
  voteCount: number;
};

interface BallotContextInterface {
  loading: boolean;
  ballotExists: boolean;
  proposals: Proposal[];
  submitVote: (id: number) => Promise<void>;
}

const BallotContext = createContext<BallotContextInterface>({
  loading: true,
  ballotExists: false,
  proposals: [],
  submitVote: async () => {},
});

function useBallotInternal() {
  const [loading, setLoading] = useState<boolean>(true);
  const [ballotExists, setBallotExists] = useState<boolean>(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const ballotRef = useRef<Ballot | null>(null);
  const providerRef = useRef<ethers.providers.Web3Provider | null>(null);

  const listener: TypedListener<VoteEvent> = (voter, vote) => {
    fetchProposals();
  };

  useEffect(() => {
    const ballotAddress = window.ENV.BALLOT_CONTRACT_ADDRESS;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ballot = Ballot__factory.connect(ballotAddress, provider);

    ballotRef.current = ballot;

    ballot
      .chairperson()
      .then(() => {
        console.log("contract is accessible 👍");
        setBallotExists(true);
      })
      .catch((error) => {
        console.error(error);
        setBallotExists(false);
      })
      .finally(() => {
        setLoading(false);
      });

    ballot.on("Vote", listener);

    fetchProposals();

    return () => {
      ballot.off("Vote", listener);
    };
  }, []);

  function fetchProposals() {
    const ballot = ballotRef.current;
    invariant(ballot, "Ballot should be defined");
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
  }

  async function submitVote(proposalId: number) {
    const ballot = ballotRef.current;
    invariant(ballot, "Ballot should be defined");
    const provider = providerRef.current;
    invariant(provider, "Provider should be defined");

    const signer = provider.getSigner();
    const authenticatedBallot = ballot.connect(signer);

    authenticatedBallot
      .vote(proposalId)
      .then(() => {
        console.log("Voted for: ", proposalId);
        window.location.replace("/results");
      })
      .catch((err) => {
        alert(err.data.message);
      });
  }

  return {
    loading,
    ballotExists,
    proposals,
    submitVote,
  };
}

export const BallotProvider: FC = ({ children }) => {
  const value = useBallotInternal();

  return (
    <BallotContext.Provider value={value}>{children}</BallotContext.Provider>
  );
};

export const useBallot = () => {
  return useContext(BallotContext);
};
