# Email Backend Setup Guide

## Overview
The contact form now uses a Node.js backend to send emails directly to `asmitbgmi24@gmail.com` instead of opening the user's email client.

## Setup Instructions

### 1. Gmail App Password Setup
To send emails from Gmail, you need to create an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification (enable if not already enabled)
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### 2. Environment Configuration
Update the `.env` file with your Gmail credentials:

```
EMAIL_USER=asmitbgmi24@gmail.com
EMAIL_PASS=your_16_character_app_password_here
PORT=5000
```

**Important**: Replace `your_16_character_app_password_here` with the actual app password from step 1.

### 3. Running the Application

#### Development Mode (Two terminals needed):

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - React Frontend:**
```bash
npm start
```

#### Production Mode:
```bash
npm run build
npm run server
```

### 4. Testing the Email Functionality

1. Open the website in your browser
2. Click on "CONTACT US" in the navigation
3. Fill out the contact form
4. Click "Send"
5. Check your email at `asmitbgmi24@gmail.com`

## Features

- **Direct Email Sending**: Emails are sent directly to your Gmail without requiring user interaction
- **Professional Formatting**: Emails include proper HTML formatting with company branding
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during email sending process
- **Security**: Uses environment variables to keep credentials secure

## API Endpoints

- `POST /api/send-email` - Send contact form emails
- `GET /api/health` - Health check endpoint

## Troubleshooting

### Common Issues:

1. **"Failed to send email" error**
   - Check that your Gmail app password is correct
   - Ensure 2-factor authentication is enabled
   - Verify the `.env` file is in the root directory

2. **CORS errors**
   - The backend includes CORS configuration for localhost:3000
   - For production, update the CORS settings in `server.js`

3. **Port conflicts**
   - Backend runs on port 5000 by default
   - Change the PORT in `.env` if needed

### Security Notes:
- Never commit the `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use app passwords instead of your main Gmail password
- Consider using environment variables in production hosting

## Production Deployment

For production deployment, you'll need to:
1. Set up environment variables on your hosting platform
2. Update the frontend API URL to point to your production backend
3. Configure your hosting platform to run the Node.js server
4. Set up a domain and SSL certificate

Popular hosting options:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS 