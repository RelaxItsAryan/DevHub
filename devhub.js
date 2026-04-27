// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Replace with your new Groq API key after regenerating it
const GROQ_KEY = 'YOUR_GROQ_API_KEY_HERE';

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const ARTICLES = [
  {id:1,source:'HN',title:'OpenAI launches GPT-5 with unlimited context window and real-time web access',excerpt:'The company announced a new flagship model that can process entire codebases in a single prompt, marking a significant leap in AI capabilities.',author:'sama',tags:['AI','LLMs'],time:'2h ago',read:'6 min',upvotes:3241,comments:847,img:'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80'},
  {id:2,source:'HN',title:'Startup raises $180M to build autonomous AI agents for enterprise workflows',excerpt:'Backed by Sequoia and a16z, the company claims their agents can handle complex multi-step tasks with 94% accuracy without human intervention.',author:'pgvibes',tags:['Startups','AI'],time:'4h ago',read:'4 min',upvotes:1892,comments:432,img:'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80'},
  {id:3,source:'HN',title:'Why I quit FAANG after 8 years to build a one-person SaaS — $40k MRR update',excerpt:'A candid breakdown of the journey from Google engineer to indie hacker, including everything that went wrong before things went right.',author:'indiedev',tags:['Career','Startups'],time:'6h ago',read:'12 min',upvotes:4102,comments:1023,img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80'},
  {id:4,source:'HN',title:'PostgreSQL 17 performance benchmarks against MySQL and SQLite — the results surprised us',excerpt:'Comprehensive benchmark suite across OLTP, OLAP, and mixed workloads reveals surprising winners in each category.',author:'dbnerds',tags:['Databases','DevOps'],time:'8h ago',read:'9 min',upvotes:987,comments:231,img:'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80'},
  {id:5,source:'DEV',title:'Building a real-time collaborative editor with React and CRDTs from scratch',excerpt:'Step-by-step guide to implementing conflict-free replicated data types in a web app, with working code and live demo included.',author:'webwitch',tags:['Web Dev','React'],time:'3h ago',read:'15 min',upvotes:765,comments:88,img:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80'},
  {id:6,source:'DEV',title:'Rust in 2025: why it finally clicked for me as a JavaScript developer',excerpt:'After three failed attempts, here is the mental model that made Rust ownership and borrowing finally make sense.',author:'rustacean42',tags:['Rust','Web Dev'],time:'5h ago',read:'8 min',upvotes:2341,comments:312,img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80'},
  {id:7,source:'DEV',title:'TypeScript 5.8 features you should start using today',excerpt:'From const type parameters to variadic tuple types improvements — a practical guide with real-world use cases for each feature.',author:'tsmaster',tags:['TypeScript','Web Dev'],time:'7h ago',read:'7 min',upvotes:1123,comments:145,img:'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80'},
  {id:8,source:'DEV',title:'How I used the Groq API to build a 10ms AI response chatbot',excerpt:'Groq LPU inference engine makes real-time AI responses possible. Here is how to integrate it into your web app in under 30 minutes.',author:'fastaidev',tags:['AI','Web Dev'],time:'10h ago',read:'5 min',upvotes:889,comments:97,img:'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80'},
  {id:9,source:'GH',title:'shadcn/ui hits 80k stars — the component library that changed React UI development',excerpt:'The copy-paste component library built on Radix and Tailwind continues its meteoric rise, with new blocks and themes dropping weekly.',author:'shadcn',tags:['Open Source','React'],time:'1h ago',read:'3 min',upvotes:5410,comments:632,img:'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80'},
  {id:10,source:'GH',title:'Ollama v0.4 — run any open-source LLM locally with one command',excerpt:'New release adds support for Llama 3.3, Phi-4, and Gemma 3 with automatic GPU detection and quantization selection.',author:'ollama-team',tags:['AI','Open Source'],time:'3h ago',read:'4 min',upvotes:3872,comments:521,img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80'},
  {id:11,source:'GH',title:'Bun 2.0 ships with native Node.js compatibility and 3x faster npm installs',excerpt:'The JavaScript runtime and toolkit reaches a major milestone with full Node.js API compatibility and dramatically improved package installation speed.',author:'jarred',tags:['Web Dev','Open Source'],time:'5h ago',read:'6 min',upvotes:6231,comments:743,img:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80'},
  {id:12,source:'GH',title:'Zed editor goes open source — the fastest code editor written in Rust',excerpt:'After raising $22M, Zed opens its entire codebase. Benchmarks show 50% faster startup and rendering vs VS Code.',author:'zed-team',tags:['Open Source','Rust'],time:'9h ago',read:'5 min',upvotes:8943,comments:1241,img:'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80'},
  {id:13,source:'AR',title:'Mamba-2: Linear-time sequence modeling with state space duality',excerpt:'We introduce a theoretical framework connecting state space models and attention, enabling linear-time inference without sacrificing model quality.',author:'Gu et al.',tags:['AI','LLMs'],time:'12h ago',read:'18 min',upvotes:432,comments:67,img:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80'},
  {id:14,source:'AR',title:'Constitutional AI: training a harmless assistant without human labels',excerpt:'We explore a method for training AI systems to be helpful and harmless using AI-generated feedback as a substitute for human preference labels.',author:'Anthropic Research',tags:['AI','LLMs'],time:'1d ago',read:'22 min',upvotes:891,comments:134,img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80'},
  {id:15,source:'AR',title:'FlashAttention-3: fast and memory-efficient exact attention on H100 GPUs',excerpt:'We present FlashAttention-3 which achieves 1.5x–2x speedup over FlashAttention-2 through asynchrony and low-precision computation.',author:'Dao et al.',tags:['AI','Infrastructure'],time:'1d ago',read:'14 min',upvotes:1203,comments:178,img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80'},
  {id:16,source:'AR',title:'Scaling laws for neural language models: revisited at 10 trillion tokens',excerpt:'Updated analysis of compute-optimal training at unprecedented scale reveals new insights into the relationship between model size, data, and performance.',author:'OpenAI Research',tags:['AI','LLMs'],time:'2d ago',read:'16 min',upvotes:2341,comments:389,img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80'},
];

const TAGS  = ['All','AI','Web Dev','Startups','Open Source','Security','DevOps','Mobile','Databases','Career','Rust','TypeScript','LLMs','Infrastructure'];
const SORTS = ['Trending_','Newest_','Top Voted_','Most Discussed_'];

// ─── STATE ────────────────────────────────────────────────────────────────────
let activeTag  = 'All';
let activeSort = 0;
let searchQ    = '';
let upvoted    = JSON.parse(localStorage.getItem('dp_upvoted') || '{}');
let saved      = JSON.parse(localStorage.getItem('dp_saved')   || '{}');
const articles = [...ARTICLES];

// ─── BOOT SEQUENCE ────────────────────────────────────────────────────────────
const bootLines = [
  { t: '$ booting DevHub feed engine v2.5.0', d: 0 },
  { t: '> linking sources: Hacker News | Dev.to | GitHub | arXiv', d: 350 },
  { t: '> syncing 847 stories and ranking by momentum', d: 780 },
  { t: '> indexing tags: ai, web dev, rust, infra, startups', d: 1180 },
  { t: '> spinning up Groq summary lane', d: 1540 },
  { t: '> restoring saved articles and profile stats', d: 1920 },
  { t: '> feed console unlocked', d: 2280 },
];

function runBoot() {
  const el = document.getElementById('boot-lines');
  const progress = document.getElementById('boot-progress-fill');
  const status = document.getElementById('boot-status');
  const total = bootLines.length;

  bootLines.forEach(({ t, d }, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.textContent = t;
      el.appendChild(line);
      if (progress) progress.style.width = `${((i + 1) / total) * 100}%`;
      if (status) status.textContent = t.replace(/^[$>]\s*/, '');
    }, d);
  });
  setTimeout(endBoot, 2950);
}

function endBoot() {
  const boot = document.getElementById('boot');
  boot.style.transition = 'opacity .4s, transform .4s';
  boot.style.opacity = '0';
  boot.style.transform = 'scale(1.02)';
  setTimeout(() => {
    boot.style.display = 'none';
    document.getElementById('app').classList.add('visible');
    initApp();
  }, 400);
}

initMatrix();
runBoot();

// ─── HERO TYPEWRITER ──────────────────────────────────────────────────────────
function typeWriter(elId, html, speed = 18) {
  const el = document.getElementById(elId);
  el.innerHTML = '';
  const text = html;
  let i = 0;
  const interval = setInterval(() => {
    el.innerHTML = text.slice(0, i);
    i++;
    if (i > text.length) clearInterval(interval);
  }, speed);
}

function initTerminal() {
  typeWriter('t1', '<span class="g">$</span> fetching --source=HackerNews,DevTo,GitHub,Arxiv');
  setTimeout(() => typeWriter('t2', '<span class="g">></span> 847 articles loaded — <span class="c">4 AI · 12 WebDev · 7 OSS · 3 Research</span>'), 900);
  setTimeout(() => typeWriter('t3', '<span class="g">></span> Trending: <span class="w">"OpenAI launches GPT-5 with unlimited context"</span>'), 1800);
  setTimeout(() => typeWriter('t4', '<span class="g">></span> AI Engine: <span class="c">Groq LPU ready — avg response 180ms</span>'), 2700);
}

function initApp() {
  initTerminal();
  buildTagBar();
  buildSortBar();
  renderGrid();
  updateSaveBadge();
}

// ─── MATRIX RAIN BACKGROUND ────────────────────────────────────────────────────
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let columns = Math.floor(width / 16);
  const drops = Array(columns).fill(1);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / 16);
    drops.length = columns;
    for (let i = 0; i < columns; i++) {
      drops[i] = drops[i] || 1;
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(3, 8, 14, 0.09)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#4af2c5';
    ctx.font = '16px JetBrains Mono';

    drops.forEach((y, i) => {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      const x = i * 16;
      ctx.fillText(text, x, y * 16);

      if (y * 16 > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 55);
}

function buildTagBar() {
  const el = document.getElementById('tag-bar');
  TAGS.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tag' + (t === activeTag ? ' active' : '');
    b.textContent = t;
    b.onclick = () => {
      activeTag = t;
      document.querySelectorAll('.tag').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      renderGrid();
    };
    el.appendChild(b);
  });
}

function buildSortBar() {
  const el = document.getElementById('sort-bar');
  SORTS.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'sort-btn mono' + (i === 0 ? ' active' : '');
    b.textContent = s;
    b.onclick = () => {
      activeSort = i;
      document.querySelectorAll('.sort-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      renderGrid();
    };
    el.appendChild(b);
  });
}

function filterArticles() {
  searchQ = document.getElementById('search').value.toLowerCase();
  renderGrid();
}

function getFiltered() {
  let list = [...articles];
  if (activeTag !== 'All')
    list = list.filter(a => a.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase())));
  if (searchQ)
    list = list.filter(a =>
      a.title.toLowerCase().includes(searchQ) ||
      a.excerpt.toLowerCase().includes(searchQ) ||
      a.author.toLowerCase().includes(searchQ)
    );
  if (activeSort === 1) list.sort((a, b) => b.id - a.id);
  else if (activeSort === 2) list.sort((a, b) => b.upvotes - a.upvotes);
  else if (activeSort === 3) list.sort((a, b) => b.comments - a.comments);
  return list;
}

function badgeClass(src) {
  return { HN: 'badge-hn', DEV: 'badge-dev', GH: 'badge-gh', AR: 'badge-ar' }[src] || 'badge-hn';
}
function badgeFull(src) {
  return { HN: 'Hacker News', DEV: 'Dev.to', GH: 'GitHub', AR: 'Arxiv' }[src] || src;
}

function renderGrid(targetId = 'grid') {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = '';
  const list = targetId === 'saved-grid'
    ? articles.filter(a => saved[a.id])
    : getFiltered();

  if (targetId === 'saved-grid') {
    document.getElementById('saved-empty').style.display = list.length ? 'none' : 'block';
  }
  list.forEach(a => el.appendChild(makeCard(a)));
}

function makeCard(a) {
  const div = document.createElement('div');
  div.className = 'card';
  const uv = upvoted[a.id] || 0;
  const sv = saved[a.id] || 0;

  div.innerHTML = `
    <div class="card-top">
      <span class="source-badge mono ${badgeClass(a.source)}">${a.source}</span>
    </div>
    ${a.img ? `<img class="card-img" src="${a.img}" alt="" onerror="this.style.display='none'"/>` : ''}
    <div class="card-title">${a.title}</div>
    <div class="card-excerpt">${a.excerpt}</div>
    <div class="tag-pills">
      ${a.tags.map(t => `<span class="tag-pill">#${t.toLowerCase().replace(' ', '')}</span>`).join('')}
    </div>
    <div class="card-meta">
      <div class="author-circle">${a.author.slice(0, 2).toUpperCase()}</div>
      ${a.author} · ${a.time} · ${a.read}
    </div>
    <hr class="divider"/>
    <div class="card-actions">
      <button class="action-btn mono${uv ? ' upvoted' : ''}" id="uv-${a.id}" onclick="toggleUpvote(${a.id}, event)">
        ▲ <span id="uvc-${a.id}">${a.upvotes + uv}</span>
      </button>
      <button class="action-btn mono${sv ? ' saved' : ''}" id="sv-${a.id}" onclick="toggleSave(${a.id}, event)">
        ⌗ <span id="svc-${a.id}">${sv ? 'SAVED' : 'SAVE'}</span>
      </button>
      <button class="action-btn mono" onclick="copyLink(event)">⎘ SHARE</button>
      <span class="comments-count mono">// ${a.comments}</span>
      <button class="ai-btn mono" onclick="openModal(${a.id}, event)">⚡ AI</button>
    </div>`;
  return div;
}

function toggleUpvote(id, e) {
  e.stopPropagation();
  upvoted[id] = upvoted[id] ? 0 : 1;
  localStorage.setItem('dp_upvoted', JSON.stringify(upvoted));

  const btn = document.getElementById('uv-' + id);
  const cnt = document.getElementById('uvc-' + id);
  const art = articles.find(a => a.id === id);
  cnt.textContent = art.upvotes + (upvoted[id] || 0);
  btn.classList.toggle('upvoted', !!upvoted[id]);

  if (upvoted[id]) {
    const f = document.createElement('span');
    f.className = 'float-plus';
    f.textContent = '+1';
    btn.appendChild(f);
    setTimeout(() => f.remove(), 700);
  }
  showToast(upvoted[id] ? '▲ UPVOTED_' : '▼ REMOVED_');
}

function toggleSave(id, e) {
  e.stopPropagation();
  saved[id] = saved[id] ? 0 : 1;
  localStorage.setItem('dp_saved', JSON.stringify(saved));

  const btn = document.getElementById('sv-' + id);
  const cnt = document.getElementById('svc-' + id);
  btn.classList.toggle('saved', !!saved[id]);
  cnt.textContent = saved[id] ? 'SAVED' : 'SAVE';
  updateSaveBadge();
  showToast(saved[id] ? '⌗ ARTICLE SAVED_' : '⌗ REMOVED_');
}

function updateSaveBadge() {
  const n = Object.values(saved).filter(Boolean).length;
  document.getElementById('save-badge').textContent = n;
}

function copyLink(e) {
  e.stopPropagation();
  navigator.clipboard.writeText(window.location.href).catch(() => {});
  showToast('⎘ LINK COPIED_');
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast mono';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function showPage(page) {
  document.getElementById('home-page').style.display  = page === 'home' ? 'block' : 'none';
  document.getElementById('saved-page').classList.toggle('active', page === 'saved');
  document.getElementById('profile-page').classList.toggle('active', page === 'profile');
  if (page === 'saved')   renderGrid('saved-grid');
  if (page === 'profile') renderProfile();
}

function renderProfile() {
  const n = Object.values(upvoted).filter(Boolean).length;
  const s = Object.values(saved).filter(Boolean).length;
  document.getElementById('profile-box').textContent =
`┌──────────────────────────────┐
│  USER: dev_user_01           │
│  STATUS: online ●            │
│  UPVOTES GIVEN: ${String(n).padEnd(13)}│
│  ARTICLES SAVED: ${String(s).padEnd(12)}│
│  TOP TAGS: #ai #rust #web   │
│  SESSION: active             │
└──────────────────────────────┘`;

  const hist = document.getElementById('upvote-history');
  hist.innerHTML = '';
  const upvotedArticles = articles.filter(a => upvoted[a.id]);
  if (!upvotedArticles.length) {
    hist.innerHTML = '<div style="font-family:JetBrains Mono,monospace;font-size:12px;color:var(--muted)">// no upvotes yet</div>';
    return;
  }
  upvotedArticles.forEach(a => {
    const d = document.createElement('div');
    d.style = 'padding:10px 14px;border:1px solid var(--border);border-radius:4px;margin-bottom:8px;font-size:12px;color:var(--muted);font-family:JetBrains Mono,monospace';
    d.innerHTML = `<span style="color:var(--green)">▲</span> ${a.title}`;
    hist.appendChild(d);
  });
}

async function openModal(id, e) {
  if (e) e.stopPropagation();
  const a = articles.find(x => x.id === id);
  if (!a) return;

  document.getElementById('modal').classList.add('open');
  document.getElementById('modal-title').textContent = a.title;
  document.getElementById('modal-badge').innerHTML =
    `<span class="source-badge mono ${badgeClass(a.source)}">${badgeFull(a.source)}</span>`;
  document.getElementById('modal-meta').textContent = `${a.author} · ${a.time} · ${a.read}`;

  const mimg = document.getElementById('modal-img');
  if (a.img) { mimg.src = a.img; mimg.style.display = 'block'; }
  else { mimg.style.display = 'none'; }

  document.getElementById('modal-summary').innerHTML =
    '<div class="ai-loading"><div class="spinner"></div><span>Generating AI summary via Groq...</span></div>';
  document.getElementById('modal-related').innerHTML =
    '<div class="ai-loading"><div class="spinner"></div><span>Fetching related news...</span></div>';

  await fetchAISummary(a);
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal'))
    document.getElementById('modal').classList.remove('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('modal').classList.remove('open');
});

async function fetchAISummary(a) {
  const prompt = `You are a developer news analyst. For this article, provide:

1. A clear, insightful 3-paragraph explanation for a developer audience. Make it engaging, technical, and include why it matters.
2. Three related recent news items (realistic and plausible) with title and a one-line summary.

Article title: "${a.title}"
Article excerpt: "${a.excerpt}"
Source: ${a.source}
Tags: ${a.tags.join(', ')}

Respond ONLY in this exact JSON format, no preamble, no markdown fences:
{
  "summary": ["paragraph1", "paragraph2", "paragraph3"],
  "related": [
    {"title": "...", "meta": "source · time"},
    {"title": "...", "meta": "source · time"},
    {"title": "...", "meta": "source · time"}
  ]
}`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_KEY
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 900,
        temperature: 0.7
      })
    });

    const data = await res.json();
    const raw  = data.choices?.[0]?.message?.content || '';
    const json = JSON.parse(raw.replace(/```json|```/g, '').trim());

    document.getElementById('modal-summary').innerHTML =
      json.summary.map(p => `<p>${p}</p>`).join('');

    document.getElementById('modal-related').innerHTML =
      json.related.map(r => `
        <div class="related-card">
          <div class="related-title">${r.title}</div>
          <div class="related-meta">${r.meta}</div>
        </div>`).join('');

  } catch (err) {
    document.getElementById('modal-summary').innerHTML =
      '<p style="color:var(--muted)">Could not load AI summary. Check your API key in the GROQ_KEY variable.</p>';
    document.getElementById('modal-related').innerHTML =
      '<p style="color:var(--muted)">Could not load related news.</p>';
  }
}
