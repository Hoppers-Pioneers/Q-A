const db = require('./database.js');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const questionsController = require('./controllers/Questions.js');
const answersController = require('./controllers/Answers.js');
const helpfulController = require('./controllers/Helpful.js');
const reportController = require('./controllers/Report.js');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

/*---------------------QUESTIONS----------------------*/
app.get('/qa/questions', questionsController.getAll);
app.post('/qa/questions', questionsController.add);

/*----------------------ANSWERS-----------------------*/
app.get('/qa/questions/:question_id/answers', answersController.getAll);
app.post('/qa/questions/:question_id/answers', answersController.add);

/*----------------------HELPFUL-----------------------*/
app.put('/qa/questions/:question_id/helpful', helpfulController.updateQuestionHelpfulness);
app.put('/qa/answers/:answer_id/helpful', helpfulController.updateAnswerHelpfulness);

/*----------------------REPORT-----------------------*/
app.put('/qa/questions/:question_id/report', /*'constrollololol'*/);
app.put('/qa/answer/:answer_id/report', /*'constrollololol'*/);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});