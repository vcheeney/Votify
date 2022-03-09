import { Box, Typography } from "@mui/material";
import { GenericPageLayoutWithBackButton } from "~/components/GenericPageLayout";

function BallotNotFound() {
  return (
    <GenericPageLayoutWithBackButton>
      <Typography variant="pageTitle">
        The contract is not deployed on the selected network.
      </Typography>
      <Box>
        <Typography variant="body1">
          The ballot is not deployed on the current network.
        </Typography>
        <Typography variant="body1">
          Try selecting another network in the MetaMask extension and refresh
          the page.
        </Typography>
      </Box>
    </GenericPageLayoutWithBackButton>
  );
}

export default BallotNotFound;
