/* jshint esversion: 8 */
const express = require('express');
const {
  MongoClient
} = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);

      // create user
      req.login(req.body, () => {
        debug('logging in...');
        debug('redirecting...');
        res.redirect('/auth/profile');
      });
      // res.json(req.body);
    });
  authRouter.route('/profile')
    .get((req, res) => {
      debug('authorizing user...');
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
