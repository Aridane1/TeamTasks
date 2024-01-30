import Task from "../models/task.model";

export const addTask = async (req, res) => {
  try {
    let task = Task(req.body);
    await task.save();
    res.send({ message: task });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar",
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
