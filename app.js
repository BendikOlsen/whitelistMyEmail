const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const fakeEmails = require('./faker.js')
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   'password',
    database    :   'WHITELIST'
});


app.get("/", (req, res) => {
    let q = 'SELECT COUNT(*) AS total FROM users ';
    connection.query (q, (error, results) => {
        if(error) throw error;
        let count = results[0].total
        res.render("home", {count: count});
    });
});

app.post("/register", (req, res) => {
    let person = {
        email: req.body.email
    }
    
    connection.query ('INSERT INTO users SET ?', person, (error, results) => {
        if(error) throw error;
        res.redirect("/");
    })
});

// insertion of fake data
// let k = 'INSERT INTO users (email, created_at) VALUES ?';
// connection.query(k, [fakeEmails.data], (err, result) => {
//     if(err) throw err;
//     else result
// })
// connection.end();


app.listen(3000, () => {
    console.log('App listening on port 3000!')
}); 

