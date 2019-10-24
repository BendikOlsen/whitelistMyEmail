const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mailerInfo = require('./server/nodemailer')
const server = require('./server/server.js');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Total registered
let totalCount = 15;

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
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: mailerInfo.NODEMAILER_USER,
                pass: mailerInfo.NODEMAILER_PASS
            }
            
        });
        
        let mailOptions = {
            from: 'olsenwebapp@gmail.com',
            to: req.body.email,
            subject: 'nodemailer test',
            text: `Thanks for believing in this project. We will contact you with further information once the whitelisting period is over.`
        };
        
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        
        
        server.connection.query ('INSERT INTO users SET ?', person, (err, results) => {
            if(err) {
                console.log(err)  
            }

            if(count >= totalCount) {
                console.log(err)
            }

            res.redirect('/')
        });
    });
});





app.listen(process.env.PORT || 5000, () => {
    console.log('App listening on port 5000!')
});

