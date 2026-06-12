import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Github, GitCommit, Code2, CalendarRange, Layers } from "lucide-react";

interface GithubNodeData {
  commits: string;
  repos: string;
  primaryTech: string;
  contributions: string;
}

export default function GithubNode({ data }: { data: GithubNodeData }) {
  return (
    <div className="relative hover:scale-102 transition-transform duration-300">
      <Handle type="target" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />

      <div className="w-64 p-5 rounded-2xl border text-left node-theme-github shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-2.5 mb-4">
          <Github className="w-5 h-5 text-ink" />
          <span className="text-xs font-mono tracking-widest text-ink-muted uppercase font-bold">GitHub Telemetry</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <GitCommit className="w-4 h-4 text-accent" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-ink-muted uppercase leading-none font-semibold">Year Activity</span>
              <span className="text-sm font-serif font-bold text-ink mt-0.5">{data.commits}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-ink-muted" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-ink-muted uppercase leading-none font-semibold">Repositories</span>
              <span className="text-sm font-serif font-bold text-ink mt-0.5">{data.repos} Repos</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Code2 className="w-4 h-4 text-ink-muted" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-ink-muted uppercase leading-none font-semibold">Core Language</span>
              <span className="text-sm font-serif font-bold text-ink mt-0.5">{data.primaryTech}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <CalendarRange className="w-4 h-4 text-accent" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-ink-muted uppercase leading-none font-semibold">Activity Stream</span>
              <span className="text-sm font-serif font-bold text-ink mt-0.5">{data.contributions}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-border-ink/40 pt-2.5 text-center">
          <span className="text-[9px] font-mono text-accent uppercase tracking-wider font-bold animate-pulse">Live Sync Active</span>
        </div>
      </div>
    </div>
  );
}
