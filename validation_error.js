const Movie = require('./entities/movie.entity');

const newMovie = new Movie({
    year: 2024,
    genre: 'Action'
});

newMovie.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err.message);
    });
