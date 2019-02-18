const Resource = require('./Resource');

class UserResource extends Resource {

    toJson() {
        return {
            _id: this.model.id,
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            email: this.model.email,
            number: this.model.number,
        };
    }

    static Collection(models) {
        return models.map(m => (new UserResource(m)).toJson());
    }

    static Make(model) {
        return new UserResource(model).toJson();
    }
}

module.exports = UserResource;