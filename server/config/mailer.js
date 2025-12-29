const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rockyrestaurant25@gmail.com',
        pass: 'tnqv fvvp lteo mfjh'
    }
});

module.exports = transporter;