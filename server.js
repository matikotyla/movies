const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Dotenv config
dotenv.config();

// Port
const port = process.env.PORT || 7000;

// Connect to the MongoDB
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        console.log(`MongoDB database connected!`);
    })
    .catch(err => {
        throw err;
    });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// Import Routes
const authRoute = require('./routes/authRoute');
const movieRoute = require('./routes/movieRoute');

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/movie', movieRoute);

// Start server
app.listen(port, () => {
    console.log(`Server up and running!`);
});