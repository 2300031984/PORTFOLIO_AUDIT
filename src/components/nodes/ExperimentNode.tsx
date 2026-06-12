import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Compass } from "lucide-react";

interface ExperimentNodeData {
  title: string;
  researchQuestion: string;
  progress: string;
  challenges: string;
  futureDirection: string;
}

export default function ExperimentNode({ data }: { data: ExperimentNodeData }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />

      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsClicked(!isClicked);
        }}
        className={`p-4 rounded-xl border transition-all duration-300 hover:border-accent hover:scale-101 select-none node-theme-experiment ${
          isClicked
            ? "w-80 border-accent ring-1 ring-accent/30 shadow-[0_0_12px_var(--color-accent-glow)]"
            : "w-48 border-border-ink animate-pulse-glow"
        }`}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <Compass className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-[9px] font-mono tracking-widest text-ink-muted uppercase">Active Research Lab</span>
        </div>

        <h3 className="font-serif text-base font-semibold text-ink leading-tight">
          {data.title}
        </h3>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isClicked ? "max-h-[300px] mt-3 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border-ink/50 pt-2.5 space-y-2.5 text-[11px] font-sans text-ink leading-relaxed">
            <div>
              <span className="text-[9px] font-mono text-accent uppercase block leading-none mb-0.5">Research Question</span>
              <p className="font-serif italic text-xs text-ink">&quot;{data.researchQuestion}&quot;</p>
            </div>
            
            <div>
              <span className="text-[9px] font-mono text-ink-muted uppercase block leading-none mb-0.5">Current Progress</span>
              <p className="text-[10px] text-ink-muted">{data.progress}</p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-ink-muted uppercase block leading-none mb-0.5">Challenges</span>
              <p className="text-[10px] text-ink-muted">{data.challenges}</p>
            </div>

            <div>
              <span className="text-[9px] font-mono text-ink-muted uppercase block leading-none mb-0.5">Future Direction</span>
              <p className="text-[10px] text-ink-muted">{data.futureDirection}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-ink-muted">
          <span>{isClicked ? "Click to fold" : "Click to view dossier"}</span>
          <div className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-accent ${isClicked ? "opacity-0" : ""}`}></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
