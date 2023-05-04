import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "../utils/axiosConfig";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (targetEmail, targetPassword) => {
    let res;
    try {
      res = await axios.post("/login", {
        email: targetEmail,
        password: targetPassword,
      });
      console.log(res);
      if (res.status === 200) {
        setToken(res.data.accessToken);
        setCurrentUser(res.data.userData);
        setIsLoggedIn(true);
        setRole(res.data.userRole);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("currentUser", JSON.stringify(res.data.userData));
        localStorage.setItem("role", res.data.userRole);
        return res;
      } else return res;
    } catch (err) {
      return err.response;
    }
  };

  const signup = async (
    targetEmail,
    targetPassword,
    targetName,
    targetRole
  ) => {
    let res;
    try {
      res = await axios.post("/signup", {
        email: targetEmail,
        password: targetPassword,
        name: targetName,
        role: targetRole,
      });
      if (res.status === 200) return res;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  };

  const refreshToken = async () => {
    const token2 = localStorage.getItem("token");
    const currentUser2 = localStorage.getItem("currentUser");
    const role2 = localStorage.getItem("role");
    if (currentUser2 === null || currentUser2 === undefined || role2 === null || role2 === undefined) {
      logout();
      return;
    }
    if (token2 !== null && token2 !== undefined) {
      try {
        const config = {
          headers: { Authorization: `JWT ${token2}` },
        };
        const response = await axios.get("/refresh-token", config);
        setToken(response.data.accessToken);
      } catch (err) {
        logout();
      }
    } else {
      logout();
      return;
    }
    setCurrentUser(currentUser2);
    setRole(role2);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    refreshToken();
    setLoading(false);
  }, []);

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setRole(null);
    return true;
  };

  const value = {
    token,
    isLoggedIn,
    currentUser,
    role,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
