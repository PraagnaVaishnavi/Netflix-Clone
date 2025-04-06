// File: backend/controller/auth.controller.js
import User from "../models/user.model.js"
import bcrypt from  "bcryptjs";
export async function signup(req, res) {
    try {
      const {email,username,password}=req.body;
      if(!email||!password||!username)return res.status(400).json({message:"all feilds must be specified"});
      
      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!emailRegex.test(email)){
        return res.status(400).json({message:"invalid email"});
       } 
       if(password.length<3){
        return res.status(400).json({message:"password must be atleast 3 characters"});
       }
       const isPresentEmail=await User.findOne({email:email});
       if(isPresentEmail){
        return res.status(400).json({message:"email must be unique"});
       }
       const isPresentUsername=await User.findOne({username:username});
       if(isPresentUsername){
        return res.status(400).json({message:"username must be unique"});
       }
       const salt=await bcrypt.genSalt(10);
       const hashedpassword=await bcrypt.hash(password,salt);
       const img='./avatar.png'
      const newUser =new User({
        email:email,password:hashedpassword,username:username,image:img
      })
      await newUser.save();
      res.send("user logged in"+newUser.username);
    } catch (error) {
      return res.status(400).json({message:"error"});
    }
  }
  
  export async function login(req, res) {
    res.send("login");
  }
  
  export async function logout(req, res) {
    res.send("logout");
  }
  