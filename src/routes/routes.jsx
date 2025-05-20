import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HowItWorks from "../pages/HowItWorks";
import Demo from "../pages/Demo";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/howitworks" element={<HowItWorks />} />
      <Route path="/demo" element={<Demo />} />
    </Routes>
  );
};

export default AppRoutes;