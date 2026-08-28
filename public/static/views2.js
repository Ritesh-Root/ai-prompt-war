/* ── Playground (free practice with voice input) ──────── */
function renderPlayground() {
  $('view').innerHTML = `
  <h1 class="font-display text-2xl md:text-3xl font-extrabold mb-1">${T('AI मैदान','AI Playground')}</h1>
  <p class="text-inksoft font-bold text-sm mb-6">${T('यहाँ जो चाहे पूछिए — गलती की कोई चिंता नहीं!','Ask anything here — no fear of mistakes!')}</p>
  <section class="card p-4 md:p-6 max-w-3xl">
    <div id="play-chat" class="space-y-3 mb-4 max-h-[50vh] overflow-y-auto">
      ${S.playHistory.length ? S.playHistory.map(m => m.role === 'user'
        ? `<div class="bubble-user p-3 ml-8 text-sm font-bold">${esc(m.content)}</div>`
        : `<div class="bubble-ai p-4 mr-4 text-sm font-semibold whitespace-pre-wrap">${esc(m.content)}</div>`).join('')
        : `<div class="bubble-ai p-4 mr-4 text-sm font-semibold">${T('नमस्ते! मैं AI हूँ। कुछ भी पूछिए — जैसे "आज रात के खाने की रेसिपी बताओ" 😊','Hello! I am AI. Ask me anything — like "suggest a dinner recipe" 😊')}</div>`}
    </div>
    <div class="flex gap-2">
      <button id="mic-btn" class="btn-ghost w-12 h-12 shrink-0" title="${T('बोलकर पूछें','Speak your prompt')}"><i class="fas fa-microphone"></i></button>
      <input id="play-input" class="flex-1 border-2 border-line rounded-xl px-4 font-bold focus:border-ink outline-none" placeholder="${T('अपना प्रॉम्प्ट लिखिए या बोलिए...','Type or speak your prompt...')}" maxlength="500">
      <button id="play-send" class="btn-ink w-12 h-12 shrink-0"><i class="fas fa-paper-plane"></i></button>
    </div>
    <p class="text-[11px] font-bold text-inksoft mt-2"><i class="fas fa-shield-heart mr-1"></i>${T('अभ्यास का सुरक्षित मैदान — यहाँ कुछ भी बिगड़ता नहीं','A safe practice ground — nothing can break here')}</p>
  </section>`;

  const send = async () => {
    const p = $('play-input').value.trim(); if (!p) return;
    $('play-input').value = '';
    S.playHistory.push({ role: 'user', content: p });
    const chat = $('play-chat');
    chat.insertAdjacentHTML('beforeend', `<div class="bubble-user p-3 ml-8 text-sm font-bold">${esc(p)}</div><div class="bubble-ai p-4 mr-4" id="pending">${'<div class="typing"><span></span><span></span><span></span></div>'}</div>`);
    chat.scrollTop = chat.scrollHeight;
    try {
      const { reply } = await api('post', '/api/playground/run', { learnerId: S.learnerId, prompt: p, history: S.playHistory.slice(0, -1) });
      S.playHistory.push({ role: 'assistant', content: reply });
      $('pending').outerHTML = `<div class="bubble-ai p-4 mr-4 text-sm font-semibold whitespace-pre-wrap">${esc(reply)}</div>`;
    } catch { $('pending').outerHTML = aiError(); }
    chat.scrollTop = chat.scrollHeight;
  };
  $('play-send').onclick = send;
  $('play-input').onkeydown = (e) => { if (e.key === 'Enter') send(); };

  // Voice input (Web Speech API) — accessibility for low-literacy users
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    const rec = new SR();
    rec.lang = S.lang === 'hi' ? 'hi-IN' : 'en-IN';
    rec.onresult = (e) => { $('play-input').value = e.results[0][0].transcript; $('mic-btn').innerHTML = '<i class="fas fa-microphone"></i>'; };
    rec.onerror = () => { $('mic-btn').innerHTML = '<i class="fas fa-microphone"></i>'; };
    $('mic-btn').onclick = () => { $('mic-btn').innerHTML = '<i class="fas fa-circle text-red-500 fa-beat"></i>'; rec.start(); };
  } else {
    $('mic-btn').style.display = 'none';
  }
}

/* ── Report card view ─────────────────────────────────── */
function renderReport() {
  const st = S.learner.state || {};
  const total = S.content.lessons.length, done = (S.learner.doneLessons || []).length;
  $('view').innerHTML = `
  <h1 class="font-display text-2xl md:text-3xl font-extrabold mb-6">${T('रिपोर्ट कार्ड','Report Card')}</h1>
  <div class="grid md:grid-cols-2 gap-4 max-w-4xl">
    <section class="card p-6">
      <h2 class="font-extrabold mb-4"><i class="fas fa-chart-simple mr-2"></i>${T('आपकी प्रगति','Your progress')}</h2>
      <div class="space-y-4">
        ${meter(T('पाठ पूरे','Lessons'), Math.round((done/total)*100))}
        ${meter(T('आत्मविश्वास','Confidence'), st.confidence || 0)}
        ${meter(T('प्रॉम्प्ट स्किल','Prompt skill'), st.promptSkill || 0)}
      </div>
      <div class="grid grid-cols-2 gap-3 mt-5">
        <div class="bg-paper border border-line rounded-xl p-3 text-center"><p class="font-display text-2xl font-extrabold">${S.learner.stars||0}</p><p class="text-xs font-extrabold text-inksoft">${T('सितारे','Stars')}</p></div>
        <div class="bg-paper border border-line rounded-xl p-3 text-center"><p class="font-display text-2xl font-extrabold">${st.quizCorrect||0}/${st.quizTotal||0}</p><p class="text-xs font-extrabold text-inksoft">${T('सही जवाब','Quiz correct')}</p></div>
      </div>
    </section>
    <section class="card p-6">
      <h2 class="font-extrabold mb-4"><i class="fas fa-hat-wizard mr-2"></i>${T('गुरु जी की टिप्पणी','Guru\'s remarks')}</h2>
      ${st.lastAdvice ? `<p class="bg-paper border border-line rounded-xl p-4 font-bold text-sm leading-relaxed mb-3">"${esc(st.lastAdvice)}"</p>` : `<p class="text-sm font-bold text-inksoft mb-3">${T('अभी कोई टिप्पणी नहीं — पाठ शुरू कीजिए!','No remarks yet — start a lesson!')}</p>`}
      ${st.wins && st.wins.length ? `<p class="text-xs font-bold text-leaf bg-leaf/10 rounded-lg px-3 py-2 mb-2"><i class="fas fa-thumbs-up mr-1"></i>${st.wins.map(esc).join(', ')}</p>` : ''}
      ${st.struggles && st.struggles.length ? `<p class="text-xs font-bold text-saffron bg-saffron/10 rounded-lg px-3 py-2"><i class="fas fa-dumbbell mr-1"></i>${st.struggles.map(esc).join(', ')}</p>` : ''}
      <button class="btn-ink w-full py-3 mt-4" onclick="toggleGuru(true)"><i class="fas fa-comments mr-2"></i>${T('गुरु से बात करें','Talk to Guru')}</button>
    </section>
  </div>`;
}

/* ── Certificate ──────────────────────────────────────── */
function renderCertificate() {
  const total = S.content.lessons.length, done = (S.learner.doneLessons || []).length;
  const earned = done >= total;
  const P = S.content.professions[S.learner.profession];
  if (!earned) {
    $('view').innerHTML = `
    <h1 class="font-display text-2xl md:text-3xl font-extrabold mb-6">${T('प्रमाणपत्र','Certificate')}</h1>
    <section class="card p-8 max-w-xl text-center">
      <i class="fas fa-lock text-4xl text-inksoft/40 mb-4"></i>
      <p class="font-display text-xl font-extrabold mb-2">${T('अभी थोड़ा और!','Almost there!')}</p>
      <p class="font-bold text-inksoft mb-4">${T(`सारे ${total} पाठ पूरे कीजिए (${done} हो गए) और अपना AI साक्षरता प्रमाणपत्र पाइए।`,`Complete all ${total} lessons (${done} done) to earn your AI Literacy Certificate.`)}</p>
      <div class="h-2.5 bg-line rounded-full overflow-hidden mb-5"><div class="h-full bg-ink rounded-full" style="width:${(done/total)*100}%"></div></div>
      <button class="btn-ink px-6 py-3" onclick="go('lessons')">${T('पाठ जारी रखें','Continue lessons')}</button>
    </section>`;
    return;
  }
  $('view').innerHTML = `
  <h1 class="font-display text-2xl md:text-3xl font-extrabold mb-6">${T('प्रमाणपत्र','Certificate')}</h1>
  <section class="card p-8 md:p-12 max-w-2xl mx-auto text-center border-4 border-double border-ink relative overflow-hidden" id="cert">
    <div class="absolute inset-0 opacity-[.03] text-9xl flex items-center justify-center font-display">अ</div>
    <div class="relative z-10">
      <div class="w-14 h-14 mx-auto rounded-2xl bg-ink text-white flex items-center justify-center font-display text-xl font-extrabold mb-4">अ</div>
      <p class="text-xs font-extrabold uppercase tracking-[.25em] text-inksoft mb-2">PromptShala</p>
      <h2 class="font-display text-2xl md:text-3xl font-extrabold mb-1">${T('AI साक्षरता प्रमाणपत्र','AI Literacy Certificate')}</h2>
      <p class="text-sm font-bold text-inksoft mb-6">${T('यह प्रमाणित किया जाता है कि','This certifies that')}</p>
      <p class="font-display text-3xl font-extrabold border-b-2 border-line inline-block px-6 pb-1 mb-6">${esc(S.learner.name)}</p>
      <p class="font-bold text-inksoft max-w-md mx-auto mb-6">${T(`(${P.hi}) ने AI ki Barakhadi के सभी 5 स्तर पूरे किए — अब ये AI से अपने रोज़ के काम करवाना जानते हैं! 🎉`,`(${P.en}) has completed all 5 levels of AI ki Barakhadi — and now knows how to use AI for daily work! 🎉`)}</p>
      <div class="flex items-center justify-center gap-6 text-xs font-extrabold text-inksoft">
        <span><i class="fas fa-star text-saffron mr-1"></i>${S.learner.stars} ${T('सितारे','stars')}</span>
        <span><i class="fas fa-calendar mr-1"></i>${new Date().toLocaleDateString(S.lang==='hi'?'hi-IN':'en-IN')}</span>
        <span><i class="fas fa-hat-wizard mr-1"></i>AI Guru ${T('द्वारा सत्यापित','verified')}</span>
      </div>
    </div>
  </section>
  <div class="text-center mt-5"><button class="btn-ink px-6 py-3" onclick="window.print()"><i class="fas fa-download mr-2"></i>${T('प्रमाणपत्र सेव करें','Save certificate')}</button></div>`;
}

/* ── Guru chat panel (floating mentor) ────────────────── */
function toggleGuru(force) {
  S.guruOpen = force !== undefined ? force : !S.guruOpen;
  const panel = $('guru-panel');
  panel.classList.toggle('hidden', !S.guruOpen);
  panel.classList.toggle('flex', S.guruOpen);
  if (S.guruOpen) drawGuru();
}

function drawGuru() {
  const panel = $('guru-panel');
  panel.innerHTML = `
    <header class="bg-ink text-white px-4 py-3 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"><i class="fas fa-hat-wizard"></i></div>
      <div class="flex-1"><p class="font-extrabold text-sm">AI Guru</p><p class="text-[11px] text-white/60 font-bold">${T('आपका निजी गुरु — आपको जानता है','Your personal mentor — knows you')}</p></div>
      <button onclick="toggleGuru(false)" class="text-white/70 hover:text-white"><i class="fas fa-xmark"></i></button>
    </header>
    <div id="guru-chat" class="flex-1 overflow-y-auto p-3 space-y-2 bg-white min-h-[220px] max-h-[45vh]">
      ${S.guruHistory.length ? S.guruHistory.map(m => m.role === 'user'
        ? `<div class="bubble-user p-2.5 ml-6 text-sm font-bold">${esc(m.content)}</div>`
        : `<div class="bubble-ai p-3 mr-3 text-sm font-semibold whitespace-pre-wrap">${esc(m.content)}</div>`).join('')
        : `<div class="bubble-ai p-3 mr-3 text-sm font-semibold">${T(`नमस्ते ${esc(S.learner.name)} जी! 🙏 मैं आपका AI गुरु हूँ। कुछ भी पूछिए — "प्रॉम्प्ट कैसे सुधारूँ?", "AI मेरे काम में कैसे मदद करेगा?"`,`Namaste ${esc(S.learner.name)}! 🙏 I'm your AI Guru. Ask me anything — "how do I improve my prompt?", "how can AI help my work?"`)}</div>`}
    </div>
    <div class="p-3 border-t border-line bg-white flex gap-2">
      <input id="guru-input" class="flex-1 border-2 border-line rounded-lg px-3 py-2 text-sm font-bold focus:border-ink outline-none" placeholder="${T('गुरु से पूछिए...','Ask your Guru...')}" maxlength="400">
      <button id="guru-send" class="btn-ink w-10 h-10 shrink-0"><i class="fas fa-paper-plane text-sm"></i></button>
    </div>`;
  const send = async () => {
    const m = $('guru-input').value.trim(); if (!m) return;
    $('guru-input').value = '';
    S.guruHistory.push({ role: 'user', content: m });
    const chat = $('guru-chat');
    chat.insertAdjacentHTML('beforeend', `<div class="bubble-user p-2.5 ml-6 text-sm font-bold">${esc(m)}</div><div class="bubble-ai p-3 mr-3" id="guru-pending"><div class="typing"><span></span><span></span><span></span></div></div>`);
    chat.scrollTop = chat.scrollHeight;
    try {
      const { reply } = await api('post', '/api/guru/chat', { learnerId: S.learnerId, message: m, history: S.guruHistory.slice(0, -1) });
      S.guruHistory.push({ role: 'assistant', content: reply });
      $('guru-pending').outerHTML = `<div class="bubble-ai p-3 mr-3 text-sm font-semibold whitespace-pre-wrap">${esc(reply)}</div>`;
    } catch {
      $('guru-pending').outerHTML = `<div class="bubble-ai p-3 mr-3 text-sm font-bold text-red-500">${T('गुरु जी अभी व्यस्त हैं — फिर कोशिश करें','Guru is busy — try again')}</div>`;
    }
    chat.scrollTop = chat.scrollHeight;
  };
  $('guru-send').onclick = send;
  $('guru-input').onkeydown = (e) => { if (e.key === 'Enter') send(); };
  $('guru-input').focus();
}
