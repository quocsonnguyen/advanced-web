const mongoose = require('mongoose');
const credentials = require('./credentials');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect(credentials.mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
