// Movie model
const mongoose = require('mongoose');

// Create new schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

// Export the movie schema
module.exports = mongoose.model('Movie', movieSchema);