import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Auth from "./screens/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import AdminDashboard from "./screens/AdminDashboard";
import Home from "./screens/Home";
import Jobs from "./screens/Jobs"
import Profile from "./screens/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Auth />} />
          <Route path = "/register" element = {<Register />} />
          <Route path ="/AdminDashboard" element ={<AdminDashboard />} />
          <Route path ="/Home" element = {<Home />} />
          <Route path ="/Jobs" element = {<Jobs />} />
          <Route path ="/Profile" element = {<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
