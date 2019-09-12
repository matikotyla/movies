const router = require('express').Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../authentication/verifyToken');
const movieController = require('../controllers/movieController');

router.get('/secret', checkAuthenticated, movieController.secret);
router.get('/', checkAuthenticated, movieController.allMovies);
router.post('/create', checkAuthenticated, movieController.createMovie);
router.get('/:id', checkAuthenticated, movieController.readMovie);
router.put('/edit/:id', checkAuthenticated, movieController.updateMovie);
router.delete('/delete/:id', checkAuthenticated, movieController.deleteMovie);

module.exports = router;