import { lazy } from "react";
import { useAuth } from "./auth/useAuth";

const Login = lazy(() => import("./Login"));
const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));

function App() {
  const { user } = useAuth();

  return user ? <AuthenticatedApp /> : <Login />;
}

export default App;
