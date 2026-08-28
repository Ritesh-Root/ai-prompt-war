# PromptShala — AI ki Barakhadi 🇮🇳

> **India learns AI the way it learned the alphabet.**
> An agentic-AI-guided platform that teaches everyday Indians (shopkeepers, farmers, teachers, tailors, students, home-makers) how to use AI in their daily work — with the pedagogy of a child learning अ आ इ ई.

Built for **PromptWars × AbhiyantriX 2026** (Devpost / Hack2Skill / GDG).

## Project Overview
- **Name**: PromptShala (प्रॉम्प्टशाला)
- **Goal**: Close India's AI-literacy divide. ~900M internet users, but AI usage is concentrated among English-first, tech-savvy urbanites. PromptShala teaches "how to talk to AI" in Hindi/English with zero jargon.
- **Core innovation**: A **true agentic AI Guru** — not a chatbot bolted on, but an autonomous mentor that *observes* every learner action, *maintains a persistent learner model*, *decides* the next best step, and *generates* personalized tasks and workflows from the learner's own profession.

## URLs
- **Sandbox dev**: https://3000-iy5ualdbaqz5mp0ctj5kp-a402f90a.sandbox.novita.ai
- **Production**: (deploy pending — Cloudflare Pages)

## The Barakhadi Learning Model (5 levels)
| Level | Alphabet stage | What the learner does |
|---|---|---|
| 1 · अ (Nursery) | What is AI? | Tap-quiz concept cards, zero jargon |
| 2 · का कि की (KG) | Baby prompts | Fill-in-the-blank → **live AI response** (the magic moment) |
| 3 · शब्द (Class 1) | Prompt Blocks | LEGO-style visual builder: Role + Task + Details + Format |
| 4 · वाक्य (Class 2) | Real-work prompts | **Agent-generated task** for their profession → free prompt → **AI report card** |
| 5 · कहानी (Class 3) | AI workflows | **Agent-designed 3-step prompt chain** → AI Literacy Certificate 🎓 |

## The Agentic Guru (what makes this agentic, not just AI-flavoured)
A genuine **observe → model → decide → act** loop:

1. **OBSERVE** — every quiz answer, prompt run, grade, and chat is logged as an event in D1.
2. **MODEL** — deterministic reducer (`updateModelFromEvent`) maintains a persistent learner model: pace (slow/normal/fast), confidence, rolling prompt-skill score, detected struggles (e.g. `missing-details`, `no-format`) and strengths.
3. **DECIDE** — `/api/agent/next`: the Guru LLM reads the learner model + last 12 events + remaining curriculum and autonomously decides the next lesson (may slow down, re-order, or skip ahead), writing a personalized message referencing what it actually observed.
4. **ACT** — `/api/agent/task` and `/api/agent/workflow` generate profession-specific tasks that deliberately exercise the learner's weak areas; `/api/grade` produces a report card whose tags feed back into the model, closing the loop.

Everything the Guru does is visible to the learner in "How your Guru sees you" — transparency builds trust for first-time AI users.

## Functional Entry Points (API)
| Method & Path | Params | Purpose |
|---|---|---|
| `GET /api/content` | — | Curriculum, levels, professions, prompt blocks |
| `POST /api/learner` | `{name, profession, lang, familiarity}` | Create learner (3-tap onboarding) |
| `GET /api/learner/:id` | — | Learner + agent state + completed lessons |
| `POST /api/learner/:id/event` | `{type, data}` | Log event; updates learner model |
| `POST /api/agent/next` | `{learnerId}` | **Agent decision**: next best step + personal message + tip |
| `POST /api/agent/task` | `{learnerId}` | **Agent-generated** profession task (Level 4) |
| `POST /api/agent/workflow` | `{learnerId}` | **Agent-designed** 3-step prompt chain (Level 5) |
| `POST /api/playground/run` | `{learnerId, prompt, history?}` | Run learner's prompt on live LLM |
| `POST /api/grade` | `{learnerId, prompt, task?}` | AI report card (clarity/detail/structure, praise, improved prompt) |
| `POST /api/guru/chat` | `{learnerId, message, history?}` | 1-on-1 mentor chat, context-aware of learner activity |

## Features Completed
- ✅ 3-tap onboarding (language → name → profession → familiarity)
- ✅ PayPen-inspired clean dashboard (white / minimal / dark-navy, sidebar layout)
- ✅ 5-level Barakhadi curriculum, fully bilingual (हिंदी / English, live toggle)
- ✅ 6 profession paths with tailored examples & blocks
- ✅ Agentic Guru: decision engine, personalized tasks, adaptive workflows, mentor chat (floating panel)
- ✅ Live AI playground with voice input (Web Speech API, hi-IN)
- ✅ Visual Prompt Blocks builder (Role/Task/Details/Format)
- ✅ AI report card grading with learner-model feedback loop
- ✅ Report Card view exposing the agent's learner model
- ✅ Printable AI Literacy Certificate
- ✅ Graceful AI-failure fallbacks (demo never breaks)

## Not Yet Implemented / Next Steps
- Cloudflare Pages production deploy + D1 production migration
- More languages (Marathi, Tamil, Bengali) — architecture is lang-key ready
- Streak system & daily reminder nudges from the Guru
- Community prompt library ("prompts that worked for shopkeepers near you")
- Text-to-speech readout of lessons for low-literacy users

## Data Architecture
- **Storage**: Cloudflare D1 (SQLite at edge)
  - `learners` — profile + JSON agent learner-model (`pace`, `confidence`, `promptSkill`, `struggles[]`, `wins[]`)
  - `events` — append-only activity log (quiz answers, prompt runs, grades, agent decisions)
- **AI**: OpenAI-compatible LLM (`gpt-5-mini`) via server-side Hono routes only — key stored in `.dev.vars` locally / Cloudflare secret in prod, never exposed to the frontend
- **Data flow**: UI action → event logged → deterministic model update → agent reads model + events → adaptive decision → UI

## AI & Prompting Approach (hackathon submission section)
- **Layered prompt design**: a shared `guruPersona()` system-prompt builder injects the live learner model (pace, confidence, struggles) into every agent call, so a single persona stays consistent while adapting per learner.
- **Structured-output prompting**: all agent endpoints demand strict JSON schemas with decision rules ("if struggling → easier lesson + encouragement; if fast → stretch challenge"), parsed defensively with fallbacks.
- **Grading rubric prompting**: the report-card prompt scores clarity/detail/structure 1–5 and returns machine-readable weakness tags (`missing-details`, `no-format`) that feed the learner model — prompts as sensors, not just generators.
- **Meta**: the platform itself was built AI-first — architecture, curriculum content, and code iterated through prompting (see `PROMPTS.md`).

## User Guide
1. Open the app → pick language, name, profession, AI familiarity (3 taps).
2. Dashboard shows your **Guru's personal message** — tap "Start next step".
3. Complete lessons: tap quizzes → fill-blank live AI → prompt blocks → free prompts with report cards → final workflow.
4. Ask the floating 🧙 **AI Guru** anything, anytime — it knows your history.
5. Finish all 5 levels → print your **AI Literacy Certificate**.

## Deployment
- **Platform**: Cloudflare Pages + Workers (Hono), D1 database
- **Status**: ✅ Running in sandbox (dev) | ⏳ Production deploy pending
- **Tech Stack**: Hono + TypeScript + Vite + TailwindCSS (CDN) + vanilla JS SPA + Cloudflare D1 + OpenAI-compatible LLM
- **Local dev**: `npm run build && pm2 start ecosystem.config.cjs` (wrangler pages dev on :3000, `--d1 --local`)
- **Last Updated**: 2026-08-28
