import {Header} from "../components/Header";
import { FormEvent, useRef, useState } from "react";
import TaskService from "../services/TaskService";
import PhotoService from "../services/PhotoService";
import { jwtDecode } from "jwt-decode";
// import { UploadOutlined } from "@ant-design/icons";
// import { Button, Upload } from "antd";
// import type { UploadFile } from "antd";
export default function CreateTask() {
  // const fileList: UploadFile[] = [];
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const limit_day = useRef<HTMLInputElement>(null);
  const tag = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("token") as string;
  const tokenDecoded = jwtDecode(token) as { id: string };
  const userIdDecoded = tokenDecoded.id;
  const [image, setImage] = useState<Blob | string>("");
  
  const handlePickImage = async () => {
    try {
      const photo = await PhotoService.pickImage();
      
      const response = await fetch(photo.webPath);
      const blob = await response.blob()
      setImage(blob)
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };
  
 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const Task = {
      "title": title.current?.value ?? "",
      "description" : description.current?.value ?? "",
      "limit_day" : limit_day.current?.value ?? "",
      "tag" : tag.current?.value ?? "",
      "userId": userIdDecoded,
    };
  
    try {
      if(image!=null)
      await TaskService.addTask(Task, image ); 
      console.log("Tarea creada");
    } catch (error) {
      console.error("Error al crear la tarea", error);
    }
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
          <label className="text-3xl my-2">Tiempo limite</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 text-3xl h-14 md:w-full"
            type="date"
            ref={limit_day}
          />
          <label className="text-3xl my-2">Etiquetas</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 text-3xl h-14 md:w-full"
            type="text"
            ref={tag}
          />
          {/* <label className="text-3xl my-2">Colaboradores</label>
        <select className="border-1 text-2xl border-gray-300 rounded-full p-2 m-2 w-80 h-14 md:w-full">
          <option>Hola</option>
        </select> */}
              {/* <Upload
        action="handlePickImage"
        listType="picture"
        defaultFileList={[...fileList]}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>

      </Upload> */}
      <button color="primary" type="button" onClick={handlePickImage} >
       
       Pick an image
     </button>

     <button
            className="mt-8 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
            type="submit"
          >
            Crear Tarea
          </button>


        </form>
      </div>

    </>
  );
}
