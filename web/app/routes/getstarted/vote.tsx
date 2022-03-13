import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";
import { ArrowForward } from "@mui/icons-material";
import { usePageReady } from "~/hooks/usePageReady";
import {
  generalTransition,
  generalTransitionDelay,
  generalButtonTransition,
} from "~/lib/transitions";
import { GoVoteConfetti } from "~/components/GoVoteConfetti";

export default function GetStartedVote() {
  const ready = usePageReady();

  return (
    <Box>
      <GoVoteConfetti />
      <Typography
        variant="pageTitle"
        sx={{
          ...generalTransition(ready),
        }}
      >
        You're ready to vote! 🎉
      </Typography>
      <Typography
        variant="body1"
        sx={{
          ...generalTransition(ready),
          ...generalTransitionDelay(1),
        }}
      >
        Exciting news! You have successfully been registered as an allowed
        voter. Click the button bellow to go submit your vote.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={"/vote"}
        size="large"
        sx={{
          mt: 4,
          ...generalButtonTransition(ready),
          ...generalTransitionDelay(2),
        }}
        endIcon={<ArrowForward />}
        disableRipple={true}
      >
        Go vote!
      </Button>
    </Box>
  );
}
