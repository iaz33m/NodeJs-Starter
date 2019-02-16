module.exports = class Resource {

    constructor(model) {
        this.model = {
            ...model._doc
        }
    }

    toJson() {
        return {
            ...this.model
        };
    }

    static Collection(models) {
        return models.map(m => (new Resource(m)).toJson());
    }

    static Make(model) {
        return new Resource(model).toJson();
    }
};