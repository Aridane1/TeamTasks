import Comment from "../models/comment.model";

export const addMessage = async (infoMessage) => {
  try {
    let message = Comment(infoMessage);
    await message.save();
    return;
  } catch (err) {
    console.log(err);
  }
};

export const addManyMessage = async (req, res) => {
  try {
    let { messages } = req.body;
    for (const iterator of messages) {
      iterator.user_id = iterator.userId;
      iterator.task_id = iterator.taskId;
      let message = Comment(iterator);
      await message.save();
    }

    res.status(200).json({ message: "Mensajes agregados correctamente" });
    return;
  } catch (err) {
    console.log(err);
  }
};

export const getAllMessagesByTaskId = async (taskId) => {
  try {
    let comments = await Comment.find({ task_id: taskId }).sort({
      createdAt: 1,
    });
    console.log(comments);
    return comments;
  } catch (err) {
    console.log(err);
  }
};
