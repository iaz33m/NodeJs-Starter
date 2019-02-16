const Resource = require('./Resource');

class RoleResource extends Resource {

    toJson() {

        const {_id,name,description} = this.model;
        
        return {
            _id,
            name,
            description: description || ""
        };
    }

    static Collection(models) {
        return models.map(m => (new RoleResource(m)).toJson());
    }

    static Make(model) {
        return new RoleRequest(model).toJson();
    }
}

module.exports = RoleResource;