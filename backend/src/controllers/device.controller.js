import Device from "../models/device.model";

export const addDevice = async (req, res) => {
  try {
    let device = Device(req.body);
    await device.save();
    res.send({ messasge: device });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "No se ha podido guardar la información del dispositivo",
    });
  }
};

export const getDevicesByUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let devices = await Device.find({ user_id: userId });
    res.send({ message: devices });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Hubo un error al mostrar el dispositivo" });
  }
};

export const putDevice = async (req, res) => {
  try {
    let { id } = req.params;
    await Device.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "Dispositivo actualizado correctamente",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Hubo un error al modificar el dispositivo" });
  }
};

export const deleteDeviceById = async (req, res) => {
  try {
    let { id } = req.params;
    await Device.findByIdAndDelete(id);
    res.status(200).send({
      message: "Dispositivo eliminada correctamente",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Hubo un error al eliminar el dispositivo" });
  }
};
