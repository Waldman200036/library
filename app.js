/*jshint esversion: 6 */
import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import p from 'path';

var app = express();
var dbug = debug('app');
var path = p;
var __dirname = path.resolve();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));
app.use('/css', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname,'/node_modules/bootstrap/jqery/dist')));

app.get('/',function(req, res){
    res.sendFile(path.join(__dirname,'views/index.html'));
});

app.listen(3000,function(){
    dbug(`listening on port ${chalk.green('3000')}`);
});