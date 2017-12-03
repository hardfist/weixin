import xml2js from 'xml2js';
const Util = {
  isDev() {
    return process.env.NODE_ENV === 'development'
  },
  reply(FromUserName, ToUserName, msg){
    const { type, content } = msg;
    const now = new Date().getTime();
    let dom = '';
    if(type === 'text'){
      dom = `<Content><![CDATA[${content}]]></Content>`
    }
    return `<xml>
    <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
    <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
    <CreateTime>${now}</CreateTime>
    <MsgType><![CDATA[${type}]]></MsgType>
    ${dom}
    </xml>`
  },
  formatMessage(result){
    const message = {};
    if(typeof result === 'object') {
      for( const [key, value] of Object.entries(result)){
        if(value.length === 0){
          continue;
        }
        if(value.length === 1){
          const val = value[0];
          if(typeof val === 'object'){
            message[key] = Util.formatMessage(val);
          }else {
            message[key] = (val || '').trim();
          }
        }
        else {
          message[key] = value.map(Util.formatMessage);
        }
      }
    }
    return message;
  },
  parseXML(xml) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, {
        trim: true
      }, (err, content) => {
        if(err) {
          reject(err);
        } else {
          resolve(content);
        }
      })
    })
  }
}

export default Util;