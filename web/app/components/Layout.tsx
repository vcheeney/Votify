import { Box, Container } from "@mui/material";
import { FC } from "react";
import { useLocation } from "remix";
import { Navbar } from "../../public/Navbar";

export const Layout: FC = ({ children }) => {
  const location = useLocation();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {location.pathname !== "/" && <Navbar />}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
