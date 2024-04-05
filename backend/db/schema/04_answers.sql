DROP TABLE IF EXISTS Answers CASCADE;

CREATE TABLE Answers (
  answer_id SERIAL PRIMARY KEY NOT NULL,
  question_id INT NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);
