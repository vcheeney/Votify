import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "remix";
import { useEthereum } from "~/context/EthereumContext";
import { usePageReady } from "~/hooks/usePageReady";
import {
  generalTransition,
  generalTransitionDelay,
  generalButtonTransition,
} from "~/lib/transitions";

export default function GetStartedConnect() {
  const { connectWithMetamask, account, loading } = useEthereum();
  const navigate = useNavigate();
  const ready = usePageReady(!loading);

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
      <Typography
        variant="pageTitle"
        sx={{
          ...generalTransition(ready),
        }}
      >
        Connect to your Ethereum account
      </Typography>
      <Typography
        sx={{
          ...generalTransition(ready),
          ...generalTransitionDelay(1),
        }}
      >
        You need to connect to your Ethereum account in order to use the voting
        system.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          ...generalButtonTransition(ready),
          ...generalTransitionDelay(2),
        }}
        onClick={connectWithMetamask}
        disableRipple={true}
      >
        Connect with wallet
      </Button>
    </Box>
  );
}
