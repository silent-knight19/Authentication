# Google OAuth Setup Guide

Step-by-step instructions to enable Google Sign-In for the IPL Management System.

---

## Step 1: Go to Google Cloud Console

1. Open https://console.cloud.google.com/
2. Sign in with your Google account
3. Accept terms if prompted

---

## Step 2: Create a New Project

1. Click the project selector dropdown at the top (says "Select a project")
2. Click "New Project"
3. Enter:
   - Project name: `ipl-management-system`
   - Location: No organization (or your org if you have one)
4. Click "Create"
5. Wait a few seconds, then select your new project from the dropdown

---

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" → "OAuth consent screen" (in left sidebar)
2. Select "External" (anyone with Google account can use it)
3. Click "Create"
4. Fill in:
   - App name: `IPL Management System`
   - User support email: your email
   - Developer contact email: your email
5. Click "Save and Continue"
6. On "Scopes" page, click "Add or Remove Scopes"
7. Select:
   - `openid`
   - `userinfo.email`
   - `userinfo.profile`
8. Click "Update", then "Save and Continue"
9. On "Test users" page, click "Add Users"
10. Add your Google email, click "Add", then "Save and Continue"
11. Click "Back to Dashboard"

---

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Application type": `Web application`
4. Enter name: `IPL Management Web Client`
5. Add Authorized JavaScript origins:
   - Click "Add URI" and enter: `http://localhost:5173`
   - (For production later: `https://yourdomain.com`)
6. Add Authorized redirect URIs:
   - Click "Add URI" and enter: `http://localhost:3000/api/auth/google/callback`
   - (This must match the backend callback URL exactly)
7. Click "Create"
8. A popup will show your **Client ID** and **Client Secret**
9. Click "Download JSON" (save it somewhere safe)
10. Click "OK"

---

## Step 5: Update Your .env File

1. Open `/Users/sachinkumarsingh/Authentication/ipl-ms/backend/.env`
2. Replace the placeholder values:

```env
PORT=3000
MONGODB_URI=mongodb+srv://sachinsinghtomar7749:Sachin2003@codeorbit.iqm8fo2.mongodb.net/?appName=codeOrbit

JWT_SECRET=ipl_ms_jwt_secret_change_this_in_production
JWT_REFRESH_SECRET=ipl_ms_refresh_secret_change_this_in_production
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
CLIENT_URL=http://localhost:5173
```

3. Save the file

---

## Step 6: Restart Your Servers

1. Stop both servers (Ctrl+C in each terminal)
2. Start backend:
   ```bash
   cd /Users/sachinkumarsingh/Authentication/ipl-ms/backend
   npm run dev
   ```
3. Start frontend (in new terminal):
   ```bash
   cd /Users/sachinkumarsingh/Authentication/ipl-ms/frontend
   npm run dev
   ```

---

## Step 7: Test Google Sign-In

1. Open http://localhost:5173
2. You should see the sign-in page
3. Click "Continue with Google"
4. Select your Google account
5. You should be redirected back and logged in

---

## Troubleshooting

**Error: redirect_uri_mismatch**
- Double-check the redirect URI in Google Console matches exactly: `http://localhost:3000/api/auth/google/callback`
- Check no trailing slash, exact protocol (http vs https)

**Error: OAuth client not found**
- Make sure you created the OAuth 2.0 Client ID (not API key or service account)

**Error: Access denied (test user)**
- Make sure you added yourself as a test user in OAuth consent screen settings
- Or click "Publish App" to make it available to all users

---

## Production Deployment

When deploying to production:

1. Update Authorized JavaScript origins:
   - Add: `https://your-production-domain.com`

2. Update Authorized redirect URIs:
   - Add: `https://your-api-domain.com/api/auth/google/callback`

3. Update backend/.env:
   ```env
   GOOGLE_CLIENT_ID=your_production_client_id
   GOOGLE_CLIENT_SECRET=your_production_client_secret
   CLIENT_URL=https://your-production-domain.com
   ```

4. Publish your OAuth app:
   - Go to "OAuth consent screen" → "Publish App"
   - Complete verification if required

---

Done! Google Sign-In should now work on your local development environment.
