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
    <div className="w-4/5 mx-auto">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
