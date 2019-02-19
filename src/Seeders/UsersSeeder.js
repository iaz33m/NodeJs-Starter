const { Seeder } = require('mongoose-data-seed');
var faker = require('faker');
const { User } = require('../Models/User');

class UsersSeeder extends Seeder {

    async run() {

        const { DEFAULT_USER_ROLE, SUPER_USER_ROLE } = process.env;

        let users = [];

        // admin user
        users.push({
            firstName: "Azeem",
            lastName: "Tariq",
            email: 'email@azeem.live',
            password: "$2b$10$707zl04F4NMfvh883TFOqeCQ0oCyvj.xIqZ279xft2JiYu8iCZOI.", // 123456789,
            number: "03040477588",
            roles: [DEFAULT_USER_ROLE || "User", SUPER_USER_ROLE || "Admin"]
        });

        // other normal users
        for (let i = 0; i < 50; i++) {
            users.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.exampleEmail(),
                password: "$2b$10$707zl04F4NMfvh883TFOqeCQ0oCyvj.xIqZ279xft2JiYu8iCZOI.", // 123456789,
                number: faker.phone.phoneNumber(),
                roles: [DEFAULT_USER_ROLE || "User"]
            });
        }

        return User.create(users);
    }
}

module.exports = UsersSeeder;