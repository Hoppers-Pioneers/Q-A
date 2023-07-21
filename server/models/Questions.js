const client = require('../database');
const random = require('random-bigint');


exports.getAll = async ({ product_id }) => {
  //------------------Question--------------------//
  const queryQuest = 'SELECT * FROM questions_by_reported WHERE reported = 0 AND product_id = ?';

  const questionData = await client.execute(queryQuest, [product_id], {prepare: true});
  if (questionData.rows.length < 1) throw new Error('Invalid Product ID')

  //--------------------Answers--------------------//
  let queryAnswer = 'SELECT * FROM answers_by_reported WHERE reported = 0 AND question_id IN (';

  const answerParams = [];
  questionData.rows.forEach((question) => {
    queryAnswer += '?,';
    answerParams.push(question.id)
  });
  queryAnswer = queryAnswer.slice(0, queryAnswer.length - 1);
  queryAnswer += ');';
  let answerData;
  if (answerParams.length > 0) {
    answerData = await client.execute(queryAnswer, [...answerParams], {prepare: true});
  }

  //--------------------Photos--------------------//
  let queryPhotos = 'SELECT * FROM photos_by_answer_id WHERE answer_id IN (';
  const photoParams = [];
  answerData.rows.forEach((answer) => {
    queryPhotos += '?,';
    photoParams.push(answer.id);
  });
  queryPhotos = queryPhotos.slice(0, queryPhotos.length - 1);
  queryPhotos += ');';
  let photoData;
  if (photoParams.length > 0) {
    photoData = await client.execute(queryPhotos, [...photoParams], {prepare: true})
  }


  //--------------------Compile------------------//

  answerData.rows.forEach((answer) => {
    if (!answer.photos) answer.photos = [];
    photoData.rows.forEach((photo) => {
      if (photo.answer_id == answer.id) answer.photos.push({id: photo.id, url: photo.url});
    })
  });

  questionData.rows.forEach((question) => {
    if (!question.answers) question.answers = {};
    answerData.rows.forEach((answer) => {
      if (answer.question_id == question.id) question.answers[answer.id] = answer;
    })
  });



  return (
    {
      id: product_id,
      results: questionData.rows
    }
  )
};

exports.add = async ({ product_id, body, name, email }) => {
  const date_written = new Date().getTime();

  const params = [product_id, random(32).toString(), email, name, body, date_written, 0, 0];
  console.log(params);

  const query = 'INSERT INTO qna.questions_by_product_id (product_id, id, asker_email, asker_name, body, date_written, helpful, reported) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

  return await client.execute(query, params, {prepare: true});
};