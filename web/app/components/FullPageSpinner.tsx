import { Box, CircularProgress } from "@mui/material";
import React, { FC } from "react";

type Props = {};

const FullPageSpinner: FC<Props> = ({ children }) => {
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

export default FullPageSpinner;
