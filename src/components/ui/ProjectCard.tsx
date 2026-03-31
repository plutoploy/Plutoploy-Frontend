import { GitBranch, Globe, Server, Clock, ExternalLink } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { DeploymentStatus } from './StatusBadge.tsx';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  name: string;
  repo: string;
  type: 'frontend' | 'backend';
  status: DeploymentStatus;
  lastDeployed: string;
  url?: string;
}

export function ProjectCard({ id, name, repo, type, status, lastDeployed, url }: ProjectCardProps) {
  return (
    <Link 
      to={`/projects/${id}`}
      className="bg-[#0d0c2b]/80 backdrop-blur-xl border border-[#120e5f] rounded-lg  p-5 block transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            type === 'frontend' ? "bg-primary/10" : "bg-purple-500/10"
          )}>
            {type === 'frontend' ? (
              <Globe className={cn("w-5 h-5", type === 'frontend' ? "text-primary" : "text-purple-400")} />
            ) : (
              <Server className="w-5 h-5 text-purple-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <GitBranch className="w-3.5 h-3.5" />
              <span>{repo}</span>
            </div>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{lastDeployed}</span>
        </div>
        {url && (
          <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-mono">{url}</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        )}
      </div>
    </Link>
  );
}
