const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    creatorID : {
        type:String,
        required:true,
        unique:false,
        index:true,
    },
    createdTime : {
        type:String,
        required:true,
    },
    content : {
        type:String,
        required:true,
    },
    imgURL : {
        type:String,
        required:false
    },
    totalLike : { type:Number },
    totalComment : { type:Number },
    comments : [{
        commentatorID : String, content: String, 
    }]
});

//Export the model
module.exports = mongoose.model('Post', postSchema);