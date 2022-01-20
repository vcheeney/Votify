import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>{children}</Box>
      </Container>
      <Box
        sx={{
          height: "150px",
          bgcolor: "primary.darker",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography color="white">
            Not a Shopify copy/🍝 at all... 😅
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
