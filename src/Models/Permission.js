const mongoose = require('mongoose');
const Joi = require('Joi');

const Rules = {
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        minlength: 2,
        trim: true,
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