import { useNavigate } from "react-router-dom";
import { backendImageEndpoint } from "../constants/backendEndpoints";
import { DeleteOutlined } from "@ant-design/icons";
import taskService from "../services/TaskService";

export const Card = ({
  id,
  title,
  description,
  image,
  quantityUser,
  rol,
  tag,
  getAllTasksOfTheUser,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
  quantityUser: string;
  rol: string;
  tag: string;
  getAllTasksOfTheUser: () => void;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/viewTask`, {
      state: {
        title: title,
        description: description,
        image: image,
        quantityUser: quantityUser,
        tag: tag,
      },
    });
  };
  const deleteTask = (id: { id: string }) => {
    taskService.deleteTaskUser(id).then(() => {
      getAllTasksOfTheUser();
    });
  };

  return (
    <div className="max-w-sm w-96 rounded overflow-hidden shadow-lg hover:scale-105 transition ease-in-out duration-300 group select-none bg-yellow-200/60 dark:bg-[#16282E]/80">
      <img
        className="w-full h-52 object-cover rounded-b-2xl group-hover:scale-105 transition ease-in-out duration-[400ms]"
        src={`${backendImageEndpoint}/${image}`}
        alt={title}
        onClick={handleClick}
      />
      <div className="px-6 py-4 relative mt-2">
        <div className="absolute right-2 top-0">
          {rol === "admin" ? (
            <DeleteOutlined
              className="cursor-pointer dark:text-white"
              onClick={() => deleteTask({ id })}
            />
          ) : (
            ""
          )}
        </div>
        <div className="" onClick={handleClick}>
          <div className="font-bold text-xl mb-2 dark:text-white">{title}</div>
          <p className="text-gray-700 text-base line-clamp-3 dark:text-white">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
