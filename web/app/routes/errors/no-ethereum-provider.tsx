import { Box, Button, Typography } from "@mui/material";
import { Link } from "remix";

function NoEthereumProvider() {
  return (
    <Box>
      <Typography variant="h1">MetaMask is required to run this app</Typography>
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
    </Box>
  );
}

export default NoEthereumProvider;
