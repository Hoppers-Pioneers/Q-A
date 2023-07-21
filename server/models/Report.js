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
  console.log('invoked')
};