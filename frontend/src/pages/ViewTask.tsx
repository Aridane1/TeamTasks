import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { backendImageEndpoint } from "../constants/backendEnpoints";

export default function ViewTask() {
  const location = useLocation();
  const { task } = location.state || {};

  if (!task) {
    return <div>No se encontró la tarea</div>;
  }
  return (
    <>
      <div className="">
        <Header />
        <section className="md:hidden flex flex-col">
          <div className=" ">
            {task.task_image && (
              <img
                src={`${backendImageEndpoint}/${task.task_image}`}
                alt={task.title}
                className="h-80 w-80 rounded-lg mx-auto mt-6"
              />
            )}
          </div>
          <div className=" flex flex-col items-center ">
            <h2 className="mx-auto text-6xl mt-4">{task.title}</h2>
            <p className="mx-auto text-3xl mt-6">{task.description}</p>
          </div>
        </section>

        <section className="hidden md:flex my-28">
          <div className=" w-2/4 ml-8 ">
            <div className="w-fit flex flex-col items-center">
              <h2 className="text-5xl">{task.title}</h2>
              {task.task_image && (
                <img
                  src={`${backendImageEndpoint}/${task.task_image}`}
                  alt={task.title}
                  className="h-80 w-80 rounded-lg mx-auto mt-6"
                />
              )}
              <p className="text-xl">etiquetas</p>
            </div>
          </div>
          <div className=" w-2/4 ">
            <p className=" mt-10 mx-auto w-3/4 text-2xl">{task.description}</p>
          </div>
        </section>
        <Navbar />
      </div>
    </>
  );
}
