import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Header } from '../components/Layout/Header';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DeploymentTable } from '../components/ui/DeploymentTable';
import { TerminalLogViewer } from '../components/ui/TerminalLogViewer';
import { EnvVariablesEditor } from '../components/ui/EnvVariablesEditor';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Rocket, 
  GitBranch, 
  ExternalLink, 
  Settings, 
  RefreshCw,
  Globe,
  Clock,
  Link as LinkIcon
} from 'lucide-react';

const projectData = {
  id: '1',
  name: 'my-nextjs-app',
  repo: 'acme/my-nextjs-app',
  type: 'frontend',
  status: 'success' as const,
  url: 'https://my-nextjs-app.deployhub.dev',
  branch: 'main',
  lastDeployed: '2 minutes ago',
  framework: 'Next.js',
};

const deployments = [
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
    projectName: 'my-nextjs-app',
    commitHash: 'e4f5g6h',
    branch: 'main',
    status: 'success' as const,
    duration: '52s',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    projectName: 'my-nextjs-app',
    commitHash: 'i7j8k9l',
    branch: 'feature/auth',
    status: 'failed' as const,
    duration: '28s',
    timestamp: '3 hours ago',
  },
  {
    id: '4',
    projectName: 'my-nextjs-app',
    commitHash: 'm0n1o2p',
    branch: 'main',
    status: 'success' as const,
    duration: '48s',
    timestamp: '1 day ago',
  },
];

const sampleLogs = [
  { timestamp: '12:34:01', message: 'Cloning repository...', type: 'info' as const },
  { timestamp: '12:34:02', message: 'Installing dependencies...', type: 'info' as const },
  { timestamp: '12:34:15', message: 'npm WARN deprecated some-package@1.0.0', type: 'warning' as const },
  { timestamp: '12:34:18', message: 'Running build command: npm run build', type: 'info' as const },
  { timestamp: '12:34:25', message: '> next build', type: 'info' as const },
  { timestamp: '12:34:26', message: 'Creating an optimized production build...', type: 'info' as const },
  { timestamp: '12:34:45', message: 'Compiled successfully', type: 'success' as const },
  { timestamp: '12:34:46', message: 'Linting and type checking...', type: 'info' as const },
  { timestamp: '12:34:52', message: 'Deploying to edge network...', type: 'info' as const },
  { timestamp: '12:34:58', message: 'Deployment complete!', type: 'success' as const },
];

const envVariables = [
  { id: '1', key: 'DATABASE_URL', value: 'postgresql://...', isSecret: true },
  { id: '2', key: 'NEXT_PUBLIC_API_URL', value: 'https://api.example.com', isSecret: false },
  { id: '3', key: 'JWT_SECRET', value: 'super-secret-key', isSecret: true },
];

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('deployments');

  return (
    <DashboardLayout>
      <Header title={projectData.name} />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Project Header Card */}
        <div className="glass-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#06f8d8]/10">
                <Globe className="w-6 h-6 text-[#06f8d8]" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold text-foreground">{projectData.name}</h2>
                  <StatusBadge status={projectData.status} />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-4 h-4" />
                    {projectData.repo}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {projectData.lastDeployed}
                  </span>
                  <a 
                    href={projectData.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {projectData.url.replace('https://', '')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className='"border-white/10 text-white hover:border-[#06f8d8]/50 hover:bg-[#06f8d8] hover:text-black p-5 mt-4'>
                <RefreshCw className="w-4 h-4 mr-2" />
                Redeploy
              </Button>
              <Button className="flex-1 w-full mt-4 p-5 bg-[#06f8d8] text-background hover:bg-[#06f8d8]/80 font-medium cursor-pointer">
                <Rocket className="w-4 h-4 mr-2" />
                Deploy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#242c6f] border border-border">
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="deployments" className="mt-6">
            <DeploymentTable deployments={deployments} showProject={false} />
          </TabsContent>

          <TabsContent value="logs" className="mt-6">
            <TerminalLogViewer logs={sampleLogs} status="success" />
          </TabsContent>

          <TabsContent value="environment" className="mt-6">
            <EnvVariablesEditor variables={envVariables} />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="glass-card p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground">Project Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Framework</p>
                    <p className="text-sm text-muted-foreground">Auto-detected framework</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary rounded-md font-mono text-sm">
                    {projectData.framework}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">Production Branch</p>
                    <p className="text-sm text-muted-foreground">Branch used for production deployments</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary rounded-md font-mono text-sm">
                    {projectData.branch}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-destructive/20">
                  <div>
                    <p className="font-medium text-destructive">Delete Project</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete this project and all deployments
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
