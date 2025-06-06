import express from 'express'
import { getMovieTrailer, getTrendingMovie ,getMovieDetails, getSimilarMovies, getMoviesByCategory} from '../controller/movie.controller.js';
const router=express.Router();
router.get("/trending",getTrendingMovie);
router.get("/:id/trailers",getMovieTrailer);
router.get("/:id/details",getMovieDetails);
router.get("/:id/similar",getSimilarMovies);
router.get("/:category",getMoviesByCategory);
export default router;