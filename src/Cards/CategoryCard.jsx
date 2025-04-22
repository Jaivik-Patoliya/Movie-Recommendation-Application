

function CategoryCard({category}){
    return (
        <div className="bg-gray-100 p-5 m-2 rounded cursor-pointer">
      <h3  className="text-xl">{category}</h3>
    </div>
    );
}

export default CategoryCard;