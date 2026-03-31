import { cn } from '../../lib/utils';
import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react';

export type DeploymentStatus = 'success' | 'building' | 'failed' | 'queued';

interface StatusBadgeProps {
  status: DeploymentStatus;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  success: {
    label: 'Success',
    icon: CheckCircle2,
    className: 'status-success',
  },
  building: {
    label: 'Building',
    icon: Loader2,
    className: 'status-warning',
    iconClassName: 'animate-spin',
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    className: 'status-error',
  },
  queued: {
    label: 'Queued',
    icon: Clock,
    className: 'bg-[#120e5f]/50 text-white/60 border border-[#120e5f]',
  },
};

export function StatusBadge({ status, showIcon = true, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      {showIcon && (
        <Icon className={cn("w-3.5 h-3.5", 'iconClassName' in config && config.iconClassName)} />
      )}
      {config.label}
    </span>
  );
}
