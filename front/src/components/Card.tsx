import { useNavigate } from "react-router-dom";
import { backendImageEndpoint } from "../constants/backendEndpoints";

export const Card = ({
  title,
  description,
  image,
  quantityUser,
}: {
  title: string;
  description: string;
  image: string;
  quantityUser: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/viewTask`, {
      state: {
        title: title,
        description: description,
        image: image,
        quantityUser: quantityUser,
      },
    });
  };

  return (
    <div
      className="max-w-sm w-96 rounded overflow-hidden shadow-lg hover:scale-105 transition ease-in-out duration-300 group select-none"
      onClick={handleClick}
    >
      <img
        className="w-full h-52 object-cover rounded-b-2xl group-hover:scale-105 transition ease-in-out duration-[400ms] "
        src={`${backendImageEndpoint}/${image}`}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base line-clamp-3">{description}</p>
      </div>
    </div>
  );
};
