import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD_MAIL,
  },
});

export async function sendMail(
  email: string,
  subject: string,
  message: string
) {
  await transporter.sendMail({
    from: {
      name: 'Subtrack Team',
      address: process.env.MAIL || 'subtrack33@gmail.com',
    },
    to: email,
    subject: subject,
    html: message,
  });
}
