import Task from "../models/task.model";
import UserTask from "../models/userTask.model";

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
    if (req.body.description.length > 1500) {
      return res.status(400).send({
        message: "La descripcion debe de ser de un maximo de 1500 caracteres",
      });
    }
    let { id } = req.params;
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
