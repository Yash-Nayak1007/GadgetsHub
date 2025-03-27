import { Link } from "react-router-dom";

const ProductCategoryCard = ({ title, discount, items, link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-fit border-2 h-96 ">
      <h2 className="text-lg font-semibold mb-2">
        {title} | <span className="text-green-600">{discount}</span>
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-20 object-cover rounded-md"
            />
            <p className="text-sm text-gray-700 mt-1">{item.name}</p>
          </div>
        ))}
      </div>
      <Link
        to={link}
        className="text-blue-600 font-semibold mt-2 inline-block hover:underline"
      >
        See more
      </Link>
    </div>
    
  );
};


export default ProductCategoryCard;
