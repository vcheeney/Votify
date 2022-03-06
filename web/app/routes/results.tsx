import { Box, Stack, Typography } from "@mui/material";
import { useBallot } from "~/context/BallotContext";

export default function Results() {
  const { proposals } = useBallot();

  return (
    <Box>
      <Typography variant="h1">Results</Typography>
      <Typography>These are the live results of the election.</Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 8,
          mt: 4,
        }}
      >
        {proposals.map((proposal) => (
          <Stack
            spacing={2}
            key={proposal.id}
            sx={{
              px: 4,
              py: 2,
              backgroundColor: "grey.800",
              alignItems: "center",
              display: "flex",
              borderRadius: 1,
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
              borderRadius={4}
              component="img"
              src="../man.png"
              alt={proposal.name}
            />
            <Typography variant="subtitle1">
              {proposal.voteCount} votes
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
