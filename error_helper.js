class InvalidRequest extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ValidationError extends InvalidRequest { }

class PropertyRequiredError extends ValidationError {
    constructor(property) {
        super("Missing Property: " + property);
        this.property = property
    }
}

class InvalidEmail extends ValidationError {
    constructor(email) {
        super("'" + email + "' not a vaild email");
    }
}

module.exports =
{
    InvalidEmail,
    PropertyRequiredError,
    ValidationError
}