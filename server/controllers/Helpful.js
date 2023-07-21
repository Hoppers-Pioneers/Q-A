const helpful = require('../models/Helpful.js');

exports.updateQuestionHelpfulness = async (req, res) => {
  helpful.updateQuestionHelpfulness(req.params)
  .then((updateResp) => {
    res.status(204).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  });
};

exports.updateAnswerHelpfulness = async (req, res) => {
  helpful.updateAnswerHelpfulness(req.params)
  .then((updateResp) => {
    res.status(204).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  })
};