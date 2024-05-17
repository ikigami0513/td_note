const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: Number,
    genre: String,
    main_actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }]
}); 

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;