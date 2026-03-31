# GitHub OAuth Setup Guide

## Prerequisites
1. A GitHub account
2. Your application running locally or deployed

## Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: DeployHub (or your app name)
   - **Homepage URL**: `http://localhost:5173` (for local development)
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`
4. Click "Register application"
5. Copy the **Client ID**
6. Click "Generate a new client secret" and copy the **Client Secret**

## Step 2: Update Environment Variables

Update your `.env` file with the GitHub credentials:

```env
VITE_GITHUB_CLIENT_ID=your_github_client_id_here
VITE_AUTH_REDIRECT_URI=http://localhost:5173/auth/callback
```

**Important**: Never commit your `.env` file to version control!

## Step 3: Backend API Setup

You need a backend API to handle the OAuth callback and exchange the authorization code for an access token.

### Example Backend Endpoint (Node.js/Express)

```javascript
app.post('/api/auth/github/callback', async (req, res) => {
  const { code } = req.body;
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });
    
    const userData = await userResponse.json();
    
    // Create your own JWT token or session
    const token = createJWT({ userId: userData.id, username: userData.login });
    
    res.json({
      token,
      user: {
        id: userData.id,
        username: userData.login,
        email: userData.email,
        avatar: userData.avatar_url,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});
```

## Step 4: Update API URL

Make sure your `.env` file has the correct API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

## How It Works

1. User clicks "Continue with GitHub" button
2. App redirects to GitHub OAuth authorization page
3. User authorizes the app
4. GitHub redirects back to `/auth/callback` with an authorization code
5. Frontend sends the code to your backend API
6. Backend exchanges code for access token with GitHub
7. Backend fetches user info and creates a session/JWT
8. Frontend stores the token and redirects to dashboard

## Testing

1. Start your backend API server
2. Start the frontend: `npm run dev`
3. Navigate to `http://localhost:5173`
4. Click "Continue with GitHub"
5. Authorize the app
6. You should be redirected to the dashboard

## Production Deployment

For production, update your GitHub OAuth App settings:
- **Homepage URL**: `https://yourdomain.com`
- **Authorization callback URL**: `https://yourdomain.com/auth/callback`

And update your `.env.production`:
```env
VITE_GITHUB_CLIENT_ID=your_production_client_id
VITE_AUTH_REDIRECT_URI=https://yourdomain.com/auth/callback
VITE_API_URL=https://api.yourdomain.com/api
```

## Security Notes

- Never expose your GitHub Client Secret in the frontend
- Always validate the `state` parameter to prevent CSRF attacks
- Use HTTPS in production
- Implement proper token refresh mechanisms
- Store tokens securely (httpOnly cookies are recommended for production)
