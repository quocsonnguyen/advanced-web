const mongoose = require('mongoose');
const mongodb_url = 'mongodb+srv://Koc:long123@studentsocial.f561f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose
            .connect(`mongodb+srv://Koc:long123@studentsocial.f561f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Successfully connect to MongoDB.");
            })
            .catch(err => {
                console.error("Connection error", err);
                process.exit();
            });
    }
}




module.exports = new Database();
