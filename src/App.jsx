import React from "react";
import AppRoutes from "./routes/routes.jsx";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
