const client = require('../database');
const random = require('random-bigint')


exports.getAll = async ({ product_id }) => {
  const params = [0, product_id];
  const query = 'SELECT * FROM questions_by_reported WHERE reported = ? AND product_id = ?';
  return await client.execute(query, params, {prepare: true});
};

exports.add = async ({ product_id, body, name, email }) => {
  const date_written = new Date().getTime();
  // const num = random(64)
  // console.log(num)
  // console.log(num.toString())

  const params = [product_id, random(32).toString(), email, name, body, date_written, 0, 0];
  console.log(params);

  const query = 'INSERT INTO qna.questions_by_product_id (product_id, id, asker_email, asker_name, body, date_written, helpful, reported) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

  console.log(query, params)

  return await client.execute(query, params, {prepare: true});
};