import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";

declare module "@mui/material/styles" {
  export interface ThemeOptions {
    customShadows: Record<string, string>;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
    pageTitle: true;
    h3: false;
  }
}

// Create a theme instance.
const theme = createTheme({
  palette,
  shadows,
  customShadows,
  typography: {
    fontFamily: "Roboto, sans-serif",
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: "500",
    },
    h2: {
      fontSize: "2.5em",
      fontWeight: "400",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // components overrides could be defined in app/theme/components.ts
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "md",
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "logo" },
          style: {
            fontSize: 28,
            fontWeight: "bolder",
            color: "white",
          },
        },
        {
          props: { variant: "pageTitle" },
          style: {
            display: "inline-block",
            fontSize: "2rem",
            fontWeight: "500",
            color: "white",
            marginBottom: 12,
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            fontSize: "1rem",
            fontWeight: "bold",
          },
        },
      ],
    },
  },
});

export default theme;
