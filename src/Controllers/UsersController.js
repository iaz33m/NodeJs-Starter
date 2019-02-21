const { User } = require('../Models/User');

const me = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
        data: user
    });
};

module.exports = {
    me
};