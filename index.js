const mongoose = require("mongoose")
const Actor = require('./entities/actor.entity');
const Movie = require('./entities/movie.entity');

const mongoDB = 'mongodb://localhost:27017/td_movie';

mongoose.connect(mongoDB);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const createActor = async (name, age, gender, nationality) => {
    const actor = new Actor({ name, age, gender, nationality });
    await actor.save();
    return actor;
};

const createMovie = async (title, year, genre, main_actors) => {
    const movie = new Movie({ title, year, genre, main_actors });
    await movie.save();
    return movie;
};

const seedDatabase = async () => {
    await Actor.deleteMany({});
    await Movie.deleteMany({});

    const actorsData = [
        { name: 'Leonardo DiCaprio', age: 48, gender: 'Male', nationality: 'American' },
        { name: 'Kate Winslet', age: 48, gender: 'Female', nationality: 'British' },
        { name: 'Morgan Freeman', age: 86, gender: 'Male', nationality: 'American' },
        { name: 'Brad Pitt', age: 60, gender: 'Male', nationality: 'American' },
        { name: 'Angelina Jolie', age: 48, gender: 'Female', nationality: 'American' },
        { name: 'Robert Downey Jr.', age: 59, gender: 'Male', nationality: 'American' },
        { name: 'Chris Evans', age: 42, gender: 'Male', nationality: 'American' },
        { name: 'Scarlett Johansson', age: 39, gender: 'Female', nationality: 'American' },
        { name: 'Tom Hanks', age: 67, gender: 'Male', nationality: 'American' },
        { name: 'Meryl Streep', age: 74, gender: 'Female', nationality: 'American' },
        { name: 'Ben Affleck', age: 51, gender: 'Male', nationality: 'American' },
        { name: 'Rosamund Pike', age: 45, gender: 'Female', nationality: 'British' },
        { name: 'Sandra Bullock', age: 59, gender: 'Female', nationality: 'American' },
        { name: 'George Clooney', age: 62, gender: 'Male', nationality: 'American' },
        { name: 'John Travolta', age: 70, gender: 'Male', nationality: 'American' },
        { name: 'Uma Thurman', age: 53, gender: 'Female', nationality: 'American' },
        { name: 'Christian Bale', age: 50, gender: 'Male', nationality: 'British' },
        { name: 'Heath Ledger', age: 28, gender: 'Male', nationality: 'Australian' },
        { name: 'Matthew McConaughey', age: 54, gender: 'Male', nationality: 'American' },
        { name: 'Anne Hathaway', age: 41, gender: 'Female', nationality: 'American' },
        { name: 'Ryan Gosling', age: 43, gender: 'Male', nationality: 'Canadian' },
        { name: 'Emma Stone', age: 35, gender: 'Female', nationality: 'American' },
        { name: 'Keanu Reeves', age: 59, gender: 'Male', nationality: 'Canadian' },
        { name: 'Laurence Fishburne', age: 62, gender: 'Male', nationality: 'American' },
        { name: 'Elijah Wood', age: 43, gender: 'Male', nationality: 'American' },
        { name: 'Ian McKellen', age: 84, gender: 'Male', nationality: 'British' },
        { name: 'Russell Crowe', age: 59, gender: 'Male', nationality: 'New Zealander' },
        { name: 'Sam Worthington', age: 47, gender: 'Male', nationality: 'Australian' },
        { name: 'Zoe Saldana', age: 45, gender: 'Female', nationality: 'American' },
    ];

    const actors = {};
    for (const data of actorsData) {
        actors[data.name] = await createActor(data.name, data.age, data.gender, data.nationality);
    }

    const moviesData = [
        { title: 'Inception', year: 2010, genre: 'Sci-Fi', main_actors: ['Leonardo DiCaprio'] },
        { title: 'Titanic', year: 1997, genre: 'Romance', main_actors: ['Leonardo DiCaprio', 'Kate Winslet'] },
        { title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', main_actors: ['Morgan Freeman'] },
        { title: 'Fight Club', year: 1999, genre: 'Drama', main_actors: ['Brad Pitt'] },
        { title: 'Mr. & Mrs. Smith', year: 2005, genre: 'Action', main_actors: ['Brad Pitt', 'Angelina Jolie'] },
        { title: 'Iron Man', year: 2008, genre: 'Action', main_actors: ['Robert Downey Jr.'] },
        { title: 'The Avengers', year: 2012, genre: 'Action', main_actors: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'] },
        { title: 'Forrest Gump', year: 1994, genre: 'Drama', main_actors: ['Tom Hanks'] },
        { title: 'The Devil Wears Prada', year: 2006, genre: 'Comedy', main_actors: ['Meryl Streep'] },
        { title: 'The Departed', year: 2006, genre: 'Crime', main_actors: ['Leonardo DiCaprio'] },
        { title: 'Gone Girl', year: 2014, genre: 'Thriller', main_actors: ['Ben Affleck', 'Rosamund Pike'] },
        { title: 'Gravity', year: 2013, genre: 'Sci-Fi', main_actors: ['Sandra Bullock', 'George Clooney'] },
        { title: 'Pulp Fiction', year: 1994, genre: 'Crime', main_actors: ['John Travolta', 'Uma Thurman'] },
        { title: 'The Dark Knight', year: 2008, genre: 'Action', main_actors: ['Christian Bale', 'Heath Ledger'] },
        { title: 'Interstellar', year: 2014, genre: 'Sci-Fi', main_actors: ['Matthew McConaughey', 'Anne Hathaway'] },
        { title: 'La La Land', year: 2016, genre: 'Musical', main_actors: ['Ryan Gosling', 'Emma Stone'] },
        { title: 'The Matrix', year: 1999, genre: 'Sci-Fi', main_actors: ['Keanu Reeves', 'Laurence Fishburne'] },
        { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, genre: 'Fantasy', main_actors: ['Elijah Wood', 'Ian McKellen'] },
        { title: 'Gladiator', year: 2000, genre: 'Action', main_actors: ['Russell Crowe'] },
        { title: 'Avatar', year: 2009, genre: 'Sci-Fi', main_actors: ['Sam Worthington', 'Zoe Saldana'] }
    ];

    for (const data of moviesData) {
        const main_actors = data.main_actors.map(name => actors[name]._id);
        await createMovie(data.title, data.year, data.genre, main_actors);
    }

    console.log('Database seeding completed!');
    mongoose.connection.close();
};

seedDatabase().catch(err => console.error(err));
