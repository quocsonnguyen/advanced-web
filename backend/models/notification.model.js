const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
let notificationSchema = new mongoose.Schema({
    creatorID : {
        type:String,
        required:true,
        unique:false,
    },
    faculty : {
        type:String,
        required:true,
        unique:false,
        index:false,
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