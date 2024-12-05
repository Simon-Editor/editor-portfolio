const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();  // Ensure environment variables are loaded

// Setup nodemailer transport using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'simoneditorjnr2023@gmail.com',
        pass: process.env.MAIL_PASS, // Use environment variable
    }
});

// POST route to handle form submission
router.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Prepare the email message
    const mailOptions = {
        from: email,
        to: 'simoneditorjnr2023@gmail.com',
        subject: `Message from ${name}`,
        text: `You received a message from: \nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);  // Log the error
            return res.status(500).send('Error sending message');
        } else {
            console.log('Email sent: ' + info.response);  // Log successful email sending
            return res.status(200).send('Message sent successfully');
        }
    });
});

module.exports = router;
