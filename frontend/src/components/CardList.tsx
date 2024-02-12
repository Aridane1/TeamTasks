import { useNavigate } from "react-router-dom";

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
    <div className="" onClick={handleClick}>
      <div className="flex bg-navbar/60 rounded-xl justify-between h-20 items-center mx-3 border-2 border-solid border-black/30 md:w-5/6 md:mx-auto">
        <div className="h-full mt-5 ml-2">
          <p>{task.title}</p>
          <p className="hidden md:block">{task.description}</p>
          <p>Etiquetas</p>
        </div>
        <img
        className="size-16 rounded-full mr-3"
        src={`http://localhost:8080/images/${task.task_image}`}
        alt={task.title}
      />
      </div>
      <div className="h-10 w-2/4 rounded-full bg-[#D9D9D9] relative -mt-3 ml-4 flex items-center md:ml-[9%]">
        <p className=" ml-4">jajajajaj</p>
      </div>

    </div>
  );
}
