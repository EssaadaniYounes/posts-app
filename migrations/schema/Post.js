import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        default: null
    },
    description: {
        type: String,
        min: 100,
        required: true,
        default: null
    },
    thumbnail: {
        type: String,
        required: true,
        default: null
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    publishDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    author: {
        type: String,
        required: true,
        default: null
    },
    categories: {
        type: Array,
        required: true,
        default: []
    },

});

export default mongoose.model('Post', PostSchema);