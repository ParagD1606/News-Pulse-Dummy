import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi"; 
import { useNavigate } from "react-router-dom"; 

const LandingFooter = () => {
  const navigate = useNavigate();
    
  const socialIcons = [
    { icon: <FaTwitter size={20} />, href: "#" },
    { icon: <FaFacebookF size={20} />, href: "#" },
    { icon: <FaInstagram size={20} />, href: "#" },
    { icon: <FaLinkedinIn size={20} />, href: "#" },
  ];

  

  // Helper function for smooth scrolling to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    
  // Helper function for navigation from the footer
  const handleFooterNavigation = (path) => {
    navigate(path);
    scrollToTop(); 
  };

  const handleFeatureScroll = () => {
    
     if (window.location.pathname === '/') {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
     } else {
        navigate("/");
    }
  };

  return (
    <footer className="w-full bg-gray-950 py-16 text-gray-300 relative border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start justify-between gap-12">
        
        {/* Logo and Scroll to Top */}
        <div className="w-full md:w-1/4">
            <span className="text-white text-3xl font-bold">
                News<span className="text-blue-500">Pulse</span>
            </span>
            <p className="text-sm mt-3 text-gray-500">
                Trending Headlines Analyzer - Data-driven news, simplified.
            </p>
            {/* Scroll to Top Button */}
             <button 
                onClick={scrollToTop}
                className="mt-6 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300 shadow-lg flex items-center gap-2"
                title="Back to Top"
            >
                <HiArrowUp className="w-5 h-5" />
                <span className="text-sm font-semibold">Back to Top</span>
            </button>
        </div>

        {/* Newsletter / Call to Action  */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Stay Updated</h3>
          <p className="text-gray-400 mb-4 text-sm">
            Receive the latest headlines and exclusive updates directly to your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none w-full flex-1 border border-gray-700"
            />
            <button 
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-r-lg transition duration-300 shadow-md shadow-blue-500/30"
                onClick={() => navigate("/registration")}
            >
              Go
            </button>
          </div>
        </div>

        {/* 3. Quick Links */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Navigate</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              
                <button onClick={() => handleFooterNavigation("/")} className="hover:text-blue-400 transition text-base">Home</button>
            </li>
            <li>
                <button 
                    onClick={handleFeatureScroll} 
                    className="hover:text-blue-400 transition text-base"
                >
                    Features
                </button>
            </li>
            <li>
              
                <button onClick={() => handleFooterNavigation("/bookmarks")} className="hover:text-blue-400 transition text-base">Bookmarks</button>
            </li>
            <li>
              
                <button onClick={() => handleFooterNavigation("/analytics")} className="hover:text-blue-400 transition text-base">Analytics</button>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Connect</h3>
          <div className="flex gap-6">
            {socialIcons.map((item, index) => (
                <a 
                    key={index}
                    href={item.href} 
                    className="text-gray-500 hover:text-blue-400 transition transform hover:scale-110"
                    aria-label={`Follow us on ${item.icon.type.name.replace('Fa', '')}`} 
                >
                    {item.icon}
                </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-16 pt-8 text-center text-sm text-gray-500 border-t border-gray-800">
        &copy; {new Date().getFullYear()} NewsPulse. All rights reserved.
      </div>
    </footer>
  );
};

export default LandingFooter;