const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://Jayesh:khandelwal@cluster0.lizzrd7.mongodb.net/Masai_blog?retryWrites=true&w=majority" ,{useNewUrlParser: true, useUnifiedTopology: true})

module.exports ={
    connection
}