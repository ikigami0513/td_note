const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    nationality: String
});

const Actor = mongoose.model("Actor", ActorSchema);
module.exports = Actor