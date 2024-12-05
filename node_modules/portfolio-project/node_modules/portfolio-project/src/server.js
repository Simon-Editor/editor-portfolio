const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();  // Make sure dotenv is loaded correctly
const cors = require('cors'); // <-- Add this line to import the cors package
/* const apiRouter = require('./api'); // Import the router from api.js */

const app = express();

// Enable CORS for all origins (you can customize this to allow only certain origins)
app.use(cors());


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* app.use('/api', apiRouter);  // Use /api as a base route */

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'simoneditorjnr2023@gmail.com',  // Your Gmail address
        pass: process.env.MAIL_PASS,           // Password from the environment variable
    },
});

// POST route for form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Log the request data to ensure it's being sent correctly
    console.log('Form data received:', { name, email, message });

    // Basic validation
    if (!name || !email || !message) {
        console.error('Missing form data');
        return res.status(400).send('All fields are required');
    }

    const mailOptions = {
        from: email,
        to: 'simoneditorjnr2023@gmail.com',  // Replace with your email address
        subject: `Message from ${name}`,
        text: `You received a message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email using Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);  // Log any email sending errors
            return res.status(500).send('Error sending message');
        }
        console.log('Email sent:', info.response);  // Log successful email sending
        res.status(200).send('Message sent successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
