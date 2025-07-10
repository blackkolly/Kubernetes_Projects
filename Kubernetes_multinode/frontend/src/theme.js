import { createTheme } from "@mui/material/styles";

const netflixTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e50914" },
    background: { default: "#141414", paper: "#181818" },
    text: { primary: "#fff", secondary: "#b3b3b3" }
  },
  typography: {
    fontFamily: [
      '"Netflix Sans"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(",")
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontWeight: 700,
          textTransform: "none"
        }
      }
    }
  }
});

export default netflixTheme;
