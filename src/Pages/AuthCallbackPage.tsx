import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGitHubCallback } from '../lib/auth';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Your backend redirects here after successful GitHub OAuth
    handleGitHubCallback()
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Authentication error:', err);
        setError(err.message || 'Failed to authenticate');
        setTimeout(() => navigate('/'), 3000);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="space-y-4">
            <div className="text-red-500 text-xl">⚠️</div>
            <h2 className="text-xl font-semibold text-white">Authentication Failed</h2>
            <p className="text-gray-400">{error}</p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <h2 className="text-xl font-semibold text-white">Authenticating...</h2>
            <p className="text-gray-400">Please wait while we sign you in</p>
          </div>
        )}
      </div>
    </div>
  );
}
