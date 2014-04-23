'use strict';
switch(process.env.NODE_ENV){
  case "development":
    default:
      exports.port = process.env.PORT || 8080;  
      exports.sslPort = process.env.PORT || 8443;  
      exports.enforceSSL = false;
    break;
  case "production":  
      exports.port = process.env.PORT || 80;
      exports.sslPort = process.env.PORT || 443;  
      exports.enforceSSL = true;
    break;
}



exports.db = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/openbiz'
};
exports.cryptoKey = 'YOUR_SECRET_KEY';
exports.storage={
  type : 'GridFS',
  path : "/storage", //require('path').join(require('path').dirname(__filename),'storage'),
  url: "/storage",
  tmpPath: require('path').join(require('path').dirname(__filename),'storage','tmp'),
}
exports.requireAccountVerification = false;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || 'Openbiz Platform',
    address: process.env.SMTP_FROM_ADDRESS || 'no-reply@gmail.com'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'no-reply@gmail.com',
    password: process.env.SMTP_PASSWORD || 'YOUR_SECRET_PASSWORD',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};

exports.oauth = {
  twitter: {
    key: process.env.TWITTER_OAUTH_KEY || '',
    secret: process.env.TWITTER_OAUTH_SECRET || ''
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '',
    secret: process.env.FACEBOOK_OAUTH_SECRET || ''
  },
  github: {
    key: process.env.GITHUB_OAUTH_KEY || '',
    secret: process.env.GITHUB_OAUTH_SECRET || ''
  }
};
