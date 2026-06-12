import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Briefcase, GraduationCap } from "lucide-react";

interface CareerNodeData {
  type: "experience" | "education";
  title: string;
  subTitle: string;
  duration: string;
  onClick: () => void;
}

export default function CareerNode({ data }: { data: CareerNodeData }) {
  const Icon = data.type === "experience" ? Briefcase : GraduationCap;
  const typeLabel = data.type === "experience" ? "Professional Records" : "Academic Records";

  return (
    <div className="relative hover:scale-102 transition-transform duration-300">
      <Handle type="target" position={Position.Right} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Top} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          data.onClick();
        }}
        className="w-56 p-4 rounded-xl border text-left cursor-pointer hover:border-accent transition-all duration-300 shadow-sm node-theme-career"
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Icon className="w-3.5 h-3.5 text-accent" />
          <span className="text-[9px] font-mono tracking-widest text-ink-muted uppercase">{typeLabel}</span>
        </div>

        <h3 className="font-serif text-sm font-semibold text-ink leading-tight mb-0.5 select-none">
          {data.title}
        </h3>
        
        <p className="font-sans text-[11px] text-ink leading-snug">
          {data.subTitle}
        </p>

        <span className="text-[9px] font-mono text-ink-muted block mt-2">
          {data.duration}
        </span>
      </div>
    </div>
  );
}
