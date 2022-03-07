import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const landingTextTransition = (ready: boolean): SxProps<Theme> => ({
  transform: ready ? "translateY(0)" : "translateY(50px)",
  opacity: ready ? 1 : 0,
  transitionProperty: "transform, opacity",
  transitionTimingFunction: "ease",
  transitionDuration: "0.3s",
});

export const landingButtonTransition = (ready: boolean): SxProps<Theme> => ({
  transform: ready ? "translateX(0)" : "translateX(-200px)",
  opacity: ready ? 1 : 0,
  transitionProperty: "transform, opacity",
  transitionDuration: "0.3s",
  transitionTimingFunction: "ease",
});

export const generalTransition = (ready: boolean): SxProps<Theme> => ({
  transform: ready ? "translateY(0)" : "translateY(15px)",
  opacity: ready ? 1 : 0,
  transitionProperty: "transform, opacity",
  transitionTimingFunction: "ease",
  transitionDuration: "0.1s",
});

export const generalButtonTransition = (ready: boolean): SxProps<Theme> => ({
  transform: ready ? "translateX(0)" : "translateX(-60px)",
  opacity: ready ? 1 : 0,
  transitionProperty: "transform, opacity",
  transitionDuration: "0.1s",
  transitionTimingFunction: "ease",
});

export const generalTransitionDelay = (order: number): SxProps<Theme> => ({
  transitionDelay: `${order * 0.05}s`,
});
