import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

// Import Schema
import User from './Schema/User.js';

dotenv.config();

const server = express();

server.use(express.json());
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

server.post("/signup", (req, res) => {
    let { fullname, email, password } = req.body;

    // validation of data from frontend
    if (fullname.length < 3) {
        return res.status(403).json({ "error":"Fullname should be at least 3 letters long" });
    }

    if(!email.length) {
        return res.status(403).json({ "error":"Email is required" });
    }

    if(!emailRegex.test(email)) {
        return res.status(403).json({ "error":"Email is invalid" });
    }

    if(!password.length) {
        return res.status(403).json({ "error":"Password is required" });
    }

    if(!passwordRegex.test(password)) {
        return res.status(403).json({ "error":"Password should be between 6 to 20 characters and should contain at least one numeric digit, one uppercase and one lowercase letter" });
    }

    // Hash the password before saving it to the database
    bcrypt.hash(password, 10, (err, hashed_password) => {
        let username = email.split("@")[0];

        let user = new User({
            personal_info: {fullname, email, password:hashed_password, username}
        });

        user.save().then((u) => {
            return res.status(200).json({ user: u});
        }).catch(err => {
            return res.status(500).json({"error":err.message});
        });
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});