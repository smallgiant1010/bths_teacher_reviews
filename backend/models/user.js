const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const emailChecker = (email) => {
    if(!validator.isEmail(email)) {
        return false;
    }
    const pattern = new RegExp("^(?!([a-zA-Z])\\1{2}).+\\d{4}@bths\\.edu$");
    return !pattern.test(email) ? false : true
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter a BTHS Email"],
        unique: true, 
        validate: [emailChecker, "Please Enter a Valid BTHS Email"],
    },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator: (password) => {
                    return password.length >= 8;
                },
                message: "Password must be 8 characters long",
            },
            {
                validator: (password) => { 
                    return /[A-Z]/.test(password);
                },
                message: "Password must contain atleast 1 uppercase character",
            },
            {
                validator: (password) => { 
                    return /\d/.test(password);
                },
                message: "Password must contain atleast 1 number",
            },
            {
                validator: (password) => { 
                    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
                },
                message: "Password must contain atleast 1 symbol",
            },
        ]
    },
    banned: {
        type: Boolean,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const pass = await bcrypt.compare(password, user.password);
        if(pass) {
            return user;
        }
        else {
            throw Error("Password Is Incorrect");
        }
    }
    else {
        throw Error("User Account Not Found");
    }
} 

module.exports = mongoose.model("user", UserSchema);