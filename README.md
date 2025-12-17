# SAI Construction - Backend API

Backend server for SAI Construction website. Handles contact form submissions and sends email notifications.

## 🚀 Features

- Contact form API endpoint
- Dual email system (admin notification + customer confirmation)
- Gmail SMTP integration
- CORS enabled for frontend communication
- Input validation
- Error handling and logging

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Gmail account with App Password

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/sai-construction-backend.git
   cd sai-construction-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   BUSINESS_EMAIL=business-email@gmail.com
   PORT=5000
   FRONTEND_URL=http://localhost:3002
   ```

## 🔑 Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to: https://myaccount.google.com/apppasswords
3. Select "Mail" and your device
4. Copy the 16-character password
5. Use this password in `EMAIL_PASS` (not your regular Gmail password)

## 🏃 Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

**Response**:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Contact Form Submission
```
POST /api/contact
```

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "service": "Full Home Construction",
  "message": "I'm interested in building a new home..."
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Emails sent successfully"
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🧪 Testing

Test email configuration:
```bash
npm test
```

Or manually test the API:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "service": "Full Home Construction",
    "message": "Test message"
  }'
```

## 📧 Email Templates

### Admin Notification
- **To**: Business email (from `BUSINESS_EMAIL`)
- **Subject**: "New Enquiry from [Name] - [Service]"
- **Contains**: Customer details and message

### Customer Confirmation
- **To**: Customer's email
- **Subject**: "We've received your enquiry! 🏠 - SAI Construction"
- **Contains**: Welcome message and 24-hour response promise

## 🚀 Deployment

### Deploy to Railway

1. Push code to GitHub
2. Create new project on [Railway](https://railway.app)
3. Connect GitHub repository
4. Add environment variables in Railway dashboard
5. Deploy!

### Deploy to Render

1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy!

### Deploy to Heroku

```bash
heroku create sai-construction-backend
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set BUSINESS_EMAIL=business@gmail.com
heroku config:set FRONTEND_URL=https://your-frontend.com
git push heroku main
```

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `EMAIL_USER` | Gmail account for sending emails | Yes |
| `EMAIL_PASS` | Gmail App Password | Yes |
| `BUSINESS_EMAIL` | Email to receive enquiries | Yes |
| `PORT` | Server port (default: 5000) | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## 🐛 Troubleshooting

### Emails not sending
- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail
- Look for Gmail security alerts
- Check server logs for detailed errors

### CORS errors
- Ensure `FRONTEND_URL` matches your frontend domain
- Check if frontend is making requests to correct backend URL

### Port already in use
- Change `PORT` in `.env` file
- Kill process using the port: `lsof -ti:5000 | xargs kill`

## 📝 License

MIT

## 👥 Support

For issues or questions, please open an issue on GitHub.
