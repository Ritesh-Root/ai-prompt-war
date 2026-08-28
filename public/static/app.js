/* ─────────────────────────────────────────────────────────
   PromptShala — AI skills for everyday work
   Frontend SPA (vanilla JS) — PayPen-style dashboard UI
   Agentic AI Mentor guides & adapts per learner.
   ───────────────────────────────────────────────────────── */

const S = {
  learnerId: localStorage.getItem('ps_learner'),
  learner: null,
  content: null,
  view: 'dashboard',
  lang: localStorage.getItem('ps_lang') || 'en',
  agentAdvice: null,
  guruOpen: false,
  guruHistory: [],
  playHistory: [],
  sidebarOpen: false
};

const T = (hi, en) => (S.lang === 'hi' ? hi : en);
const $ = (id) => document.getElementById(id);
const app = () => $('app');
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

async function api(method, url, data) {
  const res = await axios({ method, url, data });
  return res.data;
}

/* ── boot ─────────────────────────────────────────────── */
async function boot() {
  S.content = await api('get', '/api/content');
  if (S.learnerId) {
    try {
      S.learner = await api('get', '/api/learner/' + S.learnerId);
      S.lang = S.learner.lang;
    } catch { S.learnerId = null; localStorage.removeItem('ps_learner'); }
  }
  if (!S.learner) renderOnboarding();
  else { renderShell(); go('dashboard'); fetchAgentAdvice(); }
}

/* ── onboarding (like a school admission form, 3 taps) ── */
function renderOnboarding() {
  const P = S.content.professions;
  app().innerHTML = `
  <main class="min-h-screen flex items-center justify-center p-4">
    <section class="card w-full max-w-2xl p-6 md:p-10 fade-in" id="onboard-card">
      <header class="text-center mb-8">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-ink text-white flex items-center justify-center mb-4"><i class="fas fa-terminal text-xl"></i></div>
        <h1 class="font-display text-3xl md:text-4xl font-extrabold">PromptShala</h1>
        <p class="text-inksoft mt-1 font-semibold">${T('रोज़मर्रा के काम के लिए AI कौशल — कदम-दर-कदम, आपकी रफ़्तार पर','Practical AI skills for your everyday work — step by step, at your pace')}</p>
      </header>

      <div class="mb-6">
        <p class="font-extrabold mb-2"><i class="fas fa-language mr-2"></i>${T('भाषा चुनिए','Choose language')}</p>
        <div class="flex gap-2" id="ob-lang">
          <button class="chip ${S.lang==='hi'?'sel':''}" data-l="hi">हिंदी</button>
          <button class="chip ${S.lang==='en'?'sel':''}" data-l="en">English</button>
        </div>
      </div>

      <div class="mb-6">
        <p class="font-extrabold mb-2"><i class="fas fa-user mr-2"></i>${T('आपका नाम','Your name')}</p>
        <input id="ob-name" class="w-full border-2 border-line rounded-xl px-4 py-3 font-bold focus:border-ink outline-none" placeholder="${T('जैसे: रमेश','e.g. Ramesh')}" maxlength="30">
      </div>

      <div class="mb-6">
        <p class="font-extrabold mb-2"><i class="fas fa-briefcase mr-2"></i>${T('आप क्या काम करते हैं?','What do you do?')}</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2" id="ob-prof">
          ${Object.entries(P).map(([k,p]) => `
            <button class="opt-card text-center py-4" data-p="${k}">
              <i class="fas ${p.icon} text-xl mb-1"></i><br>${S.lang==='hi'?p.hi:p.en}
            </button>`).join('')}
        </div>
      </div>

      <div class="mb-8">
        <p class="font-extrabold mb-2"><i class="fas fa-robot mr-2"></i>${T('AI कितना जानते हैं?','How much AI do you know?')}</p>
        <div class="flex flex-wrap gap-2" id="ob-fam">
          <button class="chip sel" data-f="new">${T('अभी शुरू कर रहा हूँ','Just getting started')}</button>
          <button class="chip" data-f="some">${T('थोड़ी जानकारी है','Know the basics')}</button>
          <button class="chip" data-f="used">${T('इस्तेमाल कर चुका हूँ','Have used AI tools')}</button>
        </div>
      </div>

      <button id="ob-go" class="btn-ink w-full py-4 text-lg"><i class="fas fa-arrow-right mr-2"></i>${T('सीखना शुरू करें','Start learning')}</button>
      <p class="text-center text-xs text-inksoft mt-3">${T('आपका निजी AI मेंटर आपकी रफ़्तार और पेशे के हिसाब से सिखाएगा','Your personal AI Mentor adapts to your pace and profession')}</p>
    </section>
  </main>`;

  let prof = null, fam = 'new';
  $('ob-lang').onclick = (e) => { const b = e.target.closest('[data-l]'); if (!b) return; S.lang = b.dataset.l; localStorage.setItem('ps_lang', S.lang); renderOnboarding(); };
  $('ob-prof').onclick = (e) => { const b = e.target.closest('[data-p]'); if (!b) return; prof = b.dataset.p; [...$('ob-prof').children].forEach(x => x.classList.remove('correct')); b.classList.add('correct'); };
  $('ob-fam').onclick = (e) => { const b = e.target.closest('[data-f]'); if (!b) return; fam = b.dataset.f; [...$('ob-fam').children].forEach(x => x.classList.remove('sel')); b.classList.add('sel'); };
  $('ob-go').onclick = async () => {
    const name = $('ob-name').value.trim() || T('साथी','Friend');
    if (!prof) { $('ob-prof').scrollIntoView({behavior:'smooth'}); $('ob-prof').style.outline = '2px solid #E5484D'; setTimeout(()=>$('ob-prof').style.outline='',1200); return; }
    $('ob-go').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>...';
    const { id } = await api('post', '/api/learner', { name, profession: prof, lang: S.lang, familiarity: fam });
    localStorage.setItem('ps_learner', id);
    S.learnerId = id;
    S.learner = await api('get', '/api/learner/' + id);
    renderShell(); go('dashboard'); fetchAgentAdvice();
  };
}

/* ── app shell: sidebar + topbar + content area ───────── */
function renderShell() {
  const L = S.learner, P = S.content.professions[L.profession];
  app().innerHTML = `
  <div class="min-h-screen flex">
    <aside class="sidebar w-64 bg-white border-r border-line flex flex-col shrink-0" id="sidebar">
      <div class="px-5 py-5 border-b border-line flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center"><i class="fas fa-terminal text-sm"></i></div>
        <div><p class="font-display font-extrabold leading-tight">PromptShala</p>
        <p class="text-[11px] text-inksoft font-bold">${T('AI कौशल','AI skills')}</p></div>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1" id="nav" aria-label="Main">
        <p class="text-[11px] uppercase tracking-wider text-inksoft/70 font-extrabold px-3 mb-2">${T('मुख्य मेनू','Main Menu')}</p>
        ${navItem('dashboard','fa-table-columns',T('डैशबोर्ड','Dashboard'))}
        ${navItem('lessons','fa-book-open',T('पाठ','Lessons'))}
        ${navItem('playground','fa-flask',T('प्लेग्राउंड','Playground'))}
        ${navItem('report','fa-chart-simple',T('प्रगति','Progress'))}
        ${navItem('certificate','fa-award',T('प्रमाणपत्र','Certificate'))}
      </nav>
      <footer class="px-5 py-4 border-t border-line text-[11px] text-inksoft font-bold">
        <p>${T('हर भारतीय के लिए AI','AI for every Indian')}</p>
      </footer>
    </aside>

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="bg-white border-b border-line px-4 md:px-8 py-3 flex items-center gap-3 sticky top-0 z-40">
        <button id="burger" class="md:hidden btn-ghost w-10 h-10"><i class="fas fa-bars"></i></button>
        <div class="flex-1"></div>
        <button id="lang-toggle" class="chip">${S.lang === 'hi' ? 'EN' : 'हिं'}</button>
        <div class="flex items-center gap-2 border-l border-line pl-3">
          <div class="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center font-extrabold">${esc(L.name[0]||'A').toUpperCase()}</div>
          <div class="hidden sm:block leading-tight">
            <p class="font-extrabold text-sm">${esc(L.name)}</p>
            <p class="text-[11px] text-inksoft font-bold"><i class="fas ${P.icon} mr-1"></i>${S.lang==='hi'?P.hi:P.en}</p>
          </div>
        </div>
      </header>
      <main id="view" class="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto"></main>
    </div>
  </div>

  <button id="guru-fab" class="guru-fab btn-ink w-14 h-14 rounded-full text-xl" title="AI Mentor" aria-label="AI Mentor">
    <i class="fas fa-user-tie"></i>
  </button>
  <section id="guru-panel" class="guru-panel card hidden flex-col overflow-hidden" aria-label="AI Mentor chat"></section>`;

  $('nav').onclick = (e) => { const b = e.target.closest('[data-v]'); if (b) { go(b.dataset.v); if (window.innerWidth < 900) toggleSidebar(false); } };
  $('burger') && ($('burger').onclick = () => toggleSidebar());
  $('lang-toggle').onclick = () => { S.lang = S.lang === 'hi' ? 'en' : 'hi'; localStorage.setItem('ps_lang', S.lang); renderShell(); go(S.view); };
  $('guru-fab').onclick = () => toggleGuru();
}

function navItem(v, icon, label) {
  return `<button class="nav-item w-full ${S.view===v?'active':''}" data-v="${v}"><i class="fas ${icon} w-5"></i>${label}</button>`;
}
function toggleSidebar(force) {
  S.sidebarOpen = force !== undefined ? force : !S.sidebarOpen;
  $('sidebar').classList.toggle('open', S.sidebarOpen);
}
function go(view) {
  S.view = view;
  document.querySelectorAll('#nav .nav-item').forEach(b => b.classList.toggle('active', b.dataset.v === view));
  const V = { dashboard: renderDashboard, lessons: renderLessons, playground: renderPlayground, report: renderReport, certificate: renderCertificate };
  (V[view] || renderDashboard)();
  $('view').classList.remove('fade-in'); void $('view').offsetWidth; $('view').classList.add('fade-in');
}

/* ── agent advice (the Guru decides next step) ────────── */
async function fetchAgentAdvice() {
  try {
    S.agentAdvice = await api('post', '/api/agent/next', { learnerId: S.learnerId });
    if (S.view === 'dashboard') renderDashboard();
  } catch {}
}

async function refreshLearner() {
  S.learner = await api('get', '/api/learner/' + S.learnerId);
}

boot();
