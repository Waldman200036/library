/* jshint esversion: 6 */

import express from 'express';

const bookRouter = express.Router();

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
    res.render('books', {
      nav: [{
        link: '/Books',
        title: 'Books'
      }, {
        link: '/authors',
        title: 'Authors'
      }],
      title: 'Library',
      books
    });
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

export default bookRouter;
