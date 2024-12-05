require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');

// Create a transporter using credentials from .env
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any email provider you use
  auth: {
    user: process.env.MAIL_USER, // Your email address
    pass: process.env.MAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send an email
async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Sender address
      to, // Recipient address
      subject, // Email subject
      text, // Email body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };
