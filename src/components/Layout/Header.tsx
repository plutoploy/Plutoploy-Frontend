import { Bell, Search, User, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { getUser, logout } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';


interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const user = getUser();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className=" flex items-center justify-between h-16 px-6 border-b border-white/20 bg-background/50 backdrop-blur-xl sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <Input
            placeholder="Search projects..."
            className="pl-9 w-64 bg-[#0f0c43] border-none focus:ring-0 text-sm text-white/80"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#06f8d8] rounded-full" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
              <div className="w-8 h-8 rounded-full bg-[#0f0c43] flex items-center justify-center overflow-hidden">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt={user.login} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 text-white bg-[#0d0c2b] border-[#2e303a] shadow-lg">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || user?.login || 'My Account'}</span>
                {user?.email && <span className="text-xs text-white/50">{user.email}</span>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#2e303a]" />
            <DropdownMenuItem className="focus:bg-blue-950 focus:text-white cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-blue-950 focus:text-white cursor-pointer">Billing</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-blue-950 focus:text-white cursor-pointer">Team</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#2e303a]" />
            <DropdownMenuItem 
              onClick={handleSignout}
              className="text-red-400 focus:bg-red-950 focus:text-red-300 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
