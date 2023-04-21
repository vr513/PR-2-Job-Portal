import React, { useContext, useState, useEffect, createContext } from "react";
import jwt from "jsonwebtoken";
import axios from '../utils/axiosConfig'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token , setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [role , setRole] = useState(null)
  const [loading, setLoading] = useState(true);

  const Login = async (targetEmail, targetPassword) => {
    let res;
    try {
      res = await axios.post("/login", {
        email: targetEmail,
        password: targetPassword,
      });
      if (res.status === 200) {
        setToken(res.data.accessToken);
        setCurrentUser(res.data.userData);
        setIsLoggedIn(true);
        setRole(res.data.userRole);
        return res;
      } else return res;
    } catch (err) {
      return err.response;
    }
  };

  const Signup = async (targetEmail, targetPassword, targetName , targetRole) => {
    let res;
    try {
      res = await axios.post("/signup", {
        email: targetEmail,
        password: targetPassword,
        name : targetName,
        role : targetRole
      });
      if (res.status === 201) return res;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  };

  const Logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserData(null);
    setRole(null);
    return true;
  };

  const value = {
   token,
   isLoggedIn,
   currentUser,
   role,
   Login,
   Logout,
   Signup
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    const usr = localStorage.getItem("user");
    let isTokenValid = true;
    if (token === (null || undefined) || usr === (null || undefined)) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      localStorage.setItem("user", null);
      localStorage.setItem("token", null);
    } else {
      jwt.verify(
        token,
        process.env.REACT_APP_API_SECRET,
        function (err, decode) {
          if (err) {
            setCurrentUser(null);
            setIsLoggedIn(false);
            isTokenValid = false;
            localStorage.setItem("user", null);
            return;
          }
        }
      );
      if (isTokenValid) {
        let temp = localStorage.getItem("registered");
        console.log(typeof temp);
        if (temp === "1") temp = true;
        else temp = false;

        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(usr));
        setRegistered(temp);
        setUserData(JSON.parse(localStorage.getItem("userData")));
      }
    }
    return;
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

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