import { SentimentSatisfiedAlt } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { Link } from "remix/client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "72px",
          bgcolor: "primary.main",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            justifyContent: "space-between",
            alitItems: "center",
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
              }}
              spacing={1}
            >
              <Typography variant="logo">Votify</Typography>
              <Box
                component="img"
                src="/logo.png"
                alt="Votify"
                sx={{
                  width: "28px",
                  height: "28px",
                }}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          height: "72px",
          bgcolor: "primary.lighter",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
            }}
          >
            <SentimentSatisfiedAlt color="primary" fontSize="large" />
            <Typography variant="subtitle1">
              C'est le début d'un beau petit projet... Pour les vaccins, c'est
              pas ici, lol
            </Typography>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>{children}</Box>
      </Container>
    </Box>
  );
}
