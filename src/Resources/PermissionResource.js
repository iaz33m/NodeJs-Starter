const Resource = require('./Resource');

class PermissionResource extends Resource {

    toJson() {
        const {
            _id,
            name,
            description
        } = this.model;

        return {
            _id,
            name,
            description: description || ""
        };
    }

    static Collection(models) {
        return models.map(m => (new PermissionResource(m)).toJson());
    }

    static Make(model) {
        return new PermissionRequest(model).toJson();
    }
}

module.exports = PermissionResource;