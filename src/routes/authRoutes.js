/* jshint esversion: 8 */
const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      // debug(req.body);
      res.json(req.body);
    });
  return authRouter;
}

module.exports = router;
