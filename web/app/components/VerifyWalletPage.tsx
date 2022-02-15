import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { FC } from "react";
import { useEthereum } from "../context/EthereumContext";
import { useVoter } from "../context/VoterContext";
import { Layout } from "./Layout";

export const VerifyWalletPage: FC = () => {
  const { account } = useEthereum();
  const { verifyWallet } = useVoter();
  return (
    <Layout>
      <Box>
        <Typography variant="h1">Verify your account</Typography>
        <Typography variant="body1">
          Sign the message prompted by MetaMask. This will verify your identity
          and confirm your ownership of the account <b>{account}</b>
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 4,
          }}
          onClick={() => {
            verifyWallet();
          }}
        >
          Verify
        </Button>
      </Box>
    </Layout>
  );
};
