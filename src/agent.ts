// ─────────────────────────────────────────────────────────────
// PromptShala Agentic Guru
// A true agent loop: OBSERVE (events) → UPDATE (learner model)
// → DECIDE (next best action) → ACT (personalized guidance)
// The Guru maintains a persistent learner model in D1 and adapts
// pace, language, difficulty and examples per learner.
// ─────────────────────────────────────────────────────────────
import { PROFESSIONS } from './content'

export interface Env {
  DB: D1Database
  OPENAI_API_KEY: string
  OPENAI_BASE_URL: string
}

export interface LearnerModel {
  pace: 'slow' | 'normal' | 'fast'
  confidence: number          // 0-100
  promptSkill: number         // 0-100 rolling score from grades
  struggles: string[]         // observed weak areas
  wins: string[]              // observed strengths
  lastAdvice: string
  quizCorrect: number
  quizTotal: number
  gradedCount: number
}

export const DEFAULT_MODEL: LearnerModel = {
  pace: 'normal', confidence: 30, promptSkill: 0,
  struggles: [], wins: [], lastAdvice: '',
  quizCorrect: 0, quizTotal: 0, gradedCount: 0
}

// ── LLM helper (OpenAI-compatible; server-side only) ──────────
export async function llm(
  env: Env,
  messages: { role: string; content: string }[],
  opts: { json?: boolean; model?: string } = {}
): Promise<string> {
  const body: any = {
    model: opts.model || 'gpt-5-mini',
    messages
  }
  if (opts.json) body.response_format = { type: 'json_object' }

  const res = await fetch(`${env.OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`LLM error ${res.status}: ${t.slice(0, 300)}`)
  }
  const data: any = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

export function safeJson<T>(text: string, fallback: T): T {
  try {
    const m = text.match(/\{[\s\S]*\}/)
    return m ? JSON.parse(m[0]) : fallback
  } catch {
    return fallback
  }
}

// ── Learner persistence ───────────────────────────────────────
export async function getLearner(env: Env, id: string) {
  const row = await env.DB.prepare('SELECT * FROM learners WHERE id = ?').bind(id).first<any>()
  if (!row) return null
  let state: LearnerModel = DEFAULT_MODEL
  try { state = { ...DEFAULT_MODEL, ...JSON.parse(row.state || '{}') } } catch {}
  return { ...row, state }
}

export async function saveLearnerState(env: Env, id: string, state: LearnerModel) {
  await env.DB.prepare('UPDATE learners SET state = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(JSON.stringify(state), id).run()
}

export async function logEvent(env: Env, learnerId: string, type: string, data: any) {
  await env.DB.prepare('INSERT INTO events (learner_id, type, data) VALUES (?, ?, ?)')
    .bind(learnerId, type, JSON.stringify(data)).run()
}

export async function recentEvents(env: Env, learnerId: string, limit = 12) {
  const { results } = await env.DB.prepare(
    'SELECT type, data, created_at FROM events WHERE learner_id = ? ORDER BY id DESC LIMIT ?'
  ).bind(learnerId, limit).all()
  return (results || []).reverse()
}

// ── OBSERVE + UPDATE: deterministic learner-model updates ─────
export function updateModelFromEvent(state: LearnerModel, type: string, data: any): LearnerModel {
  const s = { ...state }
  if (type === 'quiz_answer') {
    s.quizTotal++
    if (data.correct) { s.quizCorrect++; s.confidence = Math.min(100, s.confidence + 6) }
    else { s.confidence = Math.max(5, s.confidence - 4) }
    const acc = s.quizTotal ? s.quizCorrect / s.quizTotal : 0
    s.pace = acc > 0.85 && s.quizTotal >= 3 ? 'fast' : acc < 0.5 && s.quizTotal >= 3 ? 'slow' : 'normal'
  }
  if (type === 'grade') {
    s.gradedCount++
    const score = Number(data.score) || 0
    s.promptSkill = s.gradedCount === 1 ? score : Math.round(s.promptSkill * 0.6 + score * 0.4)
    s.confidence = Math.min(100, s.confidence + (score >= 70 ? 8 : 3))
    if (Array.isArray(data.weak) && data.weak.length) {
      s.struggles = [...new Set([...s.struggles, ...data.weak])].slice(-4)
    }
    if (Array.isArray(data.strong) && data.strong.length) {
      s.wins = [...new Set([...s.wins, ...data.strong])].slice(-4)
    }
  }
  if (type === 'prompt_run') s.confidence = Math.min(100, s.confidence + 2)
  if (type === 'lesson_done') s.confidence = Math.min(100, s.confidence + 3)
  return s
}

// ── Shared persona builder ────────────────────────────────────
export function guruPersona(learner: any, lang: string) {
  const prof = PROFESSIONS[learner.profession] || PROFESSIONS.student
  const s: LearnerModel = learner.state
  const langLine = lang === 'hi'
    ? 'Reply ONLY in clear, respectful Hindi (Devanagari). Common English tech words like AI, prompt, WhatsApp may stay in English.'
    : 'Reply ONLY in clear, plain English. Professional but warm.'
  return `You are "AI Mentor" — a professional, respectful and encouraging mentor inside PromptShala, a platform that teaches working adults across India how to use AI tools (ChatGPT, Gemini, Claude) effectively in their daily work.

THE LEARNER YOU ARE MENTORING RIGHT NOW:
- Name: ${learner.name}
- Profession: ${prof.en} (${prof.context})
- Pace: ${s.pace} | Confidence: ${s.confidence}/100 | Prompt skill: ${s.promptSkill}/100
- Areas to strengthen: ${s.struggles.join(', ') || 'none observed yet'}
- Strengths: ${s.wins.join(', ') || 'none observed yet'}

MENTORING RULES:
1. ${langLine}
2. Treat the learner as a capable, intelligent adult who is simply new to AI. NEVER be condescending, never imply they are slow or behind. Frame every gap as a normal next step that every professional goes through.
3. Avoid unnecessary jargon; when a technical term is genuinely useful (prompt, context, few-shot), use it and briefly define it once.
4. Adapt to pace: slow → smaller steps and reassurance that this is normal; fast → add one stretch challenge.
5. Every example MUST come from the learner's own profession and daily work.
6. Encourage by pointing to concrete progress ("your last prompt included context — that is exactly right"), not empty praise.
7. Do NOT use emojis or emoticons anywhere.
8. Keep answers SHORT — this learner often reads on a phone.`
}
