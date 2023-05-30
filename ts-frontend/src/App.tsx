import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./context/ThemeContext";
import { RouteObject } from "./interfaces/Route";
import Navbar from "./components/Navbar";

function App() {
  const [routes] = useState<RouteObject[]>([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);
  return (
    <ThemeProvider>
      <div className="">
        <Navbar />
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
