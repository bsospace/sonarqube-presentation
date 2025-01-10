import { useNavigate } from "react-router-dom";

const Card = ({ title, description, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-gradient-to-br from-white via-pink-50 to-pink-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-6 cursor-pointer"
    >
      <h3 className="text-2xl font-semibold text-pinkGradient-dark">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default Card;
