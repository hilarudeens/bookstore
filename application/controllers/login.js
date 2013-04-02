/**
 * File Name: login.js,
 * Author: hilarudeens,
 * Date Created: 10th Oct 2012,
 * Description: To render login page.
 */
var dbcontrol = require('../models/dbcontrol');
var jade = require('jade');
var fs = require("fs");

var getLoginTemplate = function(getLoginPageArgs) { 
  var session = getLoginPageArgs.session;
  
  var tpl = jade.compile(fs.readFileSync(viewsPath + '/login.jade','utf-8'));
  return tpl({
    title : "Admin Login",
    currentUser : session.username
  });
};

var getLoginPage = function(request,response,next){
  if (request.session.username == 'Guest') {
    var setLoginPageArgs = {};
    setLoginPageArgs.session = request.session;
    response.send(getLoginTemplate(setLoginPageArgs));
  } else {
    response.redirect('/');
  }
};

var loginFormSubmit = function(request,response,next){
  var username = request.body.username;
  var password = request.body.password;
  var user = dbcontrol.userCollection;
  
  if (username === 'admin' && password === 'admin') {
    request.session.username = username;
    response.redirect('/');
  } else {
    response.redirect('/adminlogin');
  }
};

exports.loginHandler = function(request,response,next){
  if(request.method == 'GET')
    getLoginPage(request,response,next);
  else if(request.method == 'POST')
    loginFormSubmit(request,response,next);    
};