import React from "react";
import { Handle, Position } from "@xyflow/react";
import { FolderGit2 } from "lucide-react";

interface ProjectNodeData {
  title: string;
  tagline: string;
  isExpanded: boolean;
  isActive: boolean;
  isDimmed: boolean;
  onToggleExpand: () => void;
}

export default function ProjectNode({ data }: { data: ProjectNodeData }) {
  const borderClass = data.isExpanded
    ? "border-accent ring-1 ring-accent/30 shadow-[0_0_15px_var(--color-accent-glow)] scale-105"
    : data.isActive
    ? "border-accent ring-2 ring-accent/20 scale-105"
    : "border-border-ink hover:border-accent hover:scale-102";

  const opacityClass = data.isDimmed ? "opacity-25 scale-95 pointer-events-none" : "opacity-100";

  return (
    <div className={`transition-all duration-500 ease-out ${opacityClass}`}>
      {/* Target/Source handles set to transparent so edges anchor organically */}
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          data.onToggleExpand();
        }}
        className={`w-52 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 node-theme-project ${borderClass}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <FolderGit2 className={`w-4 h-4 ${data.isExpanded || data.isActive ? "text-accent" : "text-ink-muted"}`} />
          <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase">Project Hub</span>
        </div>

        <h3 className="font-serif text-lg font-medium leading-tight text-ink select-none mb-1">
          {data.title}
        </h3>

        <p className="font-sans text-[11px] text-ink-muted leading-snug">
          {data.tagline}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] font-mono text-accent italic">
            {data.isExpanded ? "Click to close map" : "Click to explore journey"}
          </span>
          <div className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${data.isExpanded ? "bg-accent" : "bg-transparent"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${data.isExpanded ? "bg-accent" : "bg-ink/30"}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
