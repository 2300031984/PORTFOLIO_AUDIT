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
    <div className="relative font-sans text-center max-w-lg mx-auto">
      {/* Multi-directional handles for organic edge attachments */}
      <Handle type="source" position={Position.Top} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />
      <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />

      <div className="flex flex-col items-center">
        {/* Subtle decorative serif header */}
        <span className="text-accent font-serif italic text-base md:text-lg mb-1 select-none tracking-wide">
          The Interactive Mind Map & System Dossier
        </span>
        
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-ink select-none mb-2">
          {data.name}
        </h1>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full border border-border-ink bg-paper-node/80 text-accent font-semibold tracking-wider uppercase">
            {data.title}
          </span>
        </div>
        
        <div className="text-ink-muted font-serif italic text-xs md:text-sm max-w-md mb-5 select-none leading-relaxed space-y-1 opacity-95">
          <p>&quot;Every system leaves traces. Every trace tells a story.&quot;</p>
          <p>&quot;A map of the systems I&apos;ve built, studied, secured, and explored.&quot;</p>
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
              Explore Technical Map
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>
        ) : (
          <div className="h-8 text-xs font-mono text-accent italic tracking-wider flex items-center justify-center gap-2 animate-text-fade">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Constellation Matrix Active</span>
          </div>
        )}
      </div>
    </div>
  );
}
