import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Link } from "remix/client";

const Navbar: FC = () => {
  const [account, setAccount] = useState(null);

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {account ? (
              <Typography color="white">{account}</Typography>
            ) : (
              <Button
                variant="contained"
                color="contrastPrimary"
                onClick={async () => {
                  if (window.ethereum) {
                    const accounts = await window.ethereum.request({
                      method: "eth_requestAccounts",
                    });
                    setAccount(accounts[0]);
                  } else {
                    alert("Please install MetaMask to use this app.");
                  }
                }}
              >
                Connect with wallet
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
