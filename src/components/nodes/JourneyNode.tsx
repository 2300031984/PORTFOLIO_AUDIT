import React from "react";
import { Handle, Position } from "@xyflow/react";
import { HelpCircle, BookOpen, FlaskConical, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface JourneyNodeData {
  stage: "question" | "learning" | "experiment" | "challenge" | "solution" | "impact";
  content: string;
  projectTitle: string;
}

export default function JourneyNode({ data }: { data: JourneyNodeData }) {
  // Select icon and label based on stage
  let Icon = HelpCircle;
  let stageLabel = "";
  let accentBorder = "border-border-ink";
  let iconColor = "text-ink-muted";

  switch (data.stage) {
    case "question":
      Icon = HelpCircle;
      stageLabel = "01 // THE QUESTION";
      accentBorder = "border-ink border-dashed";
      iconColor = "text-ink";
      break;
    case "learning":
      Icon = BookOpen;
      stageLabel = "02 // THE ACQUISITION";
      accentBorder = "border-border-ink";
      iconColor = "text-accent";
      break;
    case "experiment":
      Icon = FlaskConical;
      stageLabel = "03 // THE PROTOTYPE";
      accentBorder = "border-border-ink";
      iconColor = "text-ink";
      break;
    case "challenge":
      Icon = AlertTriangle;
      stageLabel = "04 // THE ROADBLOCK";
      accentBorder = "border-accent/40";
      iconColor = "text-accent";
      break;
    case "solution":
      Icon = Lightbulb;
      stageLabel = "05 // THE BREAKTHROUGH";
      accentBorder = "border-ink";
      iconColor = "text-ink";
      break;
    case "impact":
      Icon = CheckCircle2;
      stageLabel = "06 // THE RESOLUTION";
      accentBorder = "border-accent shadow-sm";
      iconColor = "text-accent";
      break;
  }

  const handleImpactClick = () => {
    if (data.stage === "impact") {
      // Trigger a confetti burst centered on the click
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#b94a24", "#181816", "#e7e3d4"],
      });
    }
  };

  return (
    <div className="relative group max-w-xs animate-text-fade">
      <Handle type="target" position={Position.Left} className="opacity-0 pointer-events-none" />
      <Handle type="source" position={Position.Right} className="opacity-0 pointer-events-none" />

      <div
        onClick={handleImpactClick}
        className={`p-4 rounded-xl bg-paper-node border min-w-[220px] transition-all duration-300 ${accentBorder} ${
          data.stage === "impact" ? "hover:scale-102 hover:shadow-[0_0_12px_var(--color-accent-glow)] cursor-pointer" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono tracking-widest text-ink-muted uppercase">
            {stageLabel}
          </span>
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </div>

        <p className={`font-serif text-sm leading-relaxed text-ink ${
          data.stage === "question" ? "italic text-base font-normal" : ""
        }`}>
          {data.stage === "question" ? `"${data.content}"` : data.content}
        </p>

        {data.stage === "impact" && (
          <div className="mt-2.5 flex items-center justify-between border-t border-border-ink pt-2">
            <span className="text-[8px] font-mono text-ink-muted uppercase">Verification</span>
            <span className="text-[9px] font-mono text-accent italic font-semibold">Celebrate Impact</span>
          </div>
        )}
      </div>
    </div>
  );
}
