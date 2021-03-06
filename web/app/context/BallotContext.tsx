import { ethers } from "ethers";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "remix";
import invariant from "tiny-invariant";
import { VoteEvent, VoterAllowedEvent } from "types/ethers-contracts/Ballot";
import { TypedListener } from "types/ethers-contracts/common";
import { Ballot, Ballot__factory } from "../../types/ethers-contracts";
import { useEthereum } from "./EthereumContext";

export type Proposal = {
  id: number;
  name: string;
  voteCount: number;
};

type VoterVoteStatus = "unknown" | "sent" | "confirmed";

interface BallotContextInterface {
  loading: boolean;
  ballotExists: boolean;
  proposals: Proposal[];
  voteRightReceived: boolean;
  currentVoterVoteStatus: VoterVoteStatus;
  submitVote: (id: number) => Promise<void>;
  getVoterInformation: (
    account: string
  ) => Promise<null | { allowed: boolean; voted: boolean }>;
}

const NONCE_TOO_HIGH_CORE = -32603;

const UNPROTECTED_ROUTES = [
  "/",
  "/getstarted",
  "/errors/ballot-not-found",
  "/errors/no-ethereum-provider",
  "/errors/nonce-too-high",
];
const routeRequiresBallot = (route: string) =>
  !UNPROTECTED_ROUTES.includes(route);

const BallotContext = createContext<BallotContextInterface>({
  loading: true,
  ballotExists: false,
  proposals: [],
  voteRightReceived: false,
  currentVoterVoteStatus: "unknown",
  submitVote: async () => {},
  getVoterInformation: async () => null,
});

export const BallotProvider: FC = ({ children }) => {
  const [ballotExists, setBallotExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [voteRightReceived, setVoteRightReceived] = useState(false);
  const [currentVoterVoteStatus, setCurrentVoterVoteStatus] =
    useState<VoterVoteStatus>("unknown");
  const ballotRef = useRef<Ballot | null>(null);
  const providerRef = useRef<ethers.providers.Web3Provider | null>(null);
  const {
    ethereumExists,
    loading: ethereumLoading,
    account,
    network,
  } = useEthereum();
  const navigate = useNavigate();
  const location = useLocation();

  const voteEventsListener: TypedListener<VoteEvent> = (voterAccount) => {
    fetchProposals();
    if (voterAccount === account) {
      setCurrentVoterVoteStatus("confirmed");
    }
  };

  const voterAllowedEventsListener: TypedListener<VoterAllowedEvent> = (
    allowedVoterAccount
  ) => {
    if (allowedVoterAccount === account) {
      setVoteRightReceived(true);
    }
  };

  useEffect(() => {
    if (ethereumLoading) {
      setLoading(true);
      return;
    }

    if (!ethereumExists) {
      setLoading(false);
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    providerRef.current = provider;

    const ballotAddress = window.ENV.BALLOT_CONTRACT_ADDRESS;
    const ballot = Ballot__factory.connect(ballotAddress, provider);
    ballotRef.current = ballot;

    async function setupBallot() {
      try {
        await ballot.chairperson();
        console.log("[BallotContext] Contract is accessible ????");
        setBallotExists(true);
        fetchProposals();
      } catch (error) {
        console.log("[BallotContext] Contract is NOT accessible ????");
        setBallotExists(false);
      } finally {
        setLoading(false);
      }
    }
    setupBallot();

    ballot.on("Vote", voteEventsListener);
    ballot.on("VoterAllowed", voterAllowedEventsListener);
    return () => {
      ballot.off("Vote", voteEventsListener);
      ballot.off("VoterAllowed", voterAllowedEventsListener);
    };
  }, [ethereumLoading, ethereumExists, network]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (ballotExists) {
      if (location.pathname === "/errors/ballot-not-found") {
        navigate("/getstarted");
      }
    } else {
      // alert(`ballotExists: ${ballotExists}, loading: ${loading}`);
      if (routeRequiresBallot(location.pathname)) {
        navigate("/errors/ballot-not-found");
      }
    }
  }, [loading, location.pathname, ballotExists]);

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

    try {
      await authenticatedBallot.vote(proposalId);
      setCurrentVoterVoteStatus("sent");
    } catch (err: any) {
      if (err.code === NONCE_TOO_HIGH_CORE) {
        navigate("/errors/nonce-too-high");
      } else {
        throw err;
      }
    }
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

  const value: BallotContextInterface = {
    loading,
    ballotExists,
    proposals,
    voteRightReceived,
    currentVoterVoteStatus,
    submitVote,
    getVoterInformation,
  };

  return (
    <BallotContext.Provider value={value}>{children}</BallotContext.Provider>
  );
};

export const useBallot = () => {
  return useContext(BallotContext);
};
