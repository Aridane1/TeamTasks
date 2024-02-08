import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TaskService from "../services/TaskService";

interface Task {
  id: string;
  title: string;
  description: string;
  task_image?: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getAllTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <Header />
      <div>
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
      <Navbar />
    </>
  );
}
