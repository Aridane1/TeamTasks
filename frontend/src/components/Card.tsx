import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CollaboratorService from "../services/CollaboratorService";

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description: string;
    task_image?: string;
  };
}

interface Collaborator {
  _id: string;
  image?: string;
}

export default function Card({ task }: TaskProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCollaborator = async () => {
      try {
        const response = await CollaboratorService.getaAllCollaborators(
          task._id
        );
        if (response !== undefined) {
          setCollaborators(response);
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllCollaborator();
  }, [task._id]);

  const handleClick = () => {
    navigate(`/viewTask`, { state: { task } });
  };

  return (
    <div className="size-80 mt-24" onClick={handleClick}>
      <div className="relative">
        <div className="flex justify-between">
          <p>{task.title}</p>
          <p>{task.description}</p>
        </div>
        <img
          className="rounded max-h-full max-w-full"
          src={`http://localhost:8080/images/${task.task_image}`}
          alt={task.title}
        />
        <div className="w-full flex justify-center">
          <div className="absolute -bottom-3 rounded-full w-[90%] h-[25px] bg-green-400 flex item-center">
            {collaborators.map((collaborator) => (
              <img
                key={collaborator._id}
                className="rounded-full size-7"
                src={`http://localhost:8080/images/${collaborator.image}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
