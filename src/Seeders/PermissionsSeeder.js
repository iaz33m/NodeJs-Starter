const { Seeder } = require('mongoose-data-seed');
const { Permission } = require('../Models');
const roles = require("../ACL/RoleAndPermissions");
const _ = require('lodash');

class PermissionsSeeder extends Seeder {

    async run() {

        let prs = [];

        roles.forEach(r => {
            prs = _.merge(prs, r.permissions);
        });

        const permissions = prs.map(p => ({
            name: p,
            desription: p
        }));

        return Permission.create(permissions);
    }

}

module.exports = PermissionsSeeder;