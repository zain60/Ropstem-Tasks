import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Types.ObjectId, ref: 'Conversation' },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Types.ObjectId, ref: 'User' },
    text: String,
    media: Array,
    call: Object
}, {
    timestamps: true
})

const MSG = mongoose.model("MSG", messageSchema);
export { MSG };


