import Notification from "../models/notification.model";

export const addTaskNotification = async (req, res) => {
  try {
    let taskNotification = TaskNotification(req.body);
    await taskNotification.save();
    res.send({ message: taskNotification });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la notificación de la tarea",
    });
  }
};

export const getOneTaskNotification = async (req, res) => {
  try {
    let { id } = req.params;
    let tasknotification = await TaskNotification.findById(id);
    if (!tasknotification) {
      return res.status(404).send("No se encontró la notificación de la tarea");
    }
    return res.send(tasknotification);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la notificación de la tarea",
    });
  }
};

export const getAllTaskNotifications = async (req, res) => {
  try {
    let tasknotifications = await TaskNotification.find();
    if (!tasknotifications) {
      return res.status(404).send("No hay notificaciones de tareas registradas aún.");
    }
    return res.send(tasknotifications);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las notificaciones de las tareas",
    });
  }
};

export const deleteOneTaskNotification = async (req, res) => {
  try {
    let { id } = req.params;
    await TaskNotification.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Notificación de la tarea eliminada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar la notificación de la tarea",
    });
  }
};

export const putOneTaskNotification = async (req, res) => {
  try {
    let { id } = req.params;
    await TaskNotification.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "Notificación de la tarea actualizada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar la notificación de la tarea",
    });
  }
};