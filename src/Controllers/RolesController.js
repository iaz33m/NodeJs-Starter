const {
    Role,
    validate
} = require('./../Models/Role');

const { t: _t, messages: _m } = require('./../Messages/translator');

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
        description,
        permissions
    } = req.body;

    let rl = await Role.findOne({
        name
    });

    if (rl) {
        return res.status(400).json({
            message: _t(_m.modelAlreadyExists,
                { model: _t(_m.role) }
            )
        });
    }

    rl = new Role({
        name,
        description,
        permissions
    });

    await rl.save();

    res.json({
        message: _t(_m.modelCreatedSuccessfully,
            { model: _t(_m.role) }
        ),
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
        description,
        permissions
    } = req.body;


    const rl = await Role.findByIdAndUpdate(req.params.id, {
        $set: {
            name, description, permissions
        }
    }, { new: true });

    res.json({
        message: _t(_m.modelUpdatedSuccessfully,
            { model: _t(_m.role) }
        ),
        data: RoleResource.Make(rl),
    });
};

const destroy = async (req, res) => {

    await Role.findByIdAndRemove(req.params.id);

    res.json({
        message: _t(_m.modelDeletedSuccessfully,
            { model: _t(_m.role) }
        )
    });
};

module.exports = {
    index,
    create,
    update,
    destroy,
};