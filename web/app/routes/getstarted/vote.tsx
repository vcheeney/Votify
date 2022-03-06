import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";
import { ArrowForward } from "@mui/icons-material";

export default function GetStartedVote() {
  return (
    <Box>
      <Typography variant="pageTitle">You're ready to vote! 🎉</Typography>
      <Typography variant="body1">
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
        }}
        endIcon={<ArrowForward />}
      >
        Go vote!
      </Button>
    </Box>
  );
}
