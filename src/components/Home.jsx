import React, { useState } from "react";
import NewsCard from "./NewsCard";
import { HiSearch, HiArrowLeft, HiArrowRight } from "react-icons/hi";

const PAGE_SIZE = 6;

// Countries supported by NewsAPI
const SUPPORTED_COUNTRIES = [
  { code: "us", name: "USA" },
  { code: "in", name: "INDIA" },
  { code: "gb", name: "UK" },
  { code: "ca", name: "CANADA" },
  { code: "au", name: "AUSTRALIA" },
  { code: "de", name: "GERMANY" },
  { code: "jp", name: "JAPAN" },
];

// Categories list
export const categories = [
  "general",
  "politics", // <--- ADDED POLITICS
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

// Pagination logic
const getPageNumbersToShow = (currentPage, totalPages) => {
  if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const windowSize = 2;
  let startPage = Math.max(2, currentPage);
  let endPage = Math.min(totalPages - 1, currentPage + windowSize - 1);
  if (currentPage >= totalPages - 1) {
    startPage = Math.max(2, totalPages - 2);
    endPage = totalPages - 1;
  }
  if (currentPage <= 2) {
    startPage = 2;
    endPage = Math.min(totalPages - 1, 3);
  }
  const pagesToShow = [];
  pagesToShow.push(1);
  if (startPage > 2) pagesToShow.push("...");
  for (let i = startPage; i <= endPage; i++) pagesToShow.push(i);
  if (endPage < totalPages - 1) pagesToShow.push("...");
  if (totalPages > 1) pagesToShow.push(totalPages);
  return [...new Set(pagesToShow)];
};

const Home = ({
  articles,
  bookmarks,
  handleBookmark,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  country,
  setCountry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Search handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCategory("");
    setCurrentPage(1);
  };

  // Category handler
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Country handler
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCurrentPage(1);
  };

  // Pagination setup
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const currentArticles = articles.slice(startIdx, startIdx + PAGE_SIZE);
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const pagesToShow = getPageNumbersToShow(currentPage, totalPages);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="px-6 py-6 sm:py-8 border-b border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-none">

        {/* Search + Country in One Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl flex-grow">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-3 pl-12 pr-4 border-2 border-blue-500/80 dark:border-blue-600 rounded-full bg-white dark:bg-gray-800 text-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition shadow-lg"
            />
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>

          {/* Country Dropdown */}
          <div className="relative w-36 sm:w-44 md:w-48 cursor-pointer">
            <select
              value={country}
              onChange={handleCountryChange}
              className="w-full appearance-none py-2.5 pl-4 pr-10 text-sm sm:text-base 
                        border-2 border-blue-500/70 dark:border-blue-600 
                        rounded-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 
                        font-semibold shadow-md hover:border-blue-600 dark:hover:border-blue-500 
                        focus:outline-none focus:ring-4 focus:ring-blue-400/30 
                        transition-all duration-300 ease-in-out cursor-pointer"
            >
              {SUPPORTED_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 
                        text-blue-500 dark:text-blue-400 pointer-events-none 
                        transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>


        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md ${
                category === cat && searchQuery === ""
                  ? "bg-blue-600 text-white shadow-blue-500/50"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}

          {searchQuery && (
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white shadow-md">
              <span>Searching for: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-white font-bold text-lg leading-none"
                title="Clear Search"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* News Articles */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.map((article, idx) => (
          <NewsCard
            key={idx}
            article={article}
            onBookmark={handleBookmark}
            isBookmarked={!!bookmarks.find((a) => a.url === article.url)}
          />
        ))}

        {articles.length === 0 && (
          <div className="col-span-full text-center py-10 text-xl text-gray-700 dark:text-gray-300">
            No articles found.
          </div>
        )}
      </main>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-6">
          {currentPage > 1 && (
            <button
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-200 shadow-md"
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <span className="hidden sm:inline">← Prev</span>
              <HiArrowLeft className="w-5 h-5 sm:hidden" />
            </button>
          )}

          {pagesToShow.map((page, idx) => {
            if (page === "...") return (
              <span key={idx} className="px-1 sm:px-4 py-2 text-gray-500 dark:text-gray-400">...</span>
            );
            const isCurrent = currentPage === page;
            return (
              <button
                key={idx}
                onClick={() => setCurrentPage(page)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                  isCurrent
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          {currentPage < totalPages && (
            <button
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition duration-200 shadow-md"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <span className="hidden sm:inline">Next →</span>
              <HiArrowRight className="w-5 h-5 sm:hidden" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;