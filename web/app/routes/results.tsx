import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "remix";
import { useBallot } from "~/context/BallotContext";

export default function Results() {
  const { proposals } = useBallot();

  return (
    <Box>
      <Typography variant="h1">Results</Typography>
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
              src="../politician.png"
              alt={proposal.name}
            />
            <Typography variant="subtitle2">
              {proposal.voteCount} votes
            </Typography>
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
