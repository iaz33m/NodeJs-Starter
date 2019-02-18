const {
    Permission,
    validate
} = require('./../Models/Permission');

const { t: _t, messages: _m } = require('./../Messages/translator');

const PermissionResource = require('./../Resources/PermissionResource');

const index = async (req, res) => {

    const permissions = await Permission.find().exec();

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
            message: error.details[0].message,
            errors: error.details,
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
            message: _t(_m.modelAlreadyExists,
                { model: _t(_m.permission) }
            ),
        });
    }

    pr = new Permission({
        name,
        description
    });

    await pr.save();

    res.json({
        message: _t(_m.modelCreatedSuccessfully,
            { model: _t(_m.permission) }
        ),
        data: PermissionResource.Make(pr),
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


    const pr = await Permission.findByIdAndUpdate(req.params.id, {
        $set: {
            name, description
        }
    }, { new: true });


    res.json({
        message: _t(_m.modelUpdatedSuccessfully,
            { model: _t(_m.permission) }
        ),
        data: PermissionResource.Make(pr),
    });
};

const destroy = async (req, res) => {

    await Permission.findByIdAndRemove(req.params.id);

    res.json({
        message: _t(_m.modelDeletedSuccessfully,
            { model: _t(_m.permission) }
        ),
    });
};

module.exports = {
    index,
    create,
    update,
    destroy,
};