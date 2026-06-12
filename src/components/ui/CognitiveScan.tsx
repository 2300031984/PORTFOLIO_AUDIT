"use client";
import React, { useState, useEffect } from "react";
import { Terminal, Shield, X, Volume2, VolumeX } from "lucide-react";

interface CognitiveScanProps {
  isActive: boolean;
  onClose: () => void;
  onExpandProject: (id: string, expand: boolean) => void;
  onSetProjectSelection: (id: string | null) => void;
}

export default function CognitiveScan({
  isActive,
  onClose,
  onExpandProject,
  onSetProjectSelection
}: CognitiveScanProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedLog, setTypedLog] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play chimes
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
      gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context failed", e);
    }
  };

  const scanSteps = [
    {
      title: "Initializing Telemetry Diagnostics",
      log: ">>> SEARCH SYSTEM COMMENCING... DETECTING SUBJECT CORE... CHINTALA SAI VARUN FOUND. ESTABLISHING PURE INTEGRATION PORTALS...",
      targetId: "hero-section",
      action: () => {
        onExpandProject("secure-ride-sharing", false);
        onExpandProject("malware-analysis-lab", false);
      }
    },
    {
      title: "Verifying Academic & Security Ledger",
      log: ">>> ACCESSING EDUCATION BLOCK: KONERU LAKSHMAIAH EDUCATION FOUNDATION. DEGREE B.TECH CSE VERIFIED. CREDENTIAL MATCHED: CGPA 9.56/10. SYSTEM STATUS: OUTSTANDING METRICS.",
      targetId: "about-section",
    },
    {
      title: "Compiling Skills Constellation",
      log: ">>> COMPILING CAPABILITY CLUSTERS. LOAD SECURE BACKENDS (SPRING SECURITY, JWT), LOG DEEP ANALYSIS (WIRESHARK, MALWARE ANALYSIS), INFRASTRUCTURE FOUNDATIONS (AWS, DOCKER).",
      targetId: "skills-section",
    },
    {
      title: "Decrypting System Blueprints",
      log: ">>> 4 COMPLETED CASE STUDIES DETECTED. AUTO-DECRYPTING ARCHITECTURE Blueprints FOR 'MALWARE ANALYSIS PROJECT'...",
      targetId: "projects-section",
      action: () => {
        onExpandProject("malware-analysis-lab", true);
        onSetProjectSelection("malware-analysis-lab");
      }
    },
    {
      title: "Traversing Brain Memory Map",
      log: ">>> INTERACTIVE COGNITIVE CONSTALLATION EMBEDDED. CAMERA SWEEP LOCKING ON NODE GRAPH coordinates. LINK CHANNELS STABLE.",
      targetId: "map-section",
    },
    {
      title: "Evaluating Live Activity Stream",
      log: ">>> PINGING CODING telemetry: GITHUB REPOSITORIES (11), LEETCODE DATA METRICS, CODECHEF CODING STATS (RATING 1426), TRYHACKME SECURE AUDITING LOGS (100+ LABS).",
      targetId: "footprint-section",
    },
    {
      title: "Cognitive Scan Completed",
      log: ">>> AUDIT FILE COMPILED successfully. CHINTALA SAI VARUN VERIFIED FOR SECURE SYSTEM ARCHITECT ROLES. ESTABLISHING COMMUNICATIONS TERMINAL CHANNEL...",
      targetId: "contact-section",
    }
  ];

  // Handle typewriter effect
  useEffect(() => {
    if (!isActive) return;
    setTypedLog("");
    const logText = scanSteps[currentStep].log;
    let i = 0;
    
    const interval = setInterval(() => {
      setTypedLog((prev) => prev + logText.charAt(i));
      i++;
      if (i % 3 === 0) playSound(1200, 0.01, "sine"); // Click click click sound
      if (i >= logText.length) {
        clearInterval(interval);
      }
    }, 15);

    // Scroll to target section smoothly
    const element = document.getElementById(scanSteps[currentStep].targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (scanSteps[currentStep].action) {
      scanSteps[currentStep].action();
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isActive]);

  // Auto-advance step
  useEffect(() => {
    if (!isActive) return;
    if (currentStep === scanSteps.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 8500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isActive]);

  if (!isActive) return null;

  const handleNext = () => {
    if (currentStep < scanSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white font-sans p-6 pointer-events-auto select-none select-none">
      {/* Top Scanner Sweep Laser Overlay */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-accent/80 shadow-[0_0_15px_var(--color-accent)] pointer-events-none animate-[bounce_6s_infinite_ease-in-out]" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <Terminal className="w-5 h-5 text-accent animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-white/50">COGNITIVE THREAT PROFILE SCANNER v2.6</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-accent" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 border border-white/15 hover:border-accent hover:text-accent rounded transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Abort Scan
          </button>
        </div>
      </div>

      {/* Center Animated Scanner HUD */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="w-full max-w-lg text-center space-y-6 relative z-10">
          <div className="inline-flex p-4 rounded-full bg-accent/5 border border-accent/30 animate-pulse">
            <Shield className="w-12 h-12 text-accent" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white">
            {scanSteps[currentStep].title}
          </h2>

          {/* Diagnostic Loading Ring */}
          <div className="flex justify-center items-center gap-2 py-4">
            {scanSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-1000 ${
                  idx === currentStep
                    ? "w-10 bg-accent"
                    : idx < currentStep
                    ? "w-4 bg-accent/35"
                    : "w-2 bg-white/10"
                }`}
              />
            ))}
          </div>

          <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
            Diagnostic Scan Stage {currentStep + 1} of {scanSteps.length}
          </p>
        </div>
      </div>

      {/* Bottom Typewriter Terminal Console */}
      <div className="w-full max-w-4xl mx-auto border border-white/10 bg-white/[0.02] p-5 rounded-2xl shadow-2xl relative mb-6">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-accent/40" />

        <div className="flex items-center justify-between mb-3.5 text-[9px] font-mono text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">
          <span>Active Diagnostics Stream Log</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
            Active Sync
          </span>
        </div>

        <p className="font-mono text-xs text-white/95 leading-relaxed min-h-[60px] whitespace-pre-wrap select-text">
          {typedLog}
          <span className="inline-block w-1.5 h-3.5 ml-1 bg-accent animate-pulse" />
        </p>

        <div className="flex items-center justify-between mt-5 border-t border-white/5 pt-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1 text-[11px] font-mono text-white/40 hover:text-white disabled:opacity-20 cursor-pointer disabled:pointer-events-none transition-colors"
          >
            ← Back Sector
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-[11px] font-mono text-accent hover:text-white cursor-pointer transition-colors"
          >
            {currentStep === scanSteps.length - 1 ? "Complete Verification" : "Next Sector →"}
          </button>
        </div>
      </div>
    </div>
  );
}
