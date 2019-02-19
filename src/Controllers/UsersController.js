const _ = require('lodash');
const Joi = require('joi');

const { User } = require('../Models/User');
const { t: _t, messages: _m } = require('./../Messages/translator');
const UserResource = require('./../Resources/UserResource');

const me = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
        data: user
    });
};

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
    me, updateRoles
};