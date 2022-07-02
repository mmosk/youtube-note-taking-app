import { lazy } from "react";
import { useAuth } from "./auth/useAuth";
import Header from "./common/Header";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}

export default App;
