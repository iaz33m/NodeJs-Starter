const _ = require('lodash');

const { t: _t, messages: _m } = require('./../Messages/translator');

module.exports = (req, res, next, pr) => {

    if (!_.includes(req.user.permissions, pr)) {
        const m = _t(_m.permissionRequired);
        return res.status(403).json({
            message: `${pr} ${m}`
        });
    }

    next();
};