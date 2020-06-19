/* jshint esversion: 6 */
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import p from 'path';

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
const dbug = debug('app');
const path = p;
const dirname = path.resolve();

app.use(morgan('tiny'));
app.use(express.static(path.join(dirname, '/public')));
app.use('/css', express.static(path.join(dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/jqery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

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
