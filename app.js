/* ========================================
   KDK Core — AI Engine & UI Controller
   ======================================== */

(function () {
  'use strict';

  /* ============ Background Particles ============ */
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
    const count = Math.min(60, Math.floor(window.innerWidth * window.innerHeight / 25000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Gradient base */
    const grad = ctx.createRadialGradient(
      canvas.width * 0.3, canvas.height * 0.3, 0,
      canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.7
    );
    grad.addColorStop(0, 'rgba(0,212,170,0.03)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grad2 = ctx.createRadialGradient(
      canvas.width * 0.8, canvas.height * 0.7, 0,
      canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.5
    );
    grad2.addColorStop(0, 'rgba(0,100,180,0.02)');
    grad2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      /* Subtle mouse influence */
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        p.vx -= dx * 0.00003;
        p.vy -= dy * 0.00003;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,170,${p.alpha})`;
      ctx.fill();
    });

    /* Draw connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,170,${0.06 * (1 - dist / 150)})`;
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

  /* ============ AI Engine ============ */
  class KDKCore {
    constructor() {
      this.history = [];
      this.config = KDKConfig;
    }

    /* Main query processor */
    async processQuery(query) {
      const normalized = query.trim();
      if (!normalized) return null;

      this.history.push({ role: 'user', content: normalized });

      let response = null;
      let source = 'KDK Core';

      /* 1. Check greetings */
      if (this.config.patterns.greeting.test(normalized)) {
        response = this.greetingResponse(normalized);
        source = 'KDK Core';
      }

      /* 2. Check thanks */
      if (!response && this.config.patterns.thanks.test(normalized)) {
        response = "You're welcome! Feel free to ask me anything else. I'm here to help.";
        source = 'KDK Core';
      }

      /* 3. Check goodbye */
      if (!response && this.config.patterns.goodbye.test(normalized)) {
        response = "Goodbye! It was great chatting with you. Come back anytime you have questions!";
        source = 'KDK Core';
      }

      /* 4. Check math expressions */
      if (!response) {
        const mathResult = this.tryMath(normalized);
        if (mathResult !== null) {
          response = mathResult;
          source = 'Math Engine';
        }
      }

      /* 5. Check definition requests via Dictionary API */
      if (!response && this.config.patterns.definition.test(normalized)) {
        const dictResult = await this.tryDictionary(normalized);
        if (dictResult) {
          response = dictResult;
          source = 'Dictionary API';
        }
      }

      /* 6. Check built-in knowledge base */
      if (!response) {
        const kbResult = this.searchKnowledgeBase(normalized);
        if (kbResult) {
          response = kbResult;
          source = 'Knowledge Base';
        }
      }

      /* 7. Try Wikipedia */
      if (!response) {
        const wikiResult = await this.tryWikipedia(normalized);
        if (wikiResult) {
          response = wikiResult.text;
          source = wikiResult.source;
        }
      }

      /* 8. Try country data */
      if (!response) {
        const countryResult = await this.tryCountry(normalized);
        if (countryResult) {
          response = countryResult;
          source = 'REST Countries API';
        }
      }

      /* 9. Fallback */
      if (!response) {
        response = this.config.personality.fallbackMessage;
        source = 'KDK Core';
      }

      this.history.push({ role: 'ai', content: response, source });
      return { text: response, source };
    }

    /* --- Greeting --- */
    greetingResponse(input) {
      const greetings = [
        "Hello! I'm KDK Core, ready to help. What would you like to know?",
        "Hey there! Ask me anything — science, history, math, definitions, countries, and more.",
        "Hi! I'm connected to Wikipedia, dictionaries, and global databases. What's on your mind?",
        "Greetings! I'm here to answer your questions using the world's knowledge sources. Fire away!"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    /* --- Math Evaluation --- */
    tryMath(input) {
      /* Extract math expression */
      let expr = input
        .replace(/^(calculate|compute|solve|evaluate|what is|what's)\s+/i, '')
        .replace(/=/g, '')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
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

      /* Validate: only allow numbers, operators, Math functions, parens, spaces */
      if (!/^[\d\s\+\-\*\/\.\(\)Math\.\w]+$/.test(expr)) return null;
      if (!/\d/.test(expr)) return null;

      try {
        /* Safely evaluate */
        const fn = new Function('return ' + expr);
        const result = fn();

        if (typeof result === 'number' && isFinite(result)) {
          const displayExpr = input
            .replace(/^(calculate|compute|solve|evaluate|what is|what's)\s+/i, '')
            .trim();
          const formatted = Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
          return `**${displayExpr}** = **${formatted}**`;
        }
      } catch (e) {
        /* Not a valid math expression */
      }
      return null;
    }

    /* --- Dictionary API --- */
    async tryDictionary(input) {
      const word = input
        .replace(/^(what is|what's|define|meaning of|definition of|explain)\s+/i, '')
        .trim()
        .toLowerCase();

      if (!word || word.split(/\s+/).length > 3) return null;

      try {
        const res = await fetch(`${this.config.apis.dictionary}/${encodeURIComponent(word)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data || !data[0]) return null;

        const entry = data[0];
        const meaning = entry.meanings[0];
        const def = meaning.definitions[0];
        const phonetic = entry.phonetic || (entry.phonetics && entry.phonetics[0] ? entry.phonetics[0].text : '') || '';

        let result = `**${entry.word}**`;
        if (phonetic) result += `  *${phonetic}*`;
        result += `\n\n**${meaning.partOfSpeech}**: ${def.definition}`;
        if (def.example) result += `\n\n*Example*: "${def.example}"`;
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          result += `\n\n**Synonyms**: ${meaning.synonyms.slice(0, 5).join(', ')}`;
        }
        return result;
      } catch (e) {
        return null;
      }
    }

    /* --- Knowledge Base Search --- */
    searchKnowledgeBase(input) {
      const normalized = input.toLowerCase().replace(/[?!.,;:'"]/g, '').trim();

      /* Direct match */
      if (this.config.knowledgeBase[normalized]) {
        return this.config.knowledgeBase[normalized];
      }

      /* Fuzzy match — find best scoring key */
      let bestMatch = null;
      let bestScore = 0;

      for (const [key, value] of Object.entries(this.config.knowledgeBase)) {
        const score = this.similarity(normalized, key);
        if (score > bestScore && score > 0.45) {
          bestScore = score;
          bestMatch = value;
        }
      }

      return bestMatch;
    }

    /* Simple word-overlap similarity */
    similarity(a, b) {
      const wordsA = new Set(a.split(/\s+/));
      const wordsB = new Set(b.split(/\s+/));
      const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
      const union = new Set([...wordsA, ...wordsB]);
      return union.size === 0 ? 0 : intersection.size / union.size;
    }

    /* --- Wikipedia API --- */
    async tryWikipedia(input) {
      /* Clean query */
      let query = input
        .replace(/^(what is|what are|what's|who is|who was|who are|tell me about|info about|information on|facts about|how does|how do|how did|why is|why are|why do|when was|when is|when did|where is|where are|where did)\s+/i, '')
        .replace(/[?!.,;:'"]/g, '')
        .trim();

      if (!query || query.length < 2) return null;

      try {
        /* First try direct page summary */
        const summaryRes = await fetch(
          `${this.config.apis.wikipedia.summary}/${encodeURIComponent(query)}`
        );

        if (summaryRes.ok) {
          const data = await summaryRes.json();
          if (data.type !== 'disambiguation' && data.extract) {
            let text = `**${data.title}**\n\n${data.extract}`;
            if (data.content_urls && data.content_urls.desktop) {
              text += `\n\n[Read more on Wikipedia](${data.content_urls.desktop.page})`;
            }
            return { text, source: 'Wikipedia' };
          }

          /* Disambiguation — try first option */
          if (data.type === 'disambiguation' && data.content_urls) {
            const searchRes = await fetch(
              `${this.config.apis.wikipedia.search}?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json&origin=*`
            );
            if (searchRes.ok) {
              const searchData = await searchRes.json();
              if (searchData[1] && searchData[1][0]) {
                const betterQuery = searchData[1][0];
                return this.tryWikipedia(betterQuery);
              }
            }
          }
        }

        /* Try search API */
        const searchRes = await fetch(
          `${this.config.apis.wikipedia.search}?action=opensearch&search=${encodeURIComponent(query)}&limit=3&format=json&origin=*`
        );

        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (searchData[1] && searchData[1][0]) {
            const title = searchData[1][0];
            const retryRes = await fetch(
              `${this.config.apis.wikipedia.summary}/${encodeURIComponent(title)}`
            );
            if (retryRes.ok) {
              const data = await retryRes.json();
              if (data.extract) {
                let text = `**${data.title}**\n\n${data.extract}`;
                if (data.content_urls && data.content_urls.desktop) {
                  text += `\n\n[Read more on Wikipedia](${data.content_urls.desktop.page})`;
                }
                return { text, source: 'Wikipedia' };
              }
            }
          }
        }

        return null;
      } catch (e) {
        return null;
      }
    }

    /* --- REST Countries API --- */
    async tryCountry(input) {
      const countryName = input
        .replace(/^(tell me about|info about|information on|facts about|what about|how about)\s+/i, '')
        .replace(/[?!.,;:'"]/g, '')
        .trim();

      if (!countryName || countryName.split(/\s+/).length > 4) return null;

      /* Quick check if it might be a country name (capitalized words or common country names) */
      const countryHints = ['country', 'nation', 'republic', 'islands', 'kingdom', 'states'];
      const lowerInput = input.toLowerCase();
      const mightBeCountry = countryHints.some(h => lowerInput.includes(h)) ||
        /^[A-Z]/.test(countryName) ||
        countryName.split(/\s+/).length <= 2;

      if (!mightBeCountry) return null;

      try {
        const res = await fetch(`${this.config.apis.countries}/${encodeURIComponent(countryName)}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data || !data[0]) return null;

        const c = data[0];
        let result = `**${c.name.common}**`;
        if (c.name.official !== c.name.common) result += ` (${c.name.official})`;
        result += '\n\n';

        if (c.capital) result += `- **Capital**: ${c.capital.join(', ')}\n`;
        if (c.region) result += `- **Region**: ${c.region}${c.subregion ? ` — ${c.subregion}` : ''}\n`;
        if (c.population) result += `- **Population**: ${c.population.toLocaleString()}\n`;
        if (c.area) result += `- **Area**: ${c.area.toLocaleString()} km²\n`;
        if (c.languages) result += `- **Languages**: ${Object.values(c.languages).join(', ')}\n`;
        if (c.currencies) {
          const curr = Object.values(c.currencies).map(c => `${c.name} (${c.symbol})`).join(', ');
          result += `- **Currency**: ${curr}\n`;
        }
        if (c.timezones) result += `- **Timezone**: ${c.timezones[0]}\n`;
        if (c.flags && c.flags.png) result += `\n![Flag](${c.flags.png})`;

        return result;
      } catch (e) {
        return null;
      }
    }
  }

  /* ============ UI Controller ============ */
  const ai = new KDKCore();
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
    chatHistory: document.getElementById('chatHistory')
  };

  let chatCount = 0;
  let isProcessing = false;

  /* --- Initialize Suggestions --- */
  function renderSuggestions() {
    const suggestions = KDKConfig.suggestions;

    /* Welcome screen suggestions */
    elements.welcomeSuggestions.innerHTML = suggestions.map(s => `
      <div class="welcome-suggestion" data-query="${s.text}">
        <div class="suggestion-icon"><i class="fas ${s.icon}"></i></div>
        <div class="suggestion-text">${s.text}</div>
      </div>
    `).join('');

    /* Sidebar suggestions */
    elements.sidebarSuggestions.innerHTML = suggestions.map(s => `
      <div class="sidebar-suggestion" data-query="${s.text}">${s.text}</div>
    `).join('');

    /* Click handlers */
    document.querySelectorAll('[data-query]').forEach(el => {
      el.addEventListener('click', () => {
        const query = el.getAttribute('data-query');
        elements.userInput.value = query;
        handleSend();
      });
    });
  }

  /* --- Render Message --- */
  function renderMessage(content, isUser, source) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-atom"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    /* Parse markdown-like formatting */
    let html = content
      /* Code blocks */
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      /* Inline code */
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      /* Bold */
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      /* Italic */
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      /* Links */
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      /* Images */
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:120px;border-radius:8px;margin-top:8px;">')
      /* Line breaks + paragraphs */
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      /* Lists */
      .replace(/^- (.+)/gm, '<li>$1</li>');

    /* Wrap consecutive <li> in <ul> */
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = '<p>' + html + '</p>';

    contentDiv.innerHTML = html;

    /* Source badge for AI messages */
    if (!isUser && source) {
      const sourceDiv = document.createElement('div');
      sourceDiv.className = 'message-source';
      const sourceIcons = {
        'Wikipedia': 'fa-globe',
        'Dictionary API': 'fa-book',
        'REST Countries API': 'fa-flag',
        'Math Engine': 'fa-calculator',
        'Knowledge Base': 'fa-database',
        'KDK Core': 'fa-atom'
      };
      sourceDiv.innerHTML = `<i class="fas ${sourceIcons[source] || 'fa-circle-info'}"></i> Source: ${source}`;
      contentDiv.appendChild(sourceDiv);
    }

    div.appendChild(avatar);
    div.appendChild(contentDiv);
    elements.messagesArea.appendChild(div);
    scrollToBottom();
  }

  /* --- Show/Hide Typing --- */
  function showTyping() {
    elements.typingIndicator.classList.remove('hidden');
    scrollToBottom();
  }

  function hideTyping() {
    elements.typingIndicator.classList.add('hidden');
  }

  /* --- Scroll --- */
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

    /* Hide welcome, show messages */
    if (elements.welcomeScreen.style.display !== 'none') {
      elements.welcomeScreen.style.display = 'none';
    }

    /* Render user message */
    renderMessage(query, true);
    elements.userInput.value = '';
    autoResize();

    /* Show typing */
    showTyping();

    /* Simulate thinking delay (min 600ms, max 2.5s, proportional to complexity) */
    const delay = Math.min(2500, Math.max(600, query.length * 20));
    await new Promise(r => setTimeout(r, delay));

    /* Process with AI */
    const result = await ai.processQuery(query);
    hideTyping();

    if (result) {
      renderMessage(result.text, false, result.source);
    }

    isProcessing = false;
    elements.sendBtn.disabled = false;
    elements.userInput.focus();
  }

  /* --- Auto-resize Textarea --- */
  function autoResize() {
    const el = elements.userInput;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  /* --- Toast Notification --- */
  function showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  /* --- New Chat --- */
  function newChat() {
    chatCount++;
    const firstMsg = ai.history.find(m => m.role === 'user');
    const label = firstMsg ? firstMsg.content.substring(0, 30) + (firstMsg.content.length > 30 ? '...' : '') : `Chat ${chatCount}`;

    /* Save to history list */
    if (ai.history.length > 0) {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `<i class="fas fa-message"></i> ${label}`;
      elements.chatHistory.prepend(item);
    }

    /* Clear */
    ai.history = [];
    elements.messagesArea.innerHTML = '';
    elements.welcomeScreen.style.display = '';
    renderSuggestions();
  }

  /* --- Export Chat --- */
  function exportChat() {
    if (ai.history.length === 0) {
      showToast('No messages to export');
      return;
    }

    let text = `KDK Core — Chat Export\n${'='.repeat(40)}\n\n`;
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
    showToast('Chat exported successfully');
  }

  /* --- Sidebar Toggle --- */
  function toggleSidebar() {
    const isOpen = elements.sidebar.classList.contains('open');
    if (window.innerWidth <= 768) {
      elements.sidebar.classList.toggle('open');
      elements.sidebarOverlay.classList.toggle('active', !isOpen);
    } else {
      elements.sidebar.classList.toggle('collapsed');
      elements.mainArea.classList.toggle('expanded');
    }
  }

  /* ============ Event Listeners ============ */
  elements.sendBtn.addEventListener('click', handleSend);

  elements.userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
    if (ai.history.length === 0) {
      showToast('Chat is already empty');
      return;
    }
    elements.messagesArea.innerHTML = '';
    ai.history = [];
    elements.welcomeScreen.style.display = '';
    renderSuggestions();
    showToast('Chat cleared');
  });

  elements.exportBtn.addEventListener('click', exportChat);

  /* ============ Initialize ============ */
  renderSuggestions();
  elements.userInput.focus();

})();
