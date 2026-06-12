"use client";
import React from "react";
import { useReactFlow } from "@xyflow/react";
import { Plus, Minus, Focus } from "lucide-react";

export default function GraphControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="flex flex-col gap-1 border border-border-ink bg-paper-node p-1.5 rounded-xl shadow-sm">
      <button
        onClick={() => zoomIn({ duration: 400 })}
        className="p-2 text-ink hover:text-accent hover:bg-paper rounded-lg transition-colors duration-200 cursor-pointer flex items-center justify-center"
        title="Zoom In"
        aria-label="Zoom in map"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={() => zoomOut({ duration: 400 })}
        className="p-2 text-ink hover:text-accent hover:bg-paper rounded-lg transition-colors duration-200 cursor-pointer flex items-center justify-center"
        title="Zoom Out"
        aria-label="Zoom out map"
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        onClick={() => fitView({ duration: 600, padding: 0.15 })}
        className="p-2 text-ink hover:text-accent hover:bg-paper rounded-lg transition-colors duration-200 cursor-pointer flex items-center justify-center"
        title="Recenter Map"
        aria-label="Fit view of map"
      >
        <Focus className="w-4 h-4" />
      </button>
    </div>
  );
}
