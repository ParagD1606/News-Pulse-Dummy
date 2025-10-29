import React, { useCallback } from "react";
import { HiOutlineBookmark, HiBookmark, HiVolumeUp } from "react-icons/hi";

const NewsCard = ({ article, onBookmark, isBookmarked }) => {
  
  const handleTextToSpeech = useCallback(() => {
    const textToSpeak = `${article.title}. ${
      article.description || article.content || "No description available."
    }`;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
  }, [article.title, article.description, article.content]);

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "/fallback.jpg"; // Your fallback image in /public folder
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-5 rounded-xl 
                 shadow-lg shadow-gray-300/50 dark:shadow-gray-900/50 
                 border border-gray-200 dark:border-gray-700
                 flex flex-col space-y-3 transition-all duration-300 
                 hover:shadow-xl hover:shadow-blue-500/20 
                 dark:hover:shadow-blue-800/20"
    >
      {/* Article Image */}
      <img
        src={article.urlToImage || "/fallback.jpg"}
        onError={handleImageError}
        alt={article.title}
        loading="lazy"
        className="w-full h-44 object-cover rounded-lg select-none"
      />

      {/* Article Title */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
        {article.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-grow">
        {article.description || "No description available for this article."}
      </p>

      {/* Footer: Read link + buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-700/50">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition"
        >
          Read Full Article →
        </a>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Listen Button */}
          <button
            onClick={handleTextToSpeech}
            title="Listen to Article Summary"
            className="p-2 rounded-full text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition transform hover:scale-110"
          >
            <HiVolumeUp className="w-5 h-5" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onBookmark(article)}
            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
            className="p-1"
          >
            {isBookmarked ? (
              <HiBookmark className="w-7 h-7 text-yellow-500 hover:text-yellow-400 transition transform hover:scale-110" />
            ) : (
              <HiOutlineBookmark className="w-7 h-7 text-gray-500 dark:text-gray-300 hover:text-yellow-500 transition transform hover:scale-110" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
