DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER REFERENCES questions (id),
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL
);