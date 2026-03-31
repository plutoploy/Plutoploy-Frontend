import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Rocket, 
  KeyRound, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';


const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FolderGit2, label: 'Projects', path: '/projects' },
  { icon: Rocket, label: 'Deployments', path: '/deployments' },
  { icon: KeyRound, label: 'Environment', path: '/environment' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed top-0 left-0 z-40 flex flex-col h-screen bg-[#070527] border-r border-[#2e303a] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-[#2e303a]">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#06f8d8] flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <span className="font-semibold text-white">DeployHub</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/60 hover:text-white"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 text-white/80">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-white/60 transition-all duration-200 hover:bg-blue-950 hover:text-white",
                isActive && "bg-blue-950 text-white border-l-2 border-[#06f8d8]"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-[#2e303a]">
        <button className="nav-item w-full justify-start text-white/60 hover:bg-blue-950 hover:text-white rounded-lg flex items-center gap-3 px-3 py-2">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
