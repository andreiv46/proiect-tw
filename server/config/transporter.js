import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  };
  await transporter.sendMail(mailOptions);
};
