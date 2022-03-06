import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "remix";
import { useEthereum } from "~/context/EthereumContext";

export default function GetStartedConnect() {
  const { connectWithMetamask, account, loading } = useEthereum();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (account) {
      navigate("/getstarted/register");
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
