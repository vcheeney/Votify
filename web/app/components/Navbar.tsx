import { Language } from "@mui/icons-material";
import { Box, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "remix";
import { useEthereum } from "~/context/EthereumContext";
import { AccountMenu } from "./AccountMenu";

export const Navbar: FC = () => {
  const { network } = useEthereum();

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
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <AccountMenu />
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  minWidth: 120,
                }}
              >
                <Language />
                {network && <Typography>{network.name}</Typography>}
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};
