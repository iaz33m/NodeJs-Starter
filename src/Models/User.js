const Joi = require('joi');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const _ = require('lodash');


const UserRules = {

    firstName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        required: true,
        maxlength: 1024,
    },
    number: {
        type: String,
        minlength: 2,
        maxlength: 255,
        trim: true,
        unique: true,
    }
};

const userSchema = new mongoose.Schema(UserRules);

userSchema.methods.getJWT = function () {

    const permissions = ['user-me']; // replace with users permissions from db

    let user = _.pick(this, [
        '_id', 'firstName', 'lastName', 'email', 'number'
    ]);

    return jwt.sign({
        // ...user,
        permissions
    }, process.env.JWT_SECRET);
}

const User = mongoose.model('User', userSchema);

function validate(user) {
    const {
        firstName,
        lastName,
        email,
        number
    } = UserRules;
    const schema = {
        firstName: Joi.string().min(firstName.minlength).max(firstName.maxlength).required(),
        lastName: Joi.string().min(lastName.minlength).max(lastName.maxlength).required(),
        email: Joi.string().min(email.minlength).max(email.maxlength).required().email(),
        password: Joi.string().min(6).required(),
        number: Joi.string().min(number.minlength).max(number.maxlength),
    };

    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validate
}