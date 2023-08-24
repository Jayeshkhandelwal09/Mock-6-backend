const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    text : {type:String , required:true},
})

const CommentModel = mongoose.model("comment" , CommentSchema);

module.exports={
    CommentModel
}