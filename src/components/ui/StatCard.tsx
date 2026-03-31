import {type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon; // Replace with actual icon type
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-[#0d0c2b]/80 backdrop-blur-xl border border-[#120e5f] rounded-lg    p-6 transition-all duration-200 hover:border-[#06f8d8]/30",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/60 mb-1">{title}</p>
          <p className="text-3xl font-semibold text-white">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last week
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-[#06f8d8]/10">
          <Icon className="w-5 h-5 text-[#06f8d8]" />
        </div>
      </div>
    </div>
  );
}
