import { useNavigate } from "react-router-dom";



function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movies/${movie.imdbCode}`, { state: { movie } });
  };
  return (
    <div className="rounded w-64 text-center bg-transparent backdrop-blur-sm border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
  <img 
    className="w-full h-[300px] object-contain bg-black" 
    src={movie.image ? movie.image : 'https://via.placeholder.com/250'}
    alt={movie.title || "Unknown Title"} 
  />
  <div className="backdrop-blur-md bg-black bg-opacity-40 p-4">
    {/* Text content (not blurred) */}
    <div className="relative z-10">
      <h3 className="text-lg font-bold text-white truncate">{movie.title || "Untitled"}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-300 text-sm">Year: {movie.year || "N/A"}</span>
        <span className="text-yellow-400">⭐ {movie.rating || "N/A"}</span>
      </div>
      <button 
          className="mt-3 text-yellow-300 hover:text-yellow-200 text-sm"
          onClick={handleViewDetails}
        >
          View Details →
        </button>
    </div>
  </div>
</div>
  );
}

export default MovieCard;