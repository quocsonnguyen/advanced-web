const mongoose = require('mongoose');
const dbConfig = require("./config/db.config")

class Database {
    constructor() {
        this._connect()
    }

    _connect() {

        mongoose
            .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Successfully connect to MongoDB.");
                initial();
            })
            .catch(err => {
                console.error("Connection error", err);
                process.exit();
            });
    }
}
const db = {};
db.user = require("./models/user.model");
db.role = require("./models/role.model");
db.mongoose = mongoose;

db.ROLES = ["student", "admin", "faculty"];
const Role = db.role;

//Initial Run to Create Roles
function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "student"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'student' to roles collection");
        });
  
        new Role({
          name: "faculty"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'faculty' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }


module.exports = new Database();
