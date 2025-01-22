import React, { useState } from "react";
import { Menu, Bell, User, LogOut } from "lucide-react";
import logo from "../assets/Images/logo.jpg";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
const Navbar = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  }

  const [currentLanguage, setCurrentLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "am" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

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
              {t("nav")}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
        <div className="language-switcher">
      <button onClick={toggleLanguage} title="Switch Language">
        <FaGlobe size={24} />
      </button>
    </div>

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
