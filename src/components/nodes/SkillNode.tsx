import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Layers } from "lucide-react";

interface SkillNodeData {
  title: string;
  items: string[];
  isHighlighted: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}

export default function SkillNode({ data }: { data: SkillNodeData }) {
  const borderClass = data.isHighlighted
    ? "border-accent ring-2 ring-accent/30 shadow-[0_0_15px_var(--color-accent-glow)] scale-102"
    : "border-border-ink hover:border-accent hover:scale-101";

  const opacityClass = data.isDimmed ? "opacity-30 scale-98 pointer-events-none" : "opacity-100";

  return (
    <div className={`transition-all duration-500 ease-out ${opacityClass}`}>
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          data.onSelect();
        }}
        className={`w-64 p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 node-theme-skill ${borderClass}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Layers className={`w-4 h-4 ${data.isHighlighted ? "text-accent" : "text-ink-muted"}`} />
          <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase">Skill Cluster</span>
        </div>

        <h3 className="font-serif text-lg font-semibold text-ink leading-tight mb-2 select-none">
          {data.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {data.items.map((item, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors duration-300 ${
                data.isHighlighted
                  ? "bg-accent/5 border-accent/20 text-accent"
                  : "bg-paper border-border-ink text-ink-muted"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-3.5 flex items-center justify-between border-t border-border-ink/50 pt-2 text-[9px] font-mono text-ink-muted">
          <span>{data.isHighlighted ? "Click to clear filter" : "Click to view application"}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${data.isHighlighted ? "bg-accent animate-pulse" : "bg-ink/20"}`} />
        </div>
      </div>
    </div>
  );
}
