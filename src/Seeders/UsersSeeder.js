const { Seeder } = require('mongoose-data-seed');
var faker = require('faker');
const { User } = require('../Models/User');

class UsersSeeder extends Seeder {

    async run() {

        let users = [];

        for (let i = 0; i < 50; i++) {
            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: (i == 0) ? 'email@azeem.live' : faker.internet.exampleEmail(),
                password: "$2b$10$unshjGvkEkIwSj7AS9fn1.24hXkFctIJLaeAyzp1ChkwgCYIdCRji" // 123456789
            });
        }

        return User.create(users);
    }
}

module.exports = UsersSeeder;