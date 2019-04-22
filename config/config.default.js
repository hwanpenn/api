
const path = require('path')
module.exports = appInfo => {
  const config = exports = {}
  // config.cluster = {
  //   listen: {
  //     port: 7001,
  //     hostname: 'localhost',
  //     // path: '/var/run/egg.sock',
  //   }
  // }
  config.static = {
    // maxAge: 31536000,
    prefix: '/',
    // prefix: '/uploads/',
    dir: path.join(appInfo.baseDir, 'app/public/build')
  }
 
  config.view = {
    // root: path.join(appInfo.baseDir, 'app/build'),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674'

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ]

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {}
  //   match: '/api',
  // }

  // config.security = {
  //   csrf: {
  //     enable: false,
  //   },
  //   domainWhiteList: [ 'http://localhost:8000' ],
  // }

  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ], // 增加对 .apk 扩展名的支持
  },

  config.bcrypt = {
    saltRounds: 10 // default 10
  }

  config.mongoose = {
    // url: 'mongodb://127.0.0.1:27017/10week-mongodb',
    // url: 'mongodb://root:10week@127.0.0.1:27017/10week-mongodb?authSource=admin',
    // mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

    url: 'mongodb://root:10week@docker_mongodb:27017/10week-mongodb?authSource=admin',
    // url: 'mongodb://mongo1:27017/10week-mongodb',
    options: {
      // useNewUrlParser:true,
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
    // client: {
    //   url: 'mongodb://root:10week@mongo:27017/10week-mongodb?authSource=admin',
    //   options: {},
    // },
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ 'null','http://localhost:63343','http://localhost:3000','http://192.168.1.4:3000' ],
  }
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  return config
}
// module.exports = appInfo => ({
//   view: {
//     // 如果还有其他模板引擎，需要合并多个目录
//     root: path.join(appInfo.baseDir, 'app/assets'),
//   },
// })
