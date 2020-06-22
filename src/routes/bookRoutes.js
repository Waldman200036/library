/* jshint esversion: 8 */

import express from 'express';
import Debug from 'debug';
import sql from 'mssql';

const bookRouter = express.Router();

const debug = Debug('app:bookRoutes');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
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
      }());
    });
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from book where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render(
        'bookView',
        {
          nav,
          title: 'Library',
          book: req.book,
        }
      );
    });

  return bookRouter;
}

export default router;
