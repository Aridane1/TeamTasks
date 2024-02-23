const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });
const fs = require("fs");
const path = require("path");
const { addTaskWithPhoto, getOneTask,getAllTasks } = require("../controllers/task.controller");
import Task from "../models/task.model"
import UserTask from "../models/userTask.model"


// Configuración inicial para la base de datos de prueba
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

afterEach(async () => {
  await Task.deleteMany({});
  await UserTask.deleteMany({});
  // Aquí puedes añadir código para borrar las imágenes de prueba si es necesario
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("addTaskWithPhoto Controller", () => {
  it("should add a new task with photo", async () => {
    // Mock de req y res
    const req = {
      body: {
        title: "Test Task",
        description: "Test Description",
        limit_day: "2023-01-01",
        tag: "Test Tag",
        userId: new mongoose.Types.ObjectId(), // Simula un ID de usuario generado
        rol: "owner",
        usersIds: JSON.stringify([{ _id: new mongoose.Types.ObjectId() }]) // Simula IDs de usuarios colaboradores
      },
      file: { filename: "test-photo.jpg" }, // Simula la carga de un archivo
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Ejecuta el controlador
    await addTaskWithPhoto(req, res);

    // Verificaciones
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: "Tarea y UserTask creados exitosamente",
      task: expect.any(Object),
      userTask: expect.any(Object),
    }));

    // Verifica que la tarea y UserTask se agregaron a la base de datos
    const task = await Task.findOne({ title: "Test Task" });
    expect(task).toBeTruthy();
    expect(task.description).toBe("Test Description");

    const userTask = await UserTask.findOne({ task_id: task._id });
    expect(userTask).toBeTruthy();
    expect(userTask.rol).toBe("owner");

    // Limpieza: borra la imagen de prueba si es necesario
    // const imagePath = path.join(__dirname, '../path/to/images', req.file.filename);
    // if (fs.existsSync(imagePath)) {
    //   fs.unlinkSync(imagePath);
    // }
  });
});
describe("getOneTask Controller", () => {
  let createdTaskId;

  beforeAll(async () => {
    // Crear una tarea de prueba en la base de datos antes de las pruebas
    const task = new Task({
      title: "Tarea de prueba",
      description: "Descripción de la tarea de prueba",
      limit_day: "2023-01-01",
      tag: "Tag de prueba",
      task_image: "ruta/a/imagen.jpg"
    });
    const savedTask = await task.save();
    createdTaskId = savedTask._id.toString();
    console.log(createdTaskId)
  });

  it("should return a task if it exists", async () => {
    // Mock de req y res
    console.log(createdTaskId)
    const req = {
      params: { _id: createdTaskId },
      
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Llama al controlador
    await getOneTask(req, res);
console.log(req.send)
    // Verifica que la respuesta sea correcta
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      _id: `
      $createdTaskId`,
      title: "Tarea de prueba",
      description: "Descripción de la tarea de prueba",
      // Verifica otros campos según sea necesario
    }));
    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  it("should return 404 if the task does not exist", async () => {
    // Mock de req y res para una tarea que no existe
    const req = {
      params: { id: mongoose.Types.ObjectId().toString() }, // ID ficticio
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Llama al controlador
    await getOneTask(req, res);

    // Verifica que se retorne un estado 404
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("No se encontró información de la tarea");
  });

  afterEach(async () => {
    // Limpia los mocks después de cada prueba
    jest.clearAllMocks();
  });

  afterAll(async () => {
    // Opcional: Elimina la tarea de prueba creada para las pruebas
    await Task.findByIdAndDelete(createdTaskId);
  });
});
