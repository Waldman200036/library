/* jshint esversion: 6 */
import express from 'express';
import chalk from 'chalk';
import Debug from 'debug';
import morgan from 'morgan';
// import sql from 'mssql';
import Path from 'path';
// eslint-disable-next-line import/extensions
import bookRoutes from './src/routes/bookRoutes.js';
// eslint-disable-next-line import/extensions
import adminRoutes from './src/routes/adminRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const debug = Debug('app');
const path = Path;
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
const bookRouter = bookRoutes(nav);
const adminRouter = adminRoutes(nav);

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
