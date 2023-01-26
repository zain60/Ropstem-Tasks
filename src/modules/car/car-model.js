import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    registration_no: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
const Car = mongoose.model("Car", carSchema);
export { Car };
