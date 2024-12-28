const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
require('dotenv').config();


module.exports = async (req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return res.status(401).json({ error: "Admin Token Not Found" });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Admin.findById(id).select("_id");
        if (!req.user) {
            return res.status(404).json({ error: "Admin not found" });
        }
        next();
    }
    catch(err) {
        console.log(err);
        res.status(401).json({ error: "Request is not Authorized" });
    }
}

