import Koa from 'koa';
import fs from 'fs';
import util from 'util';
import sha1 from 'sha1';
import router from './routes';
import logUtil from './util/logger';

const app = new Koa();
const config = JSON.parse(fs.readFileSync('./config/conf.local.json'));
// 日志处理
app.use(logUtil.httpLogger);
// 挂载全局变量
app.use(function* (next) {
  this.config = config;
  yield next;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9999);
