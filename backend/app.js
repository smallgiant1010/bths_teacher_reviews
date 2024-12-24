// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Initialize Backend
const app = express();
dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT);
    console.log("Database connected and listening on PORT ", process.env.PORT);
})
.catch(err => {
    console.log(err);
});

// Route Handling
app.use();