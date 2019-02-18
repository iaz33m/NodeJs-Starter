const logger = require('./../Boot/Logger');

const { t: _t, messages: _m } = require('./../Messages/translator');

module.exports = (err, req, res, next) => {

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: _t(_m.unauthorizedAccess)
        });
    }

    logger.error(err.message, err);

    res.status(500).json({
        message: err.message
    });

};