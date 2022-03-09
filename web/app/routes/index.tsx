import { Box, Button, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Link } from "remix";
import { ArrowForward } from "@mui/icons-material";
import {
  landingTextTransition,
  landingButtonTransition,
} from "~/lib/transitions";
import { usePageReady } from "~/hooks/usePageReady";

export default function Index() {
  const loaded = usePageReady();

  const heroImageTransition: SxProps<Theme> = {
    transform: loaded
      ? "translateX(0) rotate(20deg)"
      : "translateX(20px) rotate(10deg)",
    opacity: loaded ? 1 : 0,
    transition: "all 3s ease",
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "fixed",
          inset: 0,
          right: "-10%",
        }}
      >
        <Box
          component="img"
          src="eth_logo.svg"
          sx={{
            pt: "10%",
            width: "50%",
            ...heroImageTransition,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Stack
          sx={{
            pb: 16,
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              ...landingTextTransition(loaded),
              transitionDelay: "0s",
              letterSpacing: "0.1rem",
            }}
          >
            WELCOME TO
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "secondary.main",
              fontSize: "8rem",
              fontWeight: 900,
              ...landingTextTransition(loaded),
              transitionDelay: "0.15s",
              textTransform: "uppercase",
            }}
          >
            Votify
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              ...landingTextTransition(loaded),
              transitionDelay: "0.3s",
            }}
          >
            A decentralized voting platform prototype
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={"/getstarted"}
              size="large"
              sx={{
                mt: 4,
                ...landingButtonTransition(loaded),
                transitionDelay: "0.7s",
                fontSize: "1.8rem",
                "&>.MuiButton-endIcon>*:nth-of-type(1)": {
                  fontSize: "2rem",
                },
              }}
              endIcon={<ArrowForward />}
              disableRipple={true}
            >
              Get Started
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
