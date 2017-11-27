import log4js from 'koa-log4';
import Util from '../lib/utils';
import { log } from 'util';

const level = Util.isDev() ? 'DEBUG': 'INFO';

const httpLogger = log4js.koaLogger(
  log4js.getLogger('http'),
  {
    level: 'auto',
    format: ':remote-addr --":method : url HTTP/:http-version" :respond-timems ":referer" ":user-agent" :req[x-tt-logid] :req[x-ss-rid]'
  }
);
const appLogger = log4js.getLogger('app');
console.log('appLogger', appLogger);

appLogger.setLevel(level);

module.exports = {
  httpLogger,
  appLogger
}
