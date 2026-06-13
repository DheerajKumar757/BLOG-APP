import { EMAIL_FORGET_PASSWORD_TEMPLATE, EMAIL_PASSWORD_RESET_SUCCESS_TEMPLATE, EMAIL_VERIFICATION_SUCCESS_TEMPLATE, EMAIL_VERIFICATION_TEMPLATE } from "./emailTemplates.js";
import { createTransporter } from "./nodemailerConfig.js"

export const sendVerificationEmail = async (email, name, verificationToken, verificationLink) => {
    let transporter = await createTransporter()

    try {
        const info = await transporter.sendMail({
            from: {
                name: process.env.MY_EMAIL_NAME,
                address: process.env.MY_EMAIL
            }, // sender address
            to: {
                name: name,
                address: email
            }, // list of recipients
            subject: "MERN-BLOG-APP - Vefiy your email.", // subject line
            html: EMAIL_VERIFICATION_TEMPLATE
                    .replace("{username}", name)
                    .replace("{verificationCode}", verificationToken)
                    .replace("{verificationLink}", verificationLink),
        });

        console.log("Message sent: %s", info.messageId);
    } 
    catch (err) {
        console.error("Error while sending mail:", err);
    }

}

export const sendEmailVerificationSuccessMail = async (email, name, login_page) => {
    let transporter = await createTransporter()

    try {
        const info = await transporter.sendMail({
            from: {
                name: process.env.MY_EMAIL_NAME,
                address: process.env.MY_EMAIL
            }, // sender address
            to: {
                name: name,
                address: email
            }, // list of recipients
            subject: "MERN-BLOG-APP - Email verified successfully.", // subject line
            html: EMAIL_VERIFICATION_SUCCESS_TEMPLATE
                    .replace("{username}", name)
                    .replace("{dashboardLink}", login_page),
        });

        console.log("Message sent: %s", info.messageId);
    } 
    catch (err) {
        console.error("Error while sending mail:", err);
    }    
}

export const sendPasswordResetEmail = async (email, name, verificationToken, verificationLink) => {
    let transporter = await createTransporter()

    try {
        const info = await transporter.sendMail({
            from: {
                name: process.env.MY_EMAIL_NAME,
                address: process.env.MY_EMAIL
            }, // sender address
            to: {
                name: name,
                address: email
            }, // list of recipients
            subject: "MERN-BLOG-APP - Password reset request.", // subject line
            html: EMAIL_FORGET_PASSWORD_TEMPLATE
                    .replace("{username}", name)
                    .replace("{resetToken}", verificationToken)
                    .replace("{resetLink}", verificationLink),
        });

        console.log("Message sent: %s", info.messageId);
    } 
    catch (err) {
        console.error("Error while sending mail:", err);
    }

}


export const sendPasswordResetSuccessEmail = async (email, name, loginLink) => {
    let transporter = await createTransporter()

    try {
        const info = await transporter.sendMail({
            from: {
                name: process.env.MY_EMAIL_NAME,
                address: process.env.MY_EMAIL
            }, // sender address
            to: {
                name: name,
                address: email
            }, // list of recipients
            subject: "MERN-BLOG-APP - Password reset success.", // subject line
            html: EMAIL_PASSWORD_RESET_SUCCESS_TEMPLATE
                    .replace("{username}", name)
                    .replace("{loginLink}", loginLink),
        });

        console.log("Message sent: %s", info.messageId);
    } 
    catch (err) {
        console.error("Error while sending mail:", err);
    }

}
