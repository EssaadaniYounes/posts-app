import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    label: {
        type: String,
        default: null
    }
})

export default mongoose.model('Category', CategorySchema);