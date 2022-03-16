import { Box, Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, Outlet } from "remix";

export default function GetStarted() {
  const [step, setStep] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/getstarted") {
      setStep(0);
    } else if (location.pathname === "/getstarted/register") {
      setStep(1);
    } else if (location.pathname === "/getstarted/vote") {
      setStep(2);
    }
  }, [location]);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stepper
        activeStep={step}
        connector={
          <StepConnector
            sx={{
              height: 4,
              backgroundColor: "grey.300",
              "& > span": {
                border: "none",
              },
              borderRadius: 4,
            }}
          />
        }
        sx={{
          paddingY: 4,
        }}
      >
        <Step key="connect">
          <StepLabel>Connect with MetaMask</StepLabel>
        </Step>
        <Step key="register">
          <StepLabel>Register</StepLabel>
        </Step>
        <Step key="vote">
          <StepLabel>Vote</StepLabel>
        </Step>
      </Stepper>
      <Outlet />
    </Box>
  );
}
