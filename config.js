/* ========================================
   KDK Core — Configuration & Knowledge Base
   ======================================== */

const KDKConfig = {
  /* --- Identity --- */
  name: "KDK Core",
  version: "1.0.0",
  creator: "KDK Development Team",

  /* --- API Endpoints (all free, no keys required) --- */
  apis: {
    wikipedia: {
      search: "https://en.wikipedia.org/w/api.php",
      summary: "https://en.wikipedia.org/api/rest_v1/page/summary"
    },
    dictionary: "https://api.dictionaryapi.dev/api/v2/entries/en",
    countries: "https://restcountries.com/v3.1/name",
    numbers: "http://numbersapi.com"
  },

  /* --- User-configurable API keys (optional enhancements) --- */
  customKeys: {
    openai: "",
    googleSearch: "",
    weatherApi: ""
  },

  /* --- AI Personality --- */
  personality: {
    greeting: "Hello! I'm **KDK Core**, your AI assistant connected to the world's knowledge. I can search Wikipedia, look up definitions, solve math, retrieve country data, and much more. What would you like to know?",
    style: "informative",
    fallbackMessage: "I searched my knowledge sources but couldn't find a specific answer for that. Try rephrasing your question, or ask about a specific topic like science, history, geography, math, or technology — I'll do my best to help!"
  },

  /* --- Suggested Questions --- */
  suggestions: [
    { icon: "fa-flask", text: "What is quantum entanglement?" },
    { icon: "fa-earth-americas", text: "Tell me about Japan" },
    { icon: "fa-square-root-variable", text: "Calculate 2^16 + sqrt(144)" },
    { icon: "fa-book", text: "Define serendipity" },
    { icon: "fa-rocket", text: "How far is Mars from Earth?" },
    { icon: "fa-microchip", text: "What is machine learning?" }
  ],

  /* --- Built-in Knowledge Base --- */
  knowledgeBase: {
    /* Self-identification */
    "who are you": "I'm **KDK Core**, an open-source AI assistant. I'm connected to multiple knowledge sources including Wikipedia, dictionaries, country databases, and mathematical computation engines. I was built to provide accurate, sourced answers to your questions.",
    "what can you do": "I can help with a wide range of tasks:\n\n- **General Knowledge** — Search Wikipedia for facts, history, science, and more\n- **Definitions** — Look up word meanings from English dictionaries\n- **Math** — Calculate expressions, solve equations (e.g., `2^10 + sqrt(256)`)\n- **Countries** — Get data about any country (capital, population, region, etc.)\n- **Number Facts** — Trivia about any number\n- **Conversations** — Chat and answer questions on many topics\n\nJust type your question and I'll find the answer!",
    "who made you": "I was created by the **KDK Development Team** as an open-source AI project. My code is available on GitHub for anyone to use, modify, and improve.",
    "how do you work": "I use a multi-layered approach:\n\n1. **Pattern Matching** — I analyze your question structure and intent\n2. **Local Knowledge** — I check a built-in database of verified facts\n3. **Wikipedia API** — I search Wikipedia's vast encyclopedia in real-time\n4. **Dictionary API** — I look up precise word definitions\n5. **Country Database** — I retrieve geographic and demographic data\n6. **Math Engine** — I evaluate mathematical expressions safely\n\nAll sources are cited in my responses so you know where the information comes from.",

    /* Science */
    "speed of light": "The speed of light in a vacuum is exactly **299,792,458 meters per second** (about 186,282 miles per second). This is denoted by the letter **c** and is the universal speed limit according to Einstein's theory of relativity.",
    "gravity": "Gravity is one of the four fundamental forces of nature. On Earth's surface, the acceleration due to gravity is approximately **9.80665 m/s²**. It's described by Newton's Law of Universal Gravitation and more precisely by Einstein's General Relativity.",
    "photosynthesis": "Photosynthesis is the process by which plants, algae, and certain bacteria convert light energy into chemical energy. The overall equation is:\n\n**6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂**\n\nThis process is the primary source of oxygen in Earth's atmosphere.",
    "dna": "DNA (Deoxyribonucleic Acid) is a molecule that carries the genetic instructions for life. It's structured as a **double helix** made of nucleotide bases: Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). Human DNA contains about **3.2 billion** base pairs.",
    "black hole": "A black hole is a region of spacetime where gravity is so intense that nothing, not even light, can escape. They form when massive stars collapse at the end of their life cycle. The boundary is called the **event horizon**.",
    "quantum entanglement": "Quantum entanglement is a phenomenon where two or more particles become linked so that the quantum state of each particle cannot be described independently. Measuring one particle instantly affects the other, regardless of distance — what Einstein called \"spooky action at a distance.\"",
    "mars": "Mars is the fourth planet from the Sun. Key facts:\n\n- **Distance from Earth**: 54.6 million km (closest approach)\n- **Diameter**: 6,779 km\n- **Day length**: 24 hours 37 minutes\n- **Year length**: 687 Earth days\n- **Atmosphere**: 95% CO₂, very thin\n- **Moons**: Phobos and Deimos\n- **Average temperature**: -62°C",
    "moon": "The Moon is Earth's only natural satellite. Key facts:\n\n- **Distance from Earth**: 384,400 km\n- **Diameter**: 3,474 km\n- **Orbital period**: 27.3 days\n- **Surface gravity**: 1.62 m/s² (about 1/6 of Earth's)\n- **First human visit**: July 20, 1969 (Apollo 11)",

    /* Technology */
    "artificial intelligence": "Artificial Intelligence (AI) is the simulation of human intelligence by computer systems. Key branches include:\n\n- **Machine Learning** — Systems that learn from data\n- **Natural Language Processing** — Understanding human language\n- **Computer Vision** — Interpreting visual information\n- **Robotics** — Physical AI agents\n- **Neural Networks** — Brain-inspired computing architectures",
    "machine learning": "Machine Learning is a subset of AI where systems learn patterns from data without being explicitly programmed. Main types:\n\n- **Supervised Learning** — Learning from labeled examples\n- **Unsupervised Learning** — Finding patterns in unlabeled data\n- **Reinforcement Learning** — Learning through trial and reward\n\nPopular algorithms include decision trees, neural networks, SVMs, and random forests.",
    "blockchain": "Blockchain is a distributed, immutable ledger technology. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. This makes it tamper-resistant and decentralized.",
    "python": "Python is a high-level, interpreted programming language created by **Guido van Rossum** in 1991. It's known for its readability and versatility, used in web development, data science, AI, automation, and more. It's currently one of the most popular programming languages in the world.",
    "javascript": "JavaScript is a dynamic programming language created by **Brendan Eich** in 1995. It's the language of the web, running in all browsers. With Node.js, it also runs on servers. It supports object-oriented, functional, and event-driven programming paradigms.",
    "quantum computing": "Quantum computing uses quantum mechanical phenomena like **superposition** and **entanglement** to process information. Unlike classical bits (0 or 1), quantum bits (qubits) can be in superposition of both states simultaneously, potentially solving certain problems exponentially faster.",

    /* Math */
    "pi": "Pi (π) is the ratio of a circle's circumference to its diameter. It's an irrational number starting with **3.14159265358979...** and continues infinitely without repeating. It's fundamental to mathematics, appearing in geometry, trigonometry, statistics, and physics.",
    "golden ratio": "The Golden Ratio (φ or phi) equals approximately **1.6180339887...**. It's found when a line is divided so that the ratio of the whole to the larger part equals the ratio of the larger part to the smaller. It appears in nature, art, and architecture.",
    "fibonacci": "The Fibonacci sequence starts with 0, 1, and each subsequent number is the sum of the two preceding ones: **0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...** The ratio between consecutive terms converges to the Golden Ratio.",

    /* Geography */
    "largest country": "The largest country by area is **Russia** at approximately 17.1 million km², covering more than one-eighth of Earth's inhabited land area.",
    "largest ocean": "The **Pacific Ocean** is the largest and deepest ocean, covering about 165.25 million km² — larger than all land area combined. Its deepest point is the Mariana Trench at approximately 11,034 meters.",
    "tallest mountain": "**Mount Everest** is Earth's highest mountain above sea level at **8,848.86 meters** (29,031.7 ft), located in the Himalayas on the Nepal-Tibet border. It was first summited by Edmund Hillary and Tenzing Norgay in 1953.",

    /* History */
    "world war 1": "World War I (1914–1918) was a global conflict triggered by the assassination of Archduke Franz Ferdinand. It pitted the **Allied Powers** (Britain, France, Russia, later the US) against the **Central Powers** (Germany, Austria-Hungary, Ottoman Empire). About 20 million people died.",
    "world war 2": "World War II (1939–1945) was the deadliest conflict in history. The **Allied Powers** (US, UK, Soviet Union, China) defeated the **Axis Powers** (Germany, Japan, Italy). Approximately 70–85 million people died. It ended with the atomic bombings of Hiroshima and Nagasaki.",
    "moon landing": "The first Moon landing was on **July 20, 1969**, by NASA's **Apollo 11** mission. Neil Armstrong became the first human to walk on the Moon, followed by Buzz Aldrin. Michael Collins orbited above in the command module.",

    /* Philosophy */
    "meaning of life": "That's one of humanity's deepest questions! Different perspectives:\n\n- **Philosophy**: Existentialists say we create our own meaning\n- **Science**: Life is a self-sustaining chemical system capable of evolution\n- **Religion**: Varies by faith — spiritual fulfillment, connection to the divine\n- **Practical**: Many find meaning through relationships, purpose, and contribution\n\nWhat's meaningful to you is what matters most."
  },

  /* --- Pattern rules for intent detection --- */
  patterns: {
    greeting: /^(hi|hello|hey|howdy|greetings|good (morning|afternoon|evening)|sup|what's up)\b/i,
    definition: /^(what is|what are|what's|define|meaning of|definition of|explain)\s+/i,
    math: /^(calculate|compute|solve|what is|what's|evaluate)\s+[\d\s\+\-\*\/\^\(\)\.sqrt%]+$/i,
    country: /^(tell me about|info about|information on|facts about)\s+([a-zA-Z\s]+)$/i,
    whoWhat: /^(who|what|where|when|why|how)\b/i,
    thanks: /^(thanks|thank you|thx|appreciate|cheers)\b/i,
    goodbye: /^(bye|goodbye|see you|farewell|good night)\b/i
  }
};
