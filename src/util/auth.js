import sha1 from 'sha1';

module.exports = function (config) {
  return function* (next) {
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

