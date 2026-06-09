# GitHub Authentication Setup

## Overview
Your frontend is now configured to work with your existing backend API at `http://localhost:3000`.

## How It Works

1. User clicks "Continue with GitHub" button
2. Frontend redirects to: `http://localhost:3000/api/auth/github`
3. Your backend handles the GitHub OAuth flow
4. Backend redirects back to: `http://localhost:5173/auth/callback`
5. Frontend fetches user data from: `http://localhost:3000/api/auth/me`
6. User is redirected to dashboard

## Backend Endpoints Used

- `GET /api/auth/github` - Initiates GitHub OAuth flow
- `GET /api/auth/github/callback` - Handles OAuth callback
- `GET /api/auth/me` - Gets current authenticated user
- `POST /api/auth/logout` - Logs out current session
- `POST /api/auth/logout/all` - Logs out all sessions

## Configuration

Your `.env` file should contain:
```env
VITE_API_URL=http://localhost:3000/api
```

## Testing

1. Make sure your backend is running on `http://localhost:3000`
2. Start the frontend: `npm run dev`
3. Navigate to `http://localhost:5173`
4. Click "Continue with GitHub"
5. Authorize the app
6. You'll be redirected to the dashboard with your real GitHub data

## User Data Structure

Based on your backend response, the user object contains:
```typescript
{
  id: number;
  github_id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  created_at: string;
}
```

## Authentication Methods

The frontend supports both:
- **Token-based auth**: If your backend sends a token in the URL or response
- **Cookie-based auth**: If your backend uses HTTP-only cookies (more secure)

The code automatically handles both methods by:
1. Checking for token in URL params
2. Storing token in localStorage if found
3. Sending token in Authorization header
4. Including credentials for cookie-based auth

## Logout

To logout:
```typescript
import { logout, logoutAll } from './lib/auth';

// Logout current session
await logout();

// Logout all sessions
await logoutAll();
```

## Protected Routes

All routes except `/` and `/auth/callback` are protected. Unauthenticated users will be redirected to the login page.

## Troubleshooting

### "Failed to fetch user data"
- Ensure backend is running on port 3000
- Check that `/api/auth/me` endpoint is accessible
- Verify CORS is enabled on your backend

### Infinite redirect loop
- Clear localStorage: `localStorage.clear()`
- Clear cookies
- Try login again

### User not authenticated after callback
- Check browser console for errors
- Verify backend is setting cookies or returning token
- Check that `/api/auth/me` returns user data
