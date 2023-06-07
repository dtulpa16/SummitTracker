import React from "react";
import HikeList from "../components/HikeList";
import { useTheme } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";
export default function HomePage() {
  const [theme] = useTheme()
  return (
    <div>
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
