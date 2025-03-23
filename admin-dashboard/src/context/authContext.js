import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      let token = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (token && refreshToken) {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/refresh",
            { refreshToken },
            { headers: { x_authorization: token } }
          );

          token = response.data.accessToken;
          setUser(response.data.user);
          setIsAuthenticated(true);
          Cookies.set("accessToken", token, { expires: 30 });

        } catch (error) {
          console.error("Failed to refresh token", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuth();

    const interval = setInterval(checkAuth, 9 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const onLoginSuccess = (user, accessToken, refreshToken) => {
    setUser(user);
    setIsAuthenticated(true);
    Cookies.set("accessToken", accessToken, { expires: 30 }); // 10 minutes
    Cookies.set("refreshToken", refreshToken, { expires: 30 }); // 30 days
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isCheckingAuth, onLoginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
