/* jshint esversion: 8 */
const express = require('express');
const {
  MongoClient,
  ObjectID
} = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

// eslint-disable-next-line no-unused-vars
function router(nav) {
  bookRouter.route('/')
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

          const col = await db.collection('books');

          const books = await col.find().toArray();
          res.render(
            'bookListView', {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (error) {
          debug(error.stack);
        }

        client.close();
      }());
    });
  bookRouter.route('/:id')
    .get((req, res) => {
      const {
        id
      } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';

      (async function mongo() {
        let client;
        try {
          debug('Connecting to server');
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('books');

          const book = await col.findOne({
            _id: new ObjectID(id)
          });
          debug(book);
          res.render(
            'bookView', {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}

module.exports = router;
