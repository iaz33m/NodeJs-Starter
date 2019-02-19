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
    permissions: [String]
};

const roleSchema = new mongoose.Schema(Rules);

const Role = mongoose.model('Role', roleSchema);

function validate(model) {

    const {
        name,
    } = Rules;

    return Joi.validate(model, {
        name: Joi.string().min(name.minlength).max(name.maxlength).required(),
        description: Joi.empty(),
        permissions: Joi.optional()
    });
}

module.exports = {
    Role,
    validate
}
