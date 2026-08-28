/* ── Dashboard (PayPen-style layout) ─────────────────── */
function renderDashboard() {
  const L = S.learner, adv = S.agentAdvice;
  const total = S.content.lessons.length;
  const done = (L.doneLessons || []).length;
  const pct = Math.round((done / total) * 100);
  const st = L.state || {};

  $('view').innerHTML = `
  <div class="flex items-center justify-between mb-5">
    <h1 class="font-display text-2xl md:text-3xl font-extrabold">${T('डैशबोर्ड','Dashboard')}</h1>
    <span class="text-xs font-bold text-inksoft">${new Date().toLocaleDateString(S.lang==='hi'?'hi-IN':'en-IN',{day:'numeric',month:'long'})}</span>
  </div>

  <section class="card bg-ink text-white p-6 md:p-8 mb-6 relative overflow-hidden" id="guru-banner" style="background:#23252F">
    <div class="relative z-10 max-w-xl">
      <p class="text-xs font-extrabold uppercase tracking-wider text-white/60 mb-1"><i class="fas fa-hat-wizard mr-1"></i>${T('आपके AI गुरु का संदेश','Message from your AI Guru')}</p>
      <div id="guru-msg" class="font-display text-lg md:text-xl font-bold leading-snug">
        ${adv ? esc(adv.message) : `<span class="typing"><span></span><span></span><span></span></span>`}
      </div>
      ${adv && adv.tip ? `<p class="mt-3 text-sm text-white/80 bg-white/10 rounded-lg px-3 py-2 inline-block"><i class="fas fa-lightbulb text-saffron mr-1"></i>${esc(adv.tip)}</p>` : ''}
      <div class="mt-4">
        <button id="guru-next-btn" class="bg-white text-ink font-extrabold rounded-lg px-5 py-2.5 hover:bg-gray-100 transition">
          ${adv && adv.action === 'certificate' ? T('प्रमाणपत्र लें 🎓','Get certificate 🎓') : T('अगला कदम शुरू करें','Start next step')} <i class="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
    </div>
    <i class="fas fa-hat-wizard absolute -right-4 -bottom-6 text-[9rem] text-white/5"></i>
  </section>

  <div class="grid md:grid-cols-3 gap-4 mb-6">
    ${statCard('fa-star', T('सितारे','Stars'), L.stars || 0, 'text-saffron')}
    ${statCard('fa-book-open', T('पाठ पूरे','Lessons done'), done + ' / ' + total, 'text-leaf')}
    ${statCard('fa-gauge-high', T('प्रॉम्प्ट स्किल','Prompt skill'), (st.promptSkill || 0) + '/100', 'text-ink')}
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <section class="card p-6">
      <h2 class="font-extrabold mb-4"><i class="fas fa-map mr-2"></i>${T('आपकी बारहखड़ी यात्रा','Your Barakhadi journey')}</h2>
      <div class="mb-3 h-2.5 bg-line rounded-full overflow-hidden"><div class="h-full bg-ink rounded-full transition-all" style="width:${pct}%"></div></div>
      <p class="text-sm font-bold text-inksoft mb-4">${pct}% ${T('पूरा','complete')}</p>
      <div class="space-y-2">
        ${S.content.levels.map(lv => {
          const lessons = S.content.lessons.filter(x => x.level === lv.level);
          const dn = lessons.filter(x => (L.doneLessons||[]).includes(x.id)).length;
          const full = dn === lessons.length;
          return `<div class="flex items-center gap-3 py-1.5">
            <div class="w-8 h-8 rounded-lg ${full?'bg-leaf text-white':'bg-paper border border-line'} flex items-center justify-center text-sm">
              ${full ? '<i class="fas fa-check"></i>' : `<i class="fas ${lv.icon} text-inksoft"></i>`}
            </div>
            <div class="flex-1 min-w-0"><p class="font-bold text-sm truncate">${esc(lv.name[S.lang])}</p></div>
            <span class="text-xs font-extrabold text-inksoft">${dn}/${lessons.length}</span>
          </div>`;
        }).join('')}
      </div>
    </section>

    <section class="card p-6">
      <h2 class="font-extrabold mb-4"><i class="fas fa-user-graduate mr-2"></i>${T('गुरु की नज़र में आप','How your Guru sees you')}</h2>
      <div class="space-y-3 text-sm">
        ${meter(T('आत्मविश्वास','Confidence'), st.confidence || 0)}
        ${meter(T('प्रॉम्प्ट स्किल','Prompt skill'), st.promptSkill || 0)}
        <div class="flex items-center justify-between py-1">
          <span class="font-bold text-inksoft">${T('सीखने की रफ़्तार','Learning pace')}</span>
          <span class="chip pointer-events-none text-xs">${({slow:T('धीरे-धीरे 🐢','Steady 🐢'),normal:T('सामान्य 🚶','Normal 🚶'),fast:T('तेज़ 🚀','Fast 🚀')})[st.pace||'normal']}</span>
        </div>
        ${st.wins && st.wins.length ? `<p class="text-xs font-bold text-leaf bg-leaf/10 rounded-lg px-3 py-2"><i class="fas fa-thumbs-up mr-1"></i>${T('मज़बूत पक्ष','Strengths')}: ${st.wins.map(esc).join(', ')}</p>` : ''}
        ${st.struggles && st.struggles.length ? `<p class="text-xs font-bold text-saffron bg-saffron/10 rounded-lg px-3 py-2"><i class="fas fa-dumbbell mr-1"></i>${T('अभ्यास चाहिए','Needs practice')}: ${st.struggles.map(esc).join(', ')}</p>` : ''}
        <p class="text-[11px] text-inksoft/70 font-semibold pt-1"><i class="fas fa-robot mr-1"></i>${T('यह प्रोफ़ाइल आपका AI गुरु अपने-आप बनाता और बदलता रहता है','This profile is built & updated automatically by your AI Guru')}</p>
      </div>
    </section>
  </div>`;

  $('guru-next-btn').onclick = () => {
    if (adv && adv.action === 'certificate') go('certificate');
    else if (adv && adv.lessonId) openLesson(adv.lessonId);
    else go('lessons');
  };
}

function statCard(icon, label, val, color) {
  return `<div class="card p-5 flex items-center gap-4">
    <div class="w-11 h-11 rounded-xl bg-paper border border-line flex items-center justify-center ${color}"><i class="fas ${icon}"></i></div>
    <div><p class="text-xs font-extrabold text-inksoft uppercase tracking-wide">${label}</p>
    <p class="font-display text-xl font-extrabold">${val}</p></div>
  </div>`;
}
function meter(label, v) {
  return `<div><div class="flex justify-between mb-1"><span class="font-bold text-inksoft">${label}</span><span class="font-extrabold">${v}/100</span></div>
  <div class="h-2 bg-line rounded-full overflow-hidden"><div class="h-full bg-ink rounded-full transition-all" style="width:${v}%"></div></div></div>`;
}

/* ── Lessons list ─────────────────────────────────────── */
function renderLessons() {
  const L = S.learner;
  const doneSet = new Set(L.doneLessons || []);
  $('view').innerHTML = `
  <h1 class="font-display text-2xl md:text-3xl font-extrabold mb-1">${T('पाठशाला','Lessons')}</h1>
  <p class="text-inksoft font-bold text-sm mb-6">${T('जैसे अ आ इ ई — एक-एक करके, आसानी से','Like अ आ इ ई — one by one, easily')}</p>
  <div class="space-y-6">
    ${S.content.levels.map(lv => {
      const lessons = S.content.lessons.filter(x => x.level === lv.level);
      const prevLessons = S.content.lessons.filter(x => x.level < lv.level);
      const locked = lv.level > 1 && !prevLessons.every(x => doneSet.has(x.id));
      return `<section class="card p-5 md:p-6 ${locked ? 'lvl-locked' : ''}">
        <header class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center"><i class="fas ${lv.icon}"></i></div>
          <div class="flex-1"><h2 class="font-display font-extrabold">${esc(lv.name[S.lang])}</h2>
          <p class="text-xs font-bold text-inksoft">${T('स्तर','Level')}: ${esc(lv.tag[S.lang])}</p></div>
          ${locked ? '<i class="fas fa-lock text-inksoft"></i>' : ''}
        </header>
        <div class="grid sm:grid-cols-2 gap-3">
          ${lessons.map(ls => `
            <button class="opt-card text-left flex items-center gap-3 ${doneSet.has(ls.id) ? 'correct' : ''}" data-lesson="${ls.id}">
              <div class="w-8 h-8 rounded-lg ${doneSet.has(ls.id)?'bg-leaf text-white':'bg-paper border border-line'} flex items-center justify-center text-sm shrink-0">
                ${doneSet.has(ls.id) ? '<i class="fas fa-check"></i>' : '<i class="fas fa-play text-xs"></i>'}
              </div>
              <span class="text-sm">${esc(ls.title[S.lang])}</span>
            </button>`).join('')}
        </div>
      </section>`;
    }).join('')}
  </div>`;
  $('view').onclick = (e) => { const b = e.target.closest('[data-lesson]'); if (b) openLesson(b.dataset.lesson); };
}

/* ── Lesson player ────────────────────────────────────── */
let LESSON_CTX = null;

function openLesson(id) {
  const ls = S.content.lessons.find(x => x.id === id);
  if (!ls) return go('lessons');
  LESSON_CTX = { lesson: ls, completed: false };
  S.view = 'lessons';
  document.querySelectorAll('#nav .nav-item').forEach(b => b.classList.toggle('active', b.dataset.v === 'lessons'));

  $('view').innerHTML = `
  <button id="back-lessons" class="btn-ghost px-4 py-2 mb-4 text-sm"><i class="fas fa-arrow-left mr-2"></i>${T('सभी पाठ','All lessons')}</button>
  <section class="card p-6 md:p-8 max-w-3xl mx-auto fade-in">
    <p class="text-xs font-extrabold uppercase tracking-wider text-inksoft mb-2">${esc(S.content.levels.find(l=>l.level===ls.level).name[S.lang])}</p>
    <h1 class="font-display text-2xl font-extrabold mb-4">${esc(ls.title[S.lang])}</h1>
    <div class="bg-paper border border-line rounded-xl p-5 mb-6 leading-relaxed font-semibold">${ls.concept[S.lang]}</div>
    <div id="activity"></div>
  </section>`;
  $('back-lessons').onclick = () => go('lessons');

  const A = ls.activity;
  if (A.type === 'tap_quiz') renderTapQuiz(ls);
  else if (A.type === 'fill_blank') renderFillBlank(ls);
  else if (A.type === 'blocks') renderBlocks(ls);
  else if (A.type === 'free_prompt') renderFreePrompt(ls);
  else if (A.type === 'workflow') renderWorkflow(ls);
}

async function completeLesson(ls, stars) {
  if (LESSON_CTX.completed) return;
  LESSON_CTX.completed = true;
  await api('post', `/api/learner/${S.learnerId}/event`, { type: 'lesson_done', data: { lessonId: ls.id, stars } });
  await refreshLearner();
  const el = document.createElement('div');
  el.className = 'card p-5 mt-5 text-center fade-in';
  el.innerHTML = `
    <p class="font-display text-xl font-extrabold mb-1">${'⭐'.repeat(stars)} ${T('शाबाश!','Well done!')}</p>
    <p class="text-sm font-bold text-inksoft mb-4">${T('पाठ पूरा! गुरु जी आपकी प्रगति देख रहे हैं...','Lesson complete! Your Guru is watching your progress...')}</p>
    <button id="next-step" class="btn-ink px-6 py-3">${T('गुरु से अगला कदम पूछें','Ask Guru for next step')} <i class="fas fa-hat-wizard ml-1"></i></button>`;
  $('activity').appendChild(el);
  el.scrollIntoView({ behavior: 'smooth' });
  $('next-step').onclick = async () => {
    $('next-step').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    await fetchAgentAdvice();
    go('dashboard');
  };
  fetchAgentAdvice();
}

/* activity: tap quiz */
function renderTapQuiz(ls) {
  const A = ls.activity;
  $('activity').innerHTML = `
    <p class="font-extrabold mb-3"><i class="fas fa-circle-question mr-2"></i>${esc(A.question[S.lang])}</p>
    <div class="space-y-2" id="quiz-opts">
      ${A.options[S.lang].map((o,i)=>`<button class="opt-card w-full text-left" data-i="${i}">${esc(o)}</button>`).join('')}
    </div>
    <p id="quiz-fb" class="mt-3 font-bold text-sm"></p>`;
  $('quiz-opts').onclick = async (e) => {
    const b = e.target.closest('[data-i]'); if (!b || LESSON_CTX.completed) return;
    const i = Number(b.dataset.i), ok = i === A.answer;
    b.classList.add(ok ? 'correct' : 'wrong');
    api('post', `/api/learner/${S.learnerId}/event`, { type: 'quiz_answer', data: { lessonId: ls.id, correct: ok } });
    if (ok) {
      $('quiz-fb').innerHTML = `<span class="text-leaf"><i class="fas fa-check-circle mr-1"></i>${T('बिल्कुल सही!','Exactly right!')}</span>`;
      completeLesson(ls, 3);
    } else {
      $('quiz-fb').innerHTML = `<span class="text-red-500"><i class="fas fa-heart mr-1"></i>${T('कोई बात नहीं — फिर से सोचिए!','No worries — think again!')}</span>`;
    }
  };
}

/* activity: fill blank → live AI */
function renderFillBlank(ls) {
  const A = ls.activity;
  const tpl = A.template[S.lang];
  const [before, after] = tpl.split('___');
  $('activity').innerHTML = `
    <p class="font-extrabold mb-3"><i class="fas fa-pen mr-2"></i>${T('खाली जगह भरिए और AI पर चलाइए','Fill the blank and run it on AI')}</p>
    <div class="border-2 border-line rounded-xl p-4 mb-3 font-bold text-lg flex flex-wrap items-center gap-2 bg-white">
      <span>${esc(before)}</span>
      <input id="blank" class="border-b-2 border-ink outline-none px-2 py-1 min-w-[130px] bg-saffron/10 rounded-t-md text-center" placeholder="${T('यहाँ लिखें','type here')}" maxlength="60">
      <span>${esc(after || '')}</span>
    </div>
    <button id="run-blank" class="btn-ink px-6 py-3 w-full sm:w-auto"><i class="fas fa-wand-magic-sparkles mr-2"></i>${T('AI का जादू देखें','See AI magic')}</button>
    <div id="ai-out" class="mt-4"></div>`;
  $('run-blank').onclick = async () => {
    const v = $('blank').value.trim();
    if (!v) { $('blank').focus(); return; }
    const prompt = tpl.replace('___', v);
    $('ai-out').innerHTML = aiThinking();
    $('run-blank').disabled = true;
    try {
      const { reply } = await api('post', '/api/playground/run', { learnerId: S.learnerId, prompt });
      $('ai-out').innerHTML = aiReplyCard(prompt, reply);
      completeLesson(ls, 3);
    } catch { $('ai-out').innerHTML = aiError(); $('run-blank').disabled = false; }
  };
}

/* activity: prompt blocks builder */
function renderBlocks(ls) {
  const B = S.content.blocks, prof = S.learner.profession;
  const pick = (cat) => [...(B[cat][prof] || []), ...(B[cat].generic || [])];
  const groups = [
    { key: 'role', icon: '🎭', label: T('भूमिका','Role'), items: pick('role') },
    { key: 'task', icon: '📋', label: T('काम','Task'), items: pick('task') },
    { key: 'detail', icon: '🔍', label: T('जानकारी','Details'), items: pick('detail') },
    { key: 'format', icon: '📦', label: T('ढंग','Format'), items: pick('format') }
  ];
  const sel = {};
  $('activity').innerHTML = `
    <p class="font-extrabold mb-1"><i class="fas fa-cubes mr-2"></i>${T('ब्लॉक चुनकर प्रॉम्प्ट बनाइए','Build a prompt by picking blocks')}</p>
    <p class="text-sm font-bold text-inksoft mb-4">${esc(ls.activity.blockHint[S.lang])}</p>
    ${groups.map(g => `
      <div class="mb-4">
        <p class="font-extrabold text-sm mb-2">${g.icon} ${g.label}</p>
        <div class="flex flex-wrap gap-2" data-grp="${g.key}">
          ${g.items.map((it,i)=>`<button class="chip" data-i="${i}">${esc(it[S.lang])}</button>`).join('')}
        </div>
      </div>`).join('')}
    <div class="bg-paper border-2 border-dashed border-line rounded-xl p-4 mb-3">
      <p class="text-xs font-extrabold uppercase text-inksoft mb-1">${T('आपका प्रॉम्प्ट','Your prompt')}</p>
      <p id="built-prompt" class="font-bold text-inksoft/60">${T('ऊपर से ब्लॉक चुनिए...','Pick blocks above...')}</p>
    </div>
    <button id="run-blocks" class="btn-ink px-6 py-3 w-full sm:w-auto" disabled style="opacity:.5"><i class="fas fa-wand-magic-sparkles mr-2"></i>${T('AI पर चलाएँ','Run on AI')}</button>
    <div id="ai-out" class="mt-4"></div>`;

  const groupsMap = Object.fromEntries(groups.map(g=>[g.key,g.items]));
  const update = () => {
    const parts = groups.map(g => sel[g.key] !== undefined ? groupsMap[g.key][sel[g.key]][S.lang] : null).filter(Boolean);
    $('built-prompt').textContent = parts.length ? parts.join(', ') : T('ऊपर से ब्लॉक चुनिए...','Pick blocks above...');
    $('built-prompt').classList.toggle('text-inksoft/60', !parts.length);
    const ready = sel.role !== undefined && sel.task !== undefined;
    $('run-blocks').disabled = !ready;
    $('run-blocks').style.opacity = ready ? 1 : .5;
  };
  document.querySelectorAll('[data-grp]').forEach(grpEl => {
    grpEl.onclick = (e) => {
      const b = e.target.closest('[data-i]'); if (!b) return;
      [...grpEl.children].forEach(x => x.classList.remove('sel'));
      b.classList.add('sel');
      sel[grpEl.dataset.grp] = Number(b.dataset.i);
      update();
    };
  });
  $('run-blocks').onclick = async () => {
    const prompt = $('built-prompt').textContent;
    $('ai-out').innerHTML = aiThinking();
    $('run-blocks').disabled = true;
    try {
      const { reply } = await api('post', '/api/playground/run', { learnerId: S.learnerId, prompt });
      $('ai-out').innerHTML = aiReplyCard(prompt, reply);
      completeLesson(ls, 3);
    } catch { $('ai-out').innerHTML = aiError(); $('run-blocks').disabled = false; }
  };
}

/* activity: free prompt with agent task + grading */
async function renderFreePrompt(ls) {
  $('activity').innerHTML = `<div class="bg-paper border border-line rounded-xl p-4 mb-4">
    <p class="text-xs font-extrabold uppercase text-inksoft mb-1"><i class="fas fa-hat-wizard mr-1"></i>${T('गुरु जी आपके लिए काम बना रहे हैं...','Guru is preparing your task...')}</p>
    <div class="typing"><span></span><span></span><span></span></div></div>`;
  let task = { task: '', hint: '' };
  try { task = await api('post', '/api/agent/task', { learnerId: S.learnerId }); } catch {}
  $('activity').innerHTML = `
    <div class="bg-paper border border-line rounded-xl p-4 mb-4">
      <p class="text-xs font-extrabold uppercase text-inksoft mb-1"><i class="fas fa-hat-wizard mr-1"></i>${T('गुरु जी का काम (आपके लिए बनाया गया)','Your Guru\'s task (made for you)')}</p>
      <p class="font-bold">${esc(task.task)}</p>
      ${task.hint ? `<p class="text-sm font-bold text-saffron mt-2"><i class="fas fa-lightbulb mr-1"></i>${esc(task.hint)}</p>` : ''}
    </div>
    <textarea id="free-prompt" class="w-full border-2 border-line rounded-xl p-4 font-bold focus:border-ink outline-none min-h-[110px]" placeholder="${T('अपना प्रॉम्प्ट यहाँ लिखिए...','Write your prompt here...')}"></textarea>
    <div class="flex flex-wrap gap-2 mt-3">
      <button id="run-free" class="btn-ink px-6 py-3 flex-1 sm:flex-none"><i class="fas fa-wand-magic-sparkles mr-2"></i>${T('AI पर चलाएँ','Run on AI')}</button>
      <button id="grade-free" class="btn-ghost px-6 py-3 flex-1 sm:flex-none"><i class="fas fa-clipboard-check mr-2"></i>${T('रिपोर्ट कार्ड लें','Get report card')}</button>
    </div>
    <div id="ai-out" class="mt-4"></div><div id="grade-out" class="mt-4"></div>`;

  $('run-free').onclick = async () => {
    const p = $('free-prompt').value.trim(); if (!p) return $('free-prompt').focus();
    $('ai-out').innerHTML = aiThinking();
    try {
      const { reply } = await api('post', '/api/playground/run', { learnerId: S.learnerId, prompt: p });
      $('ai-out').innerHTML = aiReplyCard(p, reply);
    } catch { $('ai-out').innerHTML = aiError(); }
  };
  $('grade-free').onclick = async () => {
    const p = $('free-prompt').value.trim(); if (!p) return $('free-prompt').focus();
    $('grade-out').innerHTML = aiThinking(T('गुरु जी जाँच रहे हैं...','Guru is grading...'));
    try {
      const g = await api('post', '/api/grade', { learnerId: S.learnerId, prompt: p, task: task.task });
      $('grade-out').innerHTML = gradeCard(g);
      await refreshLearner();
      completeLesson(ls, g.stars || 2);
    } catch { $('grade-out').innerHTML = aiError(); }
  };
}

/* activity: workflow (level 5) */
async function renderWorkflow(ls) {
  $('activity').innerHTML = `<div class="bg-paper border border-line rounded-xl p-4"><p class="text-xs font-extrabold uppercase text-inksoft mb-1"><i class="fas fa-hat-wizard mr-1"></i>${T('गुरु जी आपका workflow बना रहे हैं...','Guru is designing your workflow...')}</p><div class="typing"><span></span><span></span><span></span></div></div>`;
  let wf = { title: '', steps: [] };
  try { wf = await api('post', '/api/agent/workflow', { learnerId: S.learnerId }); } catch {}
  if (!wf.steps || !wf.steps.length) { $('activity').innerHTML = aiError(); return; }
  let step = 0, lastReply = '';

  const draw = () => {
    const st = wf.steps[step];
    $('activity').innerHTML = `
      <div class="flex items-center gap-2 mb-4">
        ${wf.steps.map((_,i)=>`<div class="flex-1 h-2 rounded-full ${i<step?'bg-leaf':i===step?'bg-ink':'bg-line'}"></div>`).join('')}
      </div>
      <p class="font-display font-extrabold text-lg mb-1">${esc(wf.title)} — ${T('कदम','Step')} ${step+1}/${wf.steps.length}</p>
      <p class="font-bold text-inksoft mb-3">${esc(st.goal)}</p>
      ${lastReply ? `<div class="bg-paper border border-line rounded-xl p-3 mb-3 text-sm"><p class="text-[11px] font-extrabold uppercase text-inksoft mb-1">${T('पिछले कदम का जवाब','Previous step\'s answer')}</p>${esc(lastReply).slice(0,400)}${lastReply.length>400?'…':''}</div>` : ''}
      <textarea id="wf-prompt" class="w-full border-2 border-line rounded-xl p-4 font-bold focus:border-ink outline-none min-h-[100px]">${esc(st.starter || '')}</textarea>
      <button id="wf-run" class="btn-ink px-6 py-3 mt-3 w-full sm:w-auto"><i class="fas fa-wand-magic-sparkles mr-2"></i>${T('चलाएँ','Run')}</button>
      <div id="ai-out" class="mt-4"></div>`;
    $('wf-run').onclick = async () => {
      const p = $('wf-prompt').value.trim(); if (!p) return;
      $('ai-out').innerHTML = aiThinking();
      $('wf-run').disabled = true;
      try {
        const history = lastReply ? [{ role: 'assistant', content: lastReply }] : [];
        const { reply } = await api('post', '/api/playground/run', { learnerId: S.learnerId, prompt: p, history });
        lastReply = reply;
        $('ai-out').innerHTML = aiReplyCard(p, reply) + `
          <button id="wf-next" class="btn-ink px-6 py-3 mt-3 w-full sm:w-auto">
            ${step < wf.steps.length - 1 ? T('अगला कदम','Next step') + ' <i class="fas fa-arrow-right ml-1"></i>' : T('Workflow पूरा! 🎉','Finish workflow! 🎉')}
          </button>`;
        $('wf-next').onclick = () => {
          if (step < wf.steps.length - 1) { step++; draw(); }
          else completeLesson(ls, 3);
        };
      } catch { $('ai-out').innerHTML = aiError(); $('wf-run').disabled = false; }
    };
  };
  draw();
}

/* ── shared AI output widgets ─────────────────────────── */
function aiThinking(txt) {
  return `<div class="bubble-ai p-4"><p class="text-xs font-extrabold text-inksoft mb-1"><i class="fas fa-robot mr-1"></i>AI</p><div class="typing"><span></span><span></span><span></span></div>${txt?`<p class="text-xs font-bold text-inksoft mt-1">${txt}</p>`:''}</div>`;
}
function aiReplyCard(prompt, reply) {
  return `<div class="space-y-2 fade-in">
    <div class="bubble-user p-3 ml-8 text-sm font-bold">${esc(prompt)}</div>
    <div class="bubble-ai p-4 mr-4"><p class="text-xs font-extrabold text-inksoft mb-1"><i class="fas fa-robot mr-1"></i>AI</p><div class="text-sm font-semibold whitespace-pre-wrap leading-relaxed">${esc(reply)}</div></div>
  </div>`;
}
function aiError() {
  return `<div class="bubble-ai p-4 text-sm font-bold text-red-500"><i class="fas fa-plug-circle-xmark mr-1"></i>${T('AI से जुड़ नहीं पाए — एक बार फिर कोशिश कीजिए','Could not reach AI — please try once more')}</div>`;
}
function gradeCard(g) {
  const stars = '⭐'.repeat(g.stars || 1) + '☆'.repeat(3 - (g.stars || 1));
  const bar = (l,v)=>`<div class="flex items-center gap-2 text-xs font-bold"><span class="w-20 text-inksoft">${l}</span><div class="flex-1 h-1.5 bg-line rounded-full"><div class="h-full bg-ink rounded-full" style="width:${(v/5)*100}%"></div></div><span>${v}/5</span></div>`;
  return `<div class="card p-5 fade-in border-2 border-ink">
    <div class="flex items-center justify-between mb-3">
      <p class="font-display font-extrabold text-lg"><i class="fas fa-clipboard-check mr-2"></i>${T('रिपोर्ट कार्ड','Report Card')}</p>
      <span class="text-2xl star-pop">${stars}</span>
    </div>
    <div class="space-y-2 mb-4">
      ${bar(T('साफ़ बात','Clarity'), g.clarity||3)}
      ${bar(T('जानकारी','Detail'), g.detail||3)}
      ${bar(T('बनावट','Structure'), g.structure||3)}
    </div>
    ${g.praise?`<p class="text-sm font-bold text-leaf bg-leaf/10 rounded-lg px-3 py-2 mb-2"><i class="fas fa-heart mr-1"></i>${esc(g.praise)}</p>`:''}
    ${g.improve?`<p class="text-sm font-bold text-saffron bg-saffron/10 rounded-lg px-3 py-2 mb-2"><i class="fas fa-arrow-trend-up mr-1"></i>${esc(g.improve)}</p>`:''}
    ${g.better?`<div class="bg-paper border border-line rounded-lg px-3 py-2"><p class="text-[11px] font-extrabold uppercase text-inksoft mb-1">${T('गुरु जी का सुधरा हुआ प्रॉम्प्ट','Guru\'s improved prompt')}</p><p class="text-sm font-bold">${esc(g.better)}</p></div>`:''}
  </div>`;
}
