const cassandra = require('cassandra-driver');
const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const idToUUid = require('./uuid.js');
const rows = [];
const etl = require('./basicEtl.js');
//////////////////////////////////////////////////////////////////////////

const client = new cassandra.Client({
  contactPoints: ['localhost:8080'],
  localDataCenter: 'datacenter1',
  keyspace: 'qna'
});

client.execute('USE qna');

//questions_by_product_id
etl(client,
  'questions_by_product_id',
  path.join(__dirname, './oldData/questions.csv'),
  [ ['id', 'uuid'], ['product_id', 'int'], ['body', 'text'], ['date_written', 'date'], ['asker_name', 'text'], ['asker_email', 'text'], ['reported', 'boolean'], ['helpful', 'int'] ],
  3518963
);

//answers_by_question_id
etl(client,
  'answers_by_question_id',
  path.join(__dirname, './oldData/answers.csv'),
  [ ['id', 'uuid'], ['question_id', 'int'], ['body', 'text'], ['date_written', 'date'], ['answer_name', 'text'], ['answer_email', 'text'], ['reported', 'boolean'], ['helpful', 'int'] ],
  6879306
);

//photos_by_answer_id
etl(client,
  'photos_by_answer_id',
  path.join(__dirname, './oldData/answers_photos.csv'),
  [ ['id', 'uuid'], ['answer_id', 'int'], ['url', 'text'] ],
  2063759
);

//////////////////////////////////////////////////////////////

//mark_question_helpful
etl(client,
  'mark_question_helpful',
  path.join(__dirname, './oldData/questions.csv'),
  [ ['id', 'uuid'], ['helpful', 'int'] ],
  3518963
);

//mark_answer_helpful
etl(client,
  'mark_answer_helpful',
  path.join(__dirname, './oldData/answers.csv'),
  [ ['id', 'uuid'], ['helpful', 'int'] ],
  6879306
);

//report_question
etl(client,
  'report_question',
  path.join(__dirname, './oldData/questions.csv'),
  [ ['id', 'uuid'], ['reported', 'boolean'] ],
  3518963
);

//report_answer
etl(client,
  'report_answer',
  path.join(__dirname, './oldData/answers.csv'),
  [ ['id', 'uuid'], ['reported', 'boolean'] ],
  6879306
);