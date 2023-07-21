const answers = require('../models/Answers.js');

exports.getAll = async (req, res) => {
  answers.getAll(req.params)
  .then((allResp) => {
    res.status(200).send(allResp);
  })
  .catch( (err) => {
    console.error(err);
    res.status(500).send();
  });
};

exports.add = async (req, res) => {
  const {params, body} = req
  answers.add(params, body)
  .then((addResp) => {
    res.status(201).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  })
};