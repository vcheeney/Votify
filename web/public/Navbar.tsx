import { Box, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "remix/client";
import { useEthereum } from "~/context/EthereumContext";
import { useVoter } from "../app/context/VoterContext";

export const Navbar: FC = () => {
  const { account, network } = useEthereum();
  const { voter } = useVoter();

  return (
    <>
      <Box
        sx={{
          height: "72px",
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
            <Typography
              sx={{
                fontSize: "0.5rem",
              }}
            >
              Account: {account || "(not connected)"}
            </Typography>
            {network && (
              <Typography
                sx={{
                  fontSize: "0.5rem",
                }}
              >
                Chain: {network.name} {network.chainId}{" "}
                {network.connected ? "🟢" : "🔴"}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: "0.5rem",
              }}
            >
              Voter:{" "}
              {voter ? `${voter.firstName} ${voter.lastName}` : "unverified"}
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};
