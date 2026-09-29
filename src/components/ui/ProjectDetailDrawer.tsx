"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  FileText,
  Layers,
  Shield,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  FlaskConical,
  BookOpen
} from "lucide-react";
import { Project, ArchitectureNode } from "@/config/portfolio";

interface ProjectDetailDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailDrawer({ project, onClose }: ProjectDetailDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const getStepColor = (type?: ArchitectureNode["type"]) => {
    switch (type) {
      case "input":
        return "border-blue-500/40 bg-blue-500/10 text-blue-400";
      case "process":
        return "border-purple-500/40 bg-purple-500/10 text-purple-400";
      case "ai":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
      case "storage":
        return "border-amber-500/40 bg-amber-500/10 text-amber-400";
      case "security":
        return "border-rose-500/40 bg-rose-500/10 text-rose-400";
      case "output":
        return "border-accent/40 bg-accent/10 text-accent";
      default:
        return "border-border-ink bg-paper-node text-ink";
    }
  };

  const journeyStages = [
    { key: "question", title: "01 // THE QUESTION", icon: HelpCircle, text: project.journey.question },
    { key: "learning", title: "02 // THE ACQUISITION", icon: BookOpen, text: project.journey.learning },
    { key: "experiment", title: "03 // THE PROTOTYPE", icon: FlaskConical, text: project.journey.experiment },
    { key: "challenge", title: "04 // THE ROADBLOCK", icon: AlertTriangle, text: project.journey.challenge },
    { key: "solution", title: "05 // THE BREAKTHROUGH", icon: Lightbulb, text: project.journey.solution },
    { key: "impact", title: "06 // THE RESOLUTION", icon: CheckCircle2, text: project.journey.impact }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end overflow-hidden bg-ink/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-3xl h-full bg-paper border-l border-border-ink shadow-2xl overflow-y-auto z-10 flex flex-col paper-texture"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-border-ink bg-paper/90 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-5 h-5 text-accent" />
              <span className="text-xs font-mono tracking-widest uppercase text-ink-muted font-bold">
                Project Dossier &amp; Architecture Map
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-border-ink text-ink hover:text-accent hover:border-accent transition-colors duration-200 cursor-pointer"
              aria-label="Close project dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-8 flex-1">
            {/* Title & Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-bold">
                  {project.category}
                </span>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border border-border-ink hover:border-accent text-ink hover:text-accent transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub Repo
                  </a>
                )}
                {project.reportUrl && (
                  <a
                    href={project.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full border border-accent/40 bg-accent/5 text-accent hover:bg-accent/10 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Audit Report PDF
                  </a>
                )}
              </div>

              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink leading-tight mb-2">
                {project.title}
              </h2>
              <p className="font-sans text-sm md:text-base text-ink-muted leading-relaxed font-normal">
                {project.tagline}
              </p>
            </div>

            {/* Architecture Pipeline Flow Visual */}
            {project.architectureFlow && project.architectureFlow.length > 0 && (
              <div className="p-5 rounded-2xl border border-border-ink bg-paper-node/40 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-border-ink/40 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-accent" />
                    <h3 className="font-serif text-lg font-bold text-ink">
                      System Architecture Flow
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">
                    Execution Pipeline
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {project.architectureFlow.map((step, idx) => (
                    <div key={step.id} className="relative group">
                      <div className={`p-3.5 rounded-xl border ${getStepColor(step.type)} transition-all duration-300 hover:scale-102`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono font-bold tracking-wider opacity-75 uppercase">
                            Step 0{idx + 1}
                          </span>
                          <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-ink/5 border border-ink/10">
                            {step.type || "node"}
                          </span>
                        </div>
                        <h4 className="font-serif text-xs md:text-sm font-bold text-ink leading-snug">
                          {step.label}
                        </h4>
                        {step.subtext && (
                          <p className="font-sans text-[10px] text-ink-muted mt-1 leading-tight">
                            {step.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Key Engineering &amp; Security Capabilities
              </h3>

              <div className="space-y-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border-ink/60 bg-paper-node/30 flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-accent mt-0.5">
                      0{idx + 1}.
                    </span>
                    <p className="font-sans text-xs md:text-sm text-ink leading-relaxed">
                      {feat}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-ink">Technologies &amp; Protocols</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg border border-border-ink bg-paper-node text-ink font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 6-Stage Engineering Journey */}
            <div className="space-y-4 pt-4 border-t border-border-ink/60">
              <h3 className="font-serif text-xl font-bold text-ink flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-accent" />
                System Journey &amp; Resolution Matrix
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {journeyStages.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.key}
                      className="p-4 rounded-xl border border-border-ink bg-paper-node/50 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-accent">
                        <span>{stage.title}</span>
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <p className="font-sans text-xs text-ink leading-relaxed">
                        {stage.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-border-ink bg-paper/90 flex items-center justify-between">
            <span className="text-xs font-mono text-ink-muted">
              System Identifier: {project.id}
            </span>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-ink text-paper font-sans text-xs font-semibold hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Repository
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
