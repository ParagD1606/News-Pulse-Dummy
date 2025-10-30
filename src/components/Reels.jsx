import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { HiPlay, HiPause, HiArrowLeft, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { categories } from "./Home";

const filterArticles = (articles) =>
  articles.filter((a) => a.urlToImage && (a.description || a.content));

const ICON_FADE_DURATION = 1500;

const Reels = ({ articles, currentCategory, setCategory, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const filteredArticles = useMemo(() => filterArticles(articles), [articles]);
  const totalArticles = filteredArticles.length;

  const reelContainerRef = useRef(null);
  const articleRefs = useRef([]);
  const iconTimeout = useRef(null);
  const autoScrollTimeout = useRef(null);

  // --- Speech handling ---
  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    clearTimeout(iconTimeout.current);
    clearTimeout(autoScrollTimeout.current);
    setIsPlaying(false);
  }, []);

  const speakArticle = useCallback(
    (index) => {
      const article = filteredArticles[index];
      if (!article) return;

      stopSpeech();
      const text = `${article.title}. ${article.description || article.content || ""}`;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onstart = () => setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
        const nextIndex = (index + 1) % totalArticles;
        const nextRef = articleRefs.current[nextIndex];
        if (nextRef && reelContainerRef.current) {
          reelContainerRef.current.scrollTo({
            top: nextRef.offsetTop,
            behavior: "smooth",
          });
        }
        autoScrollTimeout.current = setTimeout(() => setActiveIndex(nextIndex), 1000);
      };

      window.speechSynthesis.speak(utterance);
    },
    [filteredArticles, stopSpeech, totalArticles]
  );

  const togglePlayPause = useCallback(() => {
    if (iconTimeout.current) clearTimeout(iconTimeout.current);
    setShowIcon(true);
    isPlaying ? stopSpeech() : speakArticle(activeIndex);
    iconTimeout.current = setTimeout(() => setShowIcon(false), ICON_FADE_DURATION);
  }, [isPlaying, stopSpeech, speakArticle, activeIndex]);

  // ✅ Search always editable
  const handleSearchChange = (e) => {
    if (setSearchQuery) setSearchQuery(e.target.value);
    if (setCategory) setCategory("general");
    setActiveIndex(0);
  };

  // --- Scroll detection ---
  useEffect(() => {
    if (!totalArticles) return;
    const container = reelContainerRef.current;
    container.scrollTo(0, 0);
    setActiveIndex(0);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveIndex(parseInt(visible.target.dataset.index, 10));
      },
      { threshold: 0.98, root: container }
    );

    articleRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => {
      stopSpeech();
      observer.disconnect();
    };
  }, [filteredArticles, totalArticles, stopSpeech]);

  // --- Auto-speak on index change ---
  useEffect(() => {
    if (totalArticles > 0 && activeIndex >= 0 && activeIndex < totalArticles) {
      speakArticle(activeIndex);
    }
    return stopSpeech;
  }, [activeIndex, totalArticles, speakArticle, stopSpeech]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header with Search */}
      <header className="w-full pt-5 pb-4 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* ✅ Always visible Search Bar */}
          <div className="relative w-full max-w-sm mx-auto mb-4">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 pl-10 pr-4 border border-blue-500/70 dark:border-blue-600 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-md"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500 dark:text-blue-400" />
          </div>

          {/* Categories */}
          <div className="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (setSearchQuery) setSearchQuery("");
                  setCategory(cat);
                  setActiveIndex(0);
                }}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md ${
                  currentCategory === cat && !searchQuery
                    ? "bg-blue-600 text-white shadow-blue-500/50"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Reels Section */}
      <div
        ref={reelContainerRef}
        onClick={togglePlayPause}
        className="relative w-full max-w-[430px] h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide snap-y snap-mandatory shadow-2xl rounded-2xl border border-gray-300 dark:border-gray-700 bg-black/95 dark:bg-black scroll-smooth"
      >
        {/* Play/Pause Icon */}
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className={`p-8 rounded-full bg-black/50 backdrop-blur-md transition-all duration-300 transform ${
              showIcon ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            {isPlaying ? (
              <HiPause className="w-12 h-12 text-white" />
            ) : (
              <HiPlay className="w-12 h-12 text-white" />
            )}
          </div>
        </div>

        {/* ✅ Show "No articles" inside Reels instead of removing search */}
        {totalArticles === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-white">
            <p className="text-2xl font-bold mb-2">No articles found</p>
            <p className="text-sm text-gray-400 mb-4">
              Try searching something else or choose another category.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              <HiArrowLeft /> Go to Home Feed
            </button>
          </div>
        ) : (
          filteredArticles.map((article, i) => (
            <div
              key={article.url}
              ref={(el) => (articleRefs.current[i] = el)}
              data-index={i}
              className="relative flex flex-col justify-end snap-center h-[calc(100vh-100px)] overflow-hidden"
            >
              <img
                src={article.urlToImage || "/fallback.jpg"}
                alt={article.title}
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="relative z-10 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-sm">
                <h3 className="text-xl font-extrabold text-white line-clamp-3 drop-shadow-md">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">
                  {article.description || article.content}
                </p>
              </div>
            </div>
          ))
        )}

        {/* Scroll indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          {filteredArticles.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-white scale-125" : "bg-white/40 scale-100"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reels;
