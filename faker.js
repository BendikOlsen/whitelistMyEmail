const faker = require('faker');

let data = [];
count = 499;


for (var i = 0; i < count; i++) {
    if (count <= data.length ) {
    data.push([
        faker.internet.email(),
        faker.date.past(),
        faker.internet.password.misc()
    ]);
    } else {
        data.push([
            faker.internet.email(),
            faker.date.past(),
        ]);
    }
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
// connection.end();
