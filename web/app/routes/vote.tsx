import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "remix";
import { CandidateCard } from "~/components/CandidateCard";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { GenericPageLayout } from "~/components/GenericPageLayout";
import { WaitingDialog } from "~/components/WaitingDialog";
import { useEthereum } from "~/context/EthereumContext";
import { usePageReady } from "~/hooks/usePageReady";
import { useVoterStatus } from "~/hooks/useVoterStatus";
import { generalTransition, generalTransitionDelay } from "~/lib/transitions";
import { useBallot } from "../context/BallotContext";

export default function Vote() {
  const { account, loading } = useEthereum();
  const { proposals, submitVote, currentVoterVoteStatus } = useBallot();
  const status = useVoterStatus();
  const navigate = useNavigate();
  const ready = usePageReady(status !== "loading");

  useEffect(() => {
    if (!loading && !account) {
      navigate("/getstarted");
      return;
    }

    if (status === "unregistered") {
      navigate("/getstarted/register");
      return;
    }

    if (status === "voted") {
      navigate("/results");
      return;
    }
  }, [loading, account, status]);

  if (status === "loading") {
    return <FullPageSpinner />;
  }

  return (
    <GenericPageLayout>
      <WaitingDialog
        title="Your vote has been sent"
        open={currentVoterVoteStatus === "sent"}
        message="We are currently waiting for the operation to be saved on the public ledger. You will be redirected to the results page once the process is complete. It should only take a few seconds."
      />
      <Typography
        variant="pageTitle"
        sx={{
          ...generalTransition(ready),
        }}
      >
        Vote
      </Typography>
      <Typography
        variant="body1"
        sx={{
          ...generalTransition(ready),
          ...generalTransitionDelay(1),
        }}
      >
        Now is your big moment! Click on the "Vote" button under the candidate
        for which you would like to vote.
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 8,
          mt: 12,
          ...generalTransition(ready),
          ...generalTransitionDelay(2),
        }}
      >
        {proposals.map((proposal) => (
          <CandidateCard
            key={proposal.id}
            proposal={proposal}
            display={
              <Button
                variant="contained"
                onClick={() => submitVote(proposal.id)}
                disableRipple={true}
              >
                Vote
              </Button>
            }
          />
        ))}
      </Stack>
    </GenericPageLayout>
  );
}
