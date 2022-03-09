import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import { useBallot } from "../context/BallotContext";
import { useEthereum } from "../context/EthereumContext";

export type VoterStatus = "loading" | "unregistered" | "registered" | "voted";

export function useVoterStatus() {
  const { account } = useEthereum();
  const {
    getVoterInformation,
    voteRightReceived,
    currentVoterVoteStatus,
    ballotExists,
  } = useBallot();
  const [status, setStatus] = useState<VoterStatus>("loading");

  useEffect(() => {
    if (account && ballotExists) {
      getVoterInformation(account).then((voter) => {
        invariant(voter, "Voter should be defined");
        if (!voter.allowed) {
          setStatus("unregistered");
        } else if (voter.voted) {
          setStatus("voted");
        } else {
          setStatus("registered");
        }
      });
    }
  }, [account, ballotExists, voteRightReceived, currentVoterVoteStatus]);

  return status;
}
