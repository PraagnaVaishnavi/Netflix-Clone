import mongoose from "mongoose";
import {ENV_VARS} from './envVars.js'
const PORT=ENV_VARS.PORT;
const MONGO_URI=ENV_VARS.MONGO_URI;
export const connectDB=async (params)=> {
    try {
       const conn=await mongoose.connect(MONGO_URI);
        console.log("connected to mongo"+conn.connection.host);
    } catch (error) {
        console.error("error"+error.message);
        process.exit(1);
    }
}