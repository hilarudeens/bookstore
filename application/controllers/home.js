/**
 * File Name: home.js, Author: hilarudeens, Date Created: 10th Oct 2012,
 * Description: To render home page.
 */
var booksmodel = require('../models/dbcontrol')('bookmodel').booksModel;
// console.log(booksmodel);

var jade = require('jade');
var fs = require("fs");

var getHomePage = function(getHomePageArgs, callback) {
  var session = getHomePageArgs.session;
  booksmodel.selectBooks({}, function(err, books) {
    var booklisttpl = jade.compile(fs.readFileSync(viewsPath + '/bookList.jade', 'utf-8'));
    var booklisthtml = booklisttpl({
      books : books
    });
    var homepagetpl = jade.compile(fs.readFileSync(viewsPath + '/page.jade', 'utf-8'));
    var html = homepagetpl({
      basePath : 'localhost',
      title : 'Home',
      currentUser : session.username,
      booklist : '!BOOKLIST'
    });

    html = html.replace(new RegExp('!BOOKLIST', 'gm'), booklisthtml);
    callback(html);
  });
};

exports.homePageHandler = function(request, response, next) {
  var setHomePageArgs = {};
  if (typeof request.session.username != 'string' || request.session.username == '') {
    request.session.username = 'Guest';
  }
  setHomePageArgs.session = request.session;
  getHomePage(setHomePageArgs, function(html) {
    response.send(html);
  });
};