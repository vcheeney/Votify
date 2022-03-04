import { Alert, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "remix";
import { useEthereum } from "../context/EthereumContext";
import { useVoter } from "../context/VoterContext";
import { useVoterStatus } from "../hooks/useVoterStatus";
import { useEffect, useState } from "react";

export default function Verify() {
  const navigate = useNavigate();
  const { account } = useEthereum();
  const { verifyWallet } = useVoter();
  const status = useVoterStatus();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unregistered") {
      navigate("/register");
    }
  }, [status]);

  return (
    <Box>
      <Typography variant="h1">Verify your account</Typography>
      <Typography variant="body1">
        Sign the message prompted by MetaMask. This will verify your identity
        and confirm your ownership of the account <b>{account}</b>
      </Typography>
      {error != null ? <Alert severity="error">{error}</Alert> : null}
      <Button
        variant="contained"
        sx={{
          mt: 4,
        }}
        onClick={async () => {
          setError(null);
          const verified = await verifyWallet();

          if (!verified) {
            setError("Failed to verify signature, please try again.");
          } else {
            navigate("/");
          }
        }}
      >
        Verify
      </Button>
    </Box>
  );
}
