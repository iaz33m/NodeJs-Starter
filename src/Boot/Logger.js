require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

const { NODE_ENV, MONGO_LOG_URI } = process.env;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.MongoDB({ db: MONGO_LOG_URI || 'mongodb://localhost/nodeStarter', level: 'error' }),
        new winston.transports.File({ filename: './logs/combined.log' })
    ]
});

if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

process.on('uncaughtException', (error) => {
    logger.error(error.message, error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    throw error;
});

module.exports = logger;