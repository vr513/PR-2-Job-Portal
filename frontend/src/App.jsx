import "./App.css";
import Auth from "./screens/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import AdminDashboard from "./screens/AdminDashboard";
import Home from "./screens/Home";
import Jobs from "./screens/Jobs";
import Profile from "./screens/Profile";
import EmployerDashboard from "./screens/EmployerDashboard";
import JobApplicants from "./screens/[id]";
import { useAuth } from "./contexts/AuthContext";
import UserData from "./screens/[userId]";
import Job from "./screens/[job]";
import AdminAuth from "./screens/AdminAuth";
import ApplicantRegister from "./screens/ApplicantRegister";
function App() {
  const { isLoggedIn, role, exists } = useAuth();

  const getRootScreen = () => {
    if (isLoggedIn) {
      if (role === "applicant") {
        if (exists) {
          return <Home />;
        } else {
          return <ApplicantRegister />;
        }
      } else if (role === "employer") {
        if (exists) {
          return <EmployerDashboard />;
        } else {
          return <Register />;
        }
      } else return <AdminDashboard />;
    } else {
      return <Auth />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={getRootScreen()} />
        <Route path="/adminRegister" element={<AdminAuth />} />
        <Route path="/employerDashboard" element={<EmployerDashboard />} />
        <Route path="/register" element={<Register />} />\
        <Route path="/applicantRegister" element={ApplicantRegister} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applicants/:id" element={<JobApplicants />} />
        <Route path="/:id/:applicantId" element={<UserData />} />
        <Route path="/jobs/:id" element={<Job />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
