const _ = require('lodash');

module.exports = (req,res,next,pr)=>{

    if(!_.includes(req.user.permissions, pr)){
        return res.status(403).json({
            message:`${pr} permission is required to perform this action`
        });
    }

    next();
};