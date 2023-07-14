const cassandra = require('cassandra-driver');
const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const idToUUid = require('./uuid.js');


module.exports = function(client, tableName, file, columns, total) {
  let rows = [];
  let queryArgs = '';
  for (let i = 0; i < columns.length; i++) {
    queryArgs += `${columns[i][0]} ${columns[i][1]},`
  }
  console.log(queryArgs);
  // client.execute(`
  // CREATE TABLE IF NOT EXISTS ${tableName} (
  //   ${queryArgs}
  //   PRIMARY KEY ${primary}
  // ) WITH CLUSTERING ORDER BY ${clustering};`).then((data) => console.log('SUCCESS'));

  const parser = parse({columns: true}, function (err, records) {
    if (err) console.error(err);
  });

  let count = 0;

  const b1 = new cliProgress.SingleBar({
    format: 'LOADING REVIEW CSV |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });
  b1.start(total, 0, {
    speed: "N/A"
  });

  fs.createReadStream(file).pipe(parser).on('data', function (row) {
    if (count % 1000 === 0) {
      b1.increment(1000);
    }
    rows.push(row);
    count++;
  }).on('end', function() {
    b1.stop();
    write();
  });

  async function write() {
    const queryArgs = ['',''];
    for (let i = 0; i < columns.length; i++) {
      queryArgs[0] += `${columns[i][0]},`;
      queryArgs[1] += '?,';
    }
    queryArgs[0] = queryArgs[0].slice(0,-1);
    queryArgs[1] = queryArgs[1].slice(0,-1);
    const query = `INSERT INTO ${tableName}
    (${queryArgs[0]}) VALUES (${queryArgs[1]});`;
    const b2 = new cliProgress.SingleBar({
      format: 'INSERTING INTO DATABASE |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
    b2.start(rows.length, 0, {
      speed: "N/A"
    });
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (i % 100 === 0) {
        b2.increment(100);
      }
      let current = [];
      for (let j = 0; j < columns.length; j++) {
        current.push(rows[i][columns[j][0]]);
        if (columns[j][1] === 'int') {
          current[j] = JSON.parse(current[j]);
        }
        if (columns[j][1] === 'boolean') {
          current[j] = current[j] === 'true';
        }
      }
      current[0] = idToUUid(current[0]);
      await client.execute(query, current, {prepare: true});
    }
    b2.stop();
  }
}