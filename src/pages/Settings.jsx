import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/Footer";

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