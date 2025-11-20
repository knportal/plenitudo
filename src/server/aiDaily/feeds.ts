// Start small; you can expand later.
export const FEEDS: { label: string; url: string; genre?: string }[] = [
  // Reliable tech news sources
  {
    label: "MIT Tech Review AI",
    url: "https://www.technologyreview.com/feed/",
  },
  {
    label: "Futurism",
    url: "https://futurism.com/feed",
  },
  {
    label: "Interesting Engineering",
    url: "https://interestingengineering.com/feed",
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
  {
    label: "DeepMind",
    url: "https://deepmind.google/discover/rss/",
  },
  {
    label: "x.ai",
    url: "https://x.ai/blog/rss",
  },
  {
    label: "Stability AI",
    url: "https://stability.ai/blog?format=rss",
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
  {
    label: "Ben's Bites",
    url: "https://bensbites.beehiiv.com/feed",
  },
  {
    label: "The Decoder",
    url: "https://the-decoder.com/feed/",
  },
  {
    label: "AI Trends",
    url: "https://www.aitrends.com/feed/",
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
  {
    label: "Stanford HAI",
    url: "https://hai.stanford.edu/news/feed",
  },
  {
    label: "MIT CSAIL",
    url: "https://www.csail.mit.edu/rss.xml",
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
  {
    label: "AI Now Institute",
    url: "https://ainowinstitute.org/feed.xml",
  },
  {
    label: "CAIDP",
    url: "https://www.caidp.org/feed/",
  },
  // Robotics
  {
    label: "Robotics Business Review",
    url: "https://www.roboticsbusinessreview.com/feed/",
  },
  {
    label: "Robotics & Automation News",
    url: "https://roboticsandautomationnews.com/feed/",
  },
  {
    label: "IEEE Robotics",
    url: "https://ieeexplore.ieee.org/rss/TOC4068.XML",
  },
  {
    label: "The Robot Report",
    url: "https://www.therobotreport.com/feed/",
  },
  // Health & Medical AI
  {
    label: "Healthcare IT News AI",
    url: "https://www.healthcareitnews.com/ai-powered-health/feed",
  },
  {
    label: "Medical Futurist",
    url: "https://medicalfuturist.com/feed/",
  },
  {
    label: "HIT Consultant",
    url: "https://hitconsultant.net/feed/",
  },
  {
    label: "Nature Medicine",
    url: "https://www.nature.com/nm.rss",
  },
  // Climate & Sustainability
  {
    label: "CleanTechnica",
    url: "https://cleantechnica.com/feed/",
  },
  {
    label: "GreenBiz",
    url: "https://www.greenbiz.com/feed",
  },
  {
    label: "Yale Climate Connections",
    url: "https://yaleclimateconnections.org/feed/",
  },
  {
    label: "Inside Climate News",
    url: "https://insideclimatenews.org/feed/",
  },
  // Research & Academia (more sources)
  {
    label: "arXiv AI",
    url: "https://rss.arxiv.org/rss/cs.AI",
  },
  {
    label: "Science Daily AI",
    url: "https://www.sciencedaily.com/rss/computers_math/artificial_intelligence.xml",
  },
  // Hardware & Chips (more sources)
  {
    label: "Tom's Hardware",
    url: "https://www.tomshardware.com/feeds/all",
  },
  {
    label: "AnandTech",
    url: "https://www.anandtech.com/rss/",
  },
  {
    label: "SemiAnalysis",
    url: "https://semianalysis.com/feed/",
  },
  {
    label: "NotebookCheck",
    url: "https://www.notebookcheck.net/rss.html",
  },
  // Consumer & Apps
  {
    label: "9to5Mac",
    url: "https://9to5mac.com/feed/",
  },
  {
    label: "Android Authority",
    url: "https://www.androidauthority.com/feed/",
  },
];
export const PUBLISHER_REP = new Map<string, number>([
  // Tier 3 - High reputation (general tech news)
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
  ["Science Daily", 3],
  ["Tom's Hardware", 3],
  ["AnandTech", 3],
  ["DeepMind", 3], // Google's AI lab
  ["Stanford HAI", 3], // Stanford University
  ["MIT CSAIL", 3], // MIT
  ["AI Now Institute", 3], // NYU research institute
  ["IEEE Robotics", 3], // IEEE
  ["Nature Medicine", 3], // Nature journal
  ["Yale Climate Connections", 3], // Yale University

  // Tier 2 - Good reputation (company blogs & specialized)
  ["OpenAI", 2],
  ["Anthropic", 2],
  ["Google", 2],
  ["NVIDIA", 1], // Lowered to reduce dominance
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
  ["Futurism", 2],
  ["Interesting Engineering", 2],
  ["x.ai", 2],
  ["Stability AI", 2],
  ["Ben's Bites", 2],
  ["The Decoder", 2],
  ["AI Trends", 2],
  ["CAIDP", 2],
  ["The Robot Report", 2],
  ["HIT Consultant", 2],
  ["Inside Climate News", 2],
  ["SemiAnalysis", 2],
  ["NotebookCheck", 2],

  // Tier 2 - Specialized publications
  ["Robotics Business Review", 2],
  ["Robotics & Automation News", 2],
  ["Healthcare IT News", 2],
  ["Medical Futurist", 2],
  ["CleanTechnica", 2],
  ["GreenBiz", 2],
  ["arXiv", 3], // High reputation for academic
  ["9to5Mac", 2],
  ["Android Authority", 2],
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
