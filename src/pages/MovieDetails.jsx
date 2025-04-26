import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


const API_HOST = ' imdb236.p.rapidapi.com';
const API_KEY = '3a0f48176fmsh9919ecad373ee10p1e3ee1jsn421312207a0a';
const API_URL = "https://imdb236.p.rapidapi.com/imdb";


function MovieDetails() {
    const { imdbCode } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(state?.movie || null);
    const [loading, setLoading] = useState(!state?.movie);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetch(`${API_URL}/${imdbCode}`, {
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
                console.log(data);

                setMovie(data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieDetails();
    }, []);
    if (loading) return <div className="text-white text-center py-20">Loading...</div>;
    return (
        <div className="movie-details bg-gray-900 text-white min-h-screen">
            
            <div className="relative h-96 w-full">
                <img
                    src={movie.primaryImage}
                    alt={movie.primaryTitle}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-end p-8">
                    <div className="container mx-auto">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-4 text-yellow-400 hover:text-yellow-300"
                        >
                            ← Back to Movies
                        </button>

                        <h1 className="text-4xl font-bold">{movie.primaryTitle}</h1>
                        <p className="text-gray-300 mt-2">
                            {movie.releaseDate} • {movie.runtimeMinutes} min • {movie.genres?.join(', ')}
                        </p>
                    </div>
                </div>
            </div>

            
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
                
                <div className="md:col-span-2">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                            IMDb {movie.averageRating}/10
                        </div>
                        
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                        <p className="text-gray-300">{movie.description || "No description available."}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Director{movie.directors?.length > 1 ? 's' : ''}</h3>
                            {movie.directors?.length > 0 ? (
                                <ul className="text-gray-300 space-y-1">
                                    {movie.directors.map((director, index) => (
                                        <li key={index}>{director.fullName}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No director information</p>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Cast</h3>
                            {movie.cast?.length > 0 ? (
                                <ul className="text-gray-300 space-y-1">
                                    {movie.cast.slice(0, 5).map((actor, index) => (
                                        <li key={index}>{actor.fullName}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No cast information</p>
                            )}
                        </div>
                    </div>

                </div>

                
                <div className="space-y-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">Details</h3>
                        <div className="space-y-2 text-gray-300">
                            <p><strong>Countries:</strong> {movie.countriesOfOrigin?.join(', ')}</p>
                            <p><strong>Languages:</strong> {movie.spokenLanguages?.join(', ')}</p>
                        </div>
                    </div>

                   
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;