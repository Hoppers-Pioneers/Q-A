const questions = require('../models/Questions.js');

exports.getAll = async (req, res) => {
  questions.getAll(req.query)
  .then((allResp) => {
    console.log(allResp)
    res.status(200).send(allResp);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  });
};

exports.add = async (req, res) => {
  const {query, body} = req
  questions.add(query, body)
  .then((addResp) => {
    res.status(201).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  })
};