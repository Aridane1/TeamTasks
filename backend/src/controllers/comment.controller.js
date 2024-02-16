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
