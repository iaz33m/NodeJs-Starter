const {
    Permission,
    validate
} = require('./../Models/Permission');

const PermissionResource = require('./../Resources/PermissionResource');

const index = async (req, res) => {

    const permissions = await Permission
        .find()
        .select('name description')
        .exec();

    res.json({
        data: PermissionResource.Collection(permissions)
    });
};

const create = async (req, res) => {

    const {
        error
    } = validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const {
        name,
        description
    } = req.body;

    let pr = await Permission.findOne({
        name
    });

    if (pr) {
        return res.status(400).json({
            message: 'Permission already exists with given name'
        });
    }

    pr = new Permission({
        name,
        description
    });

    await pr.save();

    res.json({
        message: "Permission created successfully",
        data: PermissionResource.Make(pr),
    });
};


module.exports = {
    index,
    create
};