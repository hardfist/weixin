import Koa from 'koa';
import fs from 'fs';
import sha1 from 'sha1';
const app = new Koa();
const config = JSON.parse(fs.readFileSync('./config/conf.local.json'));

// response
app.use(function* (next) {
  console.log(this.query);
  const token = config.wechat.token;
  const { signature, nonce, timestamp, echostr} = this.query;
  console.log('token',token);
  const str = [token, timestamp, nonce].sort().join('');
  const sha = sha1(str);
  if(sha == signature){
    this.body = echostr+ ''
  }else { 
    this.body = 'wrong'
  }
})
app.listen(8080);
