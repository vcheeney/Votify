import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";
import { ErrorPageLayout } from "~/components/ErrorPageLayout";

function NoEthereumProvider() {
  return (
    <ErrorPageLayout>
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
      <Button
        variant="contained"
        component={Link}
        to="/"
        replace={true}
        sx={{
          mt: 4,
        }}
      >
        Back to home
      </Button>
    </ErrorPageLayout>
  );
}

export default NoEthereumProvider;
