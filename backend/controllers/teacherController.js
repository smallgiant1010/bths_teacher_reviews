const Teacher = require("../models/teacher");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

module.exports.get_all_teachers = async (_, res) => {
  try {
    const teachers = await Teacher.find({});
    console.log(teachers);
    if (teachers.length === 0) {
      return res.status(404).json({ error: "No Teachers Found" });
    }
    res.status(200).json(teachers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.get_categorized_teachers = async (req, res) => {
  const { category } = req.body;
  try {
    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const teachers = await Teacher.find({ category });
    if (teachers.length === 0) {
      return res
        .status(204)
        .json({ error: "No Teachers found in this category" });
    }
    res.status(200).json(teachers);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Category not found" });
  }
};

module.exports.post_new_teacher = async (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No data transferred in body" });
  }

  try {
    const newTeacher = await Teacher.create(data);
    res
      .status(200)
      .json({ message: "Teacher has been added", teacher: newTeacher });
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: err.message });
  }
};

module.exports.get_specific_teacher = async (req, res) => {
  const id = req.params.id;
  try {
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json({ teacher });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.get_specific_comments = async (req, res) => {
  const id = req.params.id;
  try {
    const { name } = await Teacher.findById(id);
    const comments = await Comment.find({ teacherName: name });
    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this teacher" });
    }
    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.post_specific_comment = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid teacher ID format" });
  }

  try {
    const newComment = await Comment.create(data);
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { $push: { comments: data } },
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json({ message: newComment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.post_bulk_teachers = async (_, res) => {
  try {
    const final_list = [];
    const faculty_list = await fetch("http://127.0.0.1:8000/api/full_faculty")
      .then((response) => response.json())
      .catch((err) => console.log(err));
    for (let obj of faculty_list) {
      const { img, name, occupation, category } = obj;
      const match = await Teacher.find({ name, category, role: occupation });
      if (match) {
        continue;
      }
      const newTeacher = await Teacher.create({
        img_url: img,
        role: occupation,
        comments: [],
        name,
        category,
      });
      final_list.push(newTeacher);
    }
    res.status(200).json(final_list);
  } catch (err) {
    console.log(err);
    res.status(503).json({ error: err.message });
  }
};

module.exports.post_bulk_comments = async (_, res) => {
  try {
    const list_of_staff = await fetch(
      "http://127.0.0.1:8000/api/faculty_list"
    ).then((response) => response.json());
    if(!list_of_staff) {
        return res.status(404).json({ error: "Can't find faculty List"});
    }
    const comments = await fetch("http://127.0.0.1:8000/api/spreadsheet").then(
      (response) => response.json()
    );
    if(!comments) {
        return res.status(404).json({ error: "Can't find comments"});
    }
    let result = await Promise.all(
      comments.map(async (obj) => {
        const { teacherName, userid, years, ...restOfObj } = obj;
        for (let staff of list_of_staff) {
          if (staff.toUpperCase().includes(teacherName)) {
            const match = await Comment.findOne({...restOfObj});
            if(match) {
                continue;
            }
            let yearsTaken = ""
            if(typeof years == "number") {
                yearsTaken == `${years-1}-${years}`;
            }
            if(typeof years == "string") {
                switch(years.length) {
                    case 5:
                        yearsTaken = `20${years.slice(0, 2)}-20${years.slice(3, 5)}`;
                        break;
                    case 7:
                        yearsTaken = `20${years.slice(2, 4)}-20${years.slice(years.length - 2, years.length)}`;
                        break;
                    case 10:
                        yearsTaken = years.trimEnd();
                        break;
                    default:
                        yearsTaken = years;
                }
            }
            const comment = await Comment.create({
              ...restOfObj,
              teacherName: staff,
              years: yearsTaken,
              userid: new mongoose.Types.ObjectId('676de7fcbce36c1a635c1e36'),
            });
            const teacher = await Teacher.findOneAndUpdate(
              { name: staff },
              { $push: { comments: comment } },
              { new: true }
            );

            return teacher;
          }
        }
      })
    );
    res.status(200).json(result.filter(Boolean));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
