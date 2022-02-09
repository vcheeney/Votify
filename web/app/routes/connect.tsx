import { Box, Button, Typography } from "@mui/material";
import { useEthereum } from "~/lib/ethereum";

export default function Connect() {
  const { connectWithMetamask, account } = useEthereum();

  if (account) {
    window.location.replace("/vote");
  }

  return (
    <Box>
      <Typography variant="h1">Connect to your Ethereum account</Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
        }}
        onClick={connectWithMetamask}
      >
        Connect with wallet
      </Button>
    </Box>
  );
}
