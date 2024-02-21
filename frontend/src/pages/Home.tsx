import { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { Card } from "../components/Card";
import taskService from "../services/TaskService";
import { Header } from "../components/Header";
import configurationService from "../services/ConfigurationService";
import { CardList } from "../components/CardList";

export default function Home() {
  type TaskType = {
    _id: string;
    task_image: string;
    title: string;
    description: string;
    quantityUser: string;
    rol: string;
  };
  type Configuration = {
    list_mode: boolean;
  };
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [configuration, setConfiguration] = useState<Configuration>();

  const getAllTasksOfTheUser = async () => {
    try {
      const response = await taskService.getUserTask();
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getConfigurationUser = async () => {
    try {
      const response = await configurationService.getConfigurationByUser();
      setConfiguration(response.message);
      console.log(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasksOfTheUser();
    getConfigurationUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-10 flex-wrap gap-5 mb-20 w-[90%] mx-auto ">
        {tasks.length !== 0
          ? tasks.map((task) => {
              if (configuration?.list_mode) {
                return (
                  <CardList
                    id={task._id}
                    title={task.title}
                    description={task.description}
                    image={task.task_image}
                    key={task._id}
                    rol={task.rol}
                    quantityUser={task.quantityUser}
                    getAllTasksOfTheUser={getAllTasksOfTheUser}
                  />
                );
              } else if (!configuration?.list_mode) {
                return (
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
                );
              } else {
                return null;
              }
            })
          : "No tienes tareas"}

        <FloatButton.BackTop />
      </div>
    </div>
  );
}
