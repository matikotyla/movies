const Joi = require('@hapi/joi');
const validate = require('validate.js');

// Validate data during creating new movie
const createMovieValidation = (data) => {
    const schema = {
        title: {
            presence: {
                allowEmpty: false,
                message: "is required"
            },
            type: "string"
        },
        year: {
            presence: {
                allowEmpty: false,
                message: "is required"
            },
            numericality: {
                message: "must be a number"
            },
            type: "string"
        },
        genre: {
            presence: {
                allowEmpty: false,
                message: "is required"
            },
            type: "string"
        }
    }

    return validate(data, schema);
}

// Validate if the movie id exists
const readMovieValidation = (data) => {
    const schema = {
        id: {
            presence: {
                allowEmpty: false,
                message: "is required"
            }
        }
    }

    return validate(data, schema);
}

// Validate data during editing movie
const updateMovieValidation = (data) => {
    const schema = {
        id: {
            presence: {
                allowEmpty: false,
                message: "is required"
            }
        },
        title: {
            presence: {
                allowEmpty: false,
                message: "is required"
            },
            type: "string"
        },
        year: {
            presence: {
                allowEmpty: false,
                message: "is required"
            },
            numericality: {
                message: "must be a number"
            },
            type: "string"
        },
        genre: {
            presence: {
                allowEmpty: false,
                message: "is required"
            },
            type: "string"
        }
    }

    return validate(data, schema);
}

const deleteMovieValidation = (data) => {
    const schema = {
        id: {
            presence: {
                allowEmpty: false,
                message: "is required"
            }
        }
    }

    return validate(data, schema);
}

module.exports.createMovieValidation = createMovieValidation;
module.exports.readMovieValidation = readMovieValidation;
module.exports.updateMovieValidation = updateMovieValidation;
module.exports.deleteMovieValidation = deleteMovieValidation;