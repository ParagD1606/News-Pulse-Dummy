import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { HiPlay, HiPause, HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { categories } from "./Home";

const filterArticles = (articles) =>
  articles.filter((a) => a.urlToImage && (a.description || a.content));

const ICON_FADE_DURATION = 1500;

const Reels = ({ articles, currentCategory, setCategory }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const filteredArticles = useMemo(() => filterArticles(articles), [articles]);
  const totalArticles = filteredArticles.length;

  const reelContainerRef = useRef(null);
  const articleRefs = useRef([]);
  const iconTimeout = useRef(null);
  const autoScrollTimeout = useRef(null); // ⬅️ New ref for auto-scroll timing

  // --- Speech handling ---
  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    clearTimeout(iconTimeout.current);
    clearTimeout(autoScrollTimeout.current); // ⬅️ Stop auto-scroll if paused
    setIsPlaying(false);
  }, []);

  const speakArticle = useCallback(
    (index) => {
      const article = filteredArticles[index];
      if (!article) return;

      stopSpeech();

      const text = `${article.title}. ${article.description || article.content || ""}`;
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onstart = () => {
        setIsPlaying(true);
      };

      // ⬇️ When speech ends, smoothly scroll to the next reel
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
        // Delay a bit before speaking the next one
        autoScrollTimeout.current = setTimeout(() => {
          setActiveIndex(nextIndex);
        }, 1000); // wait 1s between scrolls
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
      { threshold: 0.98, root: container } // almost full screen visibility
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

  if (!totalArticles)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 pt-0 text-center bg-gray-100 dark:bg-gray-900">
        <p className="mb-2 text-3xl font-bold text-gray-700 dark:text-gray-300">
          No articles found
        </p>
        <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
          Try selecting a different category.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 px-6 py-2 text-white transition bg-blue-600 rounded-full shadow-md hover:bg-blue-700 position-fixed hover:shadow-lg"
        >
          <HiArrowLeft /> Go to Home Feed
        </button>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="w-full pt-5 pb-4 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-nowrap overflow-x-auto justify-start sm:justify-center gap-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setActiveIndex(0);
                }}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md ${
                  currentCategory === cat
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

      {/* Reels */}
      <div
        ref={reelContainerRef}
        onClick={togglePlayPause}
        className="relative w-full max-w-[430px] h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide snap-y snap-mandatory
                   shadow-2xl rounded-2xl border border-gray-300 dark:border-gray-700 
                   bg-black/95 dark:bg-black scroll-smooth scrollbar-hide"
      >
        {/* Play/Pause icon */}
        <div className="hide-scrollbar fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
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

        {filteredArticles.map((article, i) => (
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
        ))}

        {/* Scroll indicator */}
        <div className="absolute hide-scrollbar right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
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
