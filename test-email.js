const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('🧪 Testing Gmail Configuration...\n');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');
console.log('BUSINESS_EMAIL:', process.env.BUSINESS_EMAIL);
console.log('\nAttempting to create transporter...');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

console.log('Transporter created. Verifying connection...\n');

transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Gmail Authentication FAILED:');
        console.error('Error:', error.message);
        console.error('\n📋 Possible causes:');
        console.error('1. Invalid App Password');
        console.error('2. 2-Factor Authentication not enabled');
        console.error('3. "Less secure app access" disabled');
        console.error('\n🔧 To fix:');
        console.error('1. Go to: https://myaccount.google.com/apppasswords');
        console.error('2. Generate a new App Password');
        console.error('3. Update EMAIL_PASS in .env file');
        console.error('4. Restart the server');
    } else {
        console.log('✅ Gmail Authentication SUCCESSFUL!');
        console.log('Server is ready to send emails.');
    }
    process.exit(error ? 1 : 0);
});
