const mongoose = require('mongoose');

function connectDb() {
    mongoose.connect('mongodb://localhost:27017/cocdb')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {});
    }

    module.exports =  connectDb ;