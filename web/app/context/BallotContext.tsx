import { ethers } from "ethers";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "remix";
import invariant from "tiny-invariant";
import { VoteEvent } from "types/ethers-contracts/Ballot";
import { TypedListener } from "types/ethers-contracts/common";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { Ballot, Ballot__factory } from "../../types/ethers-contracts";
import { BallotNotFoundError } from "../lib/error";
import { useEthereum } from "./EthereumContext";

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
  getVoterInformation: (
    account: string
  ) => Promise<null | { allowed: boolean; voted: boolean }>;
}

const PROTECTED_ROUTES = ["/vote", "/results"];

const BallotContext = createContext<BallotContextInterface>({
  loading: true,
  ballotExists: false,
  proposals: [],
  submitVote: async () => {},
  getVoterInformation: async () => null,
});

export const BallotProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ballotExists, setBallotExists] = useState<boolean>(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const ballotRef = useRef<Ballot | null>(null);
  const providerRef = useRef<ethers.providers.Web3Provider | null>(null);
  const { ethereumExists, loading: ethereumLoading, network } = useEthereum();
  const navigate = useNavigate();

  const listener: TypedListener<VoteEvent> = (voter, vote) => {
    fetchProposals();
  };

  useEffect(() => {
    if (ethereumLoading) {
      setLoading(true);
      setBallotExists(false);
      return;
    }

    if (!ethereumExists) {
      setLoading(false);
      setBallotExists(false);
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    providerRef.current = provider;

    const ballotAddress = window.ENV.BALLOT_CONTRACT_ADDRESS;
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
  }, [ethereumLoading, ethereumExists]);

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
        console.error(err);
        alert(err.message);
      });
  }

  async function getVoterInformation(account: string) {
    const ballot = ballotRef.current;
    invariant(ballot, "Ballot should be defined");
    const voter = await ballot.voters(account);
    return {
      allowed: voter.allowed,
      voted: voter.voted,
    };
  }

  const value = {
    loading,
    ballotExists,
    proposals,
    submitVote,
    getVoterInformation,
  };

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!ballotExists && PROTECTED_ROUTES.includes(window.location.pathname)) {
    invariant(network, "Network should be defined");
    throw new BallotNotFoundError(network.name);
  }

  return (
    <BallotContext.Provider value={value}>{children}</BallotContext.Provider>
  );
};

export const useBallot = () => {
  return useContext(BallotContext);
};
