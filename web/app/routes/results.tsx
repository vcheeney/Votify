import { Stack, Typography } from "@mui/material";
import { CandidateCard } from "~/components/CandidateCard";
import { useBallot } from "~/context/BallotContext";
import { GenericPageLayout } from "~/components/GenericPageLayout";
import { generalTransition, generalTransitionDelay } from "~/lib/transitions";
import { usePageReady } from "~/hooks/usePageReady";

export default function Results() {
  const { proposals } = useBallot();
  const ready = usePageReady();

  return (
    <GenericPageLayout>
      <Typography
        variant="pageTitle"
        sx={{
          ...generalTransition(ready),
        }}
      >
        Results
      </Typography>
      <Typography
        sx={{
          ...generalTransition(ready),
          ...generalTransitionDelay(1),
        }}
      >
        These are the live results of the election.
      </Typography>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 8,
          mt: 4,
          ...generalTransition(ready),
          ...generalTransitionDelay(2),
        }}
      >
        {proposals.map((proposal) => (
          <CandidateCard
            key={proposal.id}
            proposal={proposal}
            display={
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {proposal.voteCount} votes
              </Typography>
            }
          />
        ))}
      </Stack>
    </GenericPageLayout>
  );
}
