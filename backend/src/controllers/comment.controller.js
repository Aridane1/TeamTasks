import Comment from "../models/comment.model";

export const addComment = async (req, res) => {
  try {
    let comment = Comment(req.body);
    await comment.save();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "No se ha podido guardar la información del comentario",
    });
  }
};

export const getAllCommentByTaskId = async (req, res) => {
  try {
    let { taskId } = req.params;
    let comments = await Comment.find({ task_id: taskId });
    res.send({ message: comments });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar los comentarios",
    });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    let { id } = req.params;
    let comment = await Comment.delete({ _id: id });
    res.send({ message: comment });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar el comentarios",
    });
  }
};
export const putCommentById = async (req, res) => {
  try {
    let { id } = req.params;
    await Comment.findByIdAndUpdate(id, req.body);
    return res
      .status(200)
      .send({ message: "Comentario actualizada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al actualizar el comentarios",
    });
  }
};
