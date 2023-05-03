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
import EmployerDashboard from "./screens/EmployerDashboard";
import JobApplicants from "./screens/[id]";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Auth />} />
          <Route path = "/register" element = {<Register />} />
          <Route path ="/admin-dashboard" element ={<AdminDashboard />} />
          <Route path ="/home" element = {<Home />} />
          <Route path ="/jobs" element = {<Jobs />} />
          <Route path ="/profile" element = {<Profile />} />
          <Route path ="/employer-dashboard" element = {<EmployerDashboard />} />
          <Route path ="/applicants" element = {<JobApplicants />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
