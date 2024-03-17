// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Create SMTP transporter using nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'solvenexus@gmail.com', // Your email address
            pass: 'Wearesolvenexus_' // App password generated for nodemailer
        }
    });

    // Email content
    const mailOptions = {
        from: email, // Sender's email address
        to: 'solvenexus@gmail.com', // Your email address
        subject: 'New Volunteer Registration',
        text: `Name: ${name}\nEmail: ${email}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error: Unable to send email.'); // Sending error response to client
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.'); // Sending success response to client
        }
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

