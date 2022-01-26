import { Box, Container } from "@mui/material";
import * as React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>{children}</Box>
      </Container>
    </Box>
  );
}
