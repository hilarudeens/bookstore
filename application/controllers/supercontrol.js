/**
 * File Name: supercontrol.js,
 * Author: hilarudeens,
 * Date Created: 1st April 2013,
 * Description: This file hold server configuration and hooks to link controllers.
 */
var express = require('express');
var app = express.createServer();
var SessionMongoose = require("session-mongoose")(express);

var mongooseSessionStore = new SessionMongoose({
  url: 'mongodb://localhost:27017/bookstoredb',
  interval: 120000 // expiration check worker run interval in millisec (default: 60000)
});

app.configure(function configuration() {
	app.use(express.cookieParser());
	app.use(express.session({
		secret : "Book Store",
		cookie : {
			maxAge : (120 * 60 * 1000) //2 hrs
		},
		store : mongooseSessionStore
	}));
	app.use(express.bodyParser());
	app.use('/files', express.static(basePath + '/files'));
	app.use('/images', express.static(viewsPath + '/images'));
	app.use('/css', express.static(viewsPath + '/css'));
	app.use('/js', express.static(viewsPath + '/js'));
});

// Include Menus and respective handlers
require('./routers')(app);

// Exports
exports.bootup = function(){  
  var appStart = function(){
    app.listen('80', function starting(err) {
      console.log('Server has been started in 9001');
    });
  };
  
  //Create Database Connection
  require('mongoose').connect('mongodb://localhost:27017/bookstoredb', function(
      err, dbins) {
    if (err){
      console.log('DB ' + err); 
      process.exit();
    }   
    else{
      console.log('Database has been connected');
      if(typeof appStart === 'function')
        appStart();
    }
  }); ;
};
