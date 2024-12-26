const Comment = require("../models/comment");
const Teacher = require("../models/teacher");

module.exports.remove_specific_comment = async(req, res) => {
    const teacherId = req.params.id;
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ error: "Invalid ID Formats" });
    }
    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        const teacher = await Teacher.findByIdAndUpdate(teacherId, { $pull : { comments: { _id: id }}}, { new: true });
        if(!teacher) {
            return res.status(404).json({ error: "Teacher Not Found" });
        }
        res.status(200).json({ message: "Comment Successfully Deleted", deletedComment });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports.remove_all_related_comments = async(req, res) => {
    const { email } = req.body;
    try {
        const comment = await Comment.findOne({ email });
        if(!comment) {
            return res.status(404).json({ error: "Comment Not Found" });
        }
        const { userid, teacherName } = comment;
        const teacher = await Teacher.findOne({ teacherName });
        if(!teacher) {
            return res.status(404).json({ error: "Teacher Not Found" });
        }
        await Comment.deleteMany({ userid });
        await Teacher.findByIdAndUpdate(teacher._id, { $pull: { comments: { userid } }});
        res.status(200).json({ message: "User's traces have been removed "});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}