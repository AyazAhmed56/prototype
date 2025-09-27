// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/language", label: "Language" },
    
    { path: "/region", label: "Region Selector" },
    { path: "/chat", label: "ChatBOT" },
    { path: "/faq", label: "FAQ" },
    
    { path: "/community", label: "Community" },
    { path: "/analysis", label: "Analysis" },
    { path: "/map", label: "India Map" },
    
    
    { path: "/knowledge", label: "Knowledge+Action" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/budget", label: "Water Budget" },
    { path: "/alerts", label: "Alerts" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="bg-teal-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">INGRES Assistant</h2>
          </Link>

          {/* Right Side - Login + Drawer Button */}
          <div className="flex items-center space-x-4">
            <button className="bg-white text-teal-700 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition">
              Login
            </button>

            {/* Drawer Button */}
            <button
              className="focus:outline-none"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center p-4 bg-teal-700 text-white">
              <h2 className="font-bold text-lg">🌊 INGRES Menu</h2>
              <button onClick={() => setIsDrawerOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg text-gray-800 font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-teal-100 text-teal-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-600">
              © 2025 INGRES Assistant
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
