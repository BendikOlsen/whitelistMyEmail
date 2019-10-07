const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const server = require('./server.js')
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Total registered
app.get("/", (req, res) => {
    let querytotalWlCount = 'SELECT COUNT(*) AS total FROM users WHERE whitelisted = TRUE ';
    server.connection.query (querytotalWlCount, (err, results) => {
        if(err) throw error;
        let count = results[0].total
        let totalCount = 9999;
        res.render("home", {count: count, totalCount: totalCount});
    });
});

app.post("/register", (req, res) => {
    let person = {
        email: req.body.email,
        whitelisted: true
    }
    
    server.connection.query ('INSERT INTO users SET ?', person, (err, results) => {
        if(err) console.log(err);
        res.redirect("/");
    })
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
}); 

