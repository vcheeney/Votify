import { Stack, Typography, Box } from "@mui/material";
import React, { FC } from "react";
import { Proposal } from "~/context/BallotContext";

type Props = {
  proposal: Proposal;
  display: JSX.Element;
};

export const CandidateCard: FC<Props> = ({ proposal, display }) => {
  console.log("proposal", proposal);
  return (
    <Stack
      spacing={2}
      sx={{
        px: 4,
        py: 2,
        backgroundColor: "grey.800",
        alignItems: "center",
        display: "flex",
        borderRadius: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {proposal.name}
      </Typography>
      <Box
        sx={{
          w: "125px",
          h: "125px",
        }}
        borderRadius={4}
        component="img"
        src={proposal.name.includes("Alice") ? "woman.png" : "man.png"} // 🤫
        alt={proposal.name}
      />
      {display}
    </Stack>
  );
};
