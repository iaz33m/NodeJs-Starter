const mongoose = require('mongoose');

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
    },
};

const roleSchema = new mongoose.Schema(Rules);

const Role = mongoose.model('Role', roleSchema);

function validate(model) {

    const {
        name,
    } = Rules;

    return Joi.validate(model, {
        name: Joi.string().min(name.minlength).max(name.maxlength).required(),
    });
}

module.exports = {
    Role,
    validate
}