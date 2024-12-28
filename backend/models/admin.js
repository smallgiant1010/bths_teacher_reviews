const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();

const AdminSchema = new mongoose.model({
    username: {
        type: String,
        required: true,
        validate: [(username) => { return username == 'admin'}, "Admin doesn't exist"]
    },
    password: {
        type: String,
        required: true,
    }
});

AdminSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

AdminSchema.statics.signin = async function(username, password) {
    const admin = await this.findOne({ username });
    if(admin) {
        const match = await bcrypt.compare(admin.password, password);
        if(match) {
            return admin;
        }
        else {
            throw Error('Password is Incorrect');
        }
    }
    else {
        throw Error('Username is Not Correct');
    }
}
module.exports = new mongoose.model("admin", AdminSchema);