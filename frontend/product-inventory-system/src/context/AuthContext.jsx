import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const clearUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const setupTokenExpiration = useCallback((expiryTime) => {
    const timeout = expiryTime - Date.now();
    if (timeout > 0) {
      setTimeout(logout, timeout);
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    const storedUser = loadUserFromLocalStorage();
    if (
      storedUser &&
      storedUser.tokenExpiry &&
      storedUser.tokenExpiry > Date.now()
    ) {
      setUser(storedUser);
      setupTokenExpiration(storedUser.tokenExpiry);
    } else {
      clearUserFromLocalStorage();
    }
    setLoading(false);
  }, [setupTokenExpiration]);

  const logout = useCallback(() => {
    setUser(null);
    clearUserFromLocalStorage();
  }, []);

  const storeUser = useCallback(
    (userInfo) => {
      const tokenLifetime = 24 * 60 * 60 * 1000;
      const tokenExpiry = Date.now() + tokenLifetime;
      const userWithExpiry = { ...userInfo, tokenExpiry };
      setUser(userWithExpiry);
      saveUserToLocalStorage(userWithExpiry);
      setupTokenExpiration(tokenExpiry);
    },
    [setupTokenExpiration]
  );

  return (
    <AuthContext.Provider value={{ user, logout, storeUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
