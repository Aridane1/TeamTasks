import { Schema, model, Types } from "mongoose";

const followersSchema = new Schema(
  {

    //seguidor
    id_follower: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    //seguido
    id_following: {
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

export default model("Followers", followersSchema);
