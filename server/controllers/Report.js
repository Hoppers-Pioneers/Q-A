const report = require('../models/Report.js');

exports.reportQuestion = async (req, res) => {
  report.reportQuestion(req.params)
  .then((updateResp) => {
    res.status(204).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  });
};

exports.reportAnswer = async (req, res) => {
  report.reportAnswer(req.params)
  .then((updateResp) => {
    res.status(204).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  })
};