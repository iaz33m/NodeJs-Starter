const _ = require('lodash');
const Joi = require('joi');
const { genSalt, hash, compare } = require('bcrypt');

const { User, validate } = require('../Models/User');


const register = async (req, res, next) => {

    const { error } = validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    };

    const { firstName, lastName, password, email, number } = req.body;

    let user = await User.findOne({
        email
    });

    if (user) {
        return res.status(400).json({
            message: 'User already exists with given email'
        });
    }

    const passHas = await hash(password, await genSalt(10));

    user = new User({
        firstName, lastName, email, number, password: passHas
    });

    await user.save();

    const accessToken = user.getJWT();

    res.json({
        message: "User Registered Successfully.",
        data: _.pick(user, [
            '_id', 'firstName', 'lastName', 'email', 'number'
        ]),
        accessToken,
    });

};

const login = async (req, res, next) => {

    const schema = {
        email: Joi.required().email(),
        password: Joi.required(),
    };

    const error = Joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const { email, password } = req.body;

    let user = await User.findOne({
        email
    });

    const errorMessage = "Invalid Email or Password";

    if (!user) {
        return res.status(400).json({
            message: errorMessage
        });
    }

    const passValid = await compare(password, user.password);

    if (!passValid) {
        return res.status(400).json({
            message: errorMessage
        });
    }

    const accessToken = user.getJWT();

    res.json({
        message: "Logged in Successfully",
        data: _.pick(user, [
            '_id', 'firstName', 'lastName', 'email', 'number'
        ]),
        accessToken,
    });

};

module.exports = {
    register, login
};