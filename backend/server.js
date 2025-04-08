import express from 'express'
import cookieParser from 'cookie-parser';
import  {ENV_VARS}  from './config/envVars.js';
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import  searchRoutes from './routes/search.route.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';
const PORT=ENV_VARS.PORT;
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);


app.listen(PORT,()=>{
console.log("server started at http://localhost:"+ PORT);
connectDB();
});
