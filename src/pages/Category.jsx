import MovieCard from "@/Cards/Moviecard";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import bgImg from "@/assets/bg.jpg";


const API_HOST = ' movie-database-api1.p.rapidapi.com';
const API_KEY = '3a0f48176fmsh9919ecad373ee10p1e3ee1jsn421312207a0a';
const API_URL = "https://movie-database-api1.p.rapidapi.com/list_movies.json";


function Category() {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "Action";
  const minRating = queryParams.get("minRating") || 1;
  const [movies, setMovies] = useState(location.state?.movies || []);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    
    async function fetchMovies() {
      try {
        const randomPage = Math.floor(Math.random() * 50) + 1; 
        const response = await fetch(`${API_URL}?limit=10&page=${randomPage}&quality=all&genre=${encodeURIComponent(category)}&minimum_rating=${minRating}&query_term=0&sort_by=date_added&order_by=desc&with_rt_ratings=false`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": API_HOST
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.data?.movies || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [category,minRating]);
  
  return (
    <div 
    className="flex flex-col items-center min-h-screen overflow-hidden bg-cover bg-center bg-fixed" 
  style={{
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat'
  }}
>
  {/* Semi-transparent overlay for better readability */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
  <div className="relative z-10"> {/* This ensures content stays above the overlay */}
    <h1 className="text-5xl font-bold mb-8 text-white">{category} Movies</h1>
    
    {loading ? (
      <div className="text-white">Loading...</div>
    ) : movies && movies.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center px-4">
        
        {movies.map((movie) => (
          
          
          <MovieCard
            className="bg-gray-900 bg-opacity-70 p-4 rounded-lg w-56 text-center text-white backdrop-blur-sm border border-gray-700 hover:border-yellow-400 transition-all duration-300"
            key={movie.imdb_code}
            movie={{
              title: movie.title,
              year: movie.year,
              rating: movie.rating,
              image: movie.large_cover_image,
              imdbCode: movie.imdb_code,
            }}
          />
        ))}
      </div>
    ) : (
      <p className="text-white text-xl">No movies found for this category.</p>
    )}
  </div>
</div>
  );
}

export default Category;