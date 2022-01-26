import {
  alpha,
  PaletteColorOptions,
  PaletteOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    gradients: Record<string, string>;
    alpha: {
      white: string;
    };
  }
}

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: React.CSSProperties["color"];
    };
  }
  interface PaletteOptions {
    neutral: PaletteColorOptions;
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: "#e9ebee",
  100: "#d3d7dd",
  200: "#bdc3cc",
  300: "#919baa",
  400: "#7a8698",
  500: "#647287",
  600: "#4e5e76",
  700: "#384a65",
  800: "#223654",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const PRIMARY = {
  lighter: "#dae6f0",
  light: "#5389b6",
  main: "#095797",
  dark: "#074679", // to generate lighter/darker variants => https://www.tutorialrepublic.com/html-reference/html-color-picker.php
  darker: "#05345b",
  contrastText: "#fff",
};
const SECONDARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#268360",
  dark: "#007B55",
  darker: "#005249",
  contrastText: "#fff",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#fff",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
};
const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
};
const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const palette: PaletteOptions = {
  mode: "light",
  common: { black: "#000", white: "#fff" },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: "#f7f7f7", default: "#ffffff" },
  alpha: {
    white: "rgba(255, 255, 255, 0.50)",
  },
  neutral: {
    contrastText: "#FFF",
    main: GREY[900],
  },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;
