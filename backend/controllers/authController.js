const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const errorHandler = (err) => {
    let errors = {
        email: '',
        password: '',
    };

    if(err.message === "User Account Not Found") {
        errors.email = err.message;
    }

    if(err.message === "Password Is Incorrect") {
        errors.password = err.message;
    }

    // duplicate error 
    if(err.code === 11000) {
        errors['email'] = "Email Is Already In Use";
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports.createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d'});
}

module.exports.post_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 3600 * 1000});
        const { pass, ...data } = user.toObject();
        res.status(200).json(data);
    }
    catch(err) {
        const errors = errorHandler(err);
        res.status(400).json({ email: errors.email, password: errors.password });
    }
};

module.exports.post_signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password, banned: false, reason: "" });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 24 * 3600 * 1000});
        const { pass, ...data } = user.toObject();
        res.status(200).json(data);
    }
    catch(err) {
        const errors = errorHandler(err);
        res.status(400).json({ email: errors.email, password: errors.password });
    }
};