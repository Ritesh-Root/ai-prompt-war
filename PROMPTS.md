# PROMPTS.md — AI & Prompting Log (for PromptWars submission)

This project is *about* prompting and was *built with* prompting. This log documents both layers.

## Layer 1 — Prompts INSIDE the product (engineered system prompts)

### 1. The Guru Persona (shared foundation, `src/agent.ts → guruPersona`)
Technique: **dynamic persona injection** — the system prompt is rebuilt on every call with the learner's live model:
```
You are "AI Guru" — a warm, patient Indian mentor...
THE LEARNER YOU ARE MENTORING RIGHT NOW:
- Profession: Shopkeeper (runs a small kirana store... uses WhatsApp for business)
- Pace: slow | Confidence: 35/100 | Prompt skill: 55/100
- Struggles: missing-details, no-format
MENTORING RULES:
1. Reply ONLY in simple, warm Hindi...
2. NEVER use jargon... use daily-life analogies (shop, kitchen, farm, school)
3. Adapt to pace: slow → tiny steps + more encouragement...
4. Every example MUST come from the learner's own profession...
```

### 2. The Agent Decision prompt (`/api/agent/next`)
Technique: **constrained autonomous decision-making with structured output** — the LLM receives the remaining curriculum + recent event log and must return a JSON decision:
```
DECISION RULES:
- If learner is struggling (wrong quizzes, low grades), pick an easier/earlier lesson...
- If learner is fast & confident, you may skip ahead one lesson...
Respond with ONLY this JSON:
{"action":"lesson"|"certificate","lessonId":...,"message":...,"tip":...,"challenge":...}
```
Guardrail: server-side validation re-checks the chosen lessonId against actually-remaining lessons.

### 3. The Report Card grader (`/api/grade`)
Technique: **rubric prompting + machine-readable side channel** — grades clarity/detail/structure 1–5 for the human, AND returns english weakness tags (`"weak":["missing-details"]`) that are never shown raw but update the learner model. Prompts acting as *sensors* in the agent loop.

### 4. Personalized task & workflow generators (`/api/agent/task`, `/api/agent/workflow`)
Technique: **weakness-targeted generation** — "If they struggled before with: missing-details, design the task so practicing that area helps." Workflows use **prompt chaining** (each step consumes the previous AI answer), teaching learners the most powerful real-world technique by making them *do* it.

### 5. The Playground responder
Technique: **audience-calibrated responses** — "this may be the user's very first AI conversation — make it feel magical and successful", language auto-matching, hard length cap for phone reading.

## Layer 2 — Prompts used to BUILD the product (meta)

1. **Idea forging**: iterated the concept via prompts analyzing the judging rubric ("map each criterion weight to a feature") → the agentic-Guru architecture came from prompting for "what makes a learning platform agentic rather than static content".
2. **Curriculum authoring**: bilingual lesson content, quiz options, and profession-specific prompt blocks were AI-drafted with prompts like *"Explain 'what is a prompt' to a kirana shopkeeper in warm Hindi using a shop-counter analogy, 40 words max"* — then human-curated.
3. **Code generation**: backend (Hono agent loop, D1 schema) and frontend (PayPen-style dashboard from a reference screenshot) were generated through iterative prompting in an AI coding agent, including *"build an observe→model→decide→act loop where LLM decisions are validated server-side and deterministic reducers own the numeric state"*.
4. **Debugging by prompt**: console errors (escaped-quote syntax failures, 401 token mismatch) were diagnosed and fixed through targeted prompts against logs.

## Key prompting techniques demonstrated
- Dynamic persona injection (per-user system prompts)
- Structured JSON output with decision rules + defensive parsing
- Rubric grading with dual human/machine outputs
- Prompt chaining (taught to users AND used internally)
- Language/audience calibration & jargon suppression
- Graceful-degradation design (every AI call has a non-AI fallback)
