/**
 * File Name: addbooks.js,
 * Author: hilarudeens,
 * Date Created: 10th Oct 2012,
 * Description: To render books page.
 */
var dbcontrol = require('../models/dbcontrol');
var jade = require('jade');
var fs = require("fs");

var getaddBookTemplate = function(setAddBookArgs) { 
  var session = setAddBookArgs.session;
  
  var tpl = jade.compile(fs.readFileSync(viewsPath + '/addBook.jade','utf-8'));
  return tpl({
    title : "Add Books",
    currentUser : session.username
  });
};

var getaddBookPage = function(request,response,next){
  var setAddBookArgs = {};
  setAddBookArgs.session = request.session;
  response.send(getaddBookTemplate(setAddBookArgs));
};

var addBookSubmit = function(request,response,next){
  
  
  console.log(request.body);
  
  console.log(request.files);
  
  
 /* var username = request.body.username;
  var password = request.body.password;
  var user = dbcontrol.userCollection;
  
  if (username === 'admin' && password === 'admin') {
    request.session.username = username;
    response.redirect('/');
  } else {
    response.redirect('/adminlogin');
  }*/
};

exports.addBookHandler = function(request,response,next){
  if(request.method == 'GET')
    getaddBookPage(request,response,next);
  else if(request.method == 'POST')
    addBookSubmit(request,response,next);    
};