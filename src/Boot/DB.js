
const mongoose = require('mongoose');
const logger = require('./Logger');

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true })
        .then(() => logger.info('Connected to MongoDB...'));
};