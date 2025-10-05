"use client";
import { createTheme } from "@mui/material/styles";
export const baseTheme = createTheme({
  typography: {
    h1: {
      fontSize: "3.8rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "3.4rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2.8rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "2rem",
    },

    body2: {
      fontSize: "1.6rem",
    },
    subtitle1: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    button: {
      fontSize: "1.4rem",
      fontWeight: 600,
      textTransform: "none",
    },
    caption: {
      fontSize: "1.2rem",
    },
    overline: {
      fontSize: "1.2rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  palette: {
    primary: {
      main: "#00BFFF",
      dark: "#0D1B2A",
      light: "#00CED1",
    },
    secondary: {
      main: "#3757e2ff",
      dark: "#5767aeff"
    },
    background: {
      default: "#0D1B2A",
      paper: "#1B263B",
    },
    text: {
      primary: "#222831",
      secondary: "#393E46", 
      disabled: "#E0E0E0",
    },
    divider: "#333333",
  },
});
