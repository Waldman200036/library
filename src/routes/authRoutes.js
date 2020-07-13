/* jshint esversion: 8 */
const express = require('express');
const {
  MongoClient
} = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();
// Add user
function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const {
        username,
        password
      } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'LibraryApp';
      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = {
            username,
            password
          };
          const results = await col.insertOne(user);
          debug(results);
          req.login(results.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (error) {
          debug(error);
        }
      }());
      debug(req.body);
    });
  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });
  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      debug('authorizing user...');
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
