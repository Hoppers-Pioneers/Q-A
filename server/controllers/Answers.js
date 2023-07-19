const answers = require('../models/Answers.js');

exports.getAll = async (req, res) => {
  answers.getAll(req.params)
  .then((allResp) => {
    res.status(200).send(allResp.rows);
  })
  .catch( (err) => {
    console.error(err);
    res.status(500).send();
  });
};

exports.add = async (req, res) => {
  answers.add(req.query)
  .then((addResp) => {
    res.status(201).send();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send();
  })
};