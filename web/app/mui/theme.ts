import { blue, grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    logo: true;
    pageTitle: true;
    h3: false;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    grey: grey,
    primary: {
      main: blue[800],
    },
    neutral: {
      main: grey[800],
    },
    secondary: {
      main: grey[800],
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
    background: {
      default: grey[50],
      paper: "#fff",
    },
  },
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
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
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
            color: grey[800],
            fontSize: 28,
            fontWeight: "900",
          },
        },
        {
          props: { variant: "pageTitle" },
          style: {
            display: "inline-block",
            fontSize: "2rem",
            fontWeight: "500",
            marginBottom: 12,
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            fontSize: "1.8rem",
            fontWeight: "500",
            color: grey[500],
          },
        },
      ],
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.8rem",
          textAlign: "center",
          width: "auto",
          maxWidth: "none",
        },
      },
    },
  },
});

export default theme;
