DROP TABLE IF EXISTS UserProgress CASCADE;

CREATE TABLE UserProgress (
  progress_id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  is_answered BOOLEAN,
  user_answer_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
  FOREIGN KEY (user_answer_id) REFERENCES Answers(answer_id) ON DELETE SET NULL
);