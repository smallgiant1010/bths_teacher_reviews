const Teacher = require("../models/teacher");
const Comment = require("../models/comment");

module.exports.get_all_teachers = async(_, res) => {
    try {
        const teachers = await Teacher.find({});
        console.log(teachers);
        if(teachers.length === 0) {
            return res.status(404).json({ error: "No Teachers Found" });
        }
        res.status(200).json(teachers);
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};

module.exports.get_categorized_teachers = async(req, res) => {
    const { category } = req.body;
    try {
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        const teachers = await Teacher.find({category});
        if(teachers.length === 0) {
            return res.status(204).json({ error: "No Teachers found in this category" });
        }
        res.status(200).json(teachers);
    }
    catch(err) {
        console.log(err);
        res.status(404).json({error: "Category not found"});
    }
};

module.exports.post_new_teacher = async(req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({ error: "No data transferred in body" });
    }

    try {
        const newTeacher = await Teacher.create(data);
        res.status(200).json({ message: "Teacher has been added", teacher: newTeacher });
    }
    catch(err) {
        console.log(err);
        res.status(503).json({ error: err.message});
    }
};

module.exports.get_specific_teacher = async(req, res) => {
    const id = req.params.id;
    try {
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json({teacher});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
};

module.exports.get_specific_comments = async(req, res) => {
    const id = req.params.id;
    try {
        const comments = await Comment.findById(id);
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments found for this teacher" });
        }
        res.status(200).json({comments});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
};

module.exports.post_specific_comment = async(req, res) => {
    const id = req.params.id;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid teacher ID format" });
    }

    try {
        const newComment = await Comment.create(data);
        const teacher = await Teacher.findByIdAndUpdate(id, { $push: { comments: data }}, { new: true });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json({ message: newComment });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

