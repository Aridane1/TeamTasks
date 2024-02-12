import { useEffect, useState } from "react";
import Card from "../components/Card";
// import CardList from "../components/CardList";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TaskService from "../services/TaskService";

interface Task {
  _id: string;
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
          <Card key={task._id} task={task} />
        ))}
      </div>
      {/* <div>
        {tasks.map((task) => (
          <CardList key={task._id} task={task} />
        ))}
      </div> */}
      <Navbar />
    </>
  );
}
