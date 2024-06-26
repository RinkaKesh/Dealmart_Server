require("dotenv").config();
const express=require("express");
const authRoute=express.Router();
const {UserModel}=require("../model/userModel");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');


authRoute.get("/",async(req,res)=>{
    return res.send("hello")
})


authRoute.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, gender, password } = req.body;
        const isUserPresent = await UserModel.findOne({ email });
        
        if (isUserPresent) {
           return res.status(403).send({ error: `User with ${email} already exists` });
            console.log('User already present');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            if (!hashedPassword) {
                return res.status(400).send({ error: `Error while hashing password` });
                console.log('Error in hashing');
            } else {
                const newUser = new UserModel({ firstname, lastname, gender, email, password: hashedPassword });
                await newUser.save();
                return res.status(200).send({ message: `${firstname} successfully registered` });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: `Server Error` });
    }
});


authRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if (!user){
            res.status(400).send({error:`user not found`})
        }
        else{
            const passwordMatch=await bcrypt.compare(password,user.password)
            if(!passwordMatch){
                res.status(400).send({error:'Incorrect Password'})
            }
            else{
                const token=jwt.sign({userId:user._id,user:user.firstname},process.env.ACCESS_TOKEN_KEY,{expiresIn:"20m"})
                res.cookie("access-Token",token)
               return  res.status(200).send({message:`${user.firstname} successfully logged in`,token,user:user.firstname})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({error:"Something went wrong"})
    }
})
module.exports={authRoute}