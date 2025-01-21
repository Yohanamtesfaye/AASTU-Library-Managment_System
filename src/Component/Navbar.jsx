import React from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import logo from "../assets/Images/logo.jpg";

const Navbar = ({ onMenuClick }) => {
  function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  }

  return (
    <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="flex justify-between items-center px-4 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6 text-[#1a365d]" />
          </button>
          <div className="flex items-center gap-3">
            <img src={logo} className="h-10 w-10" alt="AASTU Logo" />
            <h1 className="text-xl font-semibold text-[#1a365d] hidden md:block">
              AASTU Library Management System
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <User className="h-5 w-5 text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
