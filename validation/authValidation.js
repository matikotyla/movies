// Validation
const Joi = require('@hapi/joi');
const validate = require('validate.js');

// Register validation
const registerValidation = (data) => {
    // ADD CUSTOM ERROR MESSAGE
    // SEND ERROR OBJECT WITH ERRORS AND THEN DISPLAY THESE ERRORS
    const schema = {
        name: {
            presence: {
                message: "is required",
            },
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        },
        email: {
            presence: {
                message: "is required"
            },
            email: {
                message: "must be a valid email"
            },
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        },
        password: {
            presence: {
                message: "is required"
            },
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        }
    }

    // Validate the data
    return validate(data, schema);
}

// Login validation
// Register validation
const loginValidation = (data) => {
    // ADD CUSTOM ERROR MESSAGE
    // SEND ERROR OBJECT WITH ERRORS AND THEN DISPLAY THESE ERRORS
    const schema = {
        email: {
            presence: {
                message: "is required"
            },
            email: {
                message: "must be a valid email"
            },
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        },
        password: {
            presence: {
                message: "is required"
            },
            length: {
                minimum: 6,
                message: "must be at least 6 characters"
            }
        }
    }

    // const schema = Joi.object({
    //     email: Joi.string().min(6).required().email(),
    //     password: Joi.string().min(6).required()
    // });

    // Validate the data
    return validate(data, schema);
    // return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;