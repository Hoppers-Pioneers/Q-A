const client = require('../database');
const random = require('random-bigint')


exports.getAll = async ({ question_id }) => {
  const query1 = 'SELECT * FROM answers_by_reported WHERE reported = ? AND question_id = ?';
  let query2 = 'SELECT * FROM photos_by_answer_id WHERE answer_id IN (';
  const answerData =  await client.execute(query1, [0, question_id], {prepare: true});


  //instead of doing multiple queries to get the photos for many answers -> do 1 query to get the photos for many answers by using the IN keyword -> the result contains
  //the answer_id so you can use that to be able to separate them as you please. This would be faster than multiple queries


  const parameters = [];
  answerData.rows.forEach((answer) => {
    query2 += '?,';
    parameters.push(answer.id);
  });
  query2 = query2.slice(0, query2.length - 1);
  query2 += ');';

  //iterate through photoData information -> use answer_id within to separate the answer photos
  let photoData = await client.execute(query2, [...parameters], {prepare: true})
  console.log(photoData)

  answerData.rows.forEach((answer) => {
    if (!answer.photos) answer.photos = [];
    photoData.rows.forEach((photo) => {
      if (photo.answer_id == answer.id) answer.photos.push({id: photo.id, url: photo.url});
    })
  });
  return answerData.rows;
};

exports.add = async ({ question_id, body, name, email }) => {
  const date_written = new Date().getTime();

  const params = [question_id, random(32).toString(), email, name, body, date_written, 0, 0];

  const query = 'INSERT INTO qna.answers_by_question_id (question_id, id, answerer_email, answerer_name, body, date_written, helpful, reported) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

  console.log(query, params)

  return await client.execute(query, params, {prepare: true});
};