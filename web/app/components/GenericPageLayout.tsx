import { Box, Button } from "@mui/material";
import { FC } from "react";
import { Link } from "remix";
import { ArrowBack } from "@mui/icons-material";

export const GenericPageLayout: FC = ({ children }) => {
  return (
    <Box
      sx={{
        py: 4,
      }}
    >
      {children}
      <Button
        component={Link}
        to="/"
        replace={true}
        sx={{
          mt: 4,
        }}
        startIcon={<ArrowBack />}
      >
        Back to home
      </Button>
    </Box>
  );
};
