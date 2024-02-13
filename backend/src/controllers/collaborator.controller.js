import Collaborator from "../models/collaborator.model";
import Configurations from '../models/configuration.model';

export const addCollaborator = async (req, res) => {
  try {
    let collaborator = Collaborator(req.body);
    await collaborator.save();
    res.send({ message: collaborator });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar al colaborador",
    });
  }
};

export const getOneCollaborator = async (req, res) => {
  try {
    let { id } = req.params;
    let collaborator = await Collaborator.findById(id);
    if (!collaborator) {
      return res.status(404).send("No se al colaborador");
    }
    return res.send(collaborator);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar colaborador",
    });
  }
};


//ESTE HAY QUE HACERLO BIEN


export const getCollaboratorsImagesByTaskId = async (req, res) => {
  try {
    let { id } = req.params; 
    let collaborator = await Collaborator.find({ id_task: id })
      .select("id_collaborator -_id")
      .populate({
        path: "id_collaborator",
        select: "_id -username -email ",
      });

    if (collaborator.length === 0) {
      return res.status(404).send("Esta tarea no tiene colaboradores.");
    }

    let collaboratorsImages = await Promise.all(collaborator.map(async (collaborator) => {
      let config = await Configurations.findOne({ user_id: collaborator.id_collaborator._id })
        .select("user_image -_id");
      return {
        image: config ? config.user_image : null,
      };
    }));

    return res.send(collaboratorsImages);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las imágenes de los colaboradores",
    });
  }
};

export const getAllCollaborator = async (req, res) => {
  try {
    let collaborator = await Collaborator.find();
    if (!collaborator) {
      return res.status(404).send("No hay colaboradores registrados");
    }
    return res.send(collaborator);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar los colaboradores",
    });
  }
};

export const deleteOneCollaborator = async (req, res) => {
  try {
    let { id } = req.params;
    await Collaborator.findByIdAndDelete(id);
    return res.status(200).send({ message: "colaborador borrado correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar al colaborador",
    });
  }
};

export const putOneCollaborator = async (req, res) => {
  try {
    let { id } = req.params;
    await Collaborator.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "colaborador actualizado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar el colaborador",
    });
  }
};
