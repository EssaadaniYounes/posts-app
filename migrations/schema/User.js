import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    friends: {
        type: Array,
        default: []
    }
});

export default mongoose.model('User', UserSchema);