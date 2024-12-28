// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const teacherRoutes = require("./routes/teacherRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize Backend
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Database connected and listening on PORT", process.env.PORT);
    });
})
.catch(err => {
    console.log(err);
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
});

// Route Handling
app.use('/api/teachers', teacherRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
