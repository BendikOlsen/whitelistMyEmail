const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const server = require('./server/server.js');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Total registered
let totalCount = 250;

app.get("/", (req, res) => {
    let querytotalWlCount = 'SELECT COUNT(*) AS total FROM users WHERE whitelisted = TRUE ';
    server.connection.query (querytotalWlCount, (err, results) => {

        if(err) {
            console.log(err)
        };

        let count = results[0].total;
        res.render("home", {count: count, totalCount: totalCount});
    });
});

app.post("/register", (req, res) => {
    // her skal jeg hente ut antall emails som er WL
    let querytotalWlCount = 'SELECT COUNT(*) AS total FROM users WHERE whitelisted = TRUE ';
    server.connection.query (querytotalWlCount, (err, results) => {
        if(err) {
            console.log(err)
        };

        let count = results[0].total;
        let whiteListed = true;

        if (count >= totalCount) {
            whiteListed = false
        };

        let person = {
            email: req.body.email,
            whitelisted: whiteListed
        };

        server.connection.query ('INSERT INTO users SET ?', person, (err, results) => {
            if(err) {
                console.log(err);
            };

            res.redirect("/");
        })
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
});

