/**
 * File Name: books.js,
 * Author: hilarudeens,
 * Date Created: 10th Oct 2012,
 * Description: Added for show example.
 */
var booksmodel = require('../models/dbcontrol')('bookmodel').booksModel;
var jade = require('jade');
var fs = require("fs");
var path = require('path');

var getBooksPage = function(getshowBooksPageArgs) {
  var tpl = jade.compile(fs.readFileSync(viewsPath + '/books.jade', 'utf-8'));
  return tpl({
      title : 'pdf',
      PDF: getshowBooksPageArgs.pdfpath
    });
};

exports.showBooks = function(request,response,next){
  var setshowBooksPageArgs = {
      pdfpath: request.query.pdf
  };
  response.send(getBooksPage(setshowBooksPageArgs));
};