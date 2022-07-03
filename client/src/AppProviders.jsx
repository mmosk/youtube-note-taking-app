import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./auth/useAuth";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const AppProviders = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default AppProviders;
