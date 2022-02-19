import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate } from "remix";
import { FullPageSpinner } from "~/components/FullPageSpinner";
import { WaitingDialog } from "~/components/WaitingDialog";
import { useEthereum } from "~/context/EthereumContext";
import { useVoterStatus } from "~/hooks/useVoterStatus";
import { useBallot } from "../context/BallotContext";

export default function Vote() {
  const { account, loading } = useEthereum();
  const { proposals, submitVote, currentVoterVoteStatus } = useBallot();
  const status = useVoterStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !account) {
      navigate("/connect");
      return;
    }

    if (status === "unregistered") {
      navigate("/register");
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
    <Box>
      <WaitingDialog
        ready={false}
        title="Your vote has been sent"
        route="/vote"
        open={currentVoterVoteStatus === "sent"}
        message="We are currently waiting for the operation to be saved on the public ledger. You will be redirected to the results page once the process is complete. It should only take a few seconds."
      />
      <Typography variant="h1">Vote</Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 8,
        }}
      >
        {proposals.map((proposal) => (
          <Stack
            spacing={2}
            key={proposal.id}
            sx={{
              px: 4,
              py: 2,
              backgroundColor: "primary.lighter",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              {proposal.name}
            </Typography>
            <Box
              sx={{
                w: "125px",
                h: "125px",
              }}
              component="img"
              src="./politician.png"
              alt={proposal.name}
            />
            <Button variant="contained" onClick={() => submitVote(proposal.id)}>
              Vote
            </Button>
          </Stack>
        ))}
      </Stack>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBack />}
        sx={{
          mt: 4,
        }}
      >
        Go Back
      </Button>
    </Box>
  );
}
