import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Code, Cpu, ShieldCheck, Cloud, History, Compass, Award } from "lucide-react";

interface CategoryBranchNodeData {
  title: string;
  category: "software" | "ai" | "security" | "cloud" | "buildlog" | "experiments" | "proof";
  subtext: string;
  count?: number;
  isSelected?: boolean;
  onSelect: () => void;
}

export default function CategoryBranchNode({ data }: { data: CategoryBranchNodeData }) {
  const getIcon = () => {
    switch (data.category) {
      case "software": return Code;
      case "ai": return Cpu;
      case "security": return ShieldCheck;
      case "cloud": return Cloud;
      case "buildlog": return History;
      case "experiments": return Compass;
      case "proof": return Award;
      default: return Code;
    }
  };

  const getDomainColors = () => {
    return {
      text: "text-accent",
      selectedBorder: "border-accent ring-2 ring-accent/30 shadow-[0_0_15px_var(--color-accent-glow)]",
      hoverBorder: "hover:border-accent"
    };
  };

  const Icon = getIcon();
  const domainColors = getDomainColors();

  const borderClass = data.isSelected
    ? `${domainColors.selectedBorder} scale-105`
    : `border-border-ink ${domainColors.hoverBorder} hover:scale-102`;

  return (
    <div className="relative group transition-all duration-300">
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          data.onSelect();
        }}
        className={`w-52 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 bg-paper-node/95 backdrop-blur-md shadow-sm ${borderClass}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Icon className={`w-4 h-4 ${data.isSelected ? domainColors.text : "text-ink"}`} />
            <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase font-bold">
              Branch Node
            </span>
          </div>
          {data.count !== undefined && (
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper text-ink font-semibold border ${domainColors.text}`}>
              {data.count}
            </span>
          )}
        </div>

        <h3 className="font-serif text-base font-bold text-ink leading-tight mb-1 select-none">
          {data.title}
        </h3>

        <p className="font-sans text-[11px] text-ink-muted leading-snug">
          {data.subtext}
        </p>

        <div className={`mt-2.5 flex items-center justify-between pt-1.5 border-t border-border-ink/40 text-[9px] font-mono ${domainColors.text}`}>
          <span>{data.isSelected ? "Active Focus" : "Click to Explore"}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${data.isSelected ? `bg-current animate-ping` : "bg-ink/30"}`} />
        </div>
      </div>
    </div>
  );
}
