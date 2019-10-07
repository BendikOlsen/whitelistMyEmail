const faker = require('faker');

let data = [];
count = 100;


for (var i = 0; i < count; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past(),
        true
    ]);
};


module.exports = {
    data
};


// insertion of fake data (this goes into app.js)

// const fakeEmails = require('./faker.js')

// let k = 'INSERT INTO users (email, created_at) VALUES ?';
// connection.query(k, [fakeEmails.data], (err, result) => {
//     if(err) throw err;
//     else result
// })
// // connection.end();
