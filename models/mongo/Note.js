const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 35
    },
    body: {
        type: String,
        minlength: 4,
        maxlength: 155
    },
    image: {
        type: Buffer
    },
    is_done: {
        type: Boolean,
        default: false
    }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;