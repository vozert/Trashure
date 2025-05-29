import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/layout/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

const DashboardPage = () => {
  return (
    <>
      <NavbarLogin variant="white" />
      <Dashboard />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default DashboardPage;
