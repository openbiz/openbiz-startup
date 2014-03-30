'use strict';

//dependencies
var config = require('./config'),
    express = require('express'),
    mongoStore = require('connect-mongo')(express),
    https = require('https'),
    http = require('http'),
    path = require('path'),
    passport = require('passport'),
    fs = require("fs");
    
//create express app
var app = express();

//setup https options
var options = {
	key: fs.readFileSync('./certs/privatekey.pem'),
	cert: fs.readFileSync('./certs/certificate.pem')
};

//setup the web server
app.httpsServer = https.createServer(options,app);
app.httpServer = http.createServer(app);
//setup the session store
app.sessionStore = new mongoStore({ url: config.db.uri });

//config express in all environments
app.configure(function(){
  //settings
  app.disable('x-powered-by');  
  app.set('port', config.port);
  app.set('sslPort', config.sslPort);
  app.set('enforceSSL', config.enforceSSL);
  app.set('views', __dirname + '/public');
  app.set('view engine', 'jade');
  app.set('strict routing', true);  
  app.set('crypto-key', config.cryptoKey);

  //smtp settings
  app.set('smtp-from-name', config.smtp.from.name);
  app.set('smtp-from-address', config.smtp.from.address);
  app.set('smtp-credentials', config.smtp.credentials);

  //twitter settings
  app.set('twitter-oauth-key', config.oauth.twitter.key);
  app.set('twitter-oauth-secret', config.oauth.twitter.secret);

  //github settings
  app.set('github-oauth-key', config.oauth.github.key);
  app.set('github-oauth-secret', config.oauth.github.secret);

  //facebook settings
  app.set('facebook-oauth-key', config.oauth.facebook.key);
  app.set('facebook-oauth-secret', config.oauth.facebook.secret);

  //middleware
  app.use(express.favicon(__dirname + '/public/website/images/ico/favicon.ico'));
  app.use(express.logger('dev'));  
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ 
      secret: config.cryptoKey, 
      store: app.sessionStore 
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


//listen up
app.httpServer.listen(app.get('port'), function(){
  //and... we're live
  console.log("http server is up and running at port: "+config.port);
});
app.httpsServer.listen(app.get('sslPort'), function(){
	//and... we're live
	console.log("https server is up and running at port: "+config.sslPort);
});

//init openbiz system
var openbiz   = require('openbiz')(app,config);
//enforceSSL
app.all('*', openbiz.enforceSSL);

//因为老涂总是说 网页打不开，所以干脆把首页也先改成app
app.get("/", function(req,res){res.render('app')});


//init openbiz ui
var openbizUI = require('openbiz-ui')(app).loadToRoute('/lib/openbiz');

//init openbiz cubi
require('openbiz-cubi')(openbiz).loadAppToRoute('/api')
                                .loadUIToRoute('/apps/cubi');
