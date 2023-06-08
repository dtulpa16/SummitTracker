import React, { useEffect, useState } from "react";
import HikeList from "../components/HikeList";
import { useTheme } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";
import { Line } from "rc-progress";
import axios from "axios";
import { HikeTotals } from "../interfaces/HikeTotalStats";
export default function HomePage() {
  const [theme] = useTheme();
  const [stats, setStats] = useState<HikeTotals>();
  useEffect(() => {
    const fetchTotals = async () => {
      let response = await axios.get<HikeTotals>(
        `${process.env.REACT_APP_URL_HOST}/api/summit/total/altitude`
      );
      setStats(response.data);
    };
    fetchTotals();
  }, []);
  return (
    <div className={`flex h-full flex-col ${
      theme === "dark" ? "bg-gray-600" : "bg-white"
    }`}>
      {stats && (
        <div className="flex flex-row mt-4 md:max-w-6xl gap-4 md:w-1/2 md:m-auto p-3">
          <Line
            className={`${
              theme === "dark" ? "bg-gray-600" : "bg-white"
            }`}
            strokeLinecap="square"
            percent={Math.floor((stats.altitude / 50000) * 100)}
            strokeWidth={4}
            trailColor="black"
            strokeColor="#D3D3D3"
          />

          <Line
            className={`${
              theme === "dark" ? "bg-gray-600" : "bg-white"
            }`}
            strokeLinecap
            percent={Math.floor((stats.length / 100) * 100)}
            strokeWidth={4}
            trailColor="black"
            strokeColor="#D3D3D3"
          />
        </div>
      )}
      <HikeList />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme={theme}
      />
    </div>
  );
}
