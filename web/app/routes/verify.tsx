import { Alert, Box, Button, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "remix";
import { useEthereum } from "../context/EthereumContext";
import { useVoter } from "../context/VoterContext";
import { useVoterStatus } from "../hooks/useVoterStatus";
import { useEffect, useState } from "react";
import { usePageReady } from "~/hooks/usePageReady";
import {
  generalTransition,
  generalTransitionDelay,
  generalButtonTransition,
} from "~/lib/transitions";

export default function GetStartedVerify() {
  const navigate = useNavigate();
  const { account, loading } = useEthereum();
  const { verifyWallet } = useVoter();
  const status = useVoterStatus();
  const [error, setError] = useState<string | null>(null);
  const ready = usePageReady(!loading && status === "registered");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (status === "unregistered") {
      navigate("/getstarted/register");
    }
  }, [status]);

  return (
    <Box>
      <Typography
        variant="pageTitle"
        sx={{
          ...generalTransition(ready),
        }}
      >
        Verify your account
      </Typography>
      <Typography
        variant="body1"
        sx={{
          ...generalTransition(ready),
          ...generalTransitionDelay(1),
        }}
      >
        Sign the message prompted by MetaMask. This will verify your identity
        and confirm your ownership of the account <b>{account}</b>
      </Typography>
      {error != null ? <Alert severity="error">{error}</Alert> : null}
      <Button
        variant="contained"
        sx={{
          mt: 4,
          ...generalButtonTransition(ready),
          ...generalTransitionDelay(2),
        }}
        onClick={async () => {
          setError(null);
          const verified = await verifyWallet();

          if (!verified) {
            setError("Failed to verify signature, please try again.");
          } else {
            const redirectParam = searchParams.get("redirect");
            if (redirectParam && redirectParam != "/verify") {
              navigate(redirectParam);
            } else {
              navigate("/getstarted/vote");
            }
          }
        }}
        disableRipple={true}
      >
        Verify
      </Button>
    </Box>
  );
}
