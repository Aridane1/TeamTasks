import { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { Card } from "../components/Card";
import taskService from "../services/TaskService";
import { Header } from "../components/Header";

export default function Home() {
  type TaskType = {
    _id: string;
    task_image: string;
    title: string;
    description: string;
    quantityUser: string;
    rol: string;
  };
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getAllTasksOfTheUser = async () => {
    try {
      const response = await taskService.getUserTask();
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasksOfTheUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-10 flex-wrap gap-5 mb-20 w-[90%] mx-auto ">
        {tasks.length !== 0
          ? tasks.map((task) => (
              <Card
                id={task._id}
                title={task.title}
                description={task.description}
                image={task.task_image}
                quantityUser={task.quantityUser}
                key={task._id}
                rol={task.rol}
                getAllTasksOfTheUser={getAllTasksOfTheUser}
              />
            ))
          : "No tienes tareas"}

        <FloatButton.BackTop />
      </div>
    </div>
  );
}
