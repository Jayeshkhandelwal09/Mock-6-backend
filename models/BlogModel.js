const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    title : {type:String , required:true},
    content : {type:String , required:true},
    category : [Enum =  "Business", "Tech", "Lifestyle", "Entertainment"],
    likes : {type : mongoose.Schema.Types.ObjectId , ref:"user" },
    userID: {type:String},
    user : {type:String},
    comment : [],
    createdAt : {type:Date , default:Date.now}
})

const BlogModel = mongoose.model("blog" , BlogSchema);

module.exports={
    BlogModel
}