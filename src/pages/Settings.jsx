import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/layout/Footer";

const Settings = () => {
  return (
    <>
      <NavbarLogin variant="white" />
      <Outlet />
      <Footer />
    </>
  );
};

export default Settings;