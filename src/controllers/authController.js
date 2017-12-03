import sha1 from 'sha1';
import getRawBody from 'raw-body';
import router from 'koa-router';
import Util from '../lib/utils';

module.exports = {
  *echo() {
    const data = yield getRawBody(this.req, {
      length: this.length,
      limit: '1mb',
      encoding: this.charset
    });
    const content = yield Util.parseXML(data);
    const message = Util.formatMessage(content.xml);
    const {
      FromUserName,
      ToUserName,
      CreateTime,
      MsgType,
      Event,
      Content
    } = message;
    console.log('message:', message);
    this.status = 200;
    this.type = 'application/xml';
    const response = Util.reply(ToUserName, FromUserName, {
      type: 'text',
      content: Content
    });
    console.log('response:', response);
    this.body = response;
  },
  *auth() {
    const config = this.config;
    const token = config.wechat.token;
    const { signature, nonce, timestamp, echostr } = this.query;
    const str = [token, timestamp, nonce].sort().join('');
    const sha = sha1(str);

    if(sha == signature) {
      this.body = echostr + ''
    } else {
      this.body = 'wrong'
    }
  }
}