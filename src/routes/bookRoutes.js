/* jshint esversion: 6 */

import express from 'express';

const bookRouter = express.Router();

function router(nav) {
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
      res.render('bookListView', {
        nav,
        title: 'Library',
        books
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
