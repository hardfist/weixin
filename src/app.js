import Koa from 'koa';
import fs from 'fs';
import util from 'util';
import sha1 from 'sha1';
import logUtil from './util/logger';
import auth from './util/auth';
const app = new Koa();

app.use(logUtil.httpLogger);
const config = JSON.parse(fs.readFileSync('./config/conf.local.json'));

// response
app.use(auth(config));

app.use(function *(){
  const { echo } = this.query;
  if(!echo){
    this.body = 'no echo';
  }else {
    this.body = echo;
  }
});

app.listen(8080);
