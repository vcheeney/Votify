import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "remix";
import { useBallot } from "../lib/ballot";

export default function Vote() {
  const { proposals, submitVote } = useBallot();

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
