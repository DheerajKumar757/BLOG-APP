import nodemailer from "nodemailer"

export const createTransporter = async () => {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    }
    catch (err) {
        console.error("Verification failed:", err);
    }

    return transporter;
}