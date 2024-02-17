import { FloatButton } from "antd";
import { Card } from "../components/Card";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import taskService from "../services/TaskService";

export default function Home() {
  type TaskType = {
    _id: string;
    task_image: string;
    title: string;
    description: string;
  };
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const getAllTasks = async () => {
    try {
      const response = await taskService.getUserTask();
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks();
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
            key={task._id}
          />
        ))}

        <FloatButton.BackTop />
      </div>
    </div>
  );
}
