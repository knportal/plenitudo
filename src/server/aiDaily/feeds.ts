// Start small; you can expand later.
export const FEEDS: { label: string; url: string; genre?: string }[] = [
  // Wire services — open access, high signal
  {
    label: "Reuters Technology",
    url: "https://feeds.reuters.com/reuters/technologyNews",
  },
  {
    label: "AP News Technology",
    url: "https://feeds.apnews.com/rss/apf-technology",
  },
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
    label: "VentureBeat",
    url: "https://venturebeat.com/feed/",
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
    url: "https://openai.com/news/rss.xml",
  },
  {
    label: "Interconnects AI",
    url: "https://www.interconnects.ai/feed",
  },
  {
    label: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
  },
  {
    label: "Microsoft AI Blog",
    url: "https://blogs.microsoft.com/ai/feed/",
  },
  {
    label: "Meta AI Research",
    url: "https://research.facebook.com/feed/",
  },
  {
    label: "DeepMind",
    url: "https://deepmind.google/discover/rss/",
  },
  {
    label: "AI Edge",
    url: "https://newsletter.theaiedge.io/feed",
  },
  {
    label: "MarkTechPost",
    url: "https://www.marktechpost.com/feed/",
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
    label: "Ahead of AI",
    url: "https://magazine.sebastianraschka.com/feed",
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
    label: "Nature Machine Intelligence",
    url: "https://www.nature.com/natmachintell.rss",
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
    label: "OECD AI Policy",
    url: "https://oecd.ai/en/feed",
  },
  {
    label: "Brookings AI",
    url: "https://www.brookings.edu/topic/artificial-intelligence/feed/",
  },
  {
    label: "Future of Life Institute",
    url: "https://futureoflife.org/feed/",
  },
  {
    label: "Tech Policy Press",
    url: "https://techpolicy.press/feed/",
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
    label: "IEEE Spectrum Robotics",
    url: "https://spectrum.ieee.org/feeds/robotics.rss",
  },
  {
    label: "The Robot Report",
    url: "https://www.therobotreport.com/feed/",
  },
  // Health & Medical AI
  {
    label: "STAT News",
    url: "https://www.statnews.com/feed/",
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
    label: "Chips and Cheese",
    url: "https://chipsandcheese.com/feed/",
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
  // Substack newsletters
  {
    label: "Import AI",
    url: "https://jack-clark.net/feed/",
  },
  {
    label: "Not Boring",
    url: "https://www.notboring.co/feed",
  },
  {
    label: "Platformer",
    url: "https://www.platformer.news/feed",
  },
  {
    label: "AI Breakfast",
    url: "https://aibreakfast.substack.com/feed",
  },
  {
    label: "The Neuron",
    url: "https://www.theneuron.ai/feed",
  },
  {
    label: "MLOps Community",
    url: "https://mlops.community/feed/",
  },
  {
    label: "Last Week in AI",
    url: "https://lastweekin.ai/feed",
  },
  {
    label: "The Gradient",
    url: "https://thegradient.pub/feed",
  },
  {
    label: "AI Explained",
    url: "https://aiexplained.substack.com/feed",
  },
];
export const PUBLISHER_REP = new Map<string, number>([
  // Tier 3 - High reputation (general tech news)
  ["Reuters", 3],
  ["AP News", 3],
  ["Tech Policy Press", 3],
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
  ["DeepMind", 3], // Google's AI lab
  ["Stanford HAI", 3], // Stanford University
  ["MIT CSAIL", 3], // MIT
  ["Future of Life Institute", 3], // AI safety research
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
  ["Interconnects AI", 2],
  ["Meta AI Research", 2],
  ["AI Edge", 2],
  ["MarkTechPost", 2],
  ["OECD AI Policy", 3],
  ["STAT News", 3],
  ["Ahead of AI", 3],
  ["MLOps Community", 2],
  ["IEEE Spectrum Robotics", 3],
  ["Nature Machine Intelligence", 3],
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
  ["Ahead of AI", 3], // Sebastian Raschka - ML researcher newsletter
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
  ["STAT News", 3],
  ["Medical Futurist", 2],
  ["CleanTechnica", 2],
  ["GreenBiz", 2],
  ["arXiv", 3], // High reputation for academic
  ["9to5Mac", 2],
  ["Android Authority", 2],
  // Substack publications
  ["Import AI", 3], // Jack Clark - ex-OpenAI, serious AI research newsletter
  ["Chips and Cheese", 2], // Hardware analysis - open access
  ["Not Boring", 3], // Packy McCormick - popular tech newsletter
  ["Platformer", 3], // Casey Newton - tech journalism
  ["The Neuron", 2], // AI newsletter
  ["AI Breakfast", 2],
  ["MLOps Community", 2],
  ["Last Week In AI", 2],
  ["The Gradient", 2], // Academic AI publication
  ["AI Explained", 2],
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
