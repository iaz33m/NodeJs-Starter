const logger = require('./../Boot/Logger');

module.exports = (err, req, res, next) => {

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message:"Unauthorized Access"
        });
    }

    logger.error(err.message, err);

    res.status(500).json({
        message: err.message
    });

};