const client = require('../database');


exports.reportQuestion = async ({ question_id }) => {
  console.log(question_id)
  const queryFind = 'SELECT product_id FROM questions_by_id where id = ?';
  const found = await client.execute(queryFind, [question_id], {prepare: true});
  console.log(found.rows)
  const { product_id } = found.rows[0];
  console.log('product_id', product_id)

  const queryReport = 'UPDATE qna.questions_by_product_id SET reported = ? WHERE product_id = ? AND id = ?'
  try {
    return await client.execute(queryReport, [1, product_id, question_id], {prepare: true});
  } catch (err) {
    throw err;
  }
};

exports.reportAnswer = async ({ answer_id }) => {
  console.log(answer_id)
  const queryFind = 'SELECT question_id FROM answers_by_id WHERE id = ?;';
  const found = await client.execute(queryFind, [answer_id], {prepare: true});
  const { question_id } = found.rows[0];
  console.log('question_id: ', question_id)

  const queryUpdate = 'UPDATE qna.answers_by_question_id SET reported = ? WHERE question_id = ? AND id = ?;';
  try {
    return await client.execute(queryUpdate, [1, question_id, answer_id], {prepare: true});
  } catch (err) {
    throw err;
  }
};