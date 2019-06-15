
const path = require('path')
module.exports = appInfo => {
  const config = exports = {}
  
  config.cluster = {
     listen: {
       port: 7001,
       hostname: '0.0.0.0',
     }
   }

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

  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ]

  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ], // 增加对 .apk 扩展名的支持
  },

  config.bcrypt = {
    saltRounds: 10 
  }

  config.mongoose = {
    // url: 'mongodb://root:10week@127.0.0.1:27017/10week-mongodb?authSource=admin',
    url: 'mongodb://f8fitnessusr:f8fitnesspwd@127.0.0.1:27017/f8fitnessdb?authSource=admin',
    // url: 'mongodb://root:10week@docker_mongodb:27017/10week-mongodb?authSource=admin',
    options: {
      useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, 
    match: '/jwt', 
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ 'null','http://f8fitness.cn/','http://f8fitness.com.cn/' ],
  }
  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  return config
}

