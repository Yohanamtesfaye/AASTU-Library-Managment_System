import React, { useState } from "react";
import { EyeIcon, EyeOffIcon, BookOpenIcon } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminUsername = "admin";
    const adminPassword = "password123";

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isLoggedIn", "true");
      // alert("Successfully Logged In");
      toast.success("Successfully Logged In!");
      setTimeout(()=>{
        window.location.href = "/";
      }, 2000)
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a365d]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <BookOpenIcon className="h-12 w-12 text-[#1a365d]" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1a365d]">
          AASTU Library Management System
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] transition-all duration-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#1a365d] text-white py-2 px-4 rounded-md hover:bg-[#2c4a7c] focus:outline-none focus:ring-2 focus:ring-[#1a365d] focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Forgot your password?{" "}
          <a href="#" className="text-[#1a365d] hover:underline">
            Reset it here
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
