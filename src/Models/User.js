const Joi = require('joi');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { StringRules } = require('./CommonRules');

const UserRules = {

    firstName: {
        ...StringRules,
        required: "First Name is Required",
    },

    lastName: {
        ...StringRules,
        required: "Last Name is Required",
    },
    email: {
        ...StringRules,
        required: "Email is Required",
        unique:true,
    },
    password: {
        ...StringRules,
        required: "Password is Required",
        maxlength:1024,
    },
    number: {
        ...StringRules,
        unique:true,
    }
};

const userSchema = new mongoose.Schema(UserRules);

userSchema.methods.getJWT = function(){
    return jwt.sign(_.pick(this,[
        '_id','firstName','lastName','email','number'
    ]),process.env.JWT_SECRET); // from env
}

const User = mongoose.model('User', userSchema);

function validate(user) {
    const { firstName, lastName, email, number } = UserRules;
    const schema = {
        firstName: Joi.string().min(firstName.minlength).max(firstName.maxlength).required(),
        lastName: Joi.string().min(lastName.minlength).max(lastName.maxlength).required(),
        email: Joi.string().min(email.minlength).max(email.maxlength).required().email(),
        password:Joi.string().min(6).required(),
        number: Joi.string().min(number.minlength).max(number.maxlength),
    };

    return Joi.validate(user, schema);
}

module.exports = {
    User,validate
}