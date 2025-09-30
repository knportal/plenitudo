// Start small; you can expand later.
export const FEEDS: { label: string; url: string; genre?: string }[] = [
  // Reliable tech news sources
  {
    label: "MIT Tech Review AI",
    url: "https://www.technologyreview.com/feed/",
  },
  {
    label: "NVIDIA Blog",
    url: "https://blogs.nvidia.com/feed/",
  },
  {
    label: "HuggingFace",
    url: "https://huggingface.co/blog/feed.xml",
  },
  {
    label: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index/",
  },
  {
    label: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
  },
  {
    label: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
  {
    label: "Wired",
    url: "https://www.wired.com/feed/rss",
  },
  {
    label: "VentureBeat AI",
    url: "https://venturebeat.com/ai/feed/",
  },
  {
    label: "ZDNet AI",
    url: "https://www.zdnet.com/topic/artificial-intelligence/rss.xml",
  },
  {
    label: "AI News",
    url: "https://www.artificialintelligence-news.com/feed/",
  },
  {
    label: "Towards Data Science",
    url: "https://towardsdatascience.com/feed",
  },
  {
    label: "OpenAI Blog",
    url: "https://openai.com/blog/rss",
  },
  {
    label: "Anthropic Blog",
    url: "https://www.anthropic.com/news/feed.xml",
  },
  {
    label: "Google AI Blog",
    url: "https://ai.googleblog.com/atom.xml",
  },
  {
    label: "Microsoft AI Blog",
    url: "https://blogs.microsoft.com/ai/feed/",
  },
  {
    label: "Meta AI Blog",
    url: "https://ai.meta.com/blog/rss/",
  },
  // Additional major tech news sources (high overlap potential)
  {
    label: "Engadget",
    url: "https://www.engadget.com/rss.xml",
  },
  {
    label: "Gizmodo",
    url: "https://gizmodo.com/rss",
  },
  {
    label: "Mashable",
    url: "https://mashable.com/feeds/rss/all",
  },
  {
    label: "CNET",
    url: "https://www.cnet.com/rss/news/",
  },
  {
    label: "Digital Trends",
    url: "https://www.digitaltrends.com/feed/",
  },
  {
    label: "The Next Web",
    url: "https://thenextweb.com/feed/",
  },
  // AI-specific publications
  {
    label: "AI Business",
    url: "https://aibusiness.com/feed",
  },
  {
    label: "Synced",
    url: "https://syncedreview.com/feed/",
  },
  // Academic and research sources
  {
    label: "Nature AI",
    url: "https://www.nature.com/subjects/artificial-intelligence.rss",
  },
  {
    label: "IEEE Spectrum",
    url: "https://spectrum.ieee.org/rss/fulltext",
  },
  // Policy and regulation
  {
    label: "EU Commission AI",
    url: "https://ec.europa.eu/newsroom/sppa/rss.cfm?subweb=1018&lang=en",
  },
  {
    label: "Brookings AI",
    url: "https://www.brookings.edu/topic/artificial-intelligence/feed/",
  },
];
export const PUBLISHER_REP = new Map<string, number>([
  // Tier 3 - High reputation
  ["Reuters", 3],
  ["Financial Times", 3],
  ["Nature", 3],
  ["MIT Technology Review", 3],
  ["Ars Technica", 3],
  ["The Verge", 3],
  ["TechCrunch", 3],
  ["Wired", 3],
  ["ZDNet", 3],
  ["Engadget", 3],
  ["Gizmodo", 3],
  ["CNET", 3],
  ["Digital Trends", 3],
  ["The Next Web", 3],
  ["IEEE Spectrum", 3],

  // Tier 2 - Good reputation
  ["OpenAI", 2],
  ["Anthropic", 2],
  ["Google", 2],
  ["NVIDIA", 2],
  ["Microsoft", 2],
  ["Meta", 2],
  ["HuggingFace", 2],
  ["VentureBeat", 2],
  ["AI News", 2],
  ["Towards Data Science", 2],
  ["EU Commission", 2],
  ["Mashable", 2],
  ["AI Business", 2],
  ["Synced", 2],
  ["Brookings", 2],
]);
export const GENRE_KEYWORDS: Record<string, string[]> = {
  policy: [
    "act",
    "regulation",
    "law",
    "bill",
    "commission",
    "white house",
    "uk govt",
    "eu",
  ],
  research: [
    "paper",
    "preprint",
    "arxiv",
    "study",
    "benchmark",
    "dataset",
    "research",
  ],
  chips: [
    "gpu",
    "nvidia",
    "intel",
    "amd",
    "h100",
    "b200",
    "foundry",
    "tapeout",
    "semiconductor",
  ],
  enterprise: [
    "databricks",
    "snowflake",
    "salesforce",
    "workday",
    "oracle",
    "sap",
    "enterprise",
  ],
  consumer: ["iphone", "android", "app", "feature", "assistant", "chatbot"],
  robotics: ["robot", "humanoid", "manipulation", "boston dynamics", "gripper"],
  health: ["health", "biomed", "medicine", "nih", "fda", "clinical"],
  climate: ["energy", "climate", "sustainability", "emissions", "grid"],
};
