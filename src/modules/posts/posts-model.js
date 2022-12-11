import mongoose from "mongoose";
import { User } from "../user/user-model.js";
import { comment } from "../comments/comment-model.js";
const Schema = mongoose.Schema
//@ts-ignore
const postSchema = new Schema({

    content: String,
    images: {
        type: Array,
        required: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
  },);

const Post = mongoose.model("Post", postSchema);
export { Post };