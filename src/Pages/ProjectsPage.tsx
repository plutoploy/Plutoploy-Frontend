import { useState } from 'react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Header } from '../components/Layout/Header';
import { ProjectCard } from '../components/ui/ProjectCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const projects = [
  {
    id: '1',
    name: 'my-nextjs-app',
    repo: 'acme/my-nextjs-app',
    type: 'frontend' as const,
    status: 'success' as const,
    lastDeployed: '2 minutes ago',
    url: 'my-nextjs-app.deployhub.dev',
  },
  {
    id: '2',
    name: 'api-backend',
    repo: 'acme/api-backend',
    type: 'backend' as const,
    status: 'building' as const,
    lastDeployed: '5 minutes ago',
    url: 'api.deployhub.dev',
  },
  {
    id: '3',
    name: 'dashboard-ui',
    repo: 'acme/dashboard-ui',
    type: 'frontend' as const,
    status: 'success' as const,
    lastDeployed: '1 hour ago',
    url: 'dashboard.deployhub.dev',
  },
  {
    id: '4',
    name: 'mobile-api',
    repo: 'acme/mobile-api',
    type: 'backend' as const,
    status: 'failed' as const,
    lastDeployed: '2 hours ago',
  },
  {
    id: '5',
    name: 'marketing-site',
    repo: 'acme/marketing-site',
    type: 'frontend' as const,
    status: 'success' as const,
    lastDeployed: '3 hours ago',
    url: 'marketing.deployhub.dev',
  },
  {
    id: '6',
    name: 'auth-service',
    repo: 'acme/auth-service',
    type: 'backend' as const,
    status: 'success' as const,
    lastDeployed: '5 hours ago',
    url: 'auth.deployhub.dev',
  },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.repo.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || project.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <Header 
        title="Projects" 
        subtitle={`${projects.length} projects deployed`}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-5 pl-9 w-full sm:w-64 bg-[#06051b] border-[#120e5f] text-white focus:ring-0 focus:border-[#06f8d8]"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-[#0d0c2b]/80 border-border">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link to="/projects/new">
            <Button className='bg-[#06f8d8] p-5'>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
            <Link to="/projects/new">
              <Button>Create your first project</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
