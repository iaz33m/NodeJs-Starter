const _ = require('lodash');
const Joi = require('joi');
const {
    genSalt,
    hash,
    compare
} = require('bcrypt');

const {
    User,
    validate
} = require('../Models/User');

const { t: _t, messages: _m } = require('./../Messages/translator');

const UserResource = require('./../Resources/UserResource');


const register = async (req, res, next) => {

    const {
        error
    } = validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    };

    const {
        firstName,
        lastName,
        password,
        email,
        number
    } = req.body;

    let user = await User.findOne({
        email
    });

    if (user) {
        return res.status(400).json({
            message: _t(_m.modelAlreadyExists,
                { model: _t(_m.user) }
            ),
        });
    }

    const passHas = await hash(password, await genSalt(10));

    const { DEFAULT_USER_ROLE } = process.env;

    user = new User({
        firstName,
        lastName,
        email,
        number,
        password: passHas,
        roles: [
            DEFAULT_USER_ROLE
        ],
    });

    await user.save();

    const accessToken = user.getJWT();

    res.json({
        message: _t(_m.modelCreatedSuccessfully,
            { model: _t(_m.user) }
        ),
        data: UserResource.Make(user),
        accessToken,
    });

};

const login = async (req, res, next) => {

    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const {
        email,
        password
    } = req.body;

    let user = await User.findOne({
        email
    });

    const errorMessage = _t(_m.invalidEmailOrPassword);

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
        message: _t(_m.loggedInSuccessfully),
        data: UserResource.Make(user),
        accessToken,
    });

};

module.exports = {
    register,
    login
};