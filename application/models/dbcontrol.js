/**
 * File Name: dbcontrol.js,
 * Author: hilarudeens,
 * Date Created: 10th Oct 2012,
 * Description: This file is hook files those are having control over different model.
 */

//Exporting user model
exports = module.exports = function(moduleFile){
  moduleFile = moduleFile ? moduleFile: 'all';
  return require('./'+moduleFile);
};

















/*var user = require('./usermodel');
exports.userModel = user.userModel;


var books = require('./storemodel').booksModel;
console.log("Inserting Book");
console.log(books);

books.insertBook({title : "C++",
  author : "Balagurusamy",
  isbn: "ISBN12345678",
  description: "About c++ book",
  file: "/afsdfgd.pdf"}, function(err){
    console.log("err is ",err);
  });


books.insertBook({title : "java",
  author : "Balagurusamy",
  isbn: "ISBN12345678",
  description: "About java book",
  file: "/java.pdf"}, function(err){
    
    console.log("GOING TO UPDATE");
    books.updateBook(
        {
          condition: {title : "java"}, 
          set:{file: "/java2.pdf"}
        }, function(err){
      console.log("ERROR ON upadte "+err);
    });
    
  });

console.log("Reading Book");
books.selectBooks({},function(err, book){
  console.log(book);
});

books.deleteBook({title:'C++'}, function(err){
  console.log("ERROR ON DELETE "+err);
})



  
  
//To Do
//Include more models here
*/



