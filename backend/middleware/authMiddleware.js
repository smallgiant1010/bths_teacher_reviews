const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv").config();

const requireAuth = async(req, res, next) => {
    const token = req.cookies.jwt;
    if(!token) {
        return res.status(401).json({ error: "User Token Not Found" });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        const bannedOrNot = user.banned;
        req.user = user._id;
        if(!req.user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(bannedOrNot) {
            return res.status(401).json({ error: user.reason });
        }
        next();
    }
    catch(err) {
        console.log(err);
        res.status(401).json({ error: "Request is not Authorized" });
    }
}

module.exports = requireAuth;