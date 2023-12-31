const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let book = books[isbn]
  return res.send(JSON.stringify(book))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    let author = req.params.author;
    let keys = Object.keys(books);

    for(let i= 0; i < keys.length; i++){
        if(author == books[keys[i]].author)
        {
            console.log(books[keys[i]]);
            return res.send(JSON.stringify(books[keys[i]]));
        }
    }    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
