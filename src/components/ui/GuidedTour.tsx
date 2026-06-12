"use client";
import React, { useState, useEffect } from "react";
import { useReactFlow } from "@xyflow/react";
import { Play, Square, ChevronRight, ChevronLeft, Volume2, VolumeX } from "lucide-react";

interface GuidedTourProps {
  onStartTour: () => void;
  onEndTour: () => void;
  onExpandProject: (id: string, expand: boolean) => void;
}

export default function GuidedTour({ onStartTour, onEndTour, onExpandProject }: GuidedTourProps) {
  const { setViewport, fitView } = useReactFlow();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play subtle tick sound if enabled
  const playSound = (freq = 440, duration = 0.05, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  const tourSteps = [
    {
      title: "Dossier Initialization",
      narrative: "Target Subject: Chintala Sai Varun. Initiating Threat Intelligence Profile scan. Sector: Secure Systems Engineering.",
      viewport: { x: 450, y: 300, zoom: 1.15 }
    },
    {
      title: "Philosophy of Patterns",
      narrative: "Every anomaly tells a story. Varun explores how secure software, AI forensics, and cloud infrastructure intersect to defend themselves.",
      viewport: { x: 450, y: 400, zoom: 0.8 },
      action: () => {
        // Expand the primary Malware Analysis project to show the layout
        onExpandProject("malware-analysis-lab", true);
      }
    },
    {
      title: "Anatomy of Threat Analysis",
      narrative: "Tracing 'Malware Analysis Lab': Sandbox testing of 30+ samples leading to a Machine Learning API behavior classification pipeline.",
      viewport: { x: -150, y: 450, zoom: 0.95 },
      action: () => {
        onExpandProject("malware-analysis-lab", true);
      }
    },
    {
      title: "Constellation of Capabilities",
      narrative: "Skill nodes are mapped as clusters: Backend (Java/Spring Boot), Security protocols (OWASP/IAM), Forensic systems (Malware/Wireshark), and Cloud (AWS/Docker).",
      viewport: { x: 450, y: 150, zoom: 0.8 }
    },
    {
      title: "Active Research Lab",
      narrative: "Pulsing nodes represent active explorations: multi-agent isolation, cloud credential audits, dynamic honeypot tracking, and raft backends.",
      viewport: { x: 450, y: -50, zoom: 0.95 }
    },
    {
      title: "Telemetry & Credentials Verification",
      narrative: "Scan complete. Verified certifications: AWS Certified Cloud Practitioner, Oracle AI Foundations. Security training: 100+ TryHackMe Labs. Connection links open.",
      viewport: { x: 450, y: 0, zoom: 0.9 }
    }
  ];

  // Synchronize camera flight when step changes
  useEffect(() => {
    if (!isPlaying) return;

    const step = tourSteps[currentStep];
    
    // Perform actions associated with the step
    if (step.action) {
      step.action();
    }

    // Set viewport coordinates based on node locations
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let nodeX = 0;
    let nodeY = 0;

    if (currentStep === 0) { nodeX = 0; nodeY = 0; }
    else if (currentStep === 1) { nodeX = 0; nodeY = -250; }
    else if (currentStep === 2) { nodeX = -160; nodeY = -400; }
    else if (currentStep === 3) { nodeX = 0; nodeY = 220; }
    else if (currentStep === 4) { nodeX = 0; nodeY = 520; }
    else if (currentStep === 5) { nodeX = 0; nodeY = 250; }

    const zoom = step.viewport.zoom;
    const vx = windowWidth / 2 - nodeX * zoom;
    const vy = windowHeight / 2 - nodeY * zoom;

    setViewport({ x: vx, y: vy, zoom }, { duration: 1600 });
    playSound(659.25, 0.06, "square"); // Soft scientific click tone

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isPlaying]);

  const startTour = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    onStartTour();
  };

  const endTour = () => {
    setIsPlaying(false);
    onEndTour();
    fitView({ duration: 800, padding: 0.15 });
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center">
      {!isPlaying ? (
        <button
          onClick={startTour}
          className="group flex items-center gap-2 px-5 py-2 rounded-full border border-ink bg-paper-node hover:bg-ink hover:text-paper text-ink font-serif italic text-sm tracking-wide shadow-sm hover:scale-102 hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-all duration-300 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Initiate Threat Intelligence Profile
        </button>
      ) : (
        <div className="fixed inset-x-0 bottom-8 z-50 flex flex-col items-center px-4">
          <div className="w-full max-w-xl bg-paper-node border border-ink p-5 rounded-2xl shadow-lg relative animate-text-fade">
            {/* Top border progress bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-border-ink rounded-t-2xl overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-1000 ease-out"
                style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-semibold">
                Intelligence Scan: Step {currentStep + 1} of {tourSteps.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  title={soundEnabled ? "Mute diagnostics" : "Enable diagnostics"}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={endTour}
                  className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 border border-border-ink hover:border-accent hover:text-accent rounded cursor-pointer transition-colors"
                >
                  <Square className="w-2.5 h-2.5 fill-current" />
                  Abort
                </button>
              </div>
            </div>

            <h3 className="font-serif text-xl font-medium text-ink mb-1.5">
              {tourSteps[currentStep].title}
            </h3>

            <p className="font-sans text-xs text-ink-muted leading-relaxed mb-4 min-h-[40px]">
              {tourSteps[currentStep].narrative}
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`flex items-center gap-1 text-xs font-serif italic text-ink hover:text-accent disabled:opacity-20 cursor-pointer disabled:pointer-events-none transition-colors`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 text-xs font-serif italic text-ink hover:text-accent cursor-pointer transition-colors"
              >
                {currentStep === tourSteps.length - 1 ? "Verify Profile" : "Next Step"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
