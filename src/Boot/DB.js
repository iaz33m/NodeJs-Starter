
const mongoose = require('mongoose');
const logger = require('./Logger');

module.exports = () => {
    const { MONGO_URI } = process.env;
    await mongoose.connect(MONGO_URI || 'mongodb://localhost/nodeStarter', { useNewUrlParser: true });
    logger.info('Connected to MongoDB...')
};