import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HowItWorks from "../pages/HowItWorks";
import Demo from "../pages/Demo";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import Password from "../pages/Password";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/howitworks" element={<HowItWorks />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/settings" element={<Settings />}>
        <Route path="profile" element={<Profile />} />
        <Route path="password" element={<Password />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;