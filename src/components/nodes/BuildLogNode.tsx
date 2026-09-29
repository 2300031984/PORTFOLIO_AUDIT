import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Calendar, ChevronRight } from "lucide-react";

interface BuildLogNodeData {
  year: string;
  summary: string;
  itemCount: number;
  onClickYear?: () => void;
}

export default function BuildLogNode({ data }: { data: BuildLogNodeData }) {
  return (
    <div className="relative hover:scale-102 transition-transform duration-300">
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          if (data.onClickYear) data.onClickYear();
        }}
        className="w-56 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 shadow-sm node-theme-career border-border-ink hover:border-accent"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span className="text-[9px] font-mono tracking-widest text-ink-muted uppercase font-bold">
              Build Log Milestone
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-accent px-2 py-0.5 rounded border border-accent/30 bg-[#181816]/80">
            {data.year}
          </span>
        </div>

        <h3 className="font-serif text-sm font-bold text-ink leading-tight mb-1 select-none">
          {data.year} Works &amp; Milestones
        </h3>

        <p className="font-sans text-[11px] text-ink-muted leading-snug line-clamp-2">
          {data.summary}
        </p>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-border-ink/40 text-[9px] font-mono text-accent">
          <span>{data.itemCount} Key Projects &amp; Audits</span>
          <ChevronRight className="w-3 h-3 text-accent" />
        </div>
      </div>
    </div>
  );
}
