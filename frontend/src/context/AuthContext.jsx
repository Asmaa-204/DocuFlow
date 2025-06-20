import { createContext, useContext } from "react";
import { useUser } from "@features/user/hooks/useUser";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const { user, isPending } = useUser();

  return (
    <AuthContext.Provider value={{ user, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
