import React, { useContext, useState, useEffect, createContext } from "react";
import jwt from "jsonwebtoken";
import axios from '../utils/axiosConfig'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token , setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const Login = async (targetEmail, targetPassword) => {
    let res;
    try {
      res = await axios.post("/login", {
        email: targetEmail,
        password: targetPassword,
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.accessToken);
        setToken(res.data.accessToken);
        setCurrentUser(res.data.userData);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.userData)
        );
        setIsLoggedIn(true);
        return res;
      } else return res;
    } catch (err) {
      return err.response;
    }
  };

  const Signup = async (targetEmail, targetPassword) => {
    let res;
    try {
      res = await axios.post("/signup", {
        email: targetEmail,
        password: targetPassword,
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
    token = null;
    localStorage.setItem("user", null);
    return true;
  };

  const RefreshData = async () => {
    const localToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "JWT " + localToken,
      },
    };
    const response2 = await axios.get("/info", config);
    console.log(response2.data);
    setUserData(response2.data.user);
    localStorage.setItem("userData", JSON.stringify(response2.data.user));
    localStorage.setItem("registered", "1");
    setRegistered(true);
  };

  const value = {
    currentUser,
    Login,
    isLoggedIn,
    Logout,
    Signup,
    userData,
    token,
    registered,
    RefreshData,
    RefreshMatches,
    matchesData,
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