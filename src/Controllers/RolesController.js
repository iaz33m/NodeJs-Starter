const {
    Role,
    validate
} = require('./../Models/Role');

const RoleResource = require('./../Resources/RoleResource');

const index = async (req, res) => {

    const roles = await Role.find().exec();

    res.json({
        data: RoleResource.Collection(roles)
    });
};

const create = async (req, res) => {

    const {
        error
    } = validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            errors: error.details,
        });
    }

    const {
        name,
        description
    } = req.body;

    let rl = await Role.findOne({
        name
    });

    if (rl) {
        return res.status(400).json({
            message: 'Role already exists with given name'
        });
    }

    rl = new Role({
        name,
        description
    });

    await rl.save();

    res.json({
        message: "Role created successfully",
        data: RoleResource.Make(rl),
    });
};

const update = async (req, res) => {


    const {
        error
    } = validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            errors: error.details,
        });
    }

    const {
        name,
        description
    } = req.body;


    const rl = await Role.findByIdAndUpdate(req.params.id, {
        $set: {
            name, description
        }
    }, { new: true });

    res.json({
        message: "Role updated successfully",
        data: RoleResource.Make(rl),
    });
};

const destroy = async (req, res) => {

    await Role.findByIdAndRemove(req.params.id);

    res.json({
        message: "Role deleted successfully"
    });
};

module.exports = {
    index,
    create,
    update,
    destroy,
};