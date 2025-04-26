import CategoryCard from "@/Cards/CategoryCard";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "@/assets/bg.jpg"; // Adjust this path based on your project structure

const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Romance",
    "Horror",
    "Sci-Fi"
  ];

function Homepage(){
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [minRating, setMinRating] = useState(1);
  const navigate = useNavigate();


  const handleRecommend = () => {
    navigate(`/category?category=${selectedCategory}&minRating=${minRating}`);
  };

    return (
      <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center items-center px-4"
      style={{
        backgroundImage: `url(${bgImg})`, // replace with correct image path
       
      }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight drop-shadow-md">
        What movie would you like to be
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mt-2 drop-shadow-md">
        watching for the first time today?
      </h2>

      {/* Dropdown Section */}
      <div className=" text-black mt-8 p-6 rounded-md shadow-md flex flex-col items-center gap-4 w-full max-w-md">
        <div className="w-full">
          <label className="block text-left font-semibold mb-1 text-white">Select Category:</label>
          <select
            className="w-full border border-gray-300 p-2 rounded text-black bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-left font-semibold mb-1 text-white">Select Rating:</label>
          <select
            className="w-full border border-gray-300 p-2 rounded text-black bg-white"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded mt-2"
          onClick={handleRecommend}
        >
          Give me Recommendations!
        </button>
      </div>
    </div>
    );
}

export default Homepage;