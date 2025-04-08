// File: backend/controller/auth.controller.js
import User from "../models/user.model.js"
import bcrypt from  "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generatetokens.js";
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
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save();
      res.status(201).json({
        success:true,
        user:{
          ...newUser._doc,
          password:"",
        }
      })

      
    } catch (error) {
      return res.status(400).json({message:"error"});
    }
  }
  
  export async function login(req, res) {
   try {
    const {email,password}=req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "Require all credentials" });
    }
      const user=await User.findOne({email:email});
      if(!user){
        return res.status(400).json({message:"invalid email"});
      }
    const ispwcorrect=  await bcrypt.compare(password,user.password);
    if(!ispwcorrect){
      return res.status(400).json({message:"invalid password"});
    }
    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
      success:true,
      user:{
        ...user._doc,
        password:""
      }
    })
   } catch (error) {
    return res.status(400).json({message:error.message});
   }
  }
  
  export async function logout(req, res) {
    try {
      res.clearCookie("jwt_netflix");
      res.status(200).json({success:true,message:"logged out"});
    } catch (error) {
      console.log("error in logout controller",error.message);
      return res.status(400).json({message:"error"});
    }
  }
  