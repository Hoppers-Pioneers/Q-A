const cassandra = require('cassandra-driver');
// const fs = require('fs');
// const { parse } = require('csv-parse');
// const path = require('path');

const client = new cassandra.Client({
  contactPoints: ['localhost:8080'],
  localDataCenter: 'datacenter1',
  keyspace: 'qna'
});


client.execute('USE qna')
.then(client => console.log(`Connected to ${client.info.queriedHost}`))
.catch(err => {
  console.log(`Issue with connecting to ${client.info.queriedHost}`);
  console.error(err);
});

module.exports = client;