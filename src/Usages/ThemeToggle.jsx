import React from "react";
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-transparent text-yellow-400 dark:text-blue-400 transition"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? <HiSun className="w-6 h-6" /> : <HiMoon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;
