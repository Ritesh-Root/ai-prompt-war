import { Hono } from 'hono'
import { cors } from 'hono/cors'
import {
  Env, getLearner, saveLearnerState, logEvent, recentEvents,
  updateModelFromEvent, llm, safeJson, guruPersona, DEFAULT_MODEL
} from './agent'
import { LESSONS, LEVELS, PROFESSIONS, BLOCKS } from './content'
import { page } from './page'

const app = new Hono<{ Bindings: Env }>()

app.use('/api/*', cors())

// ── Static content APIs ───────────────────────────────────────
app.get('/api/content', (c) => c.json({ lessons: LESSONS, levels: LEVELS, professions: PROFESSIONS, blocks: BLOCKS }))

// ── Learner APIs ──────────────────────────────────────────────
app.post('/api/learner', async (c) => {
  const { name, profession, lang, familiarity } = await c.req.json()
  const id = crypto.randomUUID()
  const state = { ...DEFAULT_MODEL }
  if (familiarity === 'some') { state.confidence = 50 }
  if (familiarity === 'used') { state.confidence = 65; state.pace = 'fast' }
  await c.env.DB.prepare(
    'INSERT INTO learners (id, name, profession, lang, familiarity, state) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(id, name || 'Learner', profession || 'student', lang || 'hi', familiarity || 'new', JSON.stringify(state)).run()
  await logEvent(c.env, id, 'signup', { profession, lang, familiarity })
  return c.json({ id })
})

app.get('/api/learner/:id', async (c) => {
  const learner = await getLearner(c.env, c.req.param('id'))
  if (!learner) return c.json({ error: 'not_found' }, 404)
  const { results } = await c.env.DB.prepare(
    "SELECT data FROM events WHERE learner_id = ? AND type = 'lesson_done'"
  ).bind(learner.id).all()
  const done = [...new Set((results || []).map((r: any) => { try { return JSON.parse(r.data).lessonId } catch { return null } }).filter(Boolean))]
  return c.json({ ...learner, doneLessons: done })
})

app.post('/api/learner/:id/event', async (c) => {
  const id = c.req.param('id')
  const { type, data } = await c.req.json()
  const learner = await getLearner(c.env, id)
  if (!learner) return c.json({ error: 'not_found' }, 404)
  await logEvent(c.env, id, type, data || {})
  const newState = updateModelFromEvent(learner.state, type, data || {})
  await saveLearnerState(c.env, id, newState)
  if (type === 'lesson_done') {
    await c.env.DB.prepare('UPDATE learners SET stars = stars + ?, last_active = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(Number(data?.stars) || 1, id).run()
  }
  return c.json({ ok: true, state: newState })
})

// ── AGENT: the Guru decides the learner's next best step ─────
// True agentic loop: observe events → reason over learner model → decide → act
app.post('/api/agent/next', async (c) => {
  const { learnerId } = await c.req.json()
  const learner = await getLearner(c.env, learnerId)
  if (!learner) return c.json({ error: 'not_found' }, 404)
  const events = await recentEvents(c.env, learnerId, 12)
  const { results } = await c.env.DB.prepare(
    "SELECT data FROM events WHERE learner_id = ? AND type = 'lesson_done'"
  ).bind(learnerId).all()
  const done = [...new Set((results || []).map((r: any) => { try { return JSON.parse(r.data).lessonId } catch { return null } }).filter(Boolean))]
  const remaining = LESSONS.filter(l => !done.includes(l.id)).map(l => ({ id: l.id, level: l.level, title: l.title.en, type: l.activity.type }))

  const sys = guruPersona(learner, learner.lang) + `

YOU ARE NOW ACTING AS AN AUTONOMOUS MENTOR-AGENT.
Observe the learner's recent activity, then DECIDE their next best step.

LESSONS NOT YET COMPLETED (in curriculum order): ${JSON.stringify(remaining)}
RECENT ACTIVITY LOG: ${JSON.stringify(events).slice(0, 3000)}

DECISION RULES:
- If learner is struggling (wrong quizzes, low grades), pick an easier/earlier remaining lesson and lower the challenge; give extra encouragement.
- If learner is fast & confident, you may skip ahead one lesson or add a stretch challenge.
- If all lessons done, action = "certificate".
- "message" = 2-3 short sentences: greet by name, mention ONE specific thing you noticed from their activity, then tell them what to do next and why. Use learner's language. Respectful and professional; no emojis.
- "tip" = one practical prompting micro-tip tied to their profession.

Respond with ONLY this JSON:
{"action":"lesson"|"certificate","lessonId":"<id or null>","message":"...","tip":"...","challenge":"<optional stretch challenge or empty string>"}`

  try {
    const out = await llm(c.env, [
      { role: 'system', content: sys },
      { role: 'user', content: 'Decide my next step now.' }
    ], { json: true })
    const decision = safeJson(out, {
      action: remaining.length ? 'lesson' : 'certificate',
      lessonId: remaining[0]?.id || null,
      message: '', tip: '', challenge: ''
    })
    if (decision.action === 'lesson' && !remaining.find(r => r.id === decision.lessonId)) {
      decision.lessonId = remaining[0]?.id || null
      if (!decision.lessonId) decision.action = 'certificate'
    }
    const st = { ...learner.state, lastAdvice: decision.message }
    await saveLearnerState(c.env, learnerId, st)
    await logEvent(c.env, learnerId, 'agent_decision', decision)
    return c.json(decision)
  } catch (e: any) {
    // graceful fallback keeps the demo alive
    return c.json({
      action: remaining.length ? 'lesson' : 'certificate',
      lessonId: remaining[0]?.id || null,
      message: learner.lang === 'hi'
        ? `${learner.name} जी, चलिए अगला कदम बढ़ाते हैं।`
        : `${learner.name}, let's take the next step.`,
      tip: '', challenge: '', fallback: true
    })
  }
})

// ── AGENT: generate a personalized real-work task (Level 4) ──
app.post('/api/agent/task', async (c) => {
  const { learnerId } = await c.req.json()
  const learner = await getLearner(c.env, learnerId)
  if (!learner) return c.json({ error: 'not_found' }, 404)
  const sys = guruPersona(learner, learner.lang) + `

Create ONE realistic mini-task the learner would actually face in their daily work, which they must solve by writing a prompt to AI.
Adapt difficulty: pace=${learner.state.pace}, promptSkill=${learner.state.promptSkill}.
If they struggled before with: ${learner.state.struggles.join(', ') || '—'}, design the task so practicing that area helps.

Respond ONLY JSON: {"task":"<the scenario, 2 sentences, learner's language>","hint":"<one-line hint about what to include in their prompt>"}`
  try {
    const out = await llm(c.env, [
      { role: 'system', content: sys },
      { role: 'user', content: 'Give me my task.' }
    ], { json: true })
    return c.json(safeJson(out, { task: '', hint: '' }))
  } catch {
    const prof = PROFESSIONS[learner.profession]
    return c.json({
      task: learner.lang === 'hi'
        ? `अपने काम (${prof.hi}) से जुड़ा कोई एक असली काम सोचिए और उसके लिए AI को प्रॉम्प्ट लिखिए।`
        : `Think of one real task from your work (${prof.en}) and write a prompt to AI for it.`,
      hint: learner.lang === 'hi' ? 'भूमिका + काम + जानकारी + ढंग — चारों ब्लॉक डालिए' : 'Include role + task + details + format',
      fallback: true
    })
  }
})

// ── AGENT: workflow generator (Level 5) ──────────────────────
app.post('/api/agent/workflow', async (c) => {
  const { learnerId } = await c.req.json()
  const learner = await getLearner(c.env, learnerId)
  if (!learner) return c.json({ error: 'not_found' }, 404)
  const sys = guruPersona(learner, learner.lang) + `

Design a realistic 3-step WORKFLOW from the learner's daily work where each step is solved with one AI prompt, and each step builds on the previous step's output (a prompt chain).
Example shape for a shopkeeper: 1) plan festival offer → 2) write WhatsApp message from that plan → 3) make a follow-up message for customers who didn't reply.

Respond ONLY JSON:
{"title":"<workflow name>","steps":[{"goal":"<what this step achieves>","starter":"<a partial prompt the learner should complete/improve>"},...3 steps]}`
  try {
    const out = await llm(c.env, [
      { role: 'system', content: sys },
      { role: 'user', content: 'Give me my workflow.' }
    ], { json: true })
    return c.json(safeJson(out, { title: '', steps: [] }))
  } catch {
    return c.json({
      title: learner.lang === 'hi' ? 'मेरा पहला AI workflow' : 'My first AI workflow',
      steps: [
        { goal: learner.lang === 'hi' ? 'योजना बनाना' : 'Make a plan', starter: learner.lang === 'hi' ? 'मेरे काम के लिए एक योजना बनाओ...' : 'Make a plan for my work...' },
        { goal: learner.lang === 'hi' ? 'मैसेज लिखना' : 'Write a message', starter: learner.lang === 'hi' ? 'इस योजना से एक मैसेज लिखो...' : 'From this plan write a message...' },
        { goal: learner.lang === 'hi' ? 'सुधार करना' : 'Improve it', starter: learner.lang === 'hi' ? 'इसे और छोटा और मज़ेदार बनाओ' : 'Make it shorter and more fun' }
      ],
      fallback: true
    })
  }
})

// ── PLAYGROUND: run learner's prompt on real AI ───────────────
app.post('/api/playground/run', async (c) => {
  const { learnerId, prompt, history } = await c.req.json()
  const learner = learnerId ? await getLearner(c.env, learnerId) : null
  if (!prompt || String(prompt).trim().length < 2) return c.json({ error: 'empty_prompt' }, 400)
  const lang = learner?.lang || 'hi'
  const sys = `You are the friendly AI inside PromptShala's practice playground for new Indian AI learners.
- Answer the user's prompt genuinely and helpfully.
- Keep it SHORT (under 140 words) and phone-friendly.
- Match the language of the user's prompt (Hindi → Hindi, English → simple English). Default: ${lang === 'hi' ? 'Hindi' : 'English'}.
- Clear, plain words; this may be the user's very first AI conversation — make it genuinely useful and confidence-building. Treat them as a capable adult.
- Do NOT use emojis.`
  const msgs: any[] = [{ role: 'system', content: sys }]
  if (Array.isArray(history)) for (const h of history.slice(-6)) msgs.push(h)
  msgs.push({ role: 'user', content: String(prompt).slice(0, 2000) })
  try {
    const reply = await llm(c.env, msgs)
    if (learner) {
      await logEvent(c.env, learner.id, 'prompt_run', { prompt: String(prompt).slice(0, 300) })
      await saveLearnerState(c.env, learner.id, updateModelFromEvent(learner.state, 'prompt_run', {}))
    }
    return c.json({ reply })
  } catch (e: any) {
    return c.json({ error: 'ai_unavailable', detail: e.message }, 502)
  }
})

// ── GRADER: report card for the learner's prompt ─────────────
app.post('/api/grade', async (c) => {
  const { learnerId, prompt, task } = await c.req.json()
  const learner = await getLearner(c.env, learnerId)
  if (!learner) return c.json({ error: 'not_found' }, 404)
  const sys = guruPersona(learner, learner.lang) + `

You are grading the learner's prompt like a kind school teacher grading homework.
${task ? `The task given was: "${task}"` : ''}
Grade on: clarity (is the ask clear?), detail (enough context?), structure (role/task/details/format present?).

Respond ONLY JSON:
{"score":<0-100>,"stars":<1-3>,"clarity":<1-5>,"detail":<1-5>,"structure":<1-5>,
"praise":"<one warm specific praise, learner's language>",
"improve":"<ONE most-important improvement tip, learner's language>",
"better":"<an improved version of their prompt, learner's language>",
"weak":["<internal english tags e.g. missing-details, no-format>"],"strong":["<english tags>"]}`
  try {
    const out = await llm(c.env, [
      { role: 'system', content: sys },
      { role: 'user', content: `My prompt: "${String(prompt).slice(0, 1500)}"` }
    ], { json: true })
    const grade = safeJson(out, { score: 60, stars: 2, clarity: 3, detail: 3, structure: 3, praise: '', improve: '', better: '', weak: [], strong: [] })
    await logEvent(c.env, learnerId, 'grade', grade)
    await saveLearnerState(c.env, learnerId, updateModelFromEvent(learner.state, 'grade', grade))
    return c.json(grade)
  } catch (e: any) {
    return c.json({ error: 'ai_unavailable', detail: e.message }, 502)
  }
})

// ── GURU CHAT: always-available mentor sidebar ────────────────
app.post('/api/guru/chat', async (c) => {
  const { learnerId, message, history } = await c.req.json()
  const learner = await getLearner(c.env, learnerId)
  if (!learner) return c.json({ error: 'not_found' }, 404)
  const events = await recentEvents(c.env, learner.id, 8)
  const sys = guruPersona(learner, learner.lang) + `

You are chatting 1-on-1 as their personal mentor. Recent activity: ${JSON.stringify(events).slice(0, 1500)}
Answer their question, connect it to what they're learning, keep under 90 words.`
  const msgs: any[] = [{ role: 'system', content: sys }]
  if (Array.isArray(history)) for (const h of history.slice(-8)) msgs.push(h)
  msgs.push({ role: 'user', content: String(message).slice(0, 1000) })
  try {
    const reply = await llm(c.env, msgs)
    await logEvent(c.env, learner.id, 'agent_chat', { q: String(message).slice(0, 200) })
    return c.json({ reply })
  } catch (e: any) {
    return c.json({ error: 'ai_unavailable' }, 502)
  }
})

// ── Frontend ──────────────────────────────────────────────────
app.get('/', (c) => c.html(page()))

export default app
