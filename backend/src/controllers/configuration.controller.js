import Configuration from "../models/configuration.model";
import fs from "fs";
import path from "path";

export const addConfiguration = async (req, res) => {
  try {
    let config = Configuration(req.body);
    await config.save();
    res.send({ message: config });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la configuración",
    });
  }
};

export const getConfigurationForUser = async (req, res) => {
  try {
    let { userId } = req.params;
    const config = await Configuration.findOne({ user_id: userId });
    res.send({ message: config });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al obtener la configuración del usuario",
    });
  }
};

export const deleteConfigurationForUser = async (req, res) => {
  try {
    let { userId } = req.params;
    await Configuration.deleteOne({ user_id: userId });
    return res
      .status(200)
      .send({ message: "Configuración eliminada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la configuración",
    });
  }
};

export const putConfigurationForUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let userImage = await Configuration.findOne({ user_id: userId }).select(
      "user_image"
    );
    req.body.user_image = userImage.user_image;
    console.log(userImage);
    await Configuration.findOneAndReplace({ user_id: userId }, req.body);
    return res
      .status(200)
      .send({ message: "Configuración actualizada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la configuración",
    });
  }
};

export const putConfigurationForUserPhoto = async (req, res) => {
  try {
    let { userId } = req.params;

    let userImage = await Configuration.findOne({ user_id: userId }).select(
      "user_image"
    );
    let imagePath = null;
    if (userImage.user_image !== "") {
      let imagePath = path.join(
        __dirname,
        "../public/images",
        userImage.user_image
      );
      fs.unlinkSync(imagePath);
    }
    req.body.user_image = req.file.filename;

    await Configuration.findOneAndUpdate({ user_id: userId }, req.body);
    return res
      .status(200)
      .send({ message: "Configuración actualizada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar la configuración",
    });
  }
};
