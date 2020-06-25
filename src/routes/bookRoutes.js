/* jshint esversion: 8 */
const express = require('express');
const Mongodb = require('mongodb');
const Debug = require('debug');

const bookRouter = express.Router();

const {
  MongoClient
} = Mongodb;
const debug = Debug('app:bookRoutes');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';
      // eslint-disable-next-line no-unused-expressions
      (async function mongo() {
        let client;
        try {
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
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      });
      /*       (async function query() {
        const request = new sql.Request();
        const { recordset } = await request.query('select * from book');
        debug(recordset);
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books: recordset,
          }
        );
      }()); */
    });
  bookRouter.route('/:id')
    // eslint-disable-next-line no-unused-vars
    .all((_req, _res, _next) => {
      /*       (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from book where id = @id');
        [req.book] = recordset;
        next();
      }()); */
    })
    .get((req, res) => {
      res.render(
        'bookView', {
          nav,
          title: 'Library',
          book: req.book,
        }
      );
    });

  return bookRouter;
}

module.exports = router;
