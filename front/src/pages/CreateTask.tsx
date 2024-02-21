
import { FormEvent, useEffect, useRef, useState } from "react";
import TaskService from "../services/TaskService";
import { Header } from "../components/Header";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputRef,
  Select,
  Upload,
  message,
} from "antd";
import TextArea, { TextAreaRef } from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { UploadRef } from "antd/es/upload/Upload";
import { decodeToken } from "../utils/shared/globalFunctions";
import { UploadChangeParam } from "antd/es/upload";
import userService from "../services/UserService";
import { SizeType } from "antd/es/config-provider/SizeContext";

export default function CreateTask() {
  const title = useRef<InputRef>(null);
  const description = useRef<TextAreaRef>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const tag = useRef<InputRef>(null);
  const uploadRef = useRef<UploadRef>(null);
  const [image, setImage] = useState<Blob | null>(null);
  const [users, setUsers] = useState<{ username: string; _id: string }[]>();
  const [usersIds, setUsersIds] = useState<{ _id: string }[]>();
  const [size, setSize] = useState<SizeType>();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const user = decodeToken();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleUploadChange = async (options: UploadChangeParam) => {
    const { file } = options;
    const imageBlob = file.originFileObj as File;
    const response = await fetch(URL.createObjectURL(imageBlob));
    const blob = await response.blob();
    setImage(blob);
  };

  const handleChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setUsersIds(value.map((userId: string) => ({ _id: userId })));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const limit_day = selectedDate?.toISOString() ?? null; // Convierte a string ISO

    const Task = {
      title: title.current?.input?.value ?? "",
      description: description.current?.resizableTextArea?.textArea.value,
      limit_day: limit_day,
      tag: tag.current?.input?.value ?? "",
      userId: user.id,
      usersIds: usersIds,
      rol: "admin",
    };

    if (image != null)
      TaskService.addTask(Task, image)
        .then(() => {
          message.success("Tarea creada");
        })
        .catch(() => {
          message.error("Error al crear la tarea");
        });
  };

  const getAllUser = () => {
    userService
      .getAllUsers()
      .then((response: { username: string; _id: string }) => {
        if (Array.isArray(response)) {
          setUsers(response);
          if (response.length <= 4) setSize("small");
          if (response.length >= 5 && response.length <= 10) setSize("middle");
          if (response.length >= 11) setSize("large");
        }
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    const newOptions =
      users
        ?.filter((userData) => userData._id !== user.id)
        .map((userData) => ({
          value: userData._id,
          label: userData.username,
        })) || [];
    setOptions(newOptions);
  }, [users, user.id]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1 className="text-6xl mt-6">Tareas</h1>
        <form
          className="flex flex-col w-fit mt-10 md:w-3/6 md:items-center "
          onSubmit={handleSubmit}
        >
          <div className="sm:flex w-full gap-5">
            <div className="w-96 flex sm:block items-center">
              <Form.Item
                label="Titulo"
                style={{ fontWeight: "bold" }}
              ></Form.Item>
              <Input className="w-52 sm:w-full -mt-9" ref={title} />
            </div>
            <div className="flex sm:block items-center">
              <Form.Item
                label="Tiempo limite"
                style={{ fontWeight: "bold" }}
              ></Form.Item>
              <DatePicker className="w-52 -mt-9" onChange={handleDateChange} />
            </div>
          </div>
          <Form.Item
            label="Descripcion"
            style={{ fontWeight: "bold" }}
          ></Form.Item>
          <TextArea
            style={{ marginTop: "-20px", resize: "none", height: "95px" }}
            className="w-[85%] sm:w-full"
            ref={description}
          />
          <div className="flex items-center mt-5  w-full">
            <Form.Item
              label="Etiquetas"
              style={{ fontWeight: "bold" }}
            ></Form.Item>
            <Input className="w-52 sm:w-full -mt-6" ref={tag} />
          </div>
          <div className="flex items-center mt-5  w-full">
            <Form.Item
              label="Colaboradores"
              style={{ fontWeight: "bold" }}
            ></Form.Item>
            {options.length > 0 ? (
              <Select
                mode="multiple"
                size={size}
                placeholder="Please select"
                onChange={handleChange}
                className="w-52 sm:w-full -mt-6"
                options={options}
              />
            ) : (
              ""
            )}
          </div>
          <Upload
            listType="picture"
            ref={uploadRef}
            onChange={handleUploadChange}
          >
            <Button className="bg-white" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>

          <div className=" my-5">
            <Button className="bg-blue-500" type="primary" htmlType="submit">
              Crear Tarea
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
