const helpful = require('../models/Helpful.js');

exports.updateQuestionHelpfulness = async (req, res) => {
  helpful.updateQuestionHelpfulness(req.params)
  .then((updateResp) => {
    console.log(allResp)
    res.status(200).send(allResp);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  });
};

exports.updateAnswerHelpfulness = async (req, res) => {
  helpful.updateAnswerHelpfulness(req.body)
  .then((updateResp) => {
    res.status(201).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  })
};