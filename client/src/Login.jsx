import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "./auth/useAuth";

const Login = () => {
  const { signIn } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button startIcon={<GoogleIcon />} color="inherit" onClick={signIn}>
        Sign in
      </Button>
    </Box>
  );
};

export default Login;
