/* ========================================
   KDK Core v2 — AI Engine & UI Controller
   ======================================== */

(function () {
  'use strict';

  /* ============ BACKGROUND PARTICLES ============ */
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0, mouseY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(50, Math.floor(window.innerWidth * window.innerHeight / 30000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.25 + 0.08
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Ambient gradient blobs */
    const g1 = ctx.createRadialGradient(canvas.width * 0.25, canvas.height * 0.3, 0, canvas.width * 0.25, canvas.height * 0.3, canvas.width * 0.6);
    g1.addColorStop(0, 'rgba(0,212,170,0.025)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const g2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.7, 0, canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.4);
    g2.addColorStop(0, 'rgba(68,136,255,0.015)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        p.vx -= dx * 0.00002;
        p.vy -= dy * 0.00002;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,170,${p.alpha})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,170,${0.05 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  resizeCanvas();
  createParticles();
  animateParticles();

  /* ============ MEMORY ENGINE ============ */
  class MemoryEngine {
    constructor() {
      this.STORAGE_KEY = 'kdk_core_memory';
      this.memory = this.load();
    }

    load() {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) { /* ignore */ }
      /* Initialize with defaults from config */
      return {
        preferences: [...KDKConfig.defaultMemory.preferences],
        projects: [...KDKConfig.defaultMemory.projects],
        style: [...KDKConfig.defaultMemory.style],
        language: KDKConfig.defaultMemory.language,
        customFacts: [],
        conversationTopics: []
      };
    }

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.memory));
      } catch (e) { /* ignore */ }
    }

    addPreference(val) {
      if (!this.memory.preferences.includes(val)) {
        this.memory.preferences.push(val);
        this.save();
      }
    }

    addProject(val) {
      if (!this.memory.projects.includes(val)) {
        this.memory.projects.push(val);
        this.save();
      }
    }

    addStyle(val) {
      if (!this.memory.style.includes(val)) {
        this.memory.style.push(val);
        this.save();
      }
    }

    addFact(val) {
      if (!this.memory.customFacts.includes(val)) {
        this.memory.customFacts.push(val);
        this.save();
      }
    }

    addTopic(topic) {
      this.memory.conversationTopics.unshift({ topic, timestamp: Date.now() });
      if (this.memory.conversationTopics.length > 20) this.memory.conversationTopics.pop();
      this.save();
    }

    removeItem(category, value) {
      const list = this.memory[category];
      if (list) {
        const idx = list.indexOf(value);
        if (idx > -1) { list.splice(idx, 1); this.save(); }
      }
    }

    clearAll() {
      this.memory = {
        preferences: [],
        projects: [],
        style: [],
        language: "",
        customFacts: [],
        conversationTopics: []
      };
      this.save();
    }

    getAllMemories() {
      const items = [];
      this.memory.preferences.forEach(v => items.push({ category: 'preferences', icon: 'fa-heart', label: v }));
      this.memory.projects.forEach(v => items.push({ category: 'projects', icon: 'fa-rocket', label: v }));
      this.memory.style.forEach(v => items.push({ category: 'style', icon: 'fa-palette', label: v }));
      this.memory.customFacts.forEach(v => items.push({ category: 'customFacts', icon: 'fa-bookmark', label: v }));
      if (this.memory.language) items.push({ category: 'language', icon: 'fa-language', label: this.memory.language });
      return items;
    }

    /* Build a context string for AI responses */
    getContextString() {
      const parts = [];
      if (this.memory.preferences.length) parts.push(`Preferences: ${this.memory.preferences.join(', ')}`);
      if (this.memory.projects.length) parts.push(`Projects: ${this.memory.projects.join(', ')}`);
      if (this.memory.style.length) parts.push(`Style: ${this.memory.style.join(', ')}`);
      if (this.memory.language) parts.push(`Language: ${this.memory.language}`);
      if (this.memory.customFacts.length) parts.push(`Facts: ${this.memory.customFacts.join('; ')}`);
      return parts.join(' | ');
    }

    /* Check if a query relates to stored memories */
    findRelated(query) {
      const q = query.toLowerCase();
      const related = [];
      this.getAllMemories().forEach(m => {
        const words = m.label.toLowerCase().split(/\s+/);
        if (words.some(w => w.length > 2 && q.includes(w))) {
          related.push(m);
        }
      });
      return related;
    }
  }

  /* ============ WEB SEARCH ENGINE ============ */
  class WebSearchEngine {
    /* DuckDuckGo Instant Answer API — free, no key, CORS enabled */
    async search(query) {
      try {
        const url = `${KDKConfig.apis.webSearch}?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=0&t=kdk_core`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();

        const results = {
          abstract: null,
          relatedTopics: [],
          results: [],
          source: 'web'
        };

        /* Main abstract (often from Wikipedia) */
        if (data.Abstract && data.Abstract.length > 20) {
          results.abstract = {
            title: data.Heading || query,
            text: data.Abstract,
            url: data.AbstractURL,
            source: data.AbstractSource
          };
        }

        /* Related topics */
        if (data.RelatedTopics) {
          data.RelatedTopics.forEach(t => {
            if (t.Text && t.FirstURL) {
              results.relatedTopics.push({
                text: t.Text,
                url: t.FirstURL
              });
            }
          });
        }

        /* Direct results */
        if (data.Results) {
          data.Results.forEach(r => {
            if (r.Text && r.FirstURL) {
              results.results.push({ text: r.Text, url: r.FirstURL });
            }
          });
        }

        return (results.abstract || results.relatedTopics.length > 0) ? results : null;
      } catch (e) {
        return null;
      }
    }

    /* Hacker News search — tech community */
    async searchTech(query) {
      try {
        const url = `${KDKConfig.apis.hackerNews.search}?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=5`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.hits || data.hits.length === 0) return null;

        return data.hits.map(h => ({
          title: h.title,
          url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
          points: h.points || 0,
          comments: h.num_comments || 0,
          author: h.author
        }));
      } catch (e) {
        return null;
      }
    }

    /* Open Library search — books and academic */
    async searchBooks(query) {
      try {
        const url = `${KDKConfig.apis.openLibrary}?q=${encodeURIComponent(query)}&limit=5&fields=title,author_name,first_publish_year,subject,key`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.docs || data.docs.length === 0) return null;

        return data.docs.map(b => ({
          title: b.title,
          author: b.author_name ? b.author_name[0] : 'Unknown',
          year: b.first_publish_year,
          subjects: b.subject ? b.subject.slice(0, 3) : [],
          url: `https://openlibrary.org${b.key}`
        }));
      } catch (e) {
        return null;
      }
    }

    /* Wikipedia search */
    async searchWikipedia(query) {
      try {
        /* Try summary first */
        const summaryRes = await fetch(`${KDKConfig.apis.wikipedia.summary}/${encodeURIComponent(query)}`);
        if (summaryRes.ok) {
          const data = await summaryRes.json();
          if (data.type !== 'disambiguation' && data.extract) {
            return {
              title: data.title,
              text: data.extract,
              url: data.content_urls?.desktop?.page,
              thumbnail: data.thumbnail?.source,
              source: 'Wikipedia'
            };
          }
          /* Disambiguation: try search */
          if (data.type === 'disambiguation') {
            const searchRes = await fetch(
              `${KDKConfig.apis.wikipedia.search}?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json&origin=*`
            );
            if (searchRes.ok) {
              const sd = await searchRes.json();
              if (sd[1] && sd[1][0]) return this.searchWikipedia(sd[1][0]);
            }
          }
        }

        /* Fallback: search API */
        const searchRes = await fetch(
          `${KDKConfig.apis.wikipedia.search}?action=opensearch&search=${encodeURIComponent(query)}&limit=3&format=json&origin=*`
        );
        if (searchRes.ok) {
          const sd = await searchRes.json();
          if (sd[1] && sd[1][0]) {
            const retry = await fetch(`${KDKConfig.apis.wikipedia.summary}/${encodeURIComponent(sd[1][0])}`);
            if (retry.ok) {
              const data = await retry.json();
              if (data.extract) {
                return {
                  title: data.title,
                  text: data.extract,
                  url: data.content_urls?.desktop?.page,
                  thumbnail: data.thumbnail?.source,
                  source: 'Wikipedia'
                };
              }
            }
          }
        }
        return null;
      } catch (e) {
        return null;
      }
    }

    /* Dictionary lookup */
    async define(word) {
      try {
        const cleanWord = word.replace(/^(what is|what's|define|meaning of|definition of|explain)\s+/i, '').trim().toLowerCase();
        if (!cleanWord || cleanWord.split(/\s+/).length > 3) return null;

        const res = await fetch(`${KDKConfig.apis.dictionary}/${encodeURIComponent(cleanWord)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data || !data[0]) return null;

        const entry = data[0];
        const meaning = entry.meanings[0];
        const def = meaning.definitions[0];
        const phonetic = entry.phonetic || (entry.phonetics?.[0]?.text) || '';

        let result = `**${entry.word}**`;
        if (phonetic) result += `  *${phonetic}*`;
        result += `\n\n**${meaning.partOfSpeech}**: ${def.definition}`;
        if (def.example) result += `\n\n*Example*: "${def.example}"`;
        if (meaning.synonyms?.length) result += `\n\n**Synonyms**: ${meaning.synonyms.slice(0, 5).join(', ')}`;
        return result;
      } catch (e) { return null; }
    }

    /* Country data */
    async getCountry(name) {
      try {
        const clean = name.replace(/^(tell me about|info about|information on|facts about|what about|how about)\s+/i, '').replace(/[?!.,;:'"]/g, '').trim();
        if (!clean || clean.split(/\s+/).length > 4) return null;

        const res = await fetch(`${KDKConfig.apis.countries}/${encodeURIComponent(clean)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data?.[0]) return null;

        const c = data[0];
        let result = `**${c.name.common}**`;
        if (c.name.official !== c.name.common) result += ` (${c.name.official})`;
        result += '\n\n';
        if (c.capital) result += `- **Capital**: ${c.capital.join(', ')}\n`;
        if (c.region) result += `- **Region**: ${c.region}${c.subregion ? ` — ${c.subregion}` : ''}\n`;
        if (c.population) result += `- **Population**: ${c.population.toLocaleString()}\n`;
        if (c.area) result += `- **Area**: ${c.area.toLocaleString()} km²\n`;
        if (c.languages) result += `- **Languages**: ${Object.values(c.languages).join(', ')}\n`;
        if (c.currencies) result += `- **Currency**: ${Object.values(c.currencies).map(cu => `${cu.name} (${cu.symbol})`).join(', ')}\n`;
        if (c.timezones) result += `- **Timezone**: ${c.timezones[0]}\n`;
        if (c.flags?.png) result += `\n![Flag](${c.flags.png})`;
        return result;
      } catch (e) { return null; }
    }
  }

  /* ============ KDK CORE AI ============ */
  class KDKCore {
    constructor() {
      this.history = [];
      this.memory = new MemoryEngine();
      this.web = new WebSearchEngine();
    }

    async processQuery(query) {
      const normalized = query.trim();
      if (!normalized) return null;

      this.history.push({ role: 'user', content: normalized });
      this.memory.addTopic(normalized);

      let response = null;
      let source = 'knowledge';
      let links = [];
      let memoryUsed = false;

      /* 1. Memory commands — "remember this: X" */
      const rememberMatch = normalized.match(KDKConfig.patterns.rememberCommand);
      if (rememberMatch) {
        const fact = normalized.replace(KDKConfig.patterns.rememberCommand, '').trim();
        this.memory.addFact(fact);
        response = `Got it! I'll remember that: **${fact}**. This is now stored in my memory for future conversations.`;
        source = 'memory';
        memoryUsed = true;
      }

      /* 2. Memory queries — "what do you know about me?" */
      if (!response && KDKConfig.patterns.memoryQuery.test(normalized)) {
        const mem = this.memory.getAllMemories();
        if (mem.length > 0) {
          let result = "Here's what I remember about you:\n\n";
          const grouped = {};
          mem.forEach(m => {
            if (!grouped[m.category]) grouped[m.category] = [];
            grouped[m.category].push(m);
          });

          const categoryLabels = {
            preferences: 'Your Preferences',
            projects: 'Your Projects',
            style: 'Your Style',
            customFacts: 'Things You\'ve Told Me',
            language: 'Language'
          };

          const categoryIcons = {
            preferences: 'fa-heart',
            projects: 'fa-rocket',
            style: 'fa-palette',
            customFacts: 'fa-bookmark',
            language: 'fa-language'
          };

          for (const [cat, items] of Object.entries(grouped)) {
            result += `**${categoryIcons[cat] ? '' : ''}${categoryLabels[cat] || cat}:**\n`;
            items.forEach(i => { result += `- ${i.label}\n`; });
            result += '\n';
          }
          response = result.trim();
          source = 'memory';
          memoryUsed = true;
        } else {
          response = "I don't have any memories stored yet. You can tell me things like \"Remember that I love football\" or \"I'm working on a project called KDK Core\" and I'll store it!";
          source = 'memory';
          memoryUsed = true;
        }
      }

      /* 3. Greetings */
      if (!response && KDKConfig.patterns.greeting.test(normalized)) {
        const greetings = [
          "Hello! I'm KDK Core — connected to live web search, encyclopedias, tech communities, and more. What would you like to know?",
          "Hey! Ready to help. I can search the web, look up facts, define words, solve math — and I remember you. What's on your mind?",
          "Hi there! Ask me anything — I've got live web search, Wikipedia, dictionaries, news, and a memory that learns your preferences.",
          "Greetings! I'm plugged into global knowledge sources and I remember who you are. Fire away!"
        ];
        response = greetings[Math.floor(Math.random() * greetings.length)];
        source = 'knowledge';
      }

      /* 4. Thanks */
      if (!response && KDKConfig.patterns.thanks.test(normalized)) {
        response = "You're welcome! Anytime you need answers, I'm here. Feel free to ask more!";
        source = 'knowledge';
      }

      /* 5. Goodbye */
      if (!response && KDKConfig.patterns.goodbye.test(normalized)) {
        response = "Goodbye! I'll remember everything for next time. Come back anytime!";
        source = 'knowledge';
      }

      /* 6. Math */
      if (!response) {
        const mathResult = this.tryMath(normalized);
        if (mathResult) {
          response = mathResult;
          source = 'math';
        }
      }

      /* 7. Explicit web search — "search X", "latest X", "news X" */
      if (!response && KDKConfig.patterns.webSearch.test(normalized)) {
        const searchQuery = normalized.replace(/^(search|look up|find|google|latest|current|news about|news on|update on|recent)\s+/i, '').trim();
        if (searchQuery) {
          const webResult = await this.doWebSearch(searchQuery);
          if (webResult) {
            response = webResult.text;
            source = webResult.source;
            links = webResult.links || [];
          }
        }
      }

      /* 8. Dictionary */
      if (!response && KDKConfig.patterns.definition.test(normalized)) {
        const dictResult = await this.web.define(normalized);
        if (dictResult) {
          response = dictResult;
          source = 'dictionary';
        }
      }

      /* 9. Built-in knowledge base */
      if (!response) {
        const kbResult = this.searchKnowledgeBase(normalized);
        if (kbResult) {
          response = kbResult;
          source = 'knowledge';
        }
      }

      /* 10. Wikipedia */
      if (!response) {
        const wikiResult = await this.web.searchWikipedia(normalized);
        if (wikiResult) {
          let text = `**${wikiResult.title}**\n\n${wikiResult.text}`;
          if (wikiResult.url) links.push({ text: 'Read more on Wikipedia', url: wikiResult.url });
          response = text;
          source = 'wikipedia';
        }
      }

      /* 11. Web search (DuckDuckGo) for anything not yet answered */
      if (!response) {
        const webResult = await this.doFullWebSearch(normalized);
        if (webResult) {
          response = webResult.text;
          source = webResult.source;
          links = webResult.links || [];
        }
      }

      /* 12. Country data */
      if (!response) {
        const countryResult = await this.web.getCountry(normalized);
        if (countryResult) {
          response = countryResult;
          source = 'countries';
        }
      }

      /* 13. Tech community search — for code/tech queries */
      if (!response && this.isTechQuery(normalized)) {
        const techResult = await this.searchTechCommunity(normalized);
        if (techResult) {
          response = techResult.text;
          source = 'tech';
          links = techResult.links || [];
        }
      }

      /* 14. Academic / book search — for "books on X", "papers on X" */
      if (!response && /book|paper|article|study|research|academic/i.test(normalized)) {
        const bookResult = await this.searchAcademic(normalized);
        if (bookResult) {
          response = bookResult.text;
          source = 'academic';
          links = bookResult.links || [];
        }
      }

      /* 15. Fallback */
      if (!response) {
        response = KDKConfig.personality.fallbackMessage;
        source = 'knowledge';
      }

      /* Check for memory-relevant context */
      const relatedMemories = this.memory.findRelated(normalized);
      if (relatedMemories.length > 0 && !memoryUsed) {
        memoryUsed = true;
      }

      this.history.push({ role: 'ai', content: response, source, links });

      return { text: response, source, links, memoryUsed, relatedMemories: memoryUsed ? relatedMemories : [] };
    }

    /* --- Math Evaluation --- */
    tryMath(input) {
      let expr = input
        .replace(/^(calculate|compute|solve|evaluate|what is|what's)\s+/i, '')
        .replace(/=/g, '').replace(/×/g, '*').replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/sqrt\(/gi, 'Math.sqrt(')
        .replace(/sin\(/gi, 'Math.sin(')
        .replace(/cos\(/gi, 'Math.cos(')
        .replace(/tan\(/gi, 'Math.tan(')
        .replace(/log\(/gi, 'Math.log10(')
        .replace(/ln\(/gi, 'Math.log(')
        .replace(/abs\(/gi, 'Math.abs(')
        .replace(/pi/gi, 'Math.PI')
        .replace(/%/g, '/100')
        .trim();

      if (!/^[\d\s\+\-\*\/\.\(\)Math\.\w]+$/.test(expr) || !/\d/.test(expr)) return null;

      try {
        const fn = new Function('return ' + expr);
        const result = fn();
        if (typeof result === 'number' && isFinite(result)) {
          const displayExpr = input.replace(/^(calculate|compute|solve|evaluate|what is|what's)\s+/i, '').trim();
          const formatted = Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
          return `**${displayExpr}** = **${formatted}**`;
        }
      } catch (e) { /* not math */ }
      return null;
    }

    /* --- Web Search (DuckDuckGo) --- */
    async doWebSearch(query) {
      const results = await this.web.search(query);
      if (!results) return null;

      let text = '';
      if (results.abstract) {
        text = `**${results.abstract.title}**\n\n${results.abstract.text}`;
      } else if (results.relatedTopics.length > 0) {
        text = `Here's what I found for **"${query}"**:\n\n`;
        results.relatedTopics.slice(0, 5).forEach((t, i) => {
          text += `${i + 1}. ${t.text}\n`;
        });
      }

      if (!text) return null;

      const linkList = [];
      if (results.abstract?.url) linkList.push({ text: results.abstract.source || 'Source', url: results.abstract.url });
      results.relatedTopics.slice(0, 3).forEach(t => {
        if (t.url) linkList.push({ text: t.text.substring(0, 40) + '...', url: t.url });
      });

      return { text, source: 'web', links: linkList };
    }

    /* --- Full Web Search with fallbacks --- */
    async doFullWebSearch(query) {
      /* Try DuckDuckGo */
      const ddg = await this.web.search(query);
      if (ddg?.abstract) {
        const linkList = [];
        if (ddg.abstract.url) linkList.push({ text: ddg.abstract.source || 'Source', url: ddg.abstract.url });
        ddg.relatedTopics.slice(0, 3).forEach(t => {
          if (t.url) linkList.push({ text: t.text.substring(0, 40) + '...', url: t.url });
        });
        return {
          text: `**${ddg.abstract.title}**\n\n${ddg.abstract.text}`,
          source: 'web',
          links: linkList
        };
      }

      /* Try related topics from DDG */
      if (ddg?.relatedTopics?.length > 0) {
        let text = `Here's what I found for **"${query}"**:\n\n`;
        const linkList = [];
        ddg.relatedTopics.slice(0, 5).forEach((t, i) => {
          text += `${i + 1}. ${t.text}\n`;
          if (t.url) linkList.push({ text: `Result ${i + 1}`, url: t.url });
        });
        return { text, source: 'web', links: linkList };
      }

      return null;
    }

    /* --- Tech Community Search (Hacker News) --- */
    isTechQuery(query) {
      const techTerms = /\b(code|coding|program|programming|developer|software|bug|debug|api|framework|library|react|vue|angular|node|python|javascript|typescript|docker|kubernetes|aws|database|sql|git|github|algorithm|stack overflow|devops|frontend|backend|deploy|server|hosting)\b/i;
      return techTerms.test(query);
    }

    async searchTechCommunity(query) {
      const results = await this.web.searchTech(query);
      if (!results || results.length === 0) return null;

      let text = `Found from the **tech community** for "${query}":\n\n`;
      const linkList = [];

      results.forEach((r, i) => {
        text += `${i + 1}. **${r.title}** (${r.points} points, ${r.comments} comments)\n`;
        linkList.push({ text: r.title.substring(0, 35) + '...', url: r.url });
      });

      text += '\nThese are community-curated results from Hacker News.';
      return { text, source: 'tech', links: linkList };
    }

    /* --- Academic / Book Search --- */
    async searchAcademic(query) {
      const searchTerms = query.replace(/^(books?|papers?|articles?|studies?|research|academic)\s+(on|about|for|regarding)\s+/i, '').trim();
      const results = await this.web.searchBooks(searchTerms || query);
      if (!results || results.length === 0) return null;

      let text = `Found from **Open Library** for "${searchTerms || query}":\n\n`;
      const linkList = [];

      results.forEach((b, i) => {
        text += `${i + 1}. **${b.title}** by ${b.author} (${b.year})\n`;
        if (b.subjects?.length) text += `   Subjects: ${b.subjects.join(', ')}\n`;
        linkList.push({ text: b.title.substring(0, 35) + '...', url: b.url });
      });

      return { text, source: 'academic', links: linkList };
    }

    /* --- Knowledge Base Fuzzy Search --- */
    searchKnowledgeBase(input) {
      const normalized = input.toLowerCase().replace(/[?!.,;:'"]/g, '').trim();
      if (KDKConfig.knowledgeBase[normalized]) return KDKConfig.knowledgeBase[normalized];

      let bestMatch = null;
      let bestScore = 0;

      for (const [key, value] of Object.entries(KDKConfig.knowledgeBase)) {
        const score = this.similarity(normalized, key);
        if (score > bestScore && score > 0.4) {
          bestScore = score;
          bestMatch = value;
        }
      }
      return bestMatch;
    }

    similarity(a, b) {
      const wordsA = new Set(a.split(/\s+/));
      const wordsB = new Set(b.split(/\s+/));
      const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
      const union = new Set([...wordsA, ...wordsB]);
      return union.size === 0 ? 0 : intersection.size / union.size;
    }
  }

  /* ============ UI CONTROLLER ============ */
  const ai = new KDKCore();
  const memory = ai.memory;

  const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    menuBtn: document.getElementById('menuBtn'),
    mainArea: document.getElementById('mainArea'),
    chatContainer: document.getElementById('chatContainer'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    welcomeSuggestions: document.getElementById('welcomeSuggestions'),
    sidebarSuggestions: document.getElementById('sidebarSuggestions'),
    messagesArea: document.getElementById('messagesArea'),
    typingIndicator: document.getElementById('typingIndicator'),
    userInput: document.getElementById('userInput'),
    sendBtn: document.getElementById('sendBtn'),
    newChatBtn: document.getElementById('newChatBtn'),
    clearBtn: document.getElementById('clearBtn'),
    exportBtn: document.getElementById('exportBtn'),
    chatHistory: document.getElementById('chatHistory'),
    memoryPanel: document.getElementById('memoryPanel'),
    memoryAddBtn: document.getElementById('memoryAddBtn'),
    memoryClearBtn: document.getElementById('memoryClearBtn'),
    memoryModal: document.getElementById('memoryModal'),
    memoryModalClose: document.getElementById('memoryModalClose'),
    memoryCategory: document.getElementById('memoryCategory'),
    memoryValue: document.getElementById('memoryValue'),
    memorySaveBtn: document.getElementById('memorySaveBtn'),
    memoryToggleBtn: document.getElementById('memoryToggleBtn'),
    searchStatus: document.getElementById('searchStatus')
  };

  let chatCount = 0;
  let isProcessing = false;

  /* --- Render Memory Panel --- */
  function renderMemoryPanel() {
    const items = memory.getAllMemories();
    if (items.length === 0) {
      elements.memoryPanel.innerHTML = `
        <div class="memory-empty">
          <i class="fas fa-brain"></i>
          <span>No memories yet. Tell me about yourself!</span>
        </div>`;
      return;
    }

    elements.memoryPanel.innerHTML = items.map(m => `
      <div class="memory-chip" data-category="${m.category}" data-value="${m.label}">
        <i class="fas ${m.icon}"></i>
        <span class="memory-chip-text">${m.label}</span>
        <button class="memory-chip-delete" aria-label="Delete memory"><i class="fas fa-times"></i></button>
      </div>
    `).join('');

    /* Delete handlers */
    elements.memoryPanel.querySelectorAll('.memory-chip-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const chip = e.target.closest('.memory-chip');
        const cat = chip.dataset.category;
        const val = chip.dataset.value;
        memory.removeItem(cat, val);
        renderMemoryPanel();
        showToast('Memory removed');
      });
    });
  }

  /* --- Render Suggestions --- */
  function renderSuggestions() {
    const suggestions = KDKConfig.suggestions;

    elements.welcomeSuggestions.innerHTML = suggestions.map(s => `
      <div class="welcome-suggestion" data-query="${s.text}">
        <div class="suggestion-icon"><i class="fas ${s.icon}"></i></div>
        <div class="suggestion-text">${s.text}</div>
      </div>
    `).join('');

    elements.sidebarSuggestions.innerHTML = suggestions.map(s => `
      <div class="sidebar-suggestion" data-query="${s.text}">${s.text}</div>
    `).join('');

    document.querySelectorAll('[data-query]').forEach(el => {
      el.addEventListener('click', () => {
        elements.userInput.value = el.getAttribute('data-query');
        handleSend();
      });
    });
  }

  /* --- Search Status Indicator --- */
  function showSearchStatus(text) {
    elements.searchStatus.innerHTML = `<div class="search-status"><i class="fas fa-spinner"></i> ${text}</div>`;
  }

  function hideSearchStatus() {
    elements.searchStatus.innerHTML = '';
  }

  /* --- Render Message --- */
  function renderMessage(content, isUser, source, links, relatedMemories) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-atom"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    /* Parse markdown-like formatting */
    let html = content
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:120px;border-radius:8px;margin-top:8px;">')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^- (.+)/gm, '<li>$1</li>');

    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = '<p>' + html + '</p>';

    contentDiv.innerHTML = html;

    /* Source badge */
    if (!isUser && source) {
      const cat = KDKConfig.sourceCategories[source] || KDKConfig.sourceCategories.knowledge;
      const sourceDiv = document.createElement('div');
      sourceDiv.className = 'message-source';
      sourceDiv.innerHTML = `
        <span class="source-badge ${cat.cssClass}"><i class="fas ${cat.icon}"></i> ${cat.label}</span>
      `;
      contentDiv.appendChild(sourceDiv);
    }

    /* Related links */
    if (!isUser && links && links.length > 0) {
      const linksDiv = document.createElement('div');
      linksDiv.className = 'message-links';
      links.forEach(l => {
        linksDiv.innerHTML += `<a class="message-link" href="${l.url}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> ${l.text}</a>`;
      });
      contentDiv.appendChild(linksDiv);
    }

    /* Memory recall tag */
    if (!isUser && relatedMemories && relatedMemories.length > 0) {
      const memDiv = document.createElement('div');
      memDiv.className = 'memory-recall';
      memDiv.innerHTML = `<i class="fas fa-brain"></i> I remembered: ${relatedMemories.map(m => m.label).join(', ')}`;
      contentDiv.appendChild(memDiv);
    }

    div.appendChild(avatar);
    div.appendChild(contentDiv);
    elements.messagesArea.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    elements.typingIndicator.classList.remove('hidden');
    scrollToBottom();
  }

  function hideTyping() {
    elements.typingIndicator.classList.add('hidden');
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    });
  }

  /* --- Handle Send --- */
  async function handleSend() {
    const query = elements.userInput.value.trim();
    if (!query || isProcessing) return;

    isProcessing = true;
    elements.sendBtn.disabled = true;

    if (elements.welcomeScreen.style.display !== 'none') {
      elements.welcomeScreen.style.display = 'none';
    }

    renderMessage(query, true);
    elements.userInput.value = '';
    autoResize();

    showTyping();
    showSearchStatus('Searching sources...');

    /* Brief thinking delay */
    const delay = Math.min(1800, Math.max(500, query.length * 15));
    await new Promise(r => setTimeout(r, delay));

    const result = await ai.processQuery(query);
    hideTyping();
    hideSearchStatus();

    if (result) {
      renderMessage(result.text, false, result.source, result.links || [], result.relatedMemories || []);
    }

    isProcessing = false;
    elements.sendBtn.disabled = false;
    elements.userInput.focus();
    renderMemoryPanel();
  }

  /* --- Auto-resize Textarea --- */
  function autoResize() {
    const el = elements.userInput;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  /* --- Toast --- */
  function showToast(message, icon) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon || 'fa-check-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  /* --- New Chat --- */
  function newChat() {
    chatCount++;
    const firstMsg = ai.history.find(m => m.role === 'user');
    const label = firstMsg ? firstMsg.content.substring(0, 30) + (firstMsg.content.length > 30 ? '...' : '') : `Chat ${chatCount}`;

    if (ai.history.length > 0) {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `<i class="fas fa-message"></i> ${label}`;
      const emptyMsg = elements.chatHistory.querySelector('.history-empty');
      if (emptyMsg) emptyMsg.remove();
      elements.chatHistory.prepend(item);
    }

    ai.history = [];
    elements.messagesArea.innerHTML = '';
    elements.welcomeScreen.style.display = '';
    renderSuggestions();
  }

  /* --- Export Chat --- */
  function exportChat() {
    if (ai.history.length === 0) { showToast('No messages to export', 'fa-info-circle'); return; }

    let text = `KDK Core v2 — Chat Export\n${'='.repeat(50)}\n`;
    const ctx = memory.getContextString();
    if (ctx) text += `\nMemory Context: ${ctx}\n`;
    text += '\n';

    ai.history.forEach(m => {
      const role = m.role === 'user' ? 'You' : 'KDK Core';
      text += `[${role}]${m.source ? ` (Source: ${m.source})` : ''}\n${m.content}\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `kdk-core-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('Chat exported');
  }

  /* --- Sidebar Toggle --- */
  function toggleSidebar() {
    if (window.innerWidth <= 768) {
      elements.sidebar.classList.toggle('open');
      elements.sidebarOverlay.classList.toggle('active');
    } else {
      elements.sidebar.classList.toggle('collapsed');
      elements.mainArea.classList.toggle('expanded');
    }
  }

  /* --- Memory Modal --- */
  function openMemoryModal() {
    elements.memoryModal.classList.remove('hidden');
    elements.memoryValue.value = '';
    elements.memoryCategory.value = 'preference';
    elements.memoryValue.focus();
  }

  function closeMemoryModal() {
    elements.memoryModal.classList.add('hidden');
  }

  function saveMemoryFromModal() {
    const cat = elements.memoryCategory.value;
    const val = elements.memoryValue.value.trim();
    if (!val) return;

    switch (cat) {
      case 'preference': memory.addPreference(val); break;
      case 'project': memory.addProject(val); break;
      case 'style': memory.addStyle(val); break;
      case 'fact': memory.addFact(val); break;
      case 'language': memory.memory.language = val; memory.save(); break;
    }

    renderMemoryPanel();
    closeMemoryModal();
    showToast('Memory saved!', 'fa-brain');
  }

  /* ============ EVENT LISTENERS ============ */
  elements.sendBtn.addEventListener('click', handleSend);

  elements.userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });

  elements.userInput.addEventListener('input', autoResize);

  elements.sidebarToggle.addEventListener('click', toggleSidebar);
  elements.menuBtn.addEventListener('click', toggleSidebar);
  elements.sidebarOverlay.addEventListener('click', () => {
    elements.sidebar.classList.remove('open');
    elements.sidebarOverlay.classList.remove('active');
  });

  elements.newChatBtn.addEventListener('click', () => {
    newChat();
    showToast('New conversation started');
  });

  elements.clearBtn.addEventListener('click', () => {
    if (ai.history.length === 0) { showToast('Already empty', 'fa-info-circle'); return; }
    elements.messagesArea.innerHTML = '';
    ai.history = [];
    elements.welcomeScreen.style.display = '';
    renderSuggestions();
    showToast('Chat cleared');
  });

  elements.exportBtn.addEventListener('click', exportChat);

  /* Memory UI */
  elements.memoryAddBtn.addEventListener('click', openMemoryModal);
  elements.memoryClearBtn.addEventListener('click', () => {
    if (memory.getAllMemories().length === 0) { showToast('No memories to clear', 'fa-info-circle'); return; }
    memory.clearAll();
    renderMemoryPanel();
    showToast('All memories cleared', 'fa-brain');
  });
  elements.memoryModalClose.addEventListener('click', closeMemoryModal);
  elements.memoryModal.querySelector('.modal-backdrop').addEventListener('click', closeMemoryModal);
  elements.memorySaveBtn.addEventListener('click', saveMemoryFromModal);
  elements.memoryValue.addEventListener('keydown', e => { if (e.key === 'Enter') saveMemoryFromModal(); });

  elements.memoryToggleBtn.addEventListener('click', () => {
    elements.memoryToggleBtn.classList.toggle('active');
    const section = document.querySelector('.memory-section');
    section.style.display = section.style.display === 'none' ? '' : 'none';
  });

  /* ============ INITIALIZE ============ */
  renderSuggestions();
  renderMemoryPanel();
  elements.userInput.focus();

})();
