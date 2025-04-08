import express from 'express'
import  {ENV_VARS}  from './config/envVars.js';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { connectDB } from './config/db.js';
const PORT=ENV_VARS.PORT;
const app=express();

app.use(express.json());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",movieRoutes);
app.use("/api/v1/tv",tvRoutes);


app.listen(PORT,()=>{
console.log("server started at http://localhost:"+ PORT);
connectDB();
});
