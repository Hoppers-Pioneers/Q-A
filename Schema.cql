








CREATE TABLE IF NOT EXISTS questions_by_product_id (
  id bigint,
  product_id bigint,
  body text,
  date_written bigint,
  asker_name text,
  asker_email text,
  reported tinyint,
  helpful int,
  PRIMARY KEY((product_id), id)
) WITH CLUSTERING ORDER BY (id ASC);

COPY questions_by_product_id (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM 'questions.csv' WITH DELIMITER=',' AND HEADER=TRUE;






CREATE TABLE IF NOT EXISTS answers_by_question_id (
  id bigint,
  question_id bigint,
  body text,
  date_written bigint,
  answerer_name text,
  answerer_email text,
  reported tinyint,
  helpful int,
  PRIMARY KEY((question_id), id)
) WITH CLUSTERING ORDER BY (id ASC);

COPY answers_by_question_id (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM 'answers.csv' WITH DELIMITER=',' AND HEADER=TRUE;






CREATE TABLE IF NOT EXISTS photos_by_answer_id (
  id bigint,
  answer_id bigint,
  url text,
  PRIMARY KEY((answer_id), id)
) WITH CLUSTERING ORDER BY (id ASC);

 COPY photos_by_answer_id (id, answer_id, url) FROM 'answers_photos.csv' WITH DELIMITER=',' AND HEADER=TRUE;






 CREATE MATERIALIZED VIEW qna.questions_by_reported
 AS SELECT *
 FROM qna.questions_by_product_id
 WHERE reported IS NOT NULL
 AND id IS NOT NULL
 AND product_id IS NOT NULL
 PRIMARY KEY (reported, product_id, id);

 CREATE MATERIALIZED VIEW qna.answers_by_reported
 AS SELECT *
 FROM qna.answers_by_question_id
 WHERE reported IS NOT NULL
 AND id IS NOT NULL
 AND question_id IS NOT NULL
 PRIMARY KEY (reported, question_id, id);

 CREATE MATERIALIZED VIEW qna.questions_by_id
 AS SELECT *
 FROM qna.questions_by_product_id
 WHERE id IS NOT NULL
 AND product_id IS NOT NULL
 PRIMARY KEY (id, product_id);

CREATE MATERIALIZED VIEW qna.answers_by_id
 AS SELECT *
 FROM qna.answers_by_question_id
 WHERE id IS NOT NULL
 AND question_id IS NOT NULL
 PRIMARY KEY (id, question_id);






DROP MATERIALIZED VIEW questions_by_id ;
DROP MATERIALIZED VIEW qna.answers_by_reported;
DROP MATERIALIZED VIEW qna.questions_by_reported;
DROP TABLE qna.questions_by_product_id;
DROP TABLE qna.answers_by_question_id;
DROP TABLE photos_by_answer_id;