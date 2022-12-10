import mongoose from "mongoose";
import { user } from "../user/user-model.js";
const Schema = mongoose.Schema
//@ts-ignore
const postSchema = new Schema({

    content: String,
    images: {
        type: Array,
        required: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: {type: mongoose.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
  },);

const Post = mongoose.model("Post", postSchema);
export { Post };