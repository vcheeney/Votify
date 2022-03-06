import { Stack, Typography } from "@mui/material";
import { CandidateCard } from "~/components/CandidateCard";
import { useBallot } from "~/context/BallotContext";
import { GenericPageLayout } from "~/components/GenericPageLayout";

export default function Results() {
  const { proposals } = useBallot();

  return (
    <GenericPageLayout>
      <Typography variant="pageTitle">Results</Typography>
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
          <CandidateCard
            key={proposal.id}
            proposal={proposal}
            display={
              <Typography variant="subtitle1">
                {proposal.voteCount} votes
              </Typography>
            }
          />
        ))}
      </Stack>
    </GenericPageLayout>
  );
}
