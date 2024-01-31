import Tag from "../models/tag.model";

export const addTag = async (req, res) => {
  try {
    let tag = Tag(req.body);
    await tag.save();
    res.send({ message: tag });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar",
    });
  }
};

export const getOneTag = async (req, res) => {
  try {
    let { id } = req.params;
    let tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).send("No se encontró la etiqueta");
    }
    return res.send(tag);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la etiqueta",
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    let tags = await Tag.find();
    if (!tags) {
      return res.status(404).send("No hay etiquetas registradas aún.");
    }
    return res.send(tags);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las etiquetas",
    });
  }
};

export const deleteOneTag = async (req, res) => {
  try {
    let { id } = req.params;
    await Tag.findByIdAndDelete(id);
    return res
      .status(200)
      .send({ message: "Etiqueta eliminada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar la etiqueta",
    });
  }
};

export const putOneTag = async (req, res) => {
  try {
    let { id } = req.params;
    await Tag.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "Etiqueta actualizada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar la etiqueta",
    });
  }
};