import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import admin from 'firebase-admin';
import crypto from "crypto"
import { getAuth } from 'firebase-admin/auth';

// Import Schema
import User from './Schema/User.js';
import { sendEmailVerificationSuccessMail, sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendVerificationEmail } from './nodemailer/email.js';

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors())
let PORT = 3000;

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "standard-mern-blog",
        "private_key_id": process.env.GOOGLE_AUTH_PRIVATE_KEY_ID,
        "private_key": process.env.GOOGLE_AUTH_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": "firebase-adminsdk-fbsvc@standard-mern-blog.iam.gserviceaccount.com",
        "client_id": process.env.GOOGLE_AUTH_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.GOOGLE_AUTH_CLIENT_X509_CERT_URL,
        "universe_domain": "googleapis.com"
    })
})

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
let digitsRegex = /^\d+$/; // regex for token

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
        is_verified: user.personal_info.isVerified,
        reset_params_token: user.personal_info.resetTokenParams,
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

        let existingUser = await User.findOne({ "personal_info.email": email });
        if (existingUser) {
            return res.status(403).json({ "error": "Email already exists" });
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationParams = crypto.randomBytes(20).toString("hex");

        sendVerificationEmail(email, fullname, verificationToken, `${process.env.CLIENT_URL}/verify-email/${verificationParams}`);

        let user = new User({
            personal_info: {
                fullname,
                email,
                password:hashed_password,
                username,
                resetToken: verificationToken,
                resetTokenParams: verificationParams,
                resetTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            }
        });

        await user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(u));
        }).catch(err => {
            return res.status(500).json({"error":err.message});
        });
    })
})

server.post("/verify-email/:token_param", async (req, res) => {
    const { token_param } = req.params;
    const { token_verify } = req.body;

    if(!digitsRegex.test(token_verify)) {
        return res.status(403).json({ "error":"S1009 Only digits are allowed." });
    }

    User.findOne({
        "personal_info.resetTokenParams" : token_param
    })
    .then(async (user) => {
        if(!user) {
            return res.status(500).json({"error":"No verifcation pending."});
        }
        if(user.personal_info.resetTokenExpiresAt < Date.now()) {
            // if token has expired use forgot password
            user.personal_info.resetToken = undefined;
            user.personal_info.resetTokenParams = undefined;
            user.personal_info.resetTokenExpiresAt = undefined;

            await user.save();

            return res.status(500).json({"error":"Token has expired."});
        }
        if(user.personal_info.resetToken == token_verify) {
            user.personal_info.isVerified = true;
            user.personal_info.resetToken = undefined;
            user.personal_info.resetTokenParams = undefined;
            user.personal_info.resetTokenExpiresAt = undefined;

            await user.save();

            sendEmailVerificationSuccessMail(user.personal_info.email, user.personal_info.fullname, `${process.env.CLIENT_URL}/signin`);

            return res.status(200).json(formatDatatoSend(user));

        }
        else {
            return res.status(500).json({"error":"Invalid token."});
        }
    })
    .catch(err => {
        return res.status(500).json({"error":err.message});
    })

})

server.post("/signin", (req, res) => {

    let { email, password } = req.body;

    User.findOne({ "personal_info.email" : email })
    .then((user) => {
        if(!user) {
            return res.status(403).json({"error": "Email not found"});
        }
        else if(user.google_auth) {
            return res.status(403).json({"error": "Please use google to sign in."});
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

server.post("/forget-password", (req, res) => {
    let { email } = req.body;

    if(!email.length) {
        return res.status(403).json({ "error":"Email is required" });
    }

    if(!emailRegex.test(email)) {
        return res.status(403).json({ "error":"Email is invalid" });
    }

    User.findOne({ "personal_info.email" : email } )
    .then(async (user) => {
        if(!user) {
            return res.status(403).json({"error": "Not a valid user."});
        }

        const passwordResetToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationParams = crypto.randomBytes(20).toString("hex");

        user.personal_info.isVerified = false;
        user.personal_info.resetToken = passwordResetToken;
        user.personal_info.resetTokenParams = verificationParams;
        user.personal_info.resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
        
        sendPasswordResetEmail(
            user.personal_info.email, 
            user.personal_info.fullname, 
            passwordResetToken,
            `${process.env.CLIENT_URL}/reset-password/${user.personal_info.username}/${verificationParams}`
        );

        await user.save().then((u) => {
            return res.status(200).json({
                "message": "Redirecting to set your password ...",
                "pass_reset_username": user.personal_info.username,
                "pass_reset_param": verificationParams
            });
        }).catch(err => {
            return res.status(500).json({"error": "E1001 " + err.message});
        });

    })
    .catch(err => {
        return res.status(500).json({"error": "E1002 " + err.message});
    })
})

server.post("/reset-password/:user_name/:reset_pass_param", async (req, res) => {
    const { user_name, reset_pass_param } = req.params;
    const { reset_pass_token, new_password } = req.body;

    if(!new_password.length) {
        return res.status(403).json({ "error":"Password is required" });
    }
    if(!passwordRegex.test(new_password)) {
        return res.status(403).json({ "error":"Password should be between 6 to 20 characters and should contain at least one numeric digit, one uppercase and one lowercase letter" });
    }
    if(!digitsRegex.test(reset_pass_token)) {
        return res.status(403).json({ "error":"S1008 Only digits are allowed." });
    }

    User.findOne({
        "personal_info.resetTokenParams" : reset_pass_param,
        "personal_info.username" : user_name
    })
    .then(async (user) => {
        if(!user) {
            return res.status(500).json({"error":"S1011 Something went wrong."});
        }
        if(user.personal_info.resetTokenExpiresAt < Date.now()) {
            // if token has expired use forgot password
            user.personal_info.resetToken = undefined;
            user.personal_info.resetTokenParams = undefined;
            user.personal_info.resetTokenExpiresAt = undefined;

            await user.save();

            // token has expired ask the user to reset his password
            return res.status(500).json({"error":"S1005 Reset your password"});
        }
        if(user.personal_info.resetToken == reset_pass_token) {

            bcrypt.hash(new_password, 10, async (err, hashed_pass) => {
                user.personal_info.password = hashed_pass;
                user.personal_info.isVerified = true;
                user.personal_info.resetToken = undefined;
                user.personal_info.resetTokenParams = undefined;
                user.personal_info.resetTokenExpiresAt = undefined;

                sendPasswordResetSuccessEmail(
                    user.personal_info.email,
                    user.personal_info.fullname,
                    `${process.env.CLIENT_URL}/signin`
                );

                await user.save().then((u) => {
                    return res.status(200).json({"success": "Password has been changed successfully"});
                }).
                catch(err => {
                    return res.status(500).json({"error": "E1001 " + err.message});
                });

            });
        }
        else {
            return res.status(500).json({"error":"S1010 Invalid token."});
        }
    })
    .catch(err => {
        return res.status(500).json({"error":err.message});
    })

})

server.post("/google-auth", (req, res) => {
    let { access_token } = req.body;

    console.log("acc_tok=" + access_token);
    
    getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
        let { name, email, picture } = decodedUser;
        picture = picture.replace("s96-c", "s384-c");

        let user = await User.findOne({"personal_info.email":email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth")
        .then((u) => {return u || null})
        .catch((err) => {
            return res.status(500).json({"error":err.message})
        })

        if(user) {
            if(!user.google_auth){
                return res.status(403).json({"error": "Email was signed up without google. Please login with password."})
            }
        }
        else {
            let username = await generateUsername(email);

            user = new User({
                personal_info: { fullname: name, email, profile_img: picture, username },
                google_auth: true
            })

            // to use default profile image :
            // user = new User({
            //     personal_info: { fullname: name, email, username },
            //     google_auth: true
            // })

            await user.save().then((u) => {
                user = u;
            })
            .catch(err => {
                return res.status(500).json({"error": err.message})
            })
        }

        return res.status(200).json(formatDatatoSend(user));
        
    })
    .catch((err) => {
        return res.status(500).json({"error":"Failed to login user Google, use other account!"})
    })
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});