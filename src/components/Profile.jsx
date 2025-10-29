import React, { useState } from "react";
import { HiUserCircle, HiMail, HiKey, HiArrowLeft, HiLogout, HiMailOpen } from "react-icons/hi";
// 1. Import useNavigate
import { useNavigate } from "react-router-dom"; 

// Mock User Data for demonstration
const mockUser = {
  name: "NewsPulse User",
  email: "user@newspulse.com",
  memberSince: "October 2025",
  lastLogin: "Today",
};

// Available categories for preferences (matching those in Home.jsx)
const CATEGORIES = [
    "General",
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
];

// 2. Remove 'setPage' prop
const Profile = ({ bookmarks = [] }) => {
    // 3. Initialize useNavigate
    const navigate = useNavigate();
    // Mock state for user preferences
    const [receivesEmails, setReceivesEmails] = useState(true);
    const [preferences, setPreferences] = useState(['General', 'Technology']);
    const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', or null

    const handleLogout = () => {
        // In a real app: Clear token, clear user state, then redirect.
        console.log("User logged out.");
        alert("Logged out successfully! Redirecting to Landing Page.");
        // 4. Use navigate to the root path
        navigate("/"); 
    };
    
    const handleCategoryToggle = (category) => {
        setPreferences(prev => 
            prev.includes(category) 
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
        setSaveStatus(null);
    };
    
    const handleSavePreferences = () => {
        // Simulate API call to save preferences
        console.log("Saving preferences:", { receivesEmails, preferences });
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
    };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-8 border-b border-blue-500/50">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
          <HiUserCircle className="w-10 h-10 text-blue-600" />
          My Profile
        </h2>
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
        >
          <HiLogout className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Card */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl dark:shadow-gray-950/50 border border-gray-100 dark:border-gray-700 h-fit">
            <div className="flex flex-col items-center">
                <HiUserCircle className="w-20 h-20 text-blue-500 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{mockUser.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <HiMail className="w-4 h-4" /> {mockUser.email}
                </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <p className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Member Since:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{mockUser.memberSince}</span>
                </p>
                <p className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Bookmarks:</span>
                    {/* DYNAMIC VALUE: Use the length of the bookmarks array */}
                    <span className="font-medium text-gray-800 dark:text-gray-200">{bookmarks.length}</span>
                </p>
                <p className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last Activity:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{mockUser.lastLogin}</span>
                </p>
            </div>
        </div>

        {/* Right Columns: Actions & Preferences */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl dark:shadow-gray-950/50 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Settings</h3>
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition">
                        <span className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200">
                            <HiKey className="w-6 h-6 text-blue-500" />
                            Change Password
                        </span>
                        <span className="text-blue-500 font-bold text-xl">&rarr;</span>
                    </button>
                    
                    <button 
                        // 4. Use navigate
                        onClick={() => navigate("/home")}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/70 transition"
                    >
                        <span className="flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-200">
                            <HiArrowLeft className="w-6 h-6 text-green-500" />
                            Return to News Feed
                        </span>
                        <span className="text-green-500 font-bold text-xl">&rarr;</span>
                    </button>
                </div>
            </div>
            
            {/* Email Preferences */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl dark:shadow-gray-950/50 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <HiMailOpen className="w-6 h-6 text-blue-500" />
                    Email Preferences
                </h3>

                {/* Daily Email Toggle */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
                    <label htmlFor="dailyEmail" className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        Receive Daily Top News Digest?
                    </label>
                    <input
                        type="checkbox"
                        id="dailyEmail"
                        checked={receivesEmails}
                        onChange={(e) => {
                            setReceivesEmails(e.target.checked);
                            setSaveStatus(null);
                        }}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>

                {/* Category Preferences */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Select your preferred categories:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryToggle(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                    ${preferences.includes(cat)
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                    }`
                                }
                                disabled={!receivesEmails}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    {!receivesEmails && (
                         <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                            Enable daily emails above to select preferences.
                        </p>
                    )}
                </div>
                
                {/* Save Button and Status */}
                <div className="mt-6 flex items-center justify-end">
                    {saveStatus === 'success' && (
                        <span className="text-green-500 dark:text-green-400 text-sm font-medium mr-4">
                            Preferences saved!
                        </span>
                    )}
                    {saveStatus === 'error' && (
                        <span className="text-red-500 dark:text-red-400 text-sm font-medium mr-4">
                            Error saving preferences.
                        </span>
                    )}
                    <button
                        onClick={handleSavePreferences}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Save Preferences
                    </button>
                </div>

            </div>
            
        </div>
      </div>
    </div>
  );
};

export default Profile;