const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "test", password: "123"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

    if(username != "" & password != ""){
        let userswithsamename = users.filter((user)=>{
            return user.username === username
        });
        if(userswithsamename.length > 0){
            // check password
            if(userswithsamename[0].password === password)
            {
                return true;
            }
            else{
                return false;
            }
        } else {
            return false;
        }       
    }else{
        return false;
    }

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let username = req.body.username;
  let password = req.body.password;

  if(username != "" & password != ""){
        if(authenticatedUser(username, password)){
            let accessToken = jwt.sign({
                data: username
              }, 'access', { expiresIn: 60 * 60 });
          
              req.session.authorization = {
                accessToken,username
              }
              return res.status(200).send("User successfully logged in");
        }   
        else{
            return res.status(300).json({message: "Username or password does not mtach."});
        } 
   }else{
       return res.status(300).json({message: "Username and password cannot be empty."});
   }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    let review = req.body.review;
    let isbn = req.params.isbn;

    books[isbn]["reviews"][req.user['data']] = review;

    return res.status(200).json(books[isbn]);
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
    let isbn = req.params.isbn;

    delete books[isbn]["reviews"][req.user['data']];

    return res.status(200).json(books[isbn]);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
