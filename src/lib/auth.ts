const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const initiateGitHubLogin = () => {
  // Redirect to your backend's GitHub OAuth endpoint
  window.location.href = `${API_URL}/auth/github`;
};

export const handleGitHubCallback = async () => {
  // Backend redirects here with ?session_token=<token>
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('session_token');

  if (token) {
    localStorage.setItem('auth_token', token);
    // Clean token from URL bar without triggering a reload
    window.history.replaceState({}, '', window.location.pathname);
  }

  // Fetch current user data from your backend
  try {
    const user = await getCurrentUser();
    localStorage.setItem('user', JSON.stringify(user));
    return { token: token || 'cookie-based', user };
  } catch (error) {
    throw new Error('Failed to authenticate with GitHub');
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('auth_token');
  
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` }),
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies for session-based auth
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  const data = await response.json();
  return data.user;
};

export const logout = async () => {
  const token = localStorage.getItem('auth_token');
  
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const logoutAll = async () => {
  const token = localStorage.getItem('auth_token');
  
  try {
    await fetch(`${API_URL}/auth/logout/all`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  } catch (error) {
    console.error('Logout all error:', error);
  }
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token') || !!localStorage.getItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
