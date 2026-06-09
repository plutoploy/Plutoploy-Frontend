import { useState } from 'react';
import { Rocket, Zap, Shield, Globe, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { initiateGitHubLogin } from '../lib/auth';
// import { Link } from 'react-router-dom';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    initiateGitHubLogin();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 bg-linear-to-br from-[#051739] via-[#020628] to-[#043fac] via-80% to-120% relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
        <div className="w-10 h-10 rounded-xl bg-[#06f8d8] flex items-center justify-center">
          <Rocket className="w-5 h-5" />
        </div>
        <span className="text-xl font-semibold text-white">Plutoploy</span>
          </div>

          <div className="max-w-md">
        <h1 className="text-4xl font-bold text-white mb-6">
          Deploy your apps with
          <span className="bg-linear-to-r from-[#06f8d8] to-[#02b69e] bg-clip-text text-transparent"> confidence</span>
        </h1>
        <p className="text-lg text-white/60 mb-8">
          Push code, deploy instantly. The developer platform for modern web applications.
        </p>

        <div className="space-y-4">
          {[
            { icon: Zap, text: 'Instant deployments from Git' },
            { icon: Globe, text: 'Global edge network' },
            { icon: Shield, text: 'Secure by default' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-white/60">
          <div className="p-2 rounded-lg bg-[#06f8d8]/30">
            <feature.icon className="w-4 h-4 text-[#06f8d8]" />
          </div>
          <span>{feature.text}</span>
            </div>
          ))}
        </div>
          </div>
        </div>

        <p className="text-sm text-white/50 relative">
          Trusted by 100,000+ developers worldwide
        </p>
      </div>

      {/* Right Panel - Auth */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#020a19]">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">DeployHub</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Sign in to continue to your dashboard</p>
          </div>

          <div className="space-y-4">
            {/* <Link to="/dashboard"> */}
              <Button 
                onClick={handleGitHubLogin}
                disabled={isLoading}
                className="w-full h-12 bg-white text-background hover:bg-white/70 font-medium cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <FaGithub className="w-5 h-5 mr-2" />
                )}
                Continue with GitHub
              </Button>
            {/* </Link> */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white" />
              </div>
              <div className="relative z-10 flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-12 text-white bg-gray-800 hover:bg-gray-600 cursor-pointer" >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <p className="text-xs text-center text-white/50 mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-cyan-500 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-cyan-500 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
