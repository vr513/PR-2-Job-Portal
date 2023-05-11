import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "../utils/axiosConfig";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTokenLoading , setRefreshTokenLoading] = useState(true);
  const [refetchDataLoading , setRefetchDataLoading] = useState(true);

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
        localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("role", role);
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
    const role2 = localStorage.getItem("role");
    const currentUser2 = localStorage.getItem('currentUser');
    if (currentUser2 === null || currentUser2 === undefined || role2 === null || role2 === undefined) {
      logout();
      setRefreshTokenLoading(false);
      return;
    }
    if (token2 !== null && token2 !== undefined) {
      try {
        const config = {
          headers: { Authorization: `JWT ${token2}` },
        };
        const response = await axios.get("/refresh-token", config);
        console.log(response);
        setToken(response.data.accessToken);
        setRole(role2);
        setIsLoggedIn(true);
        setRefreshTokenLoading(false);
        
        return;
      } catch (err) {
        setRefreshTokenLoading(false);
        logout();
      }
    } else {
      setRefreshTokenLoading(false);
      logout();
      return;
    }
  };

  const refetchUserData = async() => {
    try{
      const config = {
        headers: { Authorization: `JWT ${localStorage.getItem('token')}` },
      };
      const response = await axios.get('refetch-user-data',config);
      setCurrentUser(response.data.userData);
      setRefetchDataLoading(false);
    }catch(err){
      console.error(err);
      setRefetchDataLoading(false);
    }
  }

  const saveSessionData = () => {
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("role", role);
  }
 
  useEffect(() => {
    refreshToken();
    refetchUserData();
  }, []);

  window.addEventListener('unload', saveSessionData);

  const logout = () => {
    setToken(null)
    setCurrentUser(null);
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
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
    refetchUserData,
    setCurrentUser
  };
 
  return (
    <AuthContext.Provider value={value}>
      {!refetchDataLoading && !refreshTokenLoading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
