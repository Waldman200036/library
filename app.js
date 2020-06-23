/* jshint esversion: 6 */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const dirname = path.resolve();
/* const config = {
  user: 'walter',
  password: 'Holbert#1234',
  server: 'server-56567655.database.windows.net',
  database: 'PSLibrary',
  options: {
    enableArithAbort: false,
    encrypt: true // Use this if you're on Windows Azure
  }
}; */
const nav = [{
  link: '/Books',
  title: 'Book'
}, {
  link: '/authors',
  title: 'Author'
}];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

// sql.connect(config).catch((err) => debug(err));
app.use(morgan('tiny'));
app.use(express.static(path.join(dirname, '/public')));
app.use('/css', express.static(path.join(dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/jqery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (_req, res) => {
  res.render('index', {
    nav: [{
      link: '/Books',
      title: 'Books'
    }, {
      link: '/authors',
      title: 'Authors'
    }],
    title: 'Library',
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
