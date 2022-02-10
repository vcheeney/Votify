import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";

export const FullPageSpinner: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};
