import { Box, Typography } from "@mui/material";
import { GenericPageLayoutWithBackButton } from "~/components/GenericPageLayout";

function NoEthereumProvider() {
  return (
    <GenericPageLayoutWithBackButton>
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
    </GenericPageLayoutWithBackButton>
  );
}

export default NoEthereumProvider;
