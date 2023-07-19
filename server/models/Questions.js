const client = require('../database');


exports.getAll = async ({ product_id }) => {
  // console.log(`product id: ${product_id}`)
  const query = 'SELECT * FROM questions_by_reported WHERE reported = ? AND product_id = ?';
  const params = [0, product_id];
  console.log(`QUERY HEARD: ${query} WITH PARAMS: ${params}`)

  return await client.execute(query, params, {prepare: true});
};