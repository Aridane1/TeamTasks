import { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { Card } from "../components/Card";
import Header from "../components/Header";
import taskService from "../services/TaskService";

export default function Home() {
  type TaskType = {
    _id: string;
    task_image: string;
    title: string;
    description: string;
    quantityUser: string;
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
        {tasks.map((task) => (
          <Card
            title={task.title}
            description={task.description}
            image={task.task_image}
            quantityUser={task.quantityUser}
            key={task._id}
          />
        ))}

        <FloatButton.BackTop />
      </div>
    </div>
  );
}
