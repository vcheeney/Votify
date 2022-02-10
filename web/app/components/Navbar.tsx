import { Box, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "remix/client";
import { useEthereum } from "~/context/EthereumContext";

export const Navbar: FC = () => {
  const { account, network } = useEthereum();

  return (
    <>
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
            display: "flex",
            justifyContent: "space-between",
            alitItems: "center",
            flexDirection: "row",
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
          <Box>
            <Typography color="white">
              Account: {account || "(not connected)"}
            </Typography>
            {network && (
              <Typography color="white">
                Chain: {network.name} {network.chainId}{" "}
                {network.connected ? "🟢" : "🔴"}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
