import { ENV_VARS } from "../config/envVars.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies["jwt-netflix"]
        if(!token)res.status(404).json({message:"Unauthorized- no token present"});
       const decoded=  jwt.verify(token,ENV_VARS.JWT_SECRET);
       if(!decoded){
        return res.status(404).json({message:"Unauthorized- invalid token present"});
       }
       const user=await User.findById(decoded.userId).select("-password");
       if(!user){
        res.status(404).json({message:"no user"});
       }
       req.user=user;
       next();
    } catch (error) {
        res.status(404).json({message:"error"});
    }
}