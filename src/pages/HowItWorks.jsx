import React from "react";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import Footer from "../components/Footer";
import Work from "../components/Work";
import ScrollToTopButton from "../components/ScrollToTopButton";

const HowToPage = () => (
  <>
    <NavbarLogin variant="white" />
    <Work />
    <Footer />
	  <ScrollToTopButton />
  </>
);

export default HowToPage;