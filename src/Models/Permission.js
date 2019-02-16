const mongoose = require('mongoose');
const Joi = require('Joi');
const {
    StringRules
} = require('./CommonRules');

const Rules = {
    name: {
        ...StringRules,
        required: "Name is Required",
        unique: true,
    },
    description: {
        ...StringRules,
        minlength: null,
    },
};

const permissionSchema = new mongoose.Schema(Rules);

const Permission = mongoose.model('Permission', permissionSchema);

function validate(model) {

    const {
        name,
    } = Rules;

    return Joi.validate(model, {
        name: Joi.string().min(name.minlength).max(name.maxlength).required(),
        description: Joi.empty(),
    });
}

module.exports = {
    Permission,
    validate
}