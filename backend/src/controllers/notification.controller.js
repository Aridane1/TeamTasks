import Notification from "../models/notification.model";

export const addNotification = async (req, res) => {
  try {
    let notification = Notification(req.body);
    await notification.save();
    res.send({ message: notification });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la notificación",
    });
  }
};

export const getOneNotification = async (req, res) => {
  try {
    let { id } = req.params;
    let notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).send("No se encontró la notificación");
    }
    return res.send(notification);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la notificación",
    });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    let notifications = await Notification.find();
    if (!notifications) {
      return res.status(404).send("No hay notificaciones registradas aún.");
    }
    return res.send(notifications);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las notificaciones",
    });
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    let { id } = req.params;
    await Notification.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Notificación eliminada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar la notificación",
    });
  }
};

export const putOneNotification = async (req, res) => {
  try {
    let { id } = req.params;
    await Notification.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "Notificación actualizada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar la notificación",
    });
  }
};