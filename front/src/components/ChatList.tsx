import { useNavigate } from "react-router-dom";
import { backendImageEndpoint } from "../constants/backendEndpoints";

export const ChatList = ({
  id,
  title,
  quantityUser,
  image,
}: {
  id: string;
  title: string;
  quantityUser: string;
  image: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${id}`, {
      state: {
        title: title,
      },
    });
  };

  return (
    <div
      className="w-[300px] bg-yellow-200/60 rounded-md cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200 transition duration-500 ease-in-out select-none"
      onClick={handleClick}
    >
      <div className="flex justify-between p-4 items-center">
        <div className="">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p>Participantes: {quantityUser}</p>
        </div>
        <div className="">
          <img
            className="size-16 rounded-full object-contain"
            src={`${backendImageEndpoint}/${image}`}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};
