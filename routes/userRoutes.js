const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userModel");

const userRouter = express.Router();

userRouter.post("/api/register", async (req,res)=>{
   try {
    const {username , email , password} = req.body;

    const hashedPassword = await bcrypt.hash(password , 5);

    const user = new UserModel({
        username ,
        email,
        password : hashedPassword
    })

    await user.save();

    res.json({msg:"User Register Successfully" , user})
   } catch (error) {
    console.log(error);
    res.json({msg:"something went wrong while registering"})
    
   }
})

userRouter.post("/api/login",async (req,res)=>{
    try {
        const {email, password} = req.body

        const user = await UserModel.findOne({email});
        if(!user){
            res.json({msg:"Invalid Credentials"})
        }

        const passwordValid = await bcrypt.compare(password,user.password);
        if(!passwordValid){
            res.json({msg:"Invalid Credentials"})
        }

        const token = jwt.sign({userID : user._id } , "Jayesh");

        res.json({msg:"User Logged In successfully" , token})

    } catch (error) {
        console.log(error);
        res.json({msg:"Something went wrong while Logging"})
    }
})

module.exports={
    userRouter
}