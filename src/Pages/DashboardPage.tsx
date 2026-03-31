import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Header } from '../components/Layout/Header';
import { DeploymentTable } from '../components/ui/DeploymentTable';
import { FolderGit2, Rocket, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { StatCard } from '../components/ui/StatCard';

const stats = [
  { title: 'Total Projects', value: 12, icon: FolderGit2, trend: { value: 8, isPositive: true } },
  { title: 'Active Deployments', value: 47, icon: Rocket, trend: { value: 12, isPositive: true } },
  { title: 'Success Rate', value: '98.5%', icon: CheckCircle2 },
  { title: 'Failed Builds', value: 3, icon: AlertCircle, trend: { value: 2, isPositive: false } },
];

const recentDeployments = [
  {
    id: '1',
    projectName: 'my-nextjs-app',
    commitHash: 'a1b2c3d',
    branch: 'main',
    status: 'success' as const,
    duration: '45s',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    projectName: 'api-backend',
    commitHash: 'e4f5g6h',
    branch: 'main',
    status: 'building' as const,
    duration: '1m 23s',
    timestamp: '5 minutes ago',
  },
  {
    id: '3',
    projectName: 'dashboard-ui',
    commitHash: 'i7j8k9l',
    branch: 'feature/auth',
    status: 'success' as const,
    duration: '52s',
    timestamp: '15 minutes ago',
  },
  {
    id: '4',
    projectName: 'mobile-api',
    commitHash: 'm0n1o2p',
    branch: 'develop',
    status: 'failed' as const,
    duration: '28s',
    timestamp: '1 hour ago',
  },
  {
    id: '5',
    projectName: 'marketing-site',
    commitHash: 'q3r4s5t',
    branch: 'main',
    status: 'success' as const,
    duration: '38s',
    timestamp: '2 hours ago',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your deployments."
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Recent Deployments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Deployments</h2>
            <Link to="/deployments">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                View all
              </Button>
            </Link>
          </div>
          <DeploymentTable deployments={recentDeployments} />
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/projects/new">
              <Button className='bg-[#06f8d8] p-5'>
                <FolderGit2 className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
            <Button variant="outline" className='text-white hover:bg-[#06f8d8] hover:text-black p-5'>
              <Rocket className="w-4 h-4 mr-2" />
              Deploy from Git
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
