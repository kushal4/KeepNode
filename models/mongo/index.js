const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/mongo_db_config.json')[env];
module.exports = function() {
    console.log("mongoose about to connecy");
    mongoose.connect(`mongodb://localhost:27017/${config.database}`)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));
};