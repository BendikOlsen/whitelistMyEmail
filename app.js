const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const nodemailer = require('nodemailer');
const server = require('./server/server.js');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Total registered
let totalCount = 15;

// Gloval variables
app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    next();
});

app.get('/', (req, res) => {
    let querytotalWlCount = 'SELECT COUNT(*) AS total FROM users WHERE whitelisted = TRUE ';
    server.connection.query (querytotalWlCount, (err, results) => {

        if(err) {
            console.log(err)
        };

        let count = results[0].total;
        res.render("home", {count: count, totalCount: totalCount});
    });
});

app.post('/register', (req, res) => {
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
        }
        
        server.connection.query ('INSERT INTO users SET ?', person, (err, results) => {
        let messages = [];

            if(err) {
                console.log(err)
                
            }
            if(count >= totalCount) {
                messages.push(err)
                req.flash('no more spots')
            }
            res.redirect('/')
        });
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!')
});

