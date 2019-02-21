const { User } = require('../../Models/User');
const { t: _t, messages: _m } = require('./../../Messages/translator');
const UserResource = require('./../../Resources/UserResource');

const updateRoles = async (req, res) => {

    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            roles: req.body.roles
        }
    }, { new: true });

    res.json({
        message: _t(_m.modelUpdatedSuccessfully,
            { model: _t(_m.user) }
        ),
        data: UserResource.Make(user),
    });

};


module.exports = {
    updateRoles
};