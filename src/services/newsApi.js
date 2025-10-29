// paragd1606/news-pulse-dummy/News-Pulse-Dummy-eea1ae486c0d7a74650bf31e662b20b4c98bf974/src/services/newsApi.js

// Using a placeholder import to maintain project structure, but no external API call is made.
import axios from "axios"; 

// Supported countries (from Home.jsx)
export const SUPPORTED_COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "in", name: "India" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "de", name: "Germany" },
  { code: "jp", name: "Japan" },
];

const CATEGORIES = [
  "general",
  "politics",
  "business",
  "technology",
  "sports",
  "entertainment",
  "health",
  "science",
];

// 1. DEDICATED LIST OF NEWS SOURCES (12 Sources)
const NEWS_SOURCES = [
  { id: 'cnn', name: 'CNN' },
  { id: 'nyt', name: 'The New York Times' },
  { id: 'bbc', name: 'BBC News' },
  { id: 'reuters', name: 'Reuters' },
  { id: 'techcrunch', name: 'TechCrunch' },
  { id: 'espn', name: 'ESPN' },
  { id: 'bloomberg', name: 'Bloomberg' },
  { id: 'thehindu', name: 'The Hindu' },
  { id: 'der-spiegel', name: 'Der Spiegel' },
  { id: 'aljazeera', name: 'Al Jazeera English' },
  { id: 'foxnews', name: 'Fox News' },
  { id: 'guardian', name: 'The Guardian' },
];

const getRandomSource = () => NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)];

// ===============================================
// DEDICATED ARTICLE CREATION FUNCTIONS (FOR SEARCH)
// ===============================================

const createDedicatedArticle = (person, category, countryCode, title, sourceName, author, description, content) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 3));
    const formattedDate = date.toISOString();
    
    // Unique image URL based on the person
    const urlToImage = `https://picsum.photos/600/400?q=${person}-${countryCode}-${category}`;
    
    // Find the source object for the dedicated article
    const source = NEWS_SOURCES.find(s => s.name === sourceName) || getRandomSource();

    return {
        // TEMPORARY PROPERTIES for filtering/injection:
        category: category, 
        countryCode: countryCode,
        
        // STANDARD ARTICLE PROPERTIES
        source: source, 
        author: author,
        title: title,
        description: description,
        url: `https://dummynewspulse.com/article/dedicated-${person}-${countryCode}-${category}`,
        urlToImage: urlToImage,
        publishedAt: formattedDate,
        content: content
    };
};

const getDedicatedArticles = () => {
    let articles = [];
    
    // --- DONALD TRUMP (Politics & General, US focus) ---
    articles.push(createDedicatedArticle('Trump', 'politics', 'us', 
        'Breaking: Donald Trump Holds Massive Rally in Florida Ahead of Primary', 'Fox News', 'John Doe', 
        `Former President Donald Trump addressed a crowd in Tampa, Florida, focusing on border security and economic policy. His speech highlighted key themes for his presidential bid. The Trump campaign is gaining momentum.`,
        `The speech by Donald Trump in Tampa drew an estimated 20,000 supporters. This political event sets the stage for a contentious upcoming primary election season.`
    ));
    articles.push(createDedicatedArticle('Trump', 'general', 'us', 
        'National Poll Shows Tight Race Between Donald Trump and Key Opponent', 'CNN', 'Jane Smith',
        `A new national survey indicates the race is a statistical tie, showing strong support for Donald Trump across key demographics and swing states. This is a critical development.`,
        `The general consensus among pundits is that the latest poll reflects the highly polarized political climate. Donald Trump's poll numbers remain high.`
    ));
    
    // --- NARENDRA MODI (Politics & Business, India focus) ---
    articles.push(createDedicatedArticle('Modi', 'politics', 'in', 
        'PM Narendra Modi Pledges Billions for Infrastructure Projects in Speech', 'The Hindu', 'Rohan Verma',
        `Prime Minister Narendra Modi announced a massive funding boost for national infrastructure, emphasizing job creation and rural development. The commitment is a key pillar of his government's agenda.`,
        `This statement by Narendra Modi during the national address has been hailed as a major step towards economic revitalization. The ruling party strongly supports the infrastructure initiative.`
    ));
    articles.push(createDedicatedArticle('Modi', 'business', 'in', 
        'Modi Government Eases Regulations for Foreign Investment: Business News', 'Bloomberg', 'Priya Sharma',
        `In a significant move, the government led by Prime Minister Narendra Modi has streamlined processes to attract more foreign direct investment into critical sectors. This is a big boost.`,
        `The new policy is expected to boost India's global competitiveness. Narendra Modi aims to make India a $5 trillion economy within the decade.`
    ));

    // --- ELON MUSK (Technology & Business, Global focus) ---
    articles.push(createDedicatedArticle('Musk', 'technology', 'us', 
        `Elon Musk's Starship Faces New Regulatory Hurdle for Launch`, 'Reuters', 'Alex Chen',
        `CEO Elon Musk commented on the delays, stating that the Starship program remains on track despite facing unforeseen environmental reviews and permit issues.`,
        `The development of Starship is critical for future missions to Mars. Elon Musk is personally involved in resolving the regulatory challenges with the FAA.`
    ));
    articles.push(createDedicatedArticle('Musk', 'business', 'ca', 
        'Twitter/X Revenue Up After Policy Changes by Owner Elon Musk', 'TechCrunch', 'Sophie D.',
        `Reports indicate positive financial trends for the social media platform following dramatic policy shifts implemented by its owner, Elon Musk. The changes have been controversial.`,
        `The core challenge for the platform is balancing content moderation with free speech, a task Elon Musk has publicly stated is his priority.`
    ));
    
    return articles;
};

// ===============================================
// DUMMY DATA GENERATION CORE LOGIC
// ===============================================

const articleTemplate = (cat, country, index, titleSuffix) => {
  const date = new Date();
  date.setDate(date.getDate() - (index % 7)); 
  const formattedDate = date.toISOString();
  
  const imageUrlBase = 'https://picsum.photos/600/400';
  const uniqueSeed = index * 1000 + cat.length + country.length;
  const urlToImage = `${imageUrlBase}?r=${uniqueSeed}`; 
  
  const newsTitles = {
    general: ["Global Top Story: ", "Latest Update: ", "World Headline: "],
    politics: ["Elections 2024: ", "Policy Debate: ", "Government Action: "],
    business: ["Market Report: ", "Stock Exchange Update: ", "Corporate Merger: "],
    technology: ["AI Breakthrough: ", "New Gadget Review: ", "Software Launch: "],
    sports: ["Championship Final: ", "Athlete Profile: ", "Game Recap: "],
    entertainment: ["Movie Release: ", "Celebrity Scandal: ", "Music Chart Hit: "],
    health: ["Medical Research: ", "Fitness Trends: ", "Pandemic Update: "],
    science: ["Space Discovery: ", "Physics Theory: ", "Genetic Engineering: "],
  };

  // --- Random Source Assignment for Analytics ---
  const randomSource = getRandomSource();

  const articleTitlePrefix = newsTitles[cat][index % 3] || newsTitles[cat][0];
  let title = `${articleTitlePrefix}${cat.charAt(0).toUpperCase() + cat.slice(1)} in ${country.toUpperCase()} ${titleSuffix} (Article ${index + 1})`;
  let description = `This is a long, unique description for the ${cat} news in ${country}. The article covers the massive impact of the story on the local culture and global markets. This is long enough for the Reels component to read aloud. (Article ${index + 1} of ${cat} in ${country})`;
  let content = `The full content for the article, which is used by Reels to read aloud. ${cat} is buzzing in ${country}. This content section confirms the vital information from the title. Source: ${randomSource.name}. This is article number ${index + 1} for full Text-to-Speech demonstration.`;
  
  // --- Local Language Injection for politics, business, and general (for diversity) ---
  if (index < 3 && (cat === 'politics' || cat === 'general' || cat === 'business') && country !== "United States" && country !== "Canada") { 
    if (country === "India") {
      title = `भारत की खबरें: ${articleTitlePrefix}${cat.toUpperCase()} Update (Article ${index + 1})`;
      description = `यह भारत की ख़बरों के बारे में एक महत्वपूर्ण समाचार है। देश और दुनिया के लिए इसका बड़ा महत्व है। यह विवरण रीलों के लिए काफी लंबा है।`;
      content = `यह भारत की ख़बरों के बारे में पूरी खबर है।`;
    } else if (country === "Germany") {
      title = `DEUTSCHE NACHRICHTEN: ${articleTitlePrefix}${cat.toUpperCase()} News (Artikel ${index + 1})`;
      description = `Dies ist eine wichtige Nachricht über die deutschen Neuigkeiten. Die Auswirkungen auf die lokale Wirtschaft sind enorm. Diese Beschreibung ist lang genug für Reels.`;
      content = `Der vollständige Inhalt des Artikels, der für Text-to-Speech verwendet wird.`;
    } else if (country === "Japan") {
      title = `日本のニュース: ${articleTitlePrefix}${cat.toUpperCase()}の最新情報 (記事 ${index + 1})`;
      description = `これは日本のニュースに関する重要な記事です。この記事は、地域文化への大きな影響をカバーしています。この説明はリールに十分な長さです。`;
      content = `リールで使用される記事の完全なコンテンツ。`;
    }
  }

  return {
    source: randomSource, // RANDOM SOURCE
    author: `D. Author ${index + 1}`,
    title: title,
    description: description,
    url: `https://dummynewspulse.com/article/${country}-${cat}-${index}`,
    urlToImage: urlToImage,
    publishedAt: formattedDate,
    content: content
  };
};

const DUMMY_NEWS_DATA = {};
const dedicatedArticles = getDedicatedArticles();

SUPPORTED_COUNTRIES.forEach(country => {
  DUMMY_NEWS_DATA[country.code] = {};
  
  CATEGORIES.forEach(category => {
    let articleCount;
    let titleSuffix = 'Summary'; // Default suffix
    let source;

    // Define counts and specific details based on category 
    // Home.jsx PAGE_SIZE = 6.
    switch (category) {
      case 'general':
        articleCount = 36; // 6 pages
        titleSuffix = 'Global Summary';
        break;
      case 'politics':
        articleCount = 30; // 5 pages
        titleSuffix = 'Political Analysis';
        break;
      case 'technology':
        articleCount = 18; // 3 pages
        titleSuffix = 'Tech Report';
        break;
      case 'business':
        articleCount = 12; // 2 pages
        titleSuffix = 'Market Focus';
        break;
      case 'sports':
        articleCount = 7; // 2 pages
        titleSuffix = 'Match Day';
        break;
      case 'entertainment':
        articleCount = 5; // 1 page
        titleSuffix = 'Gossip Scoop';
        break;
      case 'health':
        articleCount = 15; // 3 pages
        titleSuffix = 'Wellness Alert';
        break;
      case 'science':
        articleCount = 10; // 2 pages
        titleSuffix = 'Scientific Discovery';
        break;
      default:
        articleCount = 6;
        titleSuffix = 'Misc News';
    }
    
    // Generate filler articles
    const fillerArticles = Array.from({ length: articleCount }, (_, i) => 
      articleTemplate(category, country.name, i, titleSuffix)
    );
    
    // Filter and prepend dedicated articles for this country/category
    const categoryDedicatedArticles = dedicatedArticles
        .filter(a => a.category === category && a.countryCode === country.code)
        // Destructure to remove temporary filtering properties (category, countryCode)
        .map(({ category: _, countryCode: __, ...rest }) => rest); 
    
    // Prepend dedicated articles to ensure they appear first and are included in search pool
    DUMMY_NEWS_DATA[country.code][category] = [...categoryDedicatedArticles, ...fillerArticles];
  });
});

// ===============================================
// DUMMY FETCH FUNCTION (REPLACING API CALL)
// ===============================================

export const fetchTopHeadlines = async (
  category = "general",
  query = "",
  country = "us"
) => {
  // If a search query is active, simulate search results from all available data
  if (query) {
    // Collect all articles from all categories/countries for a diverse search pool
    const allArticles = Object.values(DUMMY_NEWS_DATA)
      .flatMap(countryData => Object.values(countryData).flat());
    
    const lowerQuery = query.toLowerCase();

    // Filter by query (title, description, or content) - Max 30 articles for 5 pages of search results
    const searchResults = allArticles.filter(article => 
      (article.title && article.title.toLowerCase().includes(lowerQuery)) || 
      (article.description && article.description.toLowerCase().includes(lowerQuery)) || 
      (article.content && article.content.toLowerCase().includes(lowerQuery))
    ).slice(0, 30); 
    
    // Modify titles and source for search results context
    return searchResults.map((article, index) => ({
      ...article,
      title: `Search Result ${index + 1} for "${query}": ${article.title.replace(/\(Article\s\d+\)/, '').trim()}`,
      source: { id: 'dummy-search', name: 'Search Aggregator' },
    }));
  }

  // Otherwise, return the specific country/category data
  const countryData = DUMMY_NEWS_DATA[country] || DUMMY_NEWS_DATA["us"];
  return countryData[category] || countryData["general"] || []; 
};