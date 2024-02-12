import { useNavigate } from "react-router-dom";
import { backendImageEndpoint } from "../constants/backendEnpoints";

interface TaskProps {
  task: {
    title: string;
    description: string;
    task_image?: string;
  };
}

export default function Card({ task }: TaskProps) {
  const navigate = useNavigate();

  // Función para manejar el clic en la card
  const handleClick = () => {
    navigate(`/viewTask`, { state: { task } });
  };

  return (
    <div className="size-80" onClick={handleClick}>
      <div className="relative">
        <div className="flex justify-between">
          <p>{task.title}</p>
          <p>{task.description}</p>
        </div>
        <img
          className="rounded max-h-full max-w-full"
          src={`${backendImageEndpoint}/${task.task_image}`}
          alt={task.title}
        />
        <div className="w-full flex justify-center">
          <div className="absolute -bottom-3 rounded-full w-[90%] h-[25px] bg-green-400"></div>
        </div>
      </div>
    </div>
  );
}
