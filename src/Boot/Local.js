const localizify = require('localizify');

const en = require('../Messages/en');
const fr = require('../Messages/fr');

module.exports = () => {
    localizify
        .add('en', en)
        .add('fr', fr);
};