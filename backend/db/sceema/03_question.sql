DROP TABLE IF EXISTS Questions CASCADE;

CREATE TABLE Questions (
  question_id SERIAL PRIMARY KEY NOT NULL,
  category_id INT NOT NULL,
  question_text TEXT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);
