import Follower from "../models/followers.model";

export const addFollower = async (req, res) => {
  try {
    let follower = Follower(req.body);
    await follower.save();
    res.send({ message: follower });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al guardar al seguidor",
    });
  }
};

export const getOneFollower = async (req, res) => {
  try {
    let { id } = req.params;
    let follower = await Follower.findById(id);
    if (!follower) {
      return res.status(404).send("No se al seguidor");
    }
    return res.send(follower);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar seguidor",
    });
  }
};

export const getFollowingsByFollowerId  = async (req, res) => {
  try {
    let { id } = req.params;
    let followings = await Follower.find({ id_follower: id })
      .select("id_following -_id")
      .populate("id_following", "username email -_id"); 

    if (followings.length === 0) {
      return res.status(404).send("Este usuario no sigue a nadie.");
    }

    return res.send(followings.map((following) => following.id_following)); 
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar a quienes sigue el usuario",
    });
  }
};

export const getAllFollowers = async (req, res) => {
  try {
    let follower = await Follower.find();
    if (!follower) {
      return res.status(404).send("No hay seguidores registrados");
    }
    return res.send(follower);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar los seguidores",
    });
  }
};

export const deleteOneFollower = async (req, res) => {
  try {
    let { id } = req.params;
    await Follower.findByIdAndDelete(id);
    return res.status(200).send({ message: "follower borrado correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar al follower",
    });
  }
};

export const putOneFollower = async (req, res) => {
  try {
    let { id } = req.params;
    await Follower.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "follower actualizado",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar el follower",
    });
  }
};
