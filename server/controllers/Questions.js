const questions = require('../models/Questions.js');

exports.getAll = async (req, res) => {
  // console.log('REQ PARAMS:', req.query)
  questions.getAll(req.query)
  .then((allResp) => {
    res.send(allResp);
  })
  .catch( (err) => {
    console.error(err);
  });
};

exports.add = async (req, res) => {
  console.log('ADD QUESTIONS: ');
};