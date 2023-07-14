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
  'photos_by_review_id',
  path.join(__dirname, '../data_folder/reviews_photos.csv'),
  [ ['id', 'uuid'], ['review_id', 'int'], ['url', 'text'] ],
  2742541,
  '((review_id), id)',
  '(id DESC)'
);

//photos_by_answer_id
etl(client,
  'photos_by_review_id',
  path.join(__dirname, '../data_folder/reviews_photos.csv'),
  [ ['id', 'uuid'], ['review_id', 'int'], ['url', 'text'] ],
  2742541,
  '((review_id), id)',
  '(id DESC)'
);

//mark_question_helpful
etl(client,
  'photos_by_review_id',
  path.join(__dirname, '../data_folder/reviews_photos.csv'),
  [ ['id', 'uuid'], ['review_id', 'int'], ['url', 'text'] ],
  2742541,
  '((review_id), id)',
  '(id DESC)'
);

//mark_answer_helpful
etl(client,
  'photos_by_review_id',
  path.join(__dirname, '../data_folder/reviews_photos.csv'),
  [ ['id', 'uuid'], ['review_id', 'int'], ['url', 'text'] ],
  2742541,
  '((review_id), id)',
  '(id DESC)'
);

//report_question
etl(client,
  'photos_by_review_id',
  path.join(__dirname, '../data_folder/reviews_photos.csv'),
  [ ['id', 'uuid'], ['review_id', 'int'], ['url', 'text'] ],
  2742541,
  '((review_id), id)',
  '(id DESC)'
);

//report_answer
etl(client,
  'photos_by_review_id',
  path.join(__dirname, '../data_folder/reviews_photos.csv'),
  [ ['id', 'uuid'], ['review_id', 'int'], ['url', 'text'] ],
  2742541,
  '((review_id), id)',
  '(id DESC)'
);