import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import ServiceFeatured from "../components/ServiceFeatured";
import Map from "../components/Map";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <Stats />
    <Services />
    <ServiceFeatured />
    <Map />
    <Footer />
    <ScrollToTopButton />
  </>
);

export default LandingPage;