import mongoose from "mongoose";
import { User } from "../user/user-model.js";
const Schema = mongoose.Schema
//@ts-ignore
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

const comment = mongoose.model("comment", commentSchema);
export { comment };


