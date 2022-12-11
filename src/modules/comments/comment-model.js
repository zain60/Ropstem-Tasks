import mongoose from "mongoose";
import { User } from "../user/user-model.js";
const Schema = mongoose.Schema
//@ts-ignore
const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
  },);

const comment = mongoose.model("comment", postSchema);
export { comment };


