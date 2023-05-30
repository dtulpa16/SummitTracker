import React from "react";
import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState<string>("light");

  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setMode("light");
  }, []);
  return [theme, themeToggler];
}
