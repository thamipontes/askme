const { UserRepository } = require('./userRepository');
const { User } = require('../entities/user');

const mongoose = require('mongoose');
mongoose.connect("", {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

function initAllRepositories() {
    db.once('open', _ => {
        console.log("MongoDB connected!");
        UserRepository.init(mongoose);

        var user = new User("Tito", "tito");

        UserRepository.save(user);
    });
}

module.exports = { initAllRepositories, mongoose };