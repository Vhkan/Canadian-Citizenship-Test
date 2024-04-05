DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories (id),
  question_text TEXT NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 3)
);