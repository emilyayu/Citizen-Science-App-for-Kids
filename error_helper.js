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

class TypeError extends ValidationError {
    constructor(type) {
        super("invalid type: " + type + "required")
    }
}

function errorMessage(err) {
    if (err == "ER_DUP_ENTRY") {
        errMessage = "Forbidden. The request object is not unique."
    } else if (err == "PropertyRequiredError") {
        errMessage = "Forbidden. The request object is missing a required propery"
    } else if (err == "TypeError") {
        errMessage = "Forbidden. The request object has invalid data type."
    }
    return errMessage
}

module.exports =
{
    InvalidEmail,
    PropertyRequiredError,
    ValidationError,
    TypeError,
    errorMessage
}