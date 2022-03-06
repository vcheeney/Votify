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
      <Typography variant="pageTitle">
        Connect to your Ethereum account
      </Typography>
      <Typography>
        You need to connect to your Ethereum account in order to use the voting
        system.
      </Typography>
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
