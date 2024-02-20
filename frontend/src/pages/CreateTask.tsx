import Header from "../components/Header";
import { FormEvent, useRef } from "react";
import TaskService from "../services/TaskService";
import { jwtDecode } from "jwt-decode";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadFile } from "antd";
export default function CreateTask() {
  const fileList: UploadFile[] = [];
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const limit_day = useRef<HTMLInputElement>(null);
  const task_image = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("token") as string;
  const tokenDecoded = jwtDecode(token) as { id: string };
  const userIdDecoded = tokenDecoded.id;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskTitle = title.current?.value ?? "";
    const taskDescription = description.current?.value ?? "";
    const taskLimit_day = limit_day.current?.value ?? "";
    const taskTask_image = task_image.current?.value ?? "";
    TaskService.addTask({
      title: taskTitle,
      description: taskDescription,
      limit_day: taskLimit_day,
      task_image: taskTask_image,
      userId: userIdDecoded,
    })
      .then(() => {
        console.log("Tarea creada");
      })
      .catch((error) => {
        console.error("Error al crear la tarea", error);
      });
  };
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-7xl mt-8">Tareas</h1>
        <form
          className="flex flex-col w-fit mt-10 md:w-3/6 md:items-center "
          onSubmit={handleSubmit}
        >
          <label className="text-3xl my-2">Titulo</label>
          <input
            className="border-1 border-gray-300 rounded-full text-3xl p-2 m-2 w-80 h-14 md:w-full"
            type="text"
            ref={title}
          />
          <label className="text-3xl my-2">Descripcion</label>
          <input
            className="border-1 h-40 border-gray-300 rounded-3xl text-3xl p-2 m-2 w-80 md:w-full"
            ref={description}
          ></input>
          <label className="text-3xl my-2">Limit_day</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 text-3xl h-14 md:w-full"
            type="text"
            ref={limit_day}
          />
          {/* <label className="text-3xl my-2">Colaboradores</label>
        <select className="border-1 text-2xl border-gray-300 rounded-full p-2 m-2 w-80 h-14 md:w-full">
          <option>Hola</option>
        </select> */}
          <button
            className="mt-8 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
            type="submit"
          >
            Crear Tarea
          </button>
        </form>
      </div>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture"
        defaultFileList={[...fileList]}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </>
  );
}
