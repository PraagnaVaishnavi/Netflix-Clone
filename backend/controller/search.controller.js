import User from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
export async function searchPerson(req,res){
  const {query}=req.params;
  try {
    console.log("Loaded search.controller.js");  // Just to verify it's loading

      const data=await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
      if(data.results.length===0)res.status(404).send(null);
      await User.findByIdAndUpdate(req.user._id,{
        $push:{
          searchHistory:{
            id:data.results[0].id,
            image:data.results[0].profile_path,
            title:data.results[0].name,
            searchType:"person",
            createdAt:new Date()
          }  
        }
      })
      res.status(200).json({success:true,message:data.results});
  } catch (error) {
    console.error("Error in searchPerson:", error);
    res.status(404).json({message:"error"});
  }
}
export async function searchMovie(req,res){
    const {query}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length===0)res.status(404).send(null);
        await User.findByIdAndUpdate(req.user._id,{
          $push:{
            searchHistory:{
              id:data.results[0].id,
              image:data.results[0].poster_path,
              title:data.results[0].title,
              searchType:"movie",
              createdAt:new Date()
            }  
          }
        })
        res.status(200).json({success:true,message:data.results});
    } catch (error) {
      res.status(404).json({message:"error"});
    }
}
export async function searchTv(req,res){
    const {query}=req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(data.results.length===0)res.status(404).send(null);
        await User.findByIdAndUpdate(req.user._id,{
          $push:{
            searchHistory:{
              id:data.results[0].id,
              image:data.results[0].profile_path,
              title:data.results[0].name,
              searchType:"tv",
              createdAt:new Date()
            }  
          }
        })
        res.status(200).json({success:true,message:data.results});
    } catch (error) {
      res.status(404).json({message:"error"});
    }
}
export async function getSearchHistory(req,res) {
    try {
        res.status(200).json({success:true,content:req.user.searchHistory})

    } catch (error) {
        res.status(500).send(null);
    }
}
export async function removeItemFromSearchHistory(req,res) {
    let{ id}=req.params;
    id=parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id}
            },
        });
        res.status(200).json({success:true,message:"item is removed"});

    } catch (error) {
        console.error("Error ", error);
        res.status(500).send(null);
    }
}