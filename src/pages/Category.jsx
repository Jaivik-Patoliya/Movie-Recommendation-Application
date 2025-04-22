import MovieCard from "@/Cards/Moviecard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const API_HOST = ' movie-database-api1.p.rapidapi.com';
const API_KEY = 'b9ef466c9bmshde734736ff6be07p1ba5f2jsn43227c722c31';
const API_URL = "https://movie-database-api1.p.rapidapi.com/list_movies.json";


function Category() {

  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMovies() {
      try {
        const randomPage = Math.floor(Math.random() * 50) + 1; 
        const response = await fetch(`${API_URL}?limit=20&page=${randomPage}&quality=all&genre=${encodeURIComponent(category)}&minimum_rating=0&query_term=0&sort_by=date_added&order_by=desc&with_rt_ratings=false`, {
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
  }, [category]);

  return (
    <div className="text-center">
      <h1>{category} Movies</h1>
      {
        loading ? (
          <p>Loading...</p>
        ) : movies && movies.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => (
              <MovieCard
                className="bg-gray-200 p-4 m-2 rounded w-48 text-center"
                key={movie.imdb_code || movie.id}
                movie={{
                  title: movie.title,
                  year: movie.year,
                  rating: movie.rating,
                  image: movie.large_cover_image ,
                  imdbCode: movie.imdb_code
                }}
              />
            ))}
          </div>
        ) : (
          <p>No movies found for this category.</p>
        )
      }
    </div>
  );
}

export default Category;