import { EMAIL_VERIFICATION_TEMPLATE } from "./emailTemplates.js";
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