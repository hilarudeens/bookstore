/**
 * File Name: addbooks.js,
 * Author: hilarudeens,
 * Date Created: 1st April 2013,
 * Description: To render books page.
 */
var booksmodel = require('../models/dbcontrol')('bookmodel').booksModel;
var jade = require('jade');
var fs = require("fs");
var path = require('path');

var getaddBookTemplate = function(setAddBookArgs) {
  var session = setAddBookArgs.session;
  var tpl = jade.compile(fs.readFileSync(viewsPath + '/addBook.jade', 'utf-8'));
  return tpl({
    title : "Add Books",
    currentUser : session.username
  });
};

var getaddBookPage = function(request, response, next) {
  var setAddBookArgs = {};
  if (request.session.username === 'admin') {
    setAddBookArgs.session = request.session;
    response.send(getaddBookTemplate(setAddBookArgs));
  } else {
    request.session.username = 'Guest';
    response.redirect('/');
  }
};

var addBookSubmit = function(request, response, next) {
  var title = request.body.title;
  var author = request.body.author;
  var isbn = request.body.isbn;
  var description = request.body.description;
  var filePath = '';
  var upload = request.files.upload;
  if (title && isbn && upload && upload.type === 'application/pdf') {

    fs.createReadStream(upload.path).pipe(fs.createWriteStream(path.join(basePath, 'files', upload.name)));
    fs.unlink(upload.path, function(err) {
      console.log(err);
    });

    //Update database
    filePath = 'files/'+upload.name;
    booksmodel.insertBook({
      title : title,
      author : author,
      isbn : isbn,
      description : description,
      file : filePath
    }, function(err) {
      response.redirect('/addbooks');
    });

  } else {
    response.redirect('/addbooks');
  }
};

exports.addBookHandler = function(request, response, next) {
  if (request.method == 'GET')
    getaddBookPage(request, response, next);
  else if (request.method == 'POST')
    addBookSubmit(request, response, next);
};