import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, Copy, Download } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';

interface LogLine {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface TerminalLogViewerProps {
  logs: LogLine[];
  isStreaming?: boolean;
  status?: 'success' | 'failed' | 'building';
}

export function TerminalLogViewer({ logs, isStreaming = false, status }: TerminalLogViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleCopy = () => {
    const text = logs.map(l => `${l.timestamp} ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  const getLineColor = (type: LogLine['type']) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <span className="text-sm text-muted-foreground font-mono">Build Logs</span>
          {isStreaming && (
            <span className="flex items-center gap-1.5 text-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Streaming...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy} className="text-muted-foreground hover:text-foreground">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Log Content */}
      <div 
        ref={containerRef}
        className="terminal max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
          setAutoScroll(isAtBottom);
        }}
      >
        {logs.map((log, index) => (
          <div key={index} className="flex gap-4 py-0.5 hover:bg-secondary/30 px-2 -mx-2 rounded">
            <span className="text-muted-foreground/50 select-none shrink-0 w-20">
              {log.timestamp}
            </span>
            <span className={cn("break-all", getLineColor(log.type))}>
              {log.message}
            </span>
          </div>
        ))}
        {isStreaming && (
          <div className="flex items-center gap-2 py-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Waiting for logs...</span>
          </div>
        )}
      </div>

      {/* Status Footer */}
      {status && (
        <div className={cn(
          "px-4 py-3 border-t border-border flex items-center gap-2",
          status === 'success' && "bg-success/5",
          status === 'failed' && "bg-destructive/5"
        )}>
          {status === 'success' && (
            <>
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-success font-medium">Build completed successfully</span>
            </>
          )}
          {status === 'failed' && (
            <>
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-destructive font-medium">Build failed</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
