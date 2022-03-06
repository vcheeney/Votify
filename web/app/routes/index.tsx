import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "remix";
import { ArrowForward } from "@mui/icons-material";

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const textTransitions: SxProps<Theme> = {
    transform: loaded ? "translateY(0)" : "translateY(50px)",
    opacity: loaded ? 1 : 0,
    transition: "all 0.3s ease",
  };

  const buttonTransitions: SxProps<Theme> = {
    transform: loaded ? "translateX(0)" : "translateX(-200px)",
    opacity: loaded ? 1 : 0,
    transition: "all 0.3s ease",
    transitionDelay: "0.7s",
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        mt: 16,
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          lineHeight: "1",
          ...textTransitions,
          transitionDelay: "0s",
        }}
      >
        WELCOME TO
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: "#FF3366",
          fontSize: "12rem",
          lineHeight: 0.9,
          ...textTransitions,
          transitionDelay: "0.15s",
        }}
      >
        VOTIFY
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          ...textTransitions,
          transitionDelay: "0.3s",
        }}
      >
        A decentralized voting platform prototype
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={"/getstarted"}
        size="large"
        sx={{
          mt: 4,
          ...buttonTransitions,
        }}
        endIcon={<ArrowForward />}
      >
        Get Started
      </Button>
    </Box>
  );
}
