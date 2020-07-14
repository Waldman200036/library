/* jshint esversion: 8 */
const express = require('express');
const Mongodb = require('mongodb');

const { MongoClient } = Mongodb;
const debug = require('debug')('app:adminRoutes');

const books = [{

  title: 'War and Peace',
  genres: 'Historical Fiction',
  author: 'Lev Nikolayevich Tolstoy',
  bookId: 656,
  read: false
},
{

  title: 'Les Miserables',
  genres: 'Historical Fiction',
  author: 'Victor Hugo',
  bookId: 24280,
  read: false
},
{

  title: 'The Time Machine',
  genres: 'Science Fiction',
  author: 'H.G. Wells'
}
];
const adminRouter = express.Router();

// eslint-disable-next-line no-unused-vars
function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';

      (async function mongo() {
        let client;
        try {
          debug('Connecting to server');
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
          // eslint-disable-next-line no-empty
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
