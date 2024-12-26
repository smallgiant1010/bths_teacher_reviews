const mongoose = require("mongoose");
const { isStrongPassword } = require("validator");

const adminSchema = new mongoose.model({
    email: {
        type: String,
    },
    password: {
        type: String,
        validate: [(pass) => { return isStrongPassword(pass); }, "You do not have admin permissions"]
    }
});

module.exports = new mongoose.model("admin", adminSchema);