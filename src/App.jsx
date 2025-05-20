import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes.jsx";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;