import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" />;
};
