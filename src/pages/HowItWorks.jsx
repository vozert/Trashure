import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Work from "../components/Work";
import ScrollToTopButton from "../components/ScrollToTopButton";

const HowToPage = () => (
  <>
    <Navbar variant="white" />
    <Work />
    <Footer />
	  <ScrollToTopButton />
  </>
);

export default HowToPage;