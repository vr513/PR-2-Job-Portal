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
function App() {
  const { isLoggedIn, role } = useAuth();

  const getRootScreen = () => {
    if (isLoggedIn) {
      if (role === "applicant") return <Home />;
      else if (role === "admin") return <AdminDashboard />;
      else return <EmployerDashboard />;
    } else {
      return <Auth />;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={getRootScreen()} />
        <Route path="/register" element={<Register />} />
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
