
const localizify = require('localizify');

module.exports = (req, res, next) => {

    const lang = req.headers['accept-language'] || 'en';

    localizify.setLocale(lang);

    next();

};