/* jshint esversion: 8 */
const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

// eslint-disable-next-line no-unused-vars
function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  // Authorize user
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

module.exports = router;
