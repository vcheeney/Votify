import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "remix";
import FullPageSpinner from "~/components/FullPageSpinner";
import { useEthereum } from "~/ctx/ethereum";
import { NotRegisteredError } from "~/lib/error";
import { useVoterStatus } from "~/lib/other";
import { useBallot } from "../ctx/ballot";

export default function Vote() {
  const { account, loading } = useEthereum();
  const { proposals, submitVote } = useBallot();
  const status = useVoterStatus();

  if (!loading && !account) {
    window.location.replace("/connect");
  }

  if (status === "loading") {
    return <FullPageSpinner />;
  }

  if (status === "unregistered") {
    throw new NotRegisteredError();
  }

  if (status === "voted") {
    window.location.replace("/results");
  }

  return (
    <Box>
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
