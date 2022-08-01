import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextDispatcher = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authState"));
    setState(userData);
  }, []);

  useEffect(() => {
    const data = JSON.stringify(state);
    localStorage.setItem("authState", data);
  }, [state]);
  return (
    <AuthContext.Provider value={state}>
      <AuthContextDispatcher.Provider value={setState}>
        {children}
      </AuthContextDispatcher.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

export const useAuthAction = () => useContext(AuthContextDispatcher);
