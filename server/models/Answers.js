const client = require('../database');
const random = require('random-bigint')


exports.getAll = async ({ question_id }) => {
  const queryAnswer = 'SELECT * FROM answers_by_reported WHERE reported = ? AND question_id = ?';
  let queryPhoto = 'SELECT * FROM photos_by_answer_id WHERE answer_id IN (';
  const answerData =  await client.execute(queryAnswer, [0, question_id], {prepare: true});


  //instead of doing multiple queries to get the photos for many answers -> do 1 query to get the photos for many answers by using the IN keyword -> the result contains
  //the answer_id so you can use that to be able to separate them as you please. This would be faster than multiple queries


  const parameters = [];
  answerData.rows.forEach((answer) => {
    queryPhoto += '?,';
    parameters.push(answer.id);
  });
  queryPhoto = queryPhoto.slice(0, queryPhoto.length - 1);
  queryPhoto += ');';

  //iterate through photoData information -> use answer_id within to separate the answer photos
  let photoData = await client.execute(queryPhoto, [...parameters], {prepare: true})

  answerData.rows.forEach((answer) => {
    if (!answer.photos) answer.photos = [];
    photoData.rows.forEach((photo) => {
      if (photo.answer_id == answer.id) answer.photos.push({id: photo.id, url: photo.url});
    })
  });
  return (
    {
      question: question_id,
      results: answerData.rows
    }
  )
};

exports.add = async (reqParams, reqBody) => {
  const { question_id } = reqParams;
  const { email, name, body, photos } = reqBody;
  const date_written = new Date().getTime();
  const id = random(32).toString();

  const answerParams = [question_id, id, email, name, body, date_written, 0, 0];
  const queryAnswer = 'INSERT INTO qna.answers_by_question_id (question_id, id, answerer_email, answerer_name, body, date_written, helpful, reported) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

  let photoParams;
  let queryPhotos;
  const queries = [];


  try {
    await client.execute(queryAnswer, answerParams, {prepare: true});

    if (photos) {
      photos.forEach((photo) => {
        queries.push({
          query: 'INSERT INTO qna.photos_by_answer_id (answer_id, id, url) VALUES (?, ?, ?)',
          params: [id, random(32).toString(), photo]
        });
      });

      return await client.batch(queries, {prepare: true});
    }
  }
  catch (err) {
    throw err;
  }
};