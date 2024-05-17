const mongoose = require("mongoose");
const Movie = require('./entities/movie.entity');
const Actor = require('./entities/actor.entity');

const mongoDB = 'mongodb://localhost:27017/td_movie';
mongoose.connect(mongoDB);

async function updateMovieAndAddActor() {
    const movieId = '664752b4eeada489bb8e844b';
    const newGenre = 'Science Fiction';

    const newActorData = {
        name: 'Daniel Radcliffe',
        age: 40,
        gender: 'Male',
        nationality: 'British'
    };

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Mettre à jour le genre du film
        await Movie.updateOne({ _id: movieId }, { $set: { genre: newGenre } }, { session });

        // Ajouter un nouvel acteur
        const newActor = new Actor(newActorData);
        await newActor.save({ session });

        await session.commitTransaction();
        session.endSession();

        console.log('La transaction a été exécutée avec succès.');
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error('Une erreur est survenue lors de l\'exécution de la transaction :', error);
    }
}

updateMovieAndAddActor().catch(error => {
    console.error('Une erreur est survenue :', error);
});
