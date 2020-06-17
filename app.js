/* jshint esversion: 6 */
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import p from 'path';

const app = express();
const port = process.env.PORT || 3000;
const dbug = debug('app');
const path = p;
const dirname = path.resolve();

app.use(morgan('tiny'));
app.use(express.static(path.join(dirname, '/public')));
app.use('/css', express.static(path.join(dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/jqery/dist')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(dirname, 'views/index.html'));
});

app.listen(port, () => {
  dbug(`listening on port ${chalk.green(port)}`);
});
