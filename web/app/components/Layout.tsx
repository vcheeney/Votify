import { Box, Container } from "@mui/material";
import { FC } from "react";
import { Navbar } from "./Navbar";

export const Layout: FC = ({ children }) => {
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
};
