const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    img_url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    }
});

module.exports = mongoose.model("teacher", teacherSchema);