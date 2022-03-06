import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";
import { ErrorPageLayout } from "~/components/ErrorPageLayout";

function NoEthereumProvider() {
  return (
    <ErrorPageLayout>
      <Typography variant="pageTitle">
        MetaMask is required to run this app
      </Typography>
      <Box>
        <Typography variant="body1">
          You can download the extension{" "}
          <a href="https://metamask.io/" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </Typography>
        <Typography variant="body1">Then, try refreshing the page.</Typography>
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
