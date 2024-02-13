import { Schema, model, Types } from "mongoose";

const CollaboratorsSchema = new Schema(
  {

    //seguidor
    id_task: {
      type: Types.ObjectId,
      ref: "task",
      required: true,
    },
    //seguido
    id_collaborator: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Collaborators", CollaboratorsSchema);
