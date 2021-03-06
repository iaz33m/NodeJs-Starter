const express = require('express');
const app = express();
require('./src/Boot')(app);

const logger = require('./src/Boot/Logger');

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));