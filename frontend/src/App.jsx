import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Auth from "./screens/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import AdminDashboard from "./screens/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path = "/" element = {<Auth />} />
          <Route path = "/register" element = {<Register />} />
          <Route path ="/AdminDashboard" element ={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
