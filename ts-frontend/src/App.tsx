import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import HikeDetailsPage from "./pages/HikeDetailsPage";
import { RouteObject } from "./interfaces/Route";


function App() {
  const [routes] = useState<RouteObject[]>([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/:hikeId",
      element: <HikeDetailsPage />,
    },
  ]);
  return (
    <>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
