const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    let username = req.body.username;
    let password = req.body.password;

    if(username && password){
        let userswithsamename = users.filter((username)=>{
            return users.username === username
        });
        if(userswithsamename.length > 0){
            return res.status(300).json({message: "Username already exist."});
        } else {
            return res.send(`Username ${username} registered successfully.`)
        }       
    }else{
        return res.status(300).json({message: "Username and password cannot be empty."});
    }
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
            //console.log(books[keys[i]]);
            return res.send(JSON.stringify(books[keys[i]]));
        }
    }    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let author = req.params.title;
  let keys = Object.keys(books);

  for(let i= 0; i < keys.length; i++){
      if(author == books[keys[i]].title)
      {
          //console.log(books[keys[i]]);
          return res.send(JSON.stringify(books[keys[i]]));
      }
  }  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let title = books[isbn].title;
  let review = books[isbn].reviews;
  //console.log(review)
  if(review){
    return res.send("Review of ("+title+"): "+JSON.stringify(review));
  }
  else{
    return res.status(300).json({message: "No book found."});
  }  
});

module.exports.general = public_users;
