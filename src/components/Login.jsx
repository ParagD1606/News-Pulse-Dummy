import React, { useState } from "react";
import { HiMail, HiLockClosed, HiArrowLeft } from "react-icons/hi"; 
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }
    
    console.log("Attempting login with:", formData);
    
    setSuccess("Login successful! Redirecting to Home...");
    setFormData({ email: "", password: "" });
    
    setTimeout(() => {
        navigate("/home");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl dark:shadow-gray-950/70 transition-colors duration-300">
        
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          Welcome Back
        </h2>
        
        {/* Error/Success Messages */}
        {error && (
          <p className="bg-red-500/10 text-red-500 border border-red-500 p-3 rounded-lg mb-4 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-500/10 text-green-500 border border-green-500 p-3 rounded-lg mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="relative">
            <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <HiLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md shadow-blue-500/30"
            disabled={!!success}
          >
            Log In
          </button>
        </form>
        
        {/* Switch to Registration */}
        <button
            onClick={() => navigate("/registration")}
            className="mt-6 w-full text-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
            Don't have an account? Register now.
        </button>

        {/* New: Bypass to Home Feed */}
        <button
            // 4. Use navigate
            onClick={() => navigate("/home")} 
            className="mt-2 w-full text-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition flex items-center justify-center gap-1"
        >
            <HiArrowLeft className="w-4 h-4" />
            Continue to Home Feed (Skip Login)
        </button>

      </div>
    </div>
  );
};

export default Login;