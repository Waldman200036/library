/* jshint esversion: 6 */

import express from 'express';
import Debug from 'debug';
import sql from 'mssql';

const bookRouter = express.Router();

const debug = Debug('app:bookRoutes');

function router(nav, config) {
  const books = [{

    title: 'War and Peace',
    genres: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy'
  },
  {

    title: 'Les Miserables',
    genres: 'Historical Fiction',
    author: 'Victor Hugo'
  },
  {

    title: 'The Time Machine',
    genres: 'Science Fiction',
    author: 'H.G. Wells'
  }
  ];

  bookRouter.route('/')
    .get((req, res) => {
      // const request = new sql.Request();
      res.render('bookView', {
        nav,
        title: 'Library',
        book: books[0],
      });
      sql.connect(config).then((pool) => pool.request().query('select * from book')).then((result) => {
        debug(result);
      }).catch((err) => {
        debug(err);
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView', {
        nav,
        title: 'Library',
        book: books[id],
      });
    });
  return bookRouter;
}

export default router;
