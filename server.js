const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://sai-construction.vercel.app/',
    'http://localhost:3000',
    'http://localhost:3004',
    'http://localhost:5173',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Contact Form API Endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, service, message } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !service || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // 1. Admin Email Options (Notification to Business)
  const mailOptionsAdmin = {
    from: process.env.EMAIL_USER,
    to: process.env.BUSINESS_EMAIL || 'nandhinibalaaa@gmail.com',
    subject: `New Enquiry from ${firstName} ${lastName} - ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0f172a;">New Project Enquiry</h2>
        <p><strong>Service:</strong> ${service}</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f4; padding: 15px; border-radius: 8px;">
          ${message}
        </div>
      </div>
    `,
  };

  // 2. User Email Options (Welcome/Confirmation Mail)
  const mailOptionsUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `We've received your enquiry! 🏠 - SAI Construction`,
    html: `
      <div style="font-family: 'Arial', sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #0f172a; margin: 0;">SAI Construction</h1>
          <p style="color: #d97706; font-size: 14px; font-weight: bold; letter-spacing: 2px; margin-top: 5px;">BUILD YOUR DREAM</p>
        </div>
        
        <p>Hi <strong>${firstName}</strong>,</p>
        
        <p>Thank you for reaching out to us! We have received your enquiry regarding <strong>${service}</strong>.</p>
        
        <p>Building a dream home is a big step, and we're excited that you considered us for the journey. Our team is currently reviewing your details and will get back to you within <strong>24 hours</strong> to discuss the next steps.</p>
        
        <div style="background-color: #f5f5f4; padding: 15px; border-radius: 8px; margin: 20px 0; color: #64748b; font-size: 14px;">
          <p style="margin: 0 0 5px 0;"><strong>Your Message:</strong></p>
          <p style="margin: 0;">"${message}"</p>
        </div>

        <p>If you have any urgent questions, feel free to reply to this email or call us directly at +91 9441783068.</p>
        
        <p style="margin-top: 30px;">Best regards,</p>
        <p><strong>The SAI Construction Team</strong></p>
      </div>
    `
  };

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(mailOptionsAdmin),
      transporter.sendMail(mailOptionsUser)
    ]);

    console.log(`✅ Emails sent successfully for ${firstName} ${lastName}`);
    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.EMAIL_USER}`);
});
