import { GitBranch, ExternalLink, Clock } from 'lucide-react';
import type { DeploymentStatus } from './StatusBadge.tsx';
import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table.tsx';


interface Deployment {
  id: string;
  projectName: string;
  commitHash: string;
  branch: string;
  status: DeploymentStatus;
  duration: string;
  timestamp: string;
}

interface DeploymentTableProps {
  deployments: Deployment[];
  showProject?: boolean;
}

export function DeploymentTable({ deployments, showProject = true }: DeploymentTableProps) {
  return (
    <div className="bg-[#0d0c2b]/80 backdrop-blur-xl border border-[#120e5f] rounded-lg    overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            {showProject && <TableHead className="text-white/60">Project</TableHead>}
            <TableHead className="text-white/60">Commit</TableHead>
            <TableHead className="text-white/60">Branch</TableHead>
            <TableHead className="text-white/60">Status</TableHead>
            <TableHead className="text-white/60">Duration</TableHead>
            <TableHead className="text-white/60">Deployed</TableHead>
            <TableHead className="text-white/60 w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((deployment) => (
            <TableRow 
              key={deployment.id} 
              className="border hover:bg-[#120e5f]/50 cursor-pointer transition-colors"
            >
              {showProject && (
                <TableCell className="font-medium text-white">
                  {deployment.projectName}
                </TableCell>
              )}
              <TableCell>
                <code className="font-mono text-sm text-white/60 bg-[#120e5f] px-2 py-0.5 rounded">
                  {deployment.commitHash}
                </code>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-white/60">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span className="font-mono text-sm">{deployment.branch}</span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={deployment.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{deployment.duration}</span>
                </div>
              </TableCell>
              <TableCell className="text-white/60 text-sm">
                {deployment.timestamp}
              </TableCell>
              <TableCell>
                <Link 
                  to={`/deployments/${deployment.id}`}
                  className="text-white/60 hover:text-[#06f8d8] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
