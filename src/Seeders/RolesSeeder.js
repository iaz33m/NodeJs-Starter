const { Seeder } = require('mongoose-data-seed');
const { Role } = require('../Models');
const roles = require("../ACL/RoleAndPermissions");

class RolesSeeder extends Seeder {

    async run() {
        return Role.create(roles);
    }

}

module.exports = RolesSeeder;