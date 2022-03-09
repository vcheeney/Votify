import { Box, Button } from "@mui/material";
import { FC } from "react";
import { Link } from "remix";
import { ArrowBack } from "@mui/icons-material";

export const GenericPageLayoutWithBackButton: FC = ({ children }) => {
  return (
    <GenericPageLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>{children}</Box>
        <Button
          component={Link}
          to="/"
          replace={true}
          sx={{
            mt: 4,
            alignSelf: "flex-start",
          }}
          startIcon={<ArrowBack />}
          disableRipple={true}
        >
          Back to home
        </Button>
      </Box>
    </GenericPageLayout>
  );
};

export const GenericPageLayout: FC = ({ children }) => {
  return (
    <Box
      sx={{
        py: 4,
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  );
};
