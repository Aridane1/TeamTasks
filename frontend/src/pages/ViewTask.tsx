import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function ViewTask() {
  const location = useLocation();
  const { task } = location.state || {};

  if (!task) {
    return <div>No se encontró la tarea</div>;
  }
  return (
    <div className="flex  flex-col">
       <Header />
      {task.task_image && (
        <img
          src={`http://localhost:8080/images/${task.task_image}`}
          alt={task.title}
          className="h-80 w-80 rounded-lg mx-auto mt-6"
        />
      )}
      <h2 className="mx-auto text-6xl mt-4">{task.title}</h2>
      <p className="mx-auto text-3xl mt-6">{task.description}</p>
      <Navbar />
    </div>
  );
}
