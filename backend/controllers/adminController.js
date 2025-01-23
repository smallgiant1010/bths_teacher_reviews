const Comment = require("../models/comment");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");
const User = require("../models/user");
const mongoose = require("mongoose");
const { createToken } = require("../controllers/authController");

module.exports.post_createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if(await Admin.findOne({ username })) {
      return res.status(409).json({ error: "Admin already exists" });
    }
    const user = await Admin.create({ username, password });
    const token = createToken(user._id, username);
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 3600 * 1000,
    });
    const { pass, ...data } = user.toObject();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message });
  }
};

module.exports.post_signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Admin.signin(username, password);
    const token = createToken(user._id);
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 3600 * 1000,
    });
    const { pass, ...data } = user.toObject();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message });
  }
};

module.exports.get_all_unbanned_users = async (_, res) => {
    try {
        const unbannedUsers = await User.find({banned: false});
        res.status(200).json(unbannedUsers);
    }
    catch(err) {
        console.log(err);
        res.status(404).json({ error: err.message });
    }
}

module.exports.get_all_banned_users = async (_, res) => {
    try {
        const bannedUsers = await User.find({banned: true});
        res.status(200).json(bannedUsers);
    }
    catch(err) {
        console.log(err);
        res.status(404).json({ error: err.message });
    }
}

module.exports.remove_all_related_comments = async (req, res) => {
  const { email } = req.body;
  try {
    const comment = await Comment.findOne({ email });
    if (!comment) {
      return res.status(404).json({ error: "Comment Not Found" });
    }
    const { userid, teacherName } = comment;
    const teacher = await Teacher.findOne({ teacherName });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher Not Found" });
    }
    await Comment.deleteMany({ userid });
    await Teacher.findByIdAndUpdate(teacher._id, {
      $pull: { comments: { userid } },
    });
    res.status(200).json({ message: "User's traces have been removed " });
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
      let { img, name, occupation, category } = obj;
      if(!occupation) {
        occupation = "Teacher"
      }
      const match = await Teacher.findOne({ img_url: img, name, category, role: occupation });
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
    if (!list_of_staff) {
      return res.status(404).json({ error: "Can't find faculty List" });
    }
    const comments = await fetch("http://127.0.0.1:8000/api/spreadsheet").then(
      (response) => response.json()
    );
    if (!comments) {
      return res.status(404).json({ error: "Can't find comments" });
    }
    let result = await Promise.all(
      comments.map(async (obj) => {
        const { teacherName, userid, years, ...restOfObj } = obj;
        for (let staff of list_of_staff) {
          if (staff.toUpperCase().endsWith(teacherName)) {
            const match = await Comment.findOne({ ...restOfObj });
            if (match) {
              continue;
            }
            let yearsTaken = "";
            if (typeof years == "number") {
              yearsTaken = `${years - 1}-${years}`;
            }
            if (typeof years == "string") {
              switch (years.length) {
                case 5:
                  yearsTaken = `20${years.slice(0, 2)}-20${years.slice(3, 5)}`;
                  break;
                case 7:
                  yearsTaken = `20${years.slice(2, 4)}-20${years.slice(
                    years.length - 2,
                    years.length
                  )}`;
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
              userid: new mongoose.Types.ObjectId("676de7fcbce36c1a635c1e36"),
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

module.exports.remove_all_comments = async (_, res) => {
  try {
    await Comment.deleteMany({});
    await Teacher.updateMany({}, { $set: { comments: [] } });
    res.status(200).json({ message: "Successfully exterminated all comments" });
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}

module.exports.patch_ban_user = async (req, res) => {
    try {
        const { email } = req.body;
        const bannedUser = await User.findOneAndUpdate({ email }, { $set: { banned: true }});
        res.status(200).json({ message: "User Successfully banned ", user: bannedUser });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.patch_unban_user = async (req, res) => {
    try {
        const { email } = req.body;
        const unBannedUser = await User.findOneAndUpdate({ email }, { $set: { banned: false }});
        res.status(200).json({ message: "User Successfully unbanned ", user: unBannedUser });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

module.exports.patch_img_url = async(_, res) => {
  try {
    const staff_list = await fetch("http://127.0.0.1:8000/api/full_faculty").then(data => data.json());
    if(!staff_list) {
      return res.status(404).json({ message: "Couldn't reach Teacher endpoint" });
    }
    const result = [];
    for(const teacher of staff_list) {
      const newTeacher = await Teacher.updateOne({name: teacher.name}, { $set: { img_url: teacher.img }});
      result.push(newTeacher);
    }
    res.status(200).json(result);
  }
  catch(err) {
    console.log(err.message)
  }
}

module.exports.delete_duplicates = async (_, res) => {
  try {
    const duplicates = await Teacher.aggregate(
      [
        {
          $group: {
            _id: "$name",
            ids: { $push: "$_id"},
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ]
    );

    for(let duplicate of duplicates) {
      const idsToDelete = duplicate.ids.slice(1);
      await Teacher.deleteMany({ _id: { $in: idsToDelete }});
    }
    res.status(200).json({ message: "Successfully Deleted Duplicates" });
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
}