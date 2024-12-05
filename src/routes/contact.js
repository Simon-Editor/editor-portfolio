const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Email configuration using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,// Replace with your email password or app password
  },
});

// POST route for /contact
app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Validate the form data
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email options
  const mailOptions = {
    from: email, // Sender email (user's email from the form)
    to: 'simoneditorjnr2023@gmail.com', // Replace with your receiving email
    subject: `Portfolio Contact Form: Message from ${name}`,
    text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }

    console.log('Email sent successfully:', info.response);
    res.status(200).json({ success: 'Message sent successfully!' });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
