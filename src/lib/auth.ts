// GitHub OAuth configuration
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_AUTH_REDIRECT_URI;

export const initiateGitHubLogin = () => {
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  
  // Generate a random state for CSRF protection
  const state = Math.random().toString(36).substring(7);
  sessionStorage.setItem('github_oauth_state', state);
  
  githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  githubAuthUrl.searchParams.append('scope', 'read:user user:email');
  githubAuthUrl.searchParams.append('state', state);
  
  // Redirect to GitHub OAuth
  window.location.href = githubAuthUrl.toString();
};

export const handleGitHubCallback = async (code: string, state: string | null) => {
  // Verify state to prevent CSRF attacks
  const savedState = sessionStorage.getItem('github_oauth_state');
  if (state && savedState && state !== savedState) {
    throw new Error('Invalid state parameter');
  }
  
  sessionStorage.removeItem('github_oauth_state');
  
  // For development: Mock authentication without backend
  // TODO: Replace this with actual backend API call in production
  const isDevelopment = !import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL === 'http://localhost:3000/api';
  
  if (isDevelopment) {
    // Mock user data for development
    const mockUser = {
      id: '12345',
      username: 'developer',
      email: 'dev@example.com',
      avatar: 'https://github.com/identicons/developer.png',
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { token: mockToken, user: mockUser };
  }
  
  // Production: Exchange code for access token via your backend
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/github/callback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to authenticate with GitHub');
  }
  
  const data = await response.json();
  
  // Store the access token
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  
  return data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
