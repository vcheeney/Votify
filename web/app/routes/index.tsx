import { Box, Button, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "remix";
import { useEthereum } from "../context/EthereumContext";
import { useVoter, Voter } from "../context/VoterContext";
import { useVoterStatus, VoterStatus } from "../hooks/useVoterStatus";

const getButtonLink = (
  account: string | null,
  status: VoterStatus,
  voter: Voter | undefined
) => {
  if (account != null) {
    if (status === "unregistered") {
      return "/register";
    }

    if (voter != null && (status === "registered" || status === "voted")) {
      return "/vote";
    }

    if (voter == null) {
      return "/verify";
    }
  }

  return "/connect";
};

const LINK_LABEL: { [key: string]: string } = {
  "/register": "Register now",
  "/vote": "Vote now",
  "/verify": "Verify your identity",
  "/connect": "Connect your MetaMask account",
};

export default function Index() {
  const { account } = useEthereum();
  const { voter } = useVoter();
  const status = useVoterStatus();

  const buttonLink = useMemo(
    () => getButtonLink(account, status, voter),
    [account, status, voter]
  );

  return (
    <Box>
      <Typography variant="h1">Welcome to Votify</Typography>
      <Typography variant="subtitle2">
        This is our beautiful landing page.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to={buttonLink}
        sx={{
          mt: 4,
        }}
      >
        {LINK_LABEL[buttonLink]}
      </Button>
    </Box>
  );
}
