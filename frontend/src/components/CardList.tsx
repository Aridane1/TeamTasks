import { useNavigate } from "react-router-dom";
import { backendImageEndpoint } from "../constants/backendEndpoints";
import { DeleteOutlined } from "@ant-design/icons";
import taskService from "../services/TaskService";
export const CardList = ({
  id,
  title,
  description,
  image,
  rol,
  quantityUser,
  getAllTasksOfTheUser,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
  rol: string;
  quantityUser: string;
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
      },
    });
  };

  const deleteTask = (id: { id: string }) => {
    taskService.deleteTaskUser(id).then(() => {
      getAllTasksOfTheUser();
    });
  };

  return (
    <div className="w-[300px] bg-yellow-200/60 rounded-md cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200/60 transition duration-500 ease-in-out select-none">
      <div className="flex justify-between p-4 items-center relative">
        <div className="" onClick={handleClick}>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="line-clamp-1 w-48">{description}</p>
        </div>
        <div className="absolute right-2 top-0 ">
          {rol === "admin" ? (
            <DeleteOutlined
              className="cursor-pointer"
              onClick={() => deleteTask({ id })}
            />
          ) : (
            ""
          )}
        </div>
        <div className="" onClick={handleClick}>
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
