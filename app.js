/* jshint esversion: 6 */
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import p from 'path';
// eslint-disable-next-line import/extensions
import bookRoutes from './src/routes/bookRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const dbug = debug('app');
const path = p;
const dirname = path.resolve();
const nav = [{
  link: '/Books',
  title: 'Book'
}, {
  link: '/authors',
  title: 'Author'
}];
const bookRouter = bookRoutes(nav);

app.use(morgan('tiny'));
app.use(express.static(path.join(dirname, '/public')));
app.use('/css', express.static(path.join(dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/jqery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
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
  dbug(`listening on port ${chalk.green(port)}`);
});
