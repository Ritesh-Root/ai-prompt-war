-- PromptShala core schema
CREATE TABLE IF NOT EXISTS learners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Learner',
  profession TEXT NOT NULL DEFAULT 'student',
  lang TEXT NOT NULL DEFAULT 'hi',
  familiarity TEXT NOT NULL DEFAULT 'new',
  state TEXT NOT NULL DEFAULT '{}',          -- JSON learner model maintained by the agent
  stars INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_active TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  learner_id TEXT NOT NULL,
  type TEXT NOT NULL,                        -- lesson_done | quiz_answer | prompt_run | grade | agent_chat
  data TEXT NOT NULL DEFAULT '{}',           -- JSON payload
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_learner ON events(learner_id, created_at);
