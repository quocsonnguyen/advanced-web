const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let notificationSchema = new mongoose.Schema({
    faculty : {
        type:String,
        required:true,
        unique:false,
        index:true,
    },
    title : {
        type:String,
        required:true,
    },
    description : {
        type:String,
        required:true,
    },
    content : {
        type:String,
        required:true
    },
    createdTime : {
        type:String,
        required:true
    },
});

//Export the model
module.exports = mongoose.model('Notification', notificationSchema);