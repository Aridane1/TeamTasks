import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  backendImageEndpoint,
  webSocketEndpoint,
} from "../constants/backendEnpoints";
import { FormEvent, useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Popover } from "antd";

export default function ViewTask() {
  const [messages, setMessages] = useState<{ message: string }[]>([]);

  const location = useLocation();
  const token = localStorage.getItem("token") as string;
  const decode = jwtDecode(token) as { id: string };

  const { task } = location.state || {};
  const ws = useRef<WebSocket | null>(null);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = event.currentTarget.message as HTMLInputElement;
    const message = input.value;
    const parseMessage = {
      message: message,
      type: "sendMessage",
    };

    const messageWithUsername = JSON.stringify(parseMessage);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(messageWithUsername);
    }
    input.value = "";
  };

  useEffect(() => {
    const SERVER_URL = `${webSocketEndpoint}?&user_id=${decode.id}&task_id=${task._id}`;
    ws.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "NEW_MESSAGE") {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, [decode.id, task._id]);

  function showChat() {
    return (
      <>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message.message}</div>
          ))}
        </div>
        <form id="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            id="input"
            placeholder="Type a message"
            autoComplete="off"
          />
          <button type="submit">Enviar</button>
        </form>
      </>
    );
  }

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
        <section className="absolute right-28 bottom-72">
          <Popover
            content={showChat}
            title="Title"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button type="primary">Click me</Button>
          </Popover>
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
