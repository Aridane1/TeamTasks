import Task from "../models/task.model";
import UserTask from "../models/userTask.model";
import fs from "fs";
import path from "path";

export const addTaskWithPhoto = async (req, res) => {
  try {
    if (req.body.description.length > 1500) {
      return res.status(400).send({
        message: "La descripcion debe de ser de un maximo de 1500 caracteres",
      });
    }
    req.body.task_image = req.file.filename;
    let task = new Task(req.body);
    let savedTask = await task.save();

    let userTask = new UserTask({
      task_id: savedTask._id,
      user_id: req.body.userId,
      rol: req.body.rol,
    });
    let savedUserTask = await userTask.save();

    let usersIds = JSON.parse(req.body.usersIds);

    for (let user of usersIds) {
      let userTaskColaborator = new UserTask({
        task_id: savedTask._id,
        user_id: user._id,
        rol: "colaborator",
      });
      await userTaskColaborator.save();
    }

    res.send({
      message: "Tarea y UserTask creados exitosamente",
      task: savedTask,
      userTask: savedUserTask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la tarea o el UserTask",
    });
  }
};

export const getOneTask = async (req, res) => {
  try {
    let { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("No se encontró información de la tarea");
    }
    return res.send(task);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la tarea",
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    let tasks = await Task.find();
    if (!tasks) {
      return res.status(404).send("No hay tareas registradas aún.");
    }
    return res.send(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las tareas",
    });
  }
};

export const deleteOneTask = async (req, res) => {
  try {
    let { id } = req.params;
    let taskUserIds = (await UserTask.find({ task_id: id }).select("_id")).map(
      (taskUser) => taskUser._id
    );

    for (const task of taskUserIds) {
      console.log(task);
      await UserTask.findByIdAndDelete(task);
    }

    await Task.findByIdAndDelete(id);

    return res
      .status(200)
      .send({ message: "Registro eliminado correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar la tarea",
    });
  }
};

export const putOneTask = async (req, res) => {
  try {
    let { id } = req.params;
    let taskImage = await Task.findById(id).select("task_image");

    let imagePath = path.join(
      __dirname,
      "../public/images",
      taskImage.task_image
    );
    fs.unlinkSync(imagePath);
    req.body.task_image = req.file.filename;

    await Task.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "Registro actualizado correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar la tarea",
    });
  }
};

describe("getAllTasks Controller", () => {
  beforeAll(async () => {
    // Asegúrate de que no haya tareas en la base de datos antes de la prueba
    await Task.deleteMany({});
  });

  it("should return an empty array when no tasks are present", async () => {
    // Mock de req y res
    const req = {};
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Llama al controlador
    await getAllTasks(req, res);

    // Verifica que la respuesta sea un arreglo vacío
    expect(res.send).toHaveBeenCalledWith([]);
    // Verifica que el estado HTTP no sea 404, ya que la respuesta esperada para una colección vacía no debería ser un error
    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  // Opcional: después de todas las pruebas, cierra la conexión a la base de datos si es necesario
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
describe("getAllTasks Controller", () => {
  beforeAll(async () => {
    // Asegúrate de que no haya tareas en la base de datos antes de la prueba
    await Task.deleteMany({});
  });

  it("should return an empty array when no tasks are present", async () => {
    // Mock de req y res
    const req = {};
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res),
    };

    // Llama al controlador
    await getAllTasks(req, res);

    // Verifica que la respuesta sea un arreglo vacío
    expect(res.send).toHaveBeenCalledWith([]);
    // Verifica que el estado HTTP no sea 404, ya que la respuesta esperada para una colección vacía no debería ser un error
    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  // Opcional: después de todas las pruebas, cierra la conexión a la base de datos si es necesario
  afterAll(async () => {
    await mongoose.connection.close();
  });
});

