import { useEffect, useState } from "react";
import Header from "../components/Header";
import taskService from "../services/TaskService";
import { ChatList } from "../components/ChatList";

export default function ChatFeed() {
  type TaskType = {
    _id: string;
    task_image: string;
    quantityUser: string;
    title: string;
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
              <ChatList
                title={task.title}
                key={task._id}
                id={task._id}
                quantityUser={task.quantityUser}
                image={task.task_image}
              />
            ))
          : "No tienes chats"}
      </div>
    </div>
  );
}
