import React, { useState } from "react";
import { HiSun, HiMoon, HiBookmark, HiChartBar, HiMenu, HiX, HiHome, HiPhotograph, HiUserCircle, HiRefresh } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

// ACCEPT NEW PROP: isRefreshing
const Navbar = ({ theme, toggleTheme, searchQuery, setSearchQuery, onRefresh, isRefreshing }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/home", icon: HiHome },
    { name: "Reels", path: "/reels", icon: HiPhotograph },
    { name: "Analytics", path: "/analytics", icon: HiChartBar },
    { name: "Bookmarks", path: "/bookmarks", icon: HiBookmark },
    { name: "Profile", path: "/profile", icon: HiUserCircle },
  ];

  const getLinkClasses = (path) =>
    `flex items-center gap-1 cursor-pointer transition ${
      location.pathname === path
        ? "text-blue-600 dark:text-blue-400 font-bold"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300"
    }`;

  const getMobileButtonClasses = (path) =>
    `flex items-center w-full p-3 rounded-lg text-lg font-medium transition ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="w-full fixed top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6 md:px-12">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/home")}>
          <span className="text-gray-900 dark:text-white text-2xl font-bold">
            News<span className="text-blue-500">Pulse</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <div key={item.name} onClick={() => handleNavigation(item.path)} className={getLinkClasses(item.path)}>
                <item.icon className="w-5 h-5" />
                <span className="hidden lg:block text-sm">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button 
              onClick={onRefresh} 
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition" 
              title={isRefreshing ? "Refreshing..." : "Refresh News"}
              disabled={isRefreshing} // DISABLE while fetching
            >
              {/* CONDITIONAL CLASS */}
              <HiRefresh className={`w-5 h-5 ${isRefreshing ? "animate-spin-slow" : ""}`} />
            </button>
          </div>

          <div onClick={toggleTheme} className={`flex w-14 h-8 rounded-full p-1 cursor-pointer ${theme === "dark" ? "bg-gray-700 justify-end" : "bg-yellow-400 justify-start"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
              {theme === "dark" ? <HiMoon className="w-4 h-4 text-blue-400" /> : <HiSun className="w-4 h-4 text-yellow-500" />}
            </div>
          </div>

          <button className="p-2 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map(item => (
              <button key={item.name} onClick={() => handleNavigation(item.path)} className={getMobileButtonClasses(item.path)}>
                <item.icon className="w-6 h-6 mr-3" />
                {item.name}
              </button>
            ))}

            {/* UPDATED: Mobile Refresh Button with state and animation */}
            <button 
              onClick={onRefresh} 
              className="mt-2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 w-full flex items-center justify-center gap-2"
              disabled={isRefreshing}
            >
                <HiRefresh className={`w-5 h-5 ${isRefreshing ? "animate-spin-slow" : ""}`} />
                <span>{isRefreshing ? "Refreshing..." : "Refresh News"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
