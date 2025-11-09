import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",                 // ✅ antes ponías "type"
    primary:   { main: "#4ad09a" },
    secondary: { main: "#f50057" },
    text:      { primary: "#ed079e" }
  },
  typography: {
    h1: { fontSize: "2.4rem", fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: "1.8rem", fontWeight: 700 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    subtitle1: { fontSize: "1.05rem", fontWeight: 500 },
    body1: { fontSize: "1rem" },
    caption: { fontSize: "0.85rem" }
  }
});