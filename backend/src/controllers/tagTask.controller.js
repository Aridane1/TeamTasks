import TagTask from "../models/tagTask.model";

export const addTagTask = async (req, res) => {
  try {
    let tagTask = TagTask(req.body);
    await tagTask.save();
    res.send({ message: tagTask });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la etiqueta de la tarea",
    });
  }
};

export const getOneTagTask = async (req, res) => {
  try {
    let { id } = req.params;
    let tagTask = await TagTask.findById(id);
    if (!tagTask) {
      return res.status(404).send("No se encontró la etiqueta de la tarea");
    }
    return res.send(tagTask);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la notificación de la etiqueta de la tarea",
    });
  }
};

export const getAllTagTask = async (req, res) => {
  try {
    let tagTask = await TagTask.find();
    if (!tagTask) {
      return res.status(404).send("No hay etiquetas de tareas registradas");
    }
    return res.send(tagTask);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las etiquetas de las tareas",
    });
  }
};

export const deleteOneTagTask = async (req, res) => {
  try {
    let { id } = req.params;
    await TagTask.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "etiqueta de la tarea de la tarea eliminada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar la etiqueta de la tarea",
    });
  }
};

export const putOneTagTask = async (req, res) => {
  try {
    let { id } = req.params;
    await TagTask.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "etiqueta de la tarea actualizada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar la etiqueta de la tarea",
    });
  }
};