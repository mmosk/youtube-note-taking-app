import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/auth");
      const { user } = await response.json();
      setUser(user);
    })();
  }, []);

  const signIn = () => {
    window.open("/api/auth/google", "_self");
  };

  const logOut = () => {
    window.open("/api/auth/logout", "_self");
  };

  return (
    <authContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
