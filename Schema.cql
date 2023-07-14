SELECT * FROM questions_by_product_id
WHERE product_id = <some UUID>
AND reported = false;

SELECT * FROM answers_by_question_id
WHERE product_id = <some UUID>
AND reported = false;

SELECT * FROM report_answer
WHERE product_id = <some UUID>
AND answer_id = <some UUID>;




CREATE TABLE IF NOT EXISTS mark_question_helpful (
  id uuid,
  helpful int,
  PRIMARY KEY((id))
);

CREATE TABLE IF NOT EXISTS mark_answer_helpful (
  id uuid,
  helpful int,
  PRIMARY KEY((id))
);

CREATE TABLE IF NOT EXISTS report_question (
  id uuid,
  reported boolean,
  PRIMARY KEY((id))
);

CREATE TABLE IF NOT EXISTS report_answer (
  id uuid,
  reported boolean,
  PRIMARY KEY((id))
);








CREATE TABLE IF NOT EXISTS questions_by_product_id (
  id uuid,
  product_id int,
  body text,
  date_written date,
  asker_name text,
  asker_email text,
  reported boolean,
  helpful int,
  PRIMARY KEY((product_id), id)
) WITH CLUSTERING ORDER BY (id ASC);

CREATE TABLE IF NOT EXISTS answer_by_question_id (
  id uuid,
  question_id int,
  body text,
  date_written date,
  answer_name text,
  answer_email text,
  reported boolean,
  helpful int,
  PRIMARY KEY((question_id), id)
) WITH CLUSTERING ORDER BY (id ASC);

CREATE TABLE IF NOT EXISTS photos_by_answer_id (
  id uuid,
  answer_id int,
  url text,
  PRIMARY KEY((answer_id), id)
) WITH CLUSTERING ORDER BY (id ASC);