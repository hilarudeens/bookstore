/**
 * File Name: storemodel.js,
 * Author: hilarudeens,
 * Date Created: 10th Oct 2012,
 * Description: This is used to manage user collection in mongodb with mongoose friendly.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
  title : String,
  author : String,
  isbn: String,
  description: String,
  file: String
});

bookSchema.statics.selectBooks = function(condition, callback) {
  this.find(condition, function(err, docs) {
    callback(err, docs);
  });
};

bookSchema.statics.insertBook = function(options, callback) {
  var newBook = new this;
  if(options.title && options.file){
  newBook.title = options.title;
  newBook.author = options.author || "unknown";
  newBook.isbn = options.isbn || "unknown";
  newBook.description = options.description || "Have nothing about book";
  newBook.file =  options.file;
  newBook.save(function(err){    
    if(typeof callback === 'function'){
      callback(err);
    }    
  });  
  }else if(typeof callback === 'function'){
    callback(new Error("Invalid input!"));
  }
};

bookSchema.statics.deleteBook = function(condition, callback) {
  this.remove(condition, function(err) {
    if(typeof callback === 'function'){
      callback(err);
    }
  });
};

bookSchema.statics.updateBook = function(args, callback) {
  var condition = args.condition;
  var set = args.set;
  var option = args.option || {};
  
  if(condition && set){
    this.update(condition, set, option, function(err) {
      if(typeof callback === 'function'){
        callback(err);
      }
    });
  }else if(typeof callback === 'function'){
    callback(new Error("Invalid input!"));
  }  
};

// Exports
exports.bookSchema = bookSchema;
exports.booksModel = mongoose.model('books', bookSchema);


