DROP TABLE IF EXISTS user_progress CASCADE;
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER REFERENCES users (id),
  "question_id" INTEGER REFERENCES questions (id),
  "is_answered" BOOLEAN,
  "user_answer_id" INTEGER
);