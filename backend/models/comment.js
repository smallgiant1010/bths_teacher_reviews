const mongoose = require("mongoose");

const validYearsTakenFormat = (input) => {
    const pattern = new RegExp("^\\d{4}-\\d{4}$");
    return !pattern.test(input) ? false : true
}

const commentSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
        validate: [mongoose.isValidObjectId, "Not a Authorized User"],
    },
    courseName: {
        type: String,
        required: true
    },
    years: {
        type: String,
        required: true,
        validate: [validYearsTakenFormat, "Please Enter The Years In The Format 0000-0000"],
    },
    teacherName: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        validate: [(e) => e >= 1 && e < 10, "Enter a valid rating"],
    },
    workload: {
        type: Number,
        required: true,
        validate: [(e) => e >= 1 && e < 10, "Enter a valid rating"],
    },
    advice: {
        type: String,
    },
    resources: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("comment", commentSchema);