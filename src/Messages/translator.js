const { t } = require('localizify');

const messages = require('./index');

const propName = (prop, value) => {
    for (var i in prop) {
        if (prop[i] == value) {
            return i;
        }
    }
    return false;
}

exports.messages = messages;

exports.t = (value, obj = {}) => {
    const key = propName(messages, value);
    return t(key || value, obj)
}