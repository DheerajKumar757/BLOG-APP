import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';

// Import Schema
import User from './Schema/User.js';

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors())
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
})

const formatDatatoSend = (user) => {

    const access_token = jwt.sign({id: user._id}, process.env.JWT_SECRET_ACCESS_KEY, {expiresIn: "1d"});

    return {
        access_token,
        profile_img: user.personal_info.profile_img,
        fullname: user.personal_info.fullname,
        username: user.personal_info.username,
    }
}

const generateUsername = async (email) => {
    let username = email.split("@")[0];
    
    // Check if the username already exists in the database
    let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result);

    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

    return username;
}

server.post("/signup", async (req, res) => {
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
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUsername(email);

        let user = new User({
            personal_info: {fullname, email, password:hashed_password, username}
        });

        let existingUser = await User.findOne({ "personal_info.email": email });
        if (existingUser) {
            return res.status(403).json({ "error": "Email already exists" });
        }

        await user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u));
        }).catch(err => {
            return res.status(500).json({"error":err.message});
        });
    })
})

server.post("/signin", (req, res) => {

    let { email, password } = req.body;

    User.findOne({ "personal_info.email" : email })
    .then((user) => {
        if(!user) {
            return res.status(403).json({"error": "Email not found"});
        }

        bcrypt.compare(password, user.personal_info.password, (err, match) => {
            if(err) {
                return res.status(403).json({ "error" : "Error occured while login, please try again" });
            }
            if(!match) {
                return res.status(403).json({ "error" : "Invalid password" });
            }
            else {
                return res.status(200).json(formatDatatoSend(user));
            }
        })

    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({ "error": err.message });
    })

})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});