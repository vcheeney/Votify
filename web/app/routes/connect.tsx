import { Box, Button, Typography } from "@mui/material";
import { useEthereum } from "~/context/EthereumContext";
import { useNavigate } from "remix";
import { useEffect } from "react";

export default function Connect() {
  const { connectWithMetamask, account, loading } = useEthereum();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (account != null) {
      navigate("/vote");
    }
  }, [account, loading]);

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
