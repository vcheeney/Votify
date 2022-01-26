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
      fontSize: "3rem",
      fontWeight: "700",
    },
    h2: {
      fontSize: "2.5em",
      fontWeight: "400",
    },
  },
  shape: {
    borderRadius: 0,
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
            fontSize: 36,
            fontWeight: "400",
            color: "white",
          },
        },
        {
          props: { variant: "h1" },
          style: {
            marginBottom: "24px",
            "&:after": {
              content: "''",
              display: "block",
              width: "3rem",
              marginTop: 0,
              paddingTop: "8px",
              borderBottom: "4px solid #f09686",
            },
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            fontSize: "1rem",
            fontWeight: "600",
            fontFamily: "Open Sans, sans-serif",
          },
        },
        {
          props: { variant: "subtitle2" },
          style: {
            fontSize: "1.125rem",
            lineHeight: "1.875rem",
            fontWeight: "400",
          },
        },
      ],
    },
  },
});

export default theme;
