import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Header } from '../components/Layout/Header';
import { DeploymentTable } from '../components/ui/DeploymentTable';
import { Input } from '../components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const allDeployments = [
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
  {
    id: '6',
    projectName: 'auth-service',
    commitHash: 'u6v7w8x',
    branch: 'main',
    status: 'success' as const,
    duration: '55s',
    timestamp: '3 hours ago',
  },
  {
    id: '7',
    projectName: 'my-nextjs-app',
    commitHash: 'y9z0a1b',
    branch: 'staging',
    status: 'queued' as const,
    duration: '-',
    timestamp: '3 hours ago',
  },
  {
    id: '8',
    projectName: 'api-backend',
    commitHash: 'c2d3e4f',
    branch: 'main',
    status: 'success' as const,
    duration: '1m 12s',
    timestamp: '5 hours ago',
  },
];

export default function DeploymentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDeployments = allDeployments.filter((deployment) => {
    const matchesSearch = deployment.projectName.toLowerCase().includes(search.toLowerCase()) ||
      deployment.commitHash.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deployment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <Header 
        title="Deployments" 
        subtitle="View and manage all your deployments"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
              <Input
                placeholder="Search deployments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-5 pl-9 w-full sm:w-64 bg-[#121846] border placeholder:text-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-[#121846] border p-5 text-white">
                <Filter className="w-4 h-4 mr-2 text-white/60" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#121846] border text-white mt-10">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="building">Building</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Deployments Table */}
        <DeploymentTable deployments={filteredDeployments} />

        {filteredDeployments.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-white/60">No deployments found matching your criteria.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
