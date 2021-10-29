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

db.mongoose = mongoose;

db.user = require("./models/user.model");
db.role = require("./models/role.model");

db.ROLES = ["user", "admin", "faculty"];
const Role = db.role;
//Initial Run to Create Roles
function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "falculty"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'falculty' to roles collection");
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
