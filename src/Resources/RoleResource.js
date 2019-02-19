const Resource = require('./Resource');

class RoleResource extends Resource {

    toJson() {

        const { _id, name, description, permissions } = this.model;

        return {
            _id,
            name,
            description: description || "",
            permissions
        };
    }

    static Collection(models) {
        return models.map(m => (new RoleResource(m)).toJson());
    }

    static Make(model) {
        return new RoleResource(model).toJson();
    }
}

module.exports = RoleResource;