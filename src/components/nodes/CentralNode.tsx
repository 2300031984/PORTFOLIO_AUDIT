import React from "react";
import { Handle, Position } from "@xyflow/react";

interface CentralNodeData {
  name: string;
  title: string;
  subTitle: string;
  label: string;
  isUnlocked: boolean;
  onUnlock: () => void;
}

export default function CentralNode({ data }: { data: CentralNodeData }) {
  return (
    <div className="relative font-sans text-center">
      {/* Invisible multi-directional handles for organic edge attachments */}
      <Handle type="source" position={Position.Top} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />

      <div className="flex flex-col items-center">
        {/* Subtle decorative serif element */}
        <span className="text-accent font-serif italic text-lg md:text-xl mb-1 select-none">
          The Memory Map
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-ink select-none mb-3">
          {data.name}
        </h1>
        
        <div className="text-ink-muted font-serif italic text-sm md:text-base max-w-md mb-6 select-none leading-relaxed space-y-1 opacity-95">
          <p>&quot;Every system leaves traces.&quot;</p>
          <p>&quot;Every trace tells a story.&quot;</p>
          <p>&quot;My work begins where patterns emerge.&quot;</p>
        </div>

        {!data.isUnlocked ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onUnlock();
            }}
            className="group relative px-6 py-2.5 bg-paper-node border border-ink text-ink font-serif italic text-sm tracking-wide rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:bg-ink hover:text-paper shadow-sm animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              Begin Journey
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>
        ) : (
          <div className="h-10 text-xs font-mono text-accent italic tracking-wider flex items-center justify-center animate-text-fade">
            Constellation Active
          </div>
        )}
      </div>
    </div>
  );
}
