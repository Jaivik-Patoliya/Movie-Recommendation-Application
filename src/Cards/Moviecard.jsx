


function MovieCard({ movie }) {
  console.log('Image URL:', movie.image);

  return (
    <div className="p-3 m-5 rounded w-48 text-center bg-white shadow-lg">
      <img 
        className="w-full h-[250px] object-cover rounded" 
        src={movie.image ? movie.image : 'https://via.placeholder.com/250'}
        alt={movie.title || "Unknown Title"} 
      />
      <h3 className="mt-2 text-lg font-bold">{movie.title || "Untitled"}</h3>
      <p className="text-base text-gray-500">Year: {movie.year || "N/A"}</p>
      <p className="text-base text-gray-500">⭐ {movie.rating || "N/A"}</p>
      <a 
        href={`https://www.imdb.com/title/${movie.imdbCode}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 mt-2 inline-block"
      >
        View on IMDb
      </a>
    </div>
  );
}

export default MovieCard;