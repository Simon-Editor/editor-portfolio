const brevo = require('sib-api-v3-sdk'); // Correctly import Brevo SDK

// Configure your API key
brevo.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const sendEmail = async (recipientEmail, subject, message) => {
    const tranEmailApi = new brevo.TransactionalEmailsApi();

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: 'your-email@example.com' };
    sendSmtpEmail.to = [{ email: recipientEmail }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = `<html><body>${message}</body></html>`;

    try {
        const result = await tranEmailApi.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;


emailApi.sendTransacEmail(email)
  .then(response => console.log('Success:', response))
  .catch(error => {
    console.error('Error:', error);
    res.status(500).send('Email sending failed');
  });
