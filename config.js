/* ========================================
   KDK Core v2 — Configuration & Knowledge
   ======================================== */

const KDKConfig = {
  name: "KDK Core",
  version: "2.0.0",
  creator: "KDK Development Team",

  /* ---- Free API Endpoints (no keys required) ---- */
  apis: {
    /* Web Search — DuckDuckGo Instant Answer API */
    webSearch: "https://api.duckduckgo.com/",

    /* Wikipedia */
    wikipedia: {
      search: "https://en.wikipedia.org/w/api.php",
      summary: "https://en.wikipedia.org/api/rest_v1/page/summary"
    },

    /* Dictionary */
    dictionary: "https://api.dictionaryapi.dev/api/v2/entries/en",

    /* Countries */
    countries: "https://restcountries.com/v3.1/name",

    /* Numbers */
    numbers: "http://numbersapi.com",

    /* Hacker News — tech community */
    hackerNews: {
      search: "https://hn.algolia.com/api/v1/search",
      item: "https://hacker-news.firebaseio.com/v0/item"
    },

    /* Open Library — books & academic */
    openLibrary: "https://openlibrary.org/search.json",

    /* Wikidata — structured knowledge */
    wikidata: "https://www.wikidata.org/w/api.php"
  },

  /* ---- User-configurable API keys (optional) ---- */
  customKeys: {
    openai: "",
    googleSearch: "",
    newsApi: "",
    weatherApi: "",
    gnews: ""
  },

  /* ---- AI Personality ---- */
  personality: {
    greeting: "Hello! I'm **KDK Core** — connected to live web search, encyclopedias, dictionaries, news, tech communities, academic sources, and a memory that learns you. Ask me anything!",
    fallbackMessage: "I searched across all my sources but couldn't find a precise answer. Try:\n\n- Rephrasing your question\n- Asking about a specific person, place, or concept\n- Using `search [topic]` for a web search\n- Using `define [word]` for a definition\n\nI'm always learning — try me again!",
    style: "informative"
  },

  /* ---- Suggested Questions ---- */
  suggestions: [
    { icon: "fa-globe", text: "Search latest news on AI" },
    { icon: "fa-flask", text: "What is quantum entanglement?" },
    { icon: "fa-earth-americas", text: "Tell me about Japan" },
    { icon: "fa-square-root-variable", text: "Calculate 2^16 + sqrt(144)" },
    { icon: "fa-book", text: "Define serendipity" },
    { icon: "fa-code", text: "Search Stack Overflow React hooks" },
    { icon: "fa-graduation-cap", text: "Find books on machine learning" },
    { icon: "fa-brain", text: "What do you remember about me?" }
  ],

  /* ---- Memory Default Profile ---- */
  defaultMemory: {
    preferences: [
      "Arsenal FC",
      "TikTok visuals",
      "English-Luganda fusion"
    ],
    projects: [
      "KDK Core",
      "KDKM.NET"
    ],
    style: [
      "Short impactful phrasing",
      "Cinematic design"
    ],
    language: "English + Luganda",
    customFacts: []
  },

  /* ---- Source Categories ---- */
  sourceCategories: {
    web: { label: "Web Search", icon: "fa-globe", cssClass: "web" },
    wikipedia: { label: "Wikipedia", icon: "fa-book-open", cssClass: "wikipedia" },
    news: { label: "News & Docs", icon: "fa-newspaper", cssClass: "news" },
    academic: { label: "Academic", icon: "fa-graduation-cap", cssClass: "academic" },
    tech: { label: "Tech Community", icon: "fa-code", cssClass: "tech" },
    dictionary: { label: "Dictionary", icon: "fa-spell-check", cssClass: "dictionary" },
    countries: { label: "Countries", icon: "fa-flag", cssClass: "countries" },
    math: { label: "Math Engine", icon: "fa-calculator", cssClass: "math" },
    knowledge: { label: "Knowledge Base", icon: "fa-database", cssClass: "knowledge" },
    memory: { label: "Memory", icon: "fa-brain", cssClass: "memory" }
  },

  /* ---- Pattern Rules for Intent Detection ---- */
  patterns: {
    greeting: /^(hi|hello|hey|howdy|greetings|good (morning|afternoon|evening)|sup|what's up|ola|bula)\b/i,
    definition: /^(what is|what are|what's|define|meaning of|definition of|explain)\s+/i,
    webSearch: /^(search|look up|find|google|latest|current|news|update|recent)\b/i,
    math: /^(calculate|compute|solve|evaluate)\s+/i,
    country: /^(tell me about|info about|information on|facts about)\s+([a-zA-Z\s]+)$/i,
    whoWhat: /^(who|what|where|when|why|how)\b/i,
    thanks: /^(thanks|thank you|thx|appreciate|cheers|webale|mwebale)\b/i,
    goodbye: /^(bye|goodbye|see you|farewell|good night|later)\b/i,
    memoryQuery: /^(what do you know about me|what do you remember|my preferences|my projects|my style|who am i)\b/i,
    rememberCommand: /^(remember this|note that|keep in mind|don't forget|remember that)\s+/i
  },

  /* ===========================================
     EXPANDED KNOWLEDGE BASE
     Covers: Science, History, Math, Coding, 
     Geography, Technology, Philosophy
     =========================================== */
  knowledgeBase: {
    /* --- Self --- */
    "who are you": "I'm **KDK Core**, an open-source AI assistant connected to live web search, Wikipedia, dictionaries, news outlets, academic sources, tech communities, and a personalized memory system. I was built to give you accurate, sourced answers to any question — and I remember who you are.",
    "what can you do": "I'm connected to the world's knowledge through multiple live sources:\n\n- **Web Search** — Real-time answers from authoritative websites\n- **News & Docs** — BBC, Reuters, official documentation\n- **Wikipedia** — 60M+ articles across all subjects\n- **Dictionary** — Word definitions, phonetics, synonyms\n- **Academic** — Books and papers via Open Library\n- **Tech Community** — Stack Overflow, Hacker News, developer blogs\n- **Countries** — Detailed geographic and demographic data\n- **Math Engine** — Calculate any expression\n- **Memory** — I learn your preferences, projects, and style\n\nJust ask naturally — I'll pick the right source!",
    "who made you": "I was created by the **KDK Development Team** as an open-source AI project. My code lives on GitHub and I'm designed to be extensible — anyone can add new data sources or capabilities.",
    "how do you work": "I use a multi-layered intelligence pipeline:\n\n1. **Intent Detection** — I analyze what you're really asking\n2. **Memory Recall** — I check if this relates to your preferences or past conversations\n3. **Web Search** — I query DuckDuckGo for live, current information\n4. **Wikipedia** — I search 60M+ encyclopedia articles\n5. **Tech Sources** — I check Hacker News and developer communities\n6. **Academic Sources** — I search Open Library for books and papers\n7. **Dictionary** — I look up precise definitions\n8. **Country Database** — I retrieve geographic data\n9. **Math Engine** — I evaluate mathematical expressions\n10. **Knowledge Base** — I check my curated database of verified facts\n\nEvery response shows its source so you know where the information came from.",
    "what do you know about me": "Let me check my memory...",

    /* --- Science --- */
    "speed of light": "The speed of light in a vacuum is exactly **299,792,458 m/s** (about 186,282 mi/s). Denoted **c**, it's the universal speed limit per Einstein's relativity. Light travels from the Sun to Earth in about 8 minutes 20 seconds.",
    "gravity": "Gravity is one of the four fundamental forces. On Earth's surface, gravitational acceleration ≈ **9.80665 m/s²**. Newton described it as F = G(m₁m₂)/r², while Einstein showed it's the curvature of spacetime caused by mass.",
    "photosynthesis": "Photosynthesis converts light energy into chemical energy: **6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂**. It occurs in chloroplasts and is Earth's primary oxygen source.",
    "dna": "DNA (Deoxyribonucleic Acid) carries genetic instructions in a **double helix** of nucleotide bases: A-T, G-C. Human DNA has ~**3.2 billion** base pairs across 23 chromosome pairs.",
    "black hole": "A black hole is a spacetime region where gravity prevents anything from escaping — even light. Formed by massive star collapse. The boundary is the **event horizon**; the center is a **singularity** of theoretically infinite density.",
    "quantum entanglement": "Quantum entanglement links particles so measuring one instantly affects the other, regardless of distance. Einstein called it \"spooky action at a distance.\" It's proven experimentally and is key to quantum computing and quantum cryptography.",
    "mars": "**Mars** — the Red Planet:\n- Distance from Earth: 54.6M km (closest)\n- Diameter: 6,779 km\n- Day: 24h 37m\n- Year: 687 Earth days\n- Atmosphere: 95% CO₂, very thin\n- Moons: Phobos, Deimos\n- Avg temp: -62°C\n- Current rovers: Curiosity, Perseverance",
    "moon": "**The Moon** — Earth's only natural satellite:\n- Distance: 384,400 km\n- Diameter: 3,474 km\n- Orbital period: 27.3 days\n- Surface gravity: 1.62 m/s² (1/6 Earth)\n- First landing: July 20, 1969 (Apollo 11)\n- Tidally locked — same side always faces Earth",
    "atoms": "Atoms are the basic units of matter, consisting of a **nucleus** (protons + neutrons) orbited by **electrons**. Typical size: ~1 ångström (10⁻¹⁰ m). Over 99.99% of an atom is empty space.",
    "evolution": "Evolution by natural selection, proposed by **Charles Darwin**, explains how species change over time: organisms with advantageous traits survive and reproduce more. Evidence includes fossils, DNA comparisons, and observed speciation.",

    /* --- Technology --- */
    "artificial intelligence": "AI simulates human intelligence via computers. Key branches:\n\n- **Machine Learning** — Learning from data\n- **Deep Learning** — Multi-layer neural networks\n- **NLP** — Understanding language\n- **Computer Vision** — Interpreting images\n- **Reinforcement Learning** — Learning by trial and reward\n- **Generative AI** — Creating new content (text, images, code)\n\nCurrent frontiers: AGI, AI safety, multimodal models.",
    "machine learning": "ML is a subset of AI where systems learn from data without explicit programming:\n\n- **Supervised** — Labeled training data\n- **Unsupervised** — Finding hidden patterns\n- **Reinforcement** — Reward-based learning\n- **Transfer Learning** — Reusing trained models\n\nPopular frameworks: TensorFlow, PyTorch, scikit-learn.",
    "blockchain": "Blockchain is a distributed, immutable ledger. Each block cryptographically links to the previous one, creating a tamper-resistant chain. Used for cryptocurrency, smart contracts, supply chain tracking, and decentralized applications.",
    "python": "Python — created by **Guido van Rossum** (1991). High-level, interpreted, dynamically typed. Dominates in data science, AI/ML, web (Django/Flask), automation. Known for readability and extensive package ecosystem (pip, PyPI).",
    "javascript": "JavaScript — created by **Brendan Eich** (1995). The language of the web, running in all browsers. With Node.js, also runs server-side. Supports OOP, functional, and event-driven paradigms. Ecosystem: npm, React, Vue, Next.js.",
    "react": "React — Meta's UI library (2013). Component-based, declarative, virtual DOM. Key concepts: JSX, hooks (useState, useEffect, useContext), state management, server components. Massive ecosystem with Next.js, Remix, React Native.",
    "quantum computing": "Quantum computing uses **qubits** that can be in superposition (both 0 and 1 simultaneously) and become **entangled**. This allows parallel processing of certain problems. Key algorithms: Shor's (factoring), Grover's (search). Current leaders: IBM, Google, IonQ.",

    /* --- Math --- */
    "pi": "Pi (π) = **3.14159265358979...** — the ratio of a circle's circumference to its diameter. Irrational and transcendental. Appears across geometry, trigonometry, physics, statistics, and number theory. Computed to over 100 trillion digits.",
    "golden ratio": "The Golden Ratio (φ) ≈ **1.6180339887...**. Found when a/b = (a+b)/a. Appears in the Fibonacci sequence, nautilus shells, Renaissance art, the Parthenon, and modern design.",
    "fibonacci": "Fibonacci sequence: **0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...** Each number = sum of previous two. Consecutive ratios converge to φ (Golden Ratio). Found in nature: flower petals, pinecones, galaxies.",
    "euler": "Euler's number (e) ≈ **2.71828182845904...**. The base of natural logarithms. Appears in compound interest, calculus, probability, and complex analysis. e^(iπ) + 1 = 0 is Euler's Identity — called the most beautiful equation in mathematics.",

    /* --- History --- */
    "world war 1": "WWI (1914–1918): Triggered by Archduke Franz Ferdinand's assassination. **Allied Powers** (Britain, France, Russia, later US) vs **Central Powers** (Germany, Austria-Hungary, Ottoman Empire). ~20M dead. Ended with Treaty of Versailles, which set the stage for WWII.",
    "world war 2": "WWII (1939–1945): Deadliest conflict in history. **Allied** (US, UK, USSR, China) vs **Axis** (Germany, Japan, Italy). 70–85M dead. Key events: Holocaust, D-Day, atomic bombings of Hiroshima & Nagasaki. Ended with Axis surrender and the founding of the UN.",
    "moon landing": "First Moon landing: **July 20, 1969** — NASA's Apollo 11. **Neil Armstrong** first to walk on the Moon, then **Buzz Aldrin**. **Michael Collins** orbited above. \"That's one small step for man, one giant leap for mankind.\"",
    "ancient egypt": "Ancient Egypt (~3100 BCE – 30 BCE): One of history's greatest civilizations. Built pyramids, developed hieroglyphics, advanced medicine and astronomy. Key figures: Cleopatra, Tutankhamun, Ramses II. The Nile was the lifeblood of their civilization.",
    "roman empire": "The Roman Empire (27 BCE – 476 CE Western): At its peak, controlled the Mediterranean, Europe, North Africa, and the Middle East. Contributions: law, engineering (aqueducts, roads, Colosseum), Latin language, republican government concepts.",

    /* --- Geography --- */
    "largest country": "**Russia** — ~17.1 million km², spanning Eastern Europe to Northern Asia. 11 time zones. Largest by far.",
    "largest ocean": "**Pacific Ocean** — ~165.25 million km². Larger than all land combined. Deepest point: Mariana Trench (~11,034m).",
    "tallest mountain": "**Mount Everest** — 8,848.86m (29,031.7 ft) above sea level. Himalayas, Nepal-Tibet border. First summited 1953 by Hillary & Norgay.",

    /* --- Coding --- */
    "html": "HTML (HyperText Markup Language) is the standard markup for web pages. Key elements: `<div>`, `<p>`, `<h1>-<h6>`, `<a>`, `<img>`, `<form>`, `<table>`. HTML5 added `<video>`, `<audio>`, `<canvas>`, semantic elements like `<article>`, `<section>`, `<nav>`.",
    "css": "CSS (Cascading Style Sheets) controls web page presentation. Key concepts: selectors, box model, flexbox, grid, animations, media queries, variables (`--custom`). Modern CSS supports container queries, `has()` selector, nesting, and `color-mix()`.",
    "git": "Git — distributed version control by **Linus Torvalds** (2005). Key commands: `git init`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git merge`, `git rebase`. GitHub/GitLab provide cloud hosting and collaboration.",
    "api": "API (Application Programming Interface) — a set of rules allowing software to communicate. Types:\n- **REST** — HTTP-based, resource-oriented\n- **GraphQL** — Query language, client-specified shape\n- **WebSocket** — Real-time bidirectional\n- **gRPC** — High-performance, Protocol Buffers",

    /* --- Philosophy --- */
    "meaning of life": "Humanity's deepest question! Perspectives:\n\n- **Existentialism** — We create our own meaning (Sartre, Camus)\n- **Stoicism** — Virtue and wisdom are the path (Marcus Aurelius)\n- **Biology** — Survival and reproduction\n- **Religion** — Spiritual fulfillment and connection to the divine\n- **Practical** — Purpose through relationships, contribution, growth\n\nWhat's meaningful to you is what matters most."
  }
};
