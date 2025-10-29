import axios from "axios";

// Supported countries (free-tier compatible)
export const SUPPORTED_COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "de", name: "Germany" },
  { code: "jp", name: "Japan" },
  { code: "in", name: "India" },
];

export const fetchTopHeadlines = async (
  category = "general",
  query = "",
  country = "us"
) => {
  try {
    // ✅ Call your Vercel backend proxy (no CORS)
    const res = await axios.get("/api/news", {
      params: {
        country,
        category,
        query,
        pageSize: 12,
      },
    });

    const articles = res.data.articles || [];

    // Fallback for other countries (still handled through your backend)
    if (articles.length === 0) {
      let fallbackQuery = "";

      switch (country) {
        case "in":
          fallbackQuery = "India";
          break;
        case "gb":
          fallbackQuery = "United Kingdom";
          break;
        case "de":
          fallbackQuery = "Germany";
          break;
        case "jp":
          fallbackQuery = "Japan";
          break;
        default:
          fallbackQuery = "World";
      }

      const fallback = await axios.get("/api/news", {
        params: {
          query: fallbackQuery,
          category,
          pageSize: 20,
        },
      });

      console.warn(`Using fallback 'everything' endpoint for ${fallbackQuery}`);
      return fallback.data.articles || [];
    }

    return articles;
  } catch (err) {
    console.error("News fetch error:", err);
    return [];
  }
};
