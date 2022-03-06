import { Box } from "@mui/material";
import { FC } from "react";

export const ErrorPageLayout: FC = ({ children }) => {
  return (
    <Box
      sx={{
        py: 4,
      }}
    >
      {children}
    </Box>
  );
};
