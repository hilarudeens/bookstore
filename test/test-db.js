/**
 * File Name: test-db.js, 
 * Author: hilarudeens, 
 * Date Created: 1st April 2013,
 * Description: This is test file which is hold dbs basic operation test.
 */
var mongoose = require('mongoose').connect('mongodb://localhost:27017/bookstoredb');
var bookModel = require('../application/models/bookmodel.js').booksModel;

//Insert TEST
exports.insertBookInDB = function(test) {
  var insertingBookJSON = {
    title : "java",
    author : "Balagurusamy",
    isbn : "ISBN12345678",
    description : "About java book",
    file : "file/java.pdf"
  };
  bookModel.insertBook(insertingBookJSON, function(err) {
    bookModel.selectBooks({
      title : insertingBookJSON.title,
      author : insertingBookJSON.author
    }, function(err, book) {
      test.equal(book[0].isbn, insertingBookJSON.isbn);
      test.done();
    });
  });
};

//Update TEST
exports.updateBookInDB = function(test) {
  var insertingBookJSON = {
    title : "c++",
    author : "Balagurusamy",
    isbn : "ISBN12345678",
    description : "About java book",
    file : "file/cpp.pdf"
  };
  bookModel.insertBook(insertingBookJSON, function(err) {
    bookModel.updateBook({
      condition : {
        title : insertingBookJSON.title
      },
      set : {
        author : "Balaguru"
      }
    }, function(err) {
      bookModel.selectBooks({
        title : insertingBookJSON.title,
        isbn : insertingBookJSON.isbn
      }, function(err, book) {
        test.equal(book[0].author, "Balaguru", "Update status");
        test.done();
      });
    });
  });
};