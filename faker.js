const faker = require('faker');

let data = [];

for (var i = 0; i < 1000; i++) {
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
}

module.exports = {
    data
};
