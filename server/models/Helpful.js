const client = require('../database');


exports.updateQuestionHelpfulness = async ({ question_id }) => {
  console.log(question_id)
  const queryFind = 'SELECT helpful, product_id FROM questions_by_id where id = ?;';
  const found = await client.execute(queryFind, [question_id], {prepare: true});
  let { helpful, product_id } = found.rows[0];
  console.log('helpful: ', helpful)
  console.log('product_id: ', product_id)

  helpful++;
  console.log('helpful after increment: ', helpful)
  const queryUpdate = 'UPDATE qna.questions_by_product_id SET helpful = ? WHERE product_id = ? AND id = ?;';
  try {
    return await client.execute(queryUpdate, [helpful, product_id, question_id], {prepare: true});
  } catch (err) {
    throw err;
  }
};

exports.updateAnswerHelpfulness = async () => {
  console.log('INVOKED')
};