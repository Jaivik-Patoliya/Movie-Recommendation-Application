import CategoryCard from "@/Cards/CategoryCard";
import { Link } from "react-router-dom";

const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Romance",
    "Horror",
    "Sci-Fi"
  ];

function Homepage(){
    return (
        <div className="text-center">
      <h1>Movie Categories</h1>
      <div className="flex justify-arounnd mt-5">
        {categories.map((category) => (
          <Link to={`/category/${category}`} key={category}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    </div>
    );
}

export default Homepage;