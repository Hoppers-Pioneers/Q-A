const client = require('../database');
const random = require('random-bigint')


exports.getAll = async ({ question_id }) => {
  const params = [0, question_id];
  console.log(question_id);
  const query = 'SELECT * FROM answers_by_reported WHERE reported = ? AND question_id = ?';
  return await client.execute(query, params, {prepare: true});
};

exports.add = async ({ question_id, body, name, email }) => {
  const date_written = new Date().getTime();

  const params = [question_id, random(32).toString(), email, name, body, date_written, 0, 0];

  const query = 'INSERT INTO qna.answers_by_question_id (question_id, id, answerer_email, answerer_name, body, date_written, helpful, reported) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

  console.log(query, params)

  return await client.execute(query, params, {prepare: true});
};