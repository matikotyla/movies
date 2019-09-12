const Movie = require('../models/movie');
const { createMovieValidation, readMovieValidation, updateMovieValidation, deleteMovieValidation } = require('../validation/movieValidation');

module.exports.secret = (req, res) => {
    res.send(req.user);
}

// Get all movies which belong to the logged in user
module.exports.allMovies = async (req, res) => {
    const movies = await Movie.find({ user: req.user.id });
    res.send(movies);
}

// Create new movie
module.exports.createMovie = async (req, res) => {
    // Validate if the movie data is correct
    const errors = createMovieValidation(req.body);
    if(errors) return res.status(400).json({ errors });

    // Create a new movie
    const movie = new Movie({
        title: req.body.title,
        year: Number(req.body.year),
        genre: req.body.genre,
        user: req.user.id
    });

    // Save movie to the databse
    try {
        const savedMovie = await movie.save();
        res.send(savedMovie);
    } catch(err) {
        res.status(400).send(err);
    }
}

// Get the particular movie
module.exports.readMovie = async (req, res) => {
    // Validate if the movie id has been provided
    const errors = readMovieValidation(req.params);
    if(errors) return res.status(400).json({ errors }); 

    // Get the movie and check if this movie belongs to this user
    // Get the movie
    try {
        // Get the movie from the database
        const movie = await Movie.findById(req.params.id);

        // Check if the movie with the given id exists
        if(movie) {
            // Check if the movie belongs to the user actually logged in
            if(movie.user === req.user.id) {
                res.send(movie);
            } else {
                res.status(400).json({
                    errors: {
                        id: ["This movie doesn't belong to you"]
                    }
                });
            }
        } else {
            res.status(400).json({
                errors: {
                    id: ["Movie with given id doesn't exist"]
                }
            });
        }
    } catch(err) {
        res.status(400).json({
            errors: {
                id: ["Invalid id"]
            }
        });
    }
}

// Update the movie
module.exports.updateMovie = async (req, res) => {
    // Check if user provided the required data
    const errors = updateMovieValidation({...req.params, ...req.body});
    if(errors) return res.status(400).send({ errors });

    try {
        // Get the movie with the given id
        const movie = await Movie.findById(req.params.id);

        // Check if the movie with the given id exists
        if(movie) {
            // Check if the movie belongs to the user actaully logged in
            if(movie.user === req.user.id) {
                // Edit the movie
                try {
                    const savedMovie = await movie.updateOne({
                        title: req.body.title,
                        year: Number(req.body.year),
                        genre: req.body.genre,
                    });
                    res.status(200).send('Movie updated');
                } catch(err) {
                    res.status(400).json({
                        errors: {
                            id: ["Error during updating the movie"]
                        }
                    });
                }
            } else {
                res.status(400).json({
                    errors: {
                        id: ["This movie doesn't belong to you"]
                    }
                });
            }
        } else {
            res.status(400).json({
                errors: {
                    id: ["Movie with given id doesn't exist"]
                }
            });
        }
    } catch(err) {
        res.status(400).json({
            errors: {
                id: ["Invalid id"]
            }
        });
    }
}

// Delete the movie
module.exports.deleteMovie = async (req, res) => {
    // Validate if the movie id exists
    const errors = deleteMovieValidation(req.params);
    if(errors) return res.status(400).send(errors);

    // Get the movie
    try {
        // Get the movie from the databse
        const movie = await Movie.findById(req.params.id);

        // Check if the movie with the given id exists
        if(movie) {
            // Check if the movie belongs to the user actually logged in
            if(movie.user === req.user.id) {
                // Delete the movie
                await movie.remove();
                return res.status(200).send('Movie deleted');
            } else {
                res.status(400).json({
                    errors: {
                        id: ["This movie doesn't belong to you"]
                    }
                });
            }
        } else {
            return res.status(400).json({
                errors: {
                    id: ["Movie with given id doesn't exist"]
                }
            });
        }

    } catch(err) {
        return res.status(400).json({
            errors: {
                id: ["Invalid id"]
            }
        });
    }
}