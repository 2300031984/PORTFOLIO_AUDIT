"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  Edge,
  Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";

import { portfolioConfig } from "@/config/portfolio";
import CentralNode from "@/components/nodes/CentralNode";
import ProjectNode from "@/components/nodes/ProjectNode";
import JourneyNode from "@/components/nodes/JourneyNode";
import SkillNode from "@/components/nodes/SkillNode";
import GithubNode from "@/components/nodes/GithubNode";
import CareerNode from "@/components/nodes/CareerNode";

import ThemeToggle from "@/components/ui/ThemeToggle";
import GraphControls from "@/components/ui/GraphControls";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import CognitiveScan from "@/components/ui/CognitiveScan";

import {
  Github,
  ExternalLink,
  ShieldAlert,
  Award,
  Terminal,
  Activity,
  User,
  Mail,
  CheckCircle,
  FileText,
  Volume2,
  VolumeX,
  LayoutDashboard,
  Search,
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";

// Register custom nodes
const nodeTypes = {
  central: CentralNode,
  project: ProjectNode,
  journey: JourneyNode,
  skill: SkillNode,
  github: GithubNode,
  career: CareerNode,
};

function MemoryMapEmbed({
  expandedProjects,
  handleToggleExpand,
  selectedSkill,
  handleSelectSkill,
  handlePaneClick,
  className
}: {
  expandedProjects: Record<string, boolean>;
  handleToggleExpand: (id: string) => void;
  selectedSkill: string | null;
  handleSelectSkill: (id: string) => void;
  handlePaneClick: () => void;
  className?: string;
}) {
  // Generate nodes and edges dynamically based on state
  const { nodes, edges } = useMemo(() => {
    const listNodes: Node[] = [
      {
        id: "central-node",
        type: "central",
        position: { x: 0, y: 0 },
        data: {
          name: portfolioConfig.developer.name,
          title: portfolioConfig.developer.title,
          subTitle: portfolioConfig.developer.subTitle,
          label: "Core Intel Node",
          isUnlocked: true,
          onUnlock: () => {},
        },
      },
    ];

    const listEdges: Edge[] = [];

    // Career History Nodes
    listNodes.push({
      id: "career-internship",
      type: "career",
      position: { x: -320, y: 30 },
      data: {
        type: "experience",
        title: portfolioConfig.internship.company,
        subTitle: portfolioConfig.internship.role,
        duration: portfolioConfig.internship.duration,
        onClick: () => {
          document.getElementById("experience-section")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    listNodes.push({
      id: "career-education",
      type: "career",
      position: { x: -320, y: -90 },
      data: {
        type: "education",
        title: portfolioConfig.education.institution,
        subTitle: portfolioConfig.education.degree + " - " + portfolioConfig.education.major,
        duration: portfolioConfig.education.duration,
        onClick: () => {
          document.getElementById("education-section")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    listEdges.push({
      id: "edge-central-to-intern",
      source: "central-node",
      target: "career-internship",
      className: "dimmed opacity-45"
    });

    listEdges.push({
      id: "edge-central-to-edu",
      source: "central-node",
      target: "career-education",
      className: "dimmed opacity-45"
    });

    // Determine project highlighted states based on selected skill
    const activeProjectIds: string[] = [];
    if (selectedSkill) {
      const skillCluster = portfolioConfig.skills.find((s) => s.id === selectedSkill);
      if (skillCluster) {
        activeProjectIds.push(...skillCluster.relatedProjects);
      }
    }

    // Projects (Parabolic arc above central node)
    portfolioConfig.projects.forEach((proj, idx) => {
      const isExpanded = !!expandedProjects[proj.id];
      const isActive = selectedSkill ? activeProjectIds.includes(proj.id) : false;
      const isDimmed = selectedSkill ? !activeProjectIds.includes(proj.id) : false;

      let px = 0;
      let py = 0;
      if (idx === 0) { px = -600; py = -150; }
      else if (idx === 1) { px = -400; py = -230; }
      else if (idx === 2) { px = -200; py = -290; }
      else if (idx === 3) { px = 0; py = -320; }
      else if (idx === 4) { px = 200; py = -290; }
      else if (idx === 5) { px = 400; py = -230; }
      else if (idx === 6) { px = 600; py = -150; }

      listNodes.push({
        id: `proj-${proj.id}`,
        type: "project",
        position: { x: px, y: py },
        data: {
          title: proj.title,
          tagline: proj.tagline,
          isExpanded,
          isActive,
          isDimmed,
          onToggleExpand: () => handleToggleExpand(proj.id),
        },
      });

      listEdges.push({
        id: `edge-central-to-proj-${proj.id}`,
        source: "central-node",
        target: `proj-${proj.id}`,
        className: isDimmed ? "dimmed" : isActive ? "active animate-pulse-glow" : "",
      });

      // Sequential journey nodes if expanded
      if (isExpanded) {
        const journeyKeys: ("question" | "learning" | "experiment" | "challenge" | "solution" | "impact")[] = [
          "question",
          "learning",
          "experiment",
          "challenge",
          "solution",
          "impact",
        ];

        journeyKeys.forEach((key, jIdx) => {
          let jx = 0;
          let jy = 0;

          if (idx === 0) {
            jx = px - 250 - jIdx * 250;
            jy = py + (jIdx % 2 === 0 ? -30 : 30);
          } else if (idx === 1) {
            jx = px - 120 - jIdx * 250;
            jy = py - 150 - jIdx * 50;
          } else if (idx === 2) {
            jx = px - 50 - jIdx * 100;
            jy = py - 180 - jIdx * 180;
          } else if (idx === 3) {
            jx = px + (jIdx % 2 === 0 ? -80 : 80);
            jy = py - 150 - jIdx * 160;
          } else if (idx === 4) {
            jx = px + 50 + jIdx * 100;
            jy = py - 180 - jIdx * 180;
          } else if (idx === 5) {
            jx = px + 120 + jIdx * 250;
            jy = py - 150 - jIdx * 50;
          } else {
            jx = px + 250 + jIdx * 250;
            jy = py + (jIdx % 2 === 0 ? -30 : 30);
          }

          listNodes.push({
            id: `journey-${proj.id}-${key}`,
            type: "journey",
            position: { x: jx, y: jy },
            data: {
              stage: key,
              content: proj.journey[key],
              projectTitle: proj.title,
            },
          });

          const sourceId = jIdx === 0 ? `proj-${proj.id}` : `journey-${proj.id}-${journeyKeys[jIdx - 1]}`;
          listEdges.push({
            id: `edge-${proj.id}-${sourceId}-to-${key}`,
            source: sourceId,
            target: `journey-${proj.id}-${key}`,
            className: "highlighted",
          });
        });
      }
    });

    // Add Skills Clusters
    portfolioConfig.skills.forEach((skill, idx) => {
      const isHighlighted = selectedSkill === skill.id;
      const isDimmed = selectedSkill ? selectedSkill !== skill.id : false;

      let sx = 0;
      let sy = 0;
      if (idx === 0) { sx = -520; sy = 220; }
      else if (idx === 1) { sx = -260; sy = 300; }
      else if (idx === 2) { sx = 260; sy = 300; }
      else if (idx === 3) { sx = 520; sy = 220; }
      else if (idx === 4) { sx = -150; sy = 380; } // Core CS cluster in center-bottom
      else if (idx === 5) { sx = 150; sy = 380; } // AI cluster in center-bottom

      listNodes.push({
        id: `skill-${skill.id}`,
        type: "skill",
        position: { x: sx, y: sy },
        data: {
          title: skill.title,
          items: skill.items,
          isHighlighted,
          isDimmed,
          onSelect: () => handleSelectSkill(skill.id),
        },
      });

      listEdges.push({
        id: `edge-central-to-skill-${skill.id}`,
        source: "central-node",
        target: `skill-${skill.id}`,
        className: isDimmed ? "dimmed" : isHighlighted ? "active" : "",
      });

      skill.relatedProjects.forEach((projId) => {
        const isActiveLink = isHighlighted;
        const isDimmedLink = selectedSkill ? !isHighlighted : false;

        listEdges.push({
          id: `edge-skill-${skill.id}-to-proj-${projId}`,
          source: `skill-${skill.id}`,
          target: `proj-${projId}`,
          className: isDimmedLink ? "dimmed" : isActiveLink ? "active animate-pulse-glow" : "dimmed opacity-45",
        });
      });
    });


    // Github Node
    listNodes.push({
      id: "github-stats",
      type: "github",
      position: { x: 0, y: 150 },
      data: {
        commits: portfolioConfig.githubStats.commits,
        repos: portfolioConfig.githubStats.repos,
        primaryTech: portfolioConfig.githubStats.primaryTech,
        contributions: portfolioConfig.githubStats.contributions,
      },
    });

    listEdges.push({
      id: "edge-central-to-github",
      source: "central-node",
      target: "github-stats",
      className: "dimmed opacity-40",
    });

    return { nodes: listNodes, edges: listEdges };
  }, [expandedProjects, selectedSkill, handleToggleExpand, handleSelectSkill]);

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges, setRfNodes, setRfEdges]);

  return (
    <div className={className || "w-full h-[600px] border border-border-ink rounded-2xl relative overflow-hidden bg-paper-node/30 shadow-inner"}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15, minZoom: 0.35, maxZoom: 1.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        zoomOnScroll={false} // Recruiter friendly! Scroll scrolls page, buttons zoom map.
        panOnScroll={false}
        zoomOnDoubleClick={false}
        className="w-full h-full"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--color-edge)" />
      </ReactFlow>
      <div className="absolute bottom-4 right-4 z-10 scale-90">
        <GraphControls />
      </div>
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          if (end === 0) return;
          const duration = 1500; // ms
          const increment = end / (duration / 16);
          const animate = () => {
            start += increment;
            if (start >= end) {
              setCount(end);
            } else {
              setCount(Math.floor(start));
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [cognitiveScanActive, setCognitiveScanActive] = useState(false);
  
  // Dynamic UI States
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [selectedProjectSpec, setSelectedProjectSpec] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("All");

  // Immersive design states
  const [isHudMode, setIsHudMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Audio synthesizer logic
  const playAudioTick = useCallback((freq = 440, duration = 0.05, type: OscillatorType = "sine") => {
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
  }, [soundEnabled]);

  const toggleHudMode = () => {
    setIsHudMode(prev => {
      const next = !prev;
      if (next) {
        // Sci-Fi login diagnostics sweep
        playAudioTick(587.33, 0.12, "triangle");
        setTimeout(() => playAudioTick(880, 0.15, "triangle"), 80);
      } else {
        // Shutdown chime
        playAudioTick(440, 0.1, "sine");
        setTimeout(() => playAudioTick(293.66, 0.15, "sine"), 80);
      }
      return next;
    });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        try {
          const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          const playBeep = (freq: number, start: number) => {
            const osc = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
            gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime + start);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + start + 0.05);
            osc.start(audioCtx.currentTime + start);
            osc.stop(audioCtx.currentTime + start + 0.05);
          };
          playBeep(880, 0);
          playBeep(1200, 0.06);
        } catch {}
      }
      return next;
    });
  };

  // Form states
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setMounted(true);

    const sections = [
      "hero-section",
      "about-section",
      "skills-section",
      "projects-section",
      "blogs-section",
      "certifications-section",
      "map-section",
      "footprint-section",
      "contact-section"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.developer.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleToggleExpand = useCallback((projectId: string) => {
    setExpandedProjects((prev) => {
      const isCurrentlyExpanded = !prev[projectId];
      if (isCurrentlyExpanded) {
        setSelectedProjectSpec(projectId);
        playAudioTick(659.25, 0.08, "square");
      } else {
        playAudioTick(440, 0.05, "sine");
      }
      return { ...prev, [projectId]: isCurrentlyExpanded };
    });
  }, [playAudioTick]);

  const handleSetExpand = useCallback((projectId: string, expand: boolean) => {
    setExpandedProjects((prev) => {
      if (expand) {
        setSelectedProjectSpec(projectId);
        playAudioTick(659.25, 0.08, "square");
      } else {
        playAudioTick(440, 0.05, "sine");
      }
      return { ...prev, [projectId]: expand };
    });
  }, [playAudioTick]);

  const handleSelectSkill = useCallback((skillId: string) => {
    setSelectedSkill((prev) => {
      const isSelecting = prev !== skillId;
      if (isSelecting) {
        playAudioTick(880, 0.05, "sine");
      } else {
        playAudioTick(587.33, 0.04, "sine");
      }
      return isSelecting ? skillId : null;
    });
  }, [playAudioTick]);

  const handlePaneClick = useCallback(() => {
    setSelectedSkill(null);
    playAudioTick(440, 0.03, "sine");
  }, [playAudioTick]);

  const activeProjectIds = useMemo(() => {
    if (!selectedSkill) return [];
    const skillCluster = portfolioConfig.skills.find((s) => s.id === selectedSkill);
    return skillCluster ? skillCluster.relatedProjects : [];
  }, [selectedSkill]);

  const filteredBlogs = useMemo(() => {
    return (portfolioConfig.blogs || []).filter((blog) => {
      const matchesCategory =
        selectedBlogCategory === "All" || blog.category === selectedBlogCategory;
      const query = blogSearchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.topics.some((t) => t.toLowerCase().includes(query)) ||
        blog.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [blogSearchQuery, selectedBlogCategory]);

  if (!mounted) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-paper text-ink paper-texture select-none">
        <div className="flex flex-col items-center text-center max-w-sm px-4">
          <span className="text-accent font-serif italic text-lg mb-1 animate-pulse">
            Decrypting Security Dossier
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink mb-3">
            {portfolioConfig.developer.name}
          </h1>
          <div className="text-ink-muted font-serif italic text-sm space-y-1 opacity-80">
            <p>&quot;Every system leaves traces.&quot;</p>
            <p>&quot;Every trace tells a story.&quot;</p>
            <p>&quot;My work begins where patterns emerge.&quot;</p>
          </div>
        </div>
      </div>
    );
  }

  if (isHudMode) {
    return (
      <div className="w-screen h-screen overflow-hidden flex flex-col bg-paper text-ink paper-texture font-sans select-none relative selection:bg-accent/20 cyber-grid-scan">
        {/* Decorative watercolor stains */}
        <div className="watercolor-bg opacity-15" />

        {/* Top HUD Bar */}
        <header className="h-14 border-b border-border-ink/40 flex items-center justify-between px-6 bg-paper-node/30 relative z-20 pointer-events-auto">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-ink uppercase font-bold flex items-center gap-2">
              Sai Varun // Operations Security Dashboard
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            </span>
          </div>

          <div className="text-[10px] font-mono text-ink-muted uppercase tracking-widest hidden md:block">
            Status: <span className="text-accent font-semibold">Diagnostic HUD Panel Active</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full border border-border-ink/50 bg-paper-node/50 hover:border-accent hover:text-accent text-ink cursor-pointer transition-colors"
              title={soundEnabled ? "Mute interface feedback" : "Unmute interface feedback"}
            >
              {soundEnabled ? <Volume2 className="w-4.5 h-4.5 text-accent" /> : <VolumeX className="w-4.5 h-4.5 text-ink-muted" />}
            </button>
            <button
              onClick={toggleHudMode}
              className="flex items-center gap-1.5 px-4 py-1.5 border border-accent bg-accent text-paper hover:bg-ink hover:border-ink rounded-full text-[10px] font-mono tracking-wider cursor-pointer transition-colors shadow-md"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Exit HUD Mode
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Workspace Dashboard Body */}
        <main className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden relative z-10">
          
          {/* Left panel: Bio & Timeline (col-span-3) */}
          <div className="col-span-3 h-full flex flex-col gap-4 overflow-hidden">
            
            {/* Subject Profile Widget */}
            <div className="flex-1 bg-paper-node/70 backdrop-blur-md border border-border-ink/50 rounded-2xl p-4 flex flex-col overflow-y-auto">
              <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold block mb-2 border-b border-border-ink/30 pb-1.5">
                Target Profile dossier
              </span>
              <h2 className="font-serif text-xl font-bold text-ink leading-tight mb-2 glitch-hover">
                {portfolioConfig.developer.name}
              </h2>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block mb-3">
                Secure Systems Engineer
              </span>
              <p className="text-[11px] font-sans text-ink-muted leading-relaxed text-justify mb-4">
                {portfolioConfig.developer.about}
              </p>

              {/* Education & Internship Milestones */}
              <div className="space-y-3.5 mt-auto pt-3 border-t border-border-ink/30">
                <div>
                  <span className="text-[8px] font-mono text-accent uppercase block leading-none mb-1">Education</span>
                  <h4 className="text-[11px] font-serif font-bold text-ink leading-tight">
                    {portfolioConfig.education.institution}
                  </h4>
                  <p className="text-[10px] text-ink-muted leading-snug">
                    B.Tech CSE &bull; {portfolioConfig.education.duration} &bull; CGPA: 9.56
                  </p>
                </div>
                <div>
                  <span className="text-[8px] font-mono text-accent uppercase block leading-none mb-1">Internship</span>
                  <h4 className="text-[11px] font-serif font-bold text-ink leading-tight">
                    {portfolioConfig.internship.company}
                  </h4>
                  <p className="text-[10px] text-ink-muted leading-snug">
                    {portfolioConfig.internship.role} &bull; {portfolioConfig.internship.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Development History Widget */}
            <div className="h-48 bg-paper-node/70 backdrop-blur-md border border-border-ink/50 rounded-2xl p-4 overflow-y-auto">
              <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold block mb-3 border-b border-border-ink/30 pb-1.5">
                Chronology logs
              </span>
              <div className="space-y-3 relative border-l border-border-ink/40 pl-4 ml-2">
                {[
                  { year: "2023", title: "Engineering Foundations", desc: "Started Computer Science Engineering with a focus on DSA, networks, and databases." },
                  { year: "2025", title: "Secure Intern & Labs", desc: "Internship at EduSkills (Java/Spring Boot/JWT) and completed 100+ TryHackMe security rooms." },
                  { year: "2026", title: "AI & Threat Audits", desc: "Building agentic AI tools (RAG) and automated threat detection platforms." }
                ].map((time, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-paper transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-[9px] font-mono text-accent block leading-none font-bold">{time.year} &bull; {time.title}</span>
                    <p className="text-[10px] text-ink-muted leading-normal mt-0.5">{time.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center panel: Network Graph Map (col-span-6) */}
          <div className="col-span-6 h-full flex flex-col border border-border-ink/50 bg-paper-node/30 backdrop-blur-md rounded-2xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-ink/30 pb-2 mb-3 z-10">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold block">
                  Map: Cognitive Constellation
                </span>
                <p className="text-[10px] text-ink-muted leading-none mt-0.5">
                  Click nodes to decrypt development dossiers, code files, and learning challenges.
                </p>
              </div>
              <div className="text-[9px] font-mono text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/20">
                ACTIVE MAP
              </div>
            </div>

            <ReactFlowProvider>
              <MemoryMapEmbed
                expandedProjects={expandedProjects}
                handleToggleExpand={handleToggleExpand}
                selectedSkill={selectedSkill}
                handleSelectSkill={handleSelectSkill}
                handlePaneClick={handlePaneClick}
                className="w-full flex-1 relative overflow-hidden bg-paper/20 rounded-xl"
              />
            </ReactFlowProvider>
          </div>

          {/* Right panel: Active specs, achievements & commits (col-span-3) */}
          <div className="col-span-3 h-full flex flex-col gap-4 overflow-hidden">
            
            {/* Decrypted Specs / Terminal Panel */}
            <div className="flex-1 bg-paper-node/70 backdrop-blur-md border border-border-ink/50 rounded-2xl p-4 flex flex-col overflow-y-auto">
              <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold block mb-2 border-b border-border-ink/30 pb-1.5">
                Dossier Spec Decrypter
              </span>
              
              {selectedProjectSpec ? (() => {
                const proj = portfolioConfig.projects.find(p => p.id === selectedProjectSpec);
                if (!proj) return <p className="text-[11px] font-mono text-ink-muted">Failed to locate dossier.</p>;
                return (
                  <div className="space-y-3.5 text-[11px] font-sans">
                    <div>
                      <h3 className="font-serif text-base font-bold text-ink leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-[10px] text-ink-muted leading-normal mt-0.5">
                        {proj.tagline}
                      </p>
                    </div>

                    <div>
                      <span className="text-[8px] font-mono text-accent uppercase block leading-none mb-1">Architecture Features</span>
                      <ul className="list-disc pl-3.5 space-y-1 text-ink-muted text-[10px]">
                        {proj.features.map((f, idx) => (
                          <li key={idx}>{f}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent/[0.03] border border-accent/20 p-2.5 rounded-xl">
                      <span className="text-[8px] font-mono text-accent uppercase block leading-none font-bold mb-0.5">Verified Impact</span>
                      <p className="text-[10px] text-ink font-semibold leading-relaxed font-serif">{proj.journey.impact}</p>
                    </div>

                    <div className="flex flex-col gap-2 pt-1.5">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playAudioTick(1200, 0.05)}
                          className="flex items-center justify-center gap-1.5 py-2 border border-ink bg-ink text-paper hover:bg-accent rounded-lg text-[10px] font-mono cursor-pointer transition-colors shadow-sm"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Decrypt Code Base
                        </a>
                      )}
                      {proj.reportUrl && (
                        <a
                          href={proj.reportUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playAudioTick(1200, 0.05)}
                          className="flex items-center justify-center gap-1.5 py-2 border border-accent bg-accent text-paper hover:bg-ink rounded-lg text-[10px] font-mono cursor-pointer transition-colors shadow-sm animate-pulse-glow"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          View Pentest Report
                        </a>
                      )}
                    </div>
                  </div>
                );
              })() : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                  <Terminal className="w-8 h-8 text-ink-muted/50 mb-3 animate-pulse" />
                  <p className="text-[11px] font-mono text-ink-muted leading-relaxed">
                    System standby. Select any project node in the network graph or click a case in blueprints to load system telemetry.
                  </p>
                </div>
              )}
            </div>

            {/* Achievements & GitHub Stats Widget */}
            <div className="h-56 bg-paper-node/70 backdrop-blur-md border border-border-ink/50 rounded-2xl p-4 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-accent uppercase font-bold block mb-3 border-b border-border-ink/30 pb-1.5">
                  Diagnostic Telemetry
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-center mb-3">
                  <div className="bg-paper/40 p-2 border border-border-ink/20 rounded-xl">
                    <span className="text-base font-serif font-bold text-accent block leading-none">400+</span>
                    <span className="text-[8px] font-mono text-ink-muted uppercase leading-none block mt-1">DSA Solved</span>
                  </div>
                  <div className="bg-paper/40 p-2 border border-border-ink/20 rounded-xl">
                    <span className="text-base font-serif font-bold text-accent block leading-none">100+</span>
                    <span className="text-[8px] font-mono text-ink-muted uppercase leading-none block mt-1">THM Labs</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] font-mono text-ink-muted">
                  <div className="flex justify-between border-b border-border-ink/10 pb-1">
                    <span>AWS CLOUD</span>
                    <span className="text-ink font-semibold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-border-ink/10 pb-1">
                    <span>MS SC-200</span>
                    <span className="text-ink font-semibold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>ORACLE AI</span>
                    <span className="text-ink font-semibold">VERIFIED</span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] font-mono text-center text-ink-muted/60 border-t border-border-ink/20 pt-2 leading-none mt-2">
                CORE SYSTEM VER. 2026.07
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink paper-texture font-sans selection:bg-accent/20">
      {/* Decorative watercolor stains */}
      <div className="watercolor-bg" />

      {/* Dynamic HUD Navigation bar */}
      <nav className="fixed top-6 inset-x-6 z-40 flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-3 bg-paper-node border border-border-ink px-4 py-2.5 rounded-full shadow-sm pointer-events-auto">
          <ShieldAlert className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-ink uppercase font-bold">
            Sai Varun // Portfolio Audit
          </span>
        </div>

        {/* Anchor links */}
        <div className="hidden lg:flex items-center gap-1.5 bg-paper-node border border-border-ink p-1 rounded-full shadow-sm pointer-events-auto">
          {[
            { label: "Profile", id: "hero-section" },
            { label: "About", id: "about-section" },
            { label: "Capabilities", id: "skills-section" },
            { label: "Blueprints", id: "projects-section" },
            { label: "Technical Blogs", id: "blogs-section" },
            { label: "Certifications", id: "certifications-section" },
            { label: "Memory Map", id: "map-section" },
            { label: "Audit Ledger", id: "footprint-section" }
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playAudioTick(783.99, 0.05);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`text-[10px] font-mono px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "text-accent bg-accent/5 border-accent/20 font-semibold"
                    : "text-ink-muted hover:text-ink hover:bg-paper/40 border-transparent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-full border border-border-ink bg-paper-node hover:border-accent hover:text-accent text-ink cursor-pointer transition-all duration-300"
            title={soundEnabled ? "Mute interface feedback" : "Unmute interface feedback"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-accent" /> : <VolumeX className="w-4 h-4 text-ink-muted" />}
          </button>

          <button
            onClick={toggleHudMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
              isHudMode
                ? "bg-accent border-accent text-paper shadow-[0_0_12px_rgba(185,74,36,0.3)] hover:scale-102"
                : "border-border-ink bg-paper-node hover:border-accent hover:text-accent text-ink"
            }`}
            title="Toggle Diagnostic HUD Dashboard Mode"
          >
            <LayoutDashboard className={`w-4 h-4 ${isHudMode ? "animate-pulse" : ""}`} />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
              {isHudMode ? "Exit HUD" : "HUD Mode"}
            </span>
          </button>

          <button
            onClick={() => {
              playAudioTick(880, 0.05);
              setCognitiveScanActive(true);
            }}
            className="group hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-ink bg-paper-node hover:bg-ink hover:text-paper text-ink font-serif italic text-xs tracking-wider shadow-sm hover:scale-102 hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-all duration-300 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            Initiate Cognitive Scan
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {/* COGNITIVE SCAN SYSTEM OVERLAY */}
      <CognitiveScan
        isActive={cognitiveScanActive}
        onClose={() => setCognitiveScanActive(false)}
        onExpandProject={handleSetExpand}
        onSetProjectSelection={setSelectedProjectSpec}
      />

      {/* SECTION 1 — INTRODUCTION (HERO) */}
      <section id="hero-section" className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-24 overflow-hidden select-none border-b border-border-ink/20">
        <ParticleCanvas />
        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-[10px] font-mono uppercase tracking-widest text-accent">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Secure Systems Architect
            </span>
            
            <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight text-ink select-none leading-none">
              {portfolioConfig.developer.name}
            </h1>
            
            <p className="font-mono text-xs md:text-sm text-ink-muted uppercase tracking-wider select-none leading-relaxed max-w-xl mx-auto">
              Backend Engineer &bull; Cybersecurity Researcher &bull; Cloud Enthusiast
            </p>

            <h2 className="font-serif italic text-2xl md:text-3xl text-accent font-medium leading-relaxed max-w-3xl mx-auto select-none pt-4">
              &quot;Every system leaves traces. Every trace tells a story. My work begins where patterns emerge.&quot;
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mt-12"
          >
            <button
              onClick={() => setCognitiveScanActive(true)}
              className="flex items-center gap-2 px-6 py-3 bg-ink text-paper hover:bg-accent border border-transparent rounded-full text-xs font-mono tracking-wider cursor-pointer shadow-md transition-all duration-300 hover:scale-102 hover:shadow-[0_0_15px_var(--color-accent-glow)]"
            >
              <Terminal className="w-4 h-4" />
              Initiate Cognitive Scan
            </button>

            <button
              onClick={() => document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-1.5 px-6 py-3 border border-ink hover:border-accent hover:text-accent rounded-full text-xs font-mono tracking-wider cursor-pointer transition-all duration-300"
            >
              Explore Cases
            </button>

            <a
              href="GENERAL_RESUME.pdf"
              download="Chintala_Sai_Varun_Resume.pdf"
              className="flex items-center gap-1.5 px-6 py-3 border border-border-ink bg-paper-node/50 hover:border-accent hover:text-accent rounded-full text-xs font-mono tracking-wider cursor-pointer transition-all duration-300"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Quick network credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="flex flex-wrap justify-center items-center gap-8 mt-24 text-[10px] font-mono text-ink-muted uppercase tracking-widest border-t border-border-ink/40 pt-6"
          >
            <a href={portfolioConfig.developer.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
              Professional Network → LinkedIn
            </a>
            <a href={portfolioConfig.developer.githubUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
              Source Code Archive → GitHub
            </a>
            <a href={portfolioConfig.developer.tryhackmeUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
              Security Research Log → TryHackMe
            </a>
            <a href={portfolioConfig.developer.leetcodeUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
              DSA Forensics → LeetCode
            </a>
            <a href={portfolioConfig.developer.codechefUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
              Competitive Logic → CodeChef
            </a>
            <a href={portfolioConfig.developer.hackerrankUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
              Verification Badge → HackerRank
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT ME */}
      <section id="about-section" className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left bio details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block">Section 02 // Subject Profile</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
              Patterns reveal the system.
            </h2>
            <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed text-justify">
              I am a Computer Science undergraduate focused on building secure, scalable, and intelligent software systems.
            </p>
            <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed text-justify">
              My work spans backend engineering, cybersecurity, cloud technologies, and AI-driven security solutions. I enjoy analyzing how systems behave under pressure, identifying hidden vulnerabilities, and designing architectures that remain reliable, secure, and efficient.
            </p>
            <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed text-justify">
              Through hands-on experience with Spring Boot, REST APIs, database optimization, malware analysis, network traffic investigation, and cloud platforms, I have developed a strong foundation in both software engineering and security research.
            </p>
            <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed text-justify">
              My goal is to build next-generation intelligent systems that not only solve problems but also understand, monitor, and defend themselves against evolving threats.
            </p>
          </div>

          {/* Right Chronology Timeline */}
          <div className="lg:col-span-7 bg-paper-node border border-border-ink p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
              <User className="w-16 h-16 text-accent" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-accent uppercase block font-semibold border-b border-border-ink/40 pb-3 mb-6">
              Subject Development Timeline
            </span>

            <div className="space-y-6 relative border-l border-border-ink/40 pl-6 ml-3">
              {[
                { year: "2023", title: "Engineering Foundations", desc: "Started Computer Science Engineering with a focus on programming, algorithms, databases, operating systems, and computer networks." },
                { year: "2024", title: "Backend Engineering Internship", desc: "Developed Spring Boot applications, designed REST APIs, implemented JWT authentication, optimized databases, and worked on secure backend systems during my Full Stack Development." },
                { year: "2025", title: "Security Exploration & Problem Solving", desc: "Completed 100+ TryHackMe labs, strengthened cybersecurity fundamentals, and solved 400+ algorithmic problems across coding platforms." },
                { year: "2026", title: "Intelligent Secure Systems", desc: "Exploring AI-powered security, threat detection, intelligent monitoring platforms to secure and adaptive software systems." }
              ].map((time, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[30px] top-0 w-3 h-3 rounded-full bg-border-ink border-2 border-paper group-hover:bg-accent transition-colors duration-300" />
                  <span className="text-xs font-mono font-bold text-accent">{time.year}</span>
                  <h4 className="font-serif text-sm font-semibold text-ink leading-tight mt-0.5">{time.title}</h4>
                  <p className="font-sans text-[11px] text-ink-muted leading-relaxed mt-1">{time.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — SKILLS CONSTELLATION */}
      <section id="skills-section" className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-1">Section 03 // Capabilities Mapping</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
            Capabilities Constellation
          </h2>
          <p className="text-xs text-ink-muted font-sans mt-2">
            Hover clusters to illuminate related security projects and trace application pathways.
          </p>
        </div>

        {/* 6 Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioConfig.skills.map((cluster) => {
            const isHighlighted = selectedSkill === cluster.id;
            const borderClass = isHighlighted
              ? "border-accent ring-2 ring-accent/25 shadow-md scale-102"
              : "border-border-ink hover:border-accent hover:scale-101";

            return (
              <div
                key={cluster.id}
                onMouseEnter={() => setSelectedSkill(cluster.id)}
                onMouseLeave={() => setSelectedSkill(null)}
                className={`p-5 rounded-2xl bg-paper-node border transition-all duration-300 flex flex-col justify-between node-theme-${
                  cluster.id === "backend-constellation" ? "project" :
                  cluster.id === "security-constellation" ? "skill" :
                  cluster.id === "cloud-constellation" ? "career" :
                  cluster.id === "programming-constellation" ? "github" :
                  cluster.id === "ai-constellation" ? "project" : "experiment"
                } ${borderClass}`}
              >
                <div>
                  <span className="text-[8px] font-mono text-ink-muted uppercase block tracking-wider mb-2 border-b border-border-ink/40 pb-1.5">
                    Skills Cluster
                  </span>
                  <h3 className="font-serif text-base font-bold text-ink leading-tight mb-4">
                    {cluster.title}
                  </h3>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                  {cluster.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-border-ink/20 bg-paper/50 inline-block max-w-fit leading-none"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — PROJECTS */}
      <section id="projects-section" className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-1">Section 04 // Incident Reports</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
            Case Studies & Blueprints
          </h2>
          <p className="text-xs text-ink-muted font-sans mt-2">
            Expand case cards to decrypt full codebase features, solutions, and production statistics.
          </p>
        </div>

        {/* 4-Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioConfig.projects.map((proj) => {
            const isSelected = selectedProjectSpec === proj.id;
            const isRelHighlight = activeProjectIds.includes(proj.id);
            const isDim = selectedSkill && !isRelHighlight;

            return (
              <div
                key={proj.id}
                className={`border rounded-2xl bg-paper-node flex flex-col transition-all duration-500 ease-out overflow-hidden ${
                  isSelected
                    ? "border-accent shadow-[0_0_20px_var(--color-accent-glow)] ring-1 ring-accent/30 md:col-span-2"
                    : isRelHighlight
                    ? "border-accent ring-2 ring-accent/20 scale-102"
                    : "border-border-ink hover:border-accent"
                } ${isDim ? "opacity-35 scale-98 pointer-events-none" : "opacity-100"}`}
              >
                {/* Header card summary */}
                <div
                  onClick={() => setSelectedProjectSpec(isSelected ? null : proj.id)}
                  className="p-6 cursor-pointer flex flex-col justify-between h-48 select-none border-b border-border-ink/40 hover:bg-paper/20 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[8px] font-mono tracking-widest text-accent uppercase font-semibold">
                      <span>Secure System Report</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-ink leading-tight mt-2">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] font-sans text-ink-muted mt-1">
                      {proj.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="bg-paper border border-border-ink px-1.5 py-0.5 rounded text-[8px] font-mono text-ink">
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 4 && (
                        <span className="bg-paper border border-border-ink px-1.5 py-0.5 rounded text-[8px] font-mono text-ink-muted">
                          +{proj.techStack.length - 4}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-[9px] font-mono text-accent italic">
                      {isSelected ? "Collapse Spec" : "Decrypt Spec"}
                    </span>
                  </div>
                </div>

                {/* Expandable Specifications Sheet */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden bg-paper/25"
                    >
                      <div className="p-6 border-t border-border-ink/30 grid grid-cols-1 lg:grid-cols-2 gap-8 text-[11px] font-sans leading-relaxed">
                        {/* Left column: specs */}
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-mono text-accent uppercase block leading-none mb-1">The Question</span>
                            <p className="font-serif italic text-xs text-ink">&quot;{proj.journey.question}&quot;</p>
                          </div>

                          <div>
                            <span className="text-[9px] font-mono text-ink-muted uppercase block leading-none mb-1">Architecture Features</span>
                            <ul className="list-disc pl-3.5 space-y-1 text-ink-muted text-[10px]">
                              {proj.features.map((f, idx) => (
                                <li key={idx}>{f}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right column: metrics */}
                        <div className="space-y-4 flex flex-col justify-between">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[8px] font-mono text-ink-muted uppercase block leading-none">Roadblock Challenge</span>
                              <p className="text-[10px] text-ink block mt-1 leading-snug">{proj.journey.challenge}</p>
                            </div>
                            <div>
                              <span className="text-[8px] font-mono text-ink-muted uppercase block leading-none">Core Breakthrough</span>
                              <p className="text-[10px] text-ink block mt-1 leading-snug">{proj.journey.solution}</p>
                            </div>
                          </div>

                          <div className="bg-accent/[0.03] border border-accent/20 p-3 rounded-xl">
                            <span className="text-[8px] font-mono text-accent uppercase block leading-none font-bold">Verified Impact</span>
                            <p className="text-[10px] text-ink font-semibold mt-1 font-serif">{proj.journey.impact}</p>
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-4 py-2 border border-ink bg-ink text-paper hover:bg-accent rounded-lg text-[10px] font-mono cursor-pointer transition-colors shadow-sm"
                              >
                                <Github className="w-3.5 h-3.5" />
                                Decrypt Code Base
                              </a>
                            )}
                            {proj.reportUrl && (
                              <a
                                href={proj.reportUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 px-4 py-2 border border-accent bg-accent text-paper hover:bg-ink rounded-lg text-[10px] font-mono cursor-pointer transition-colors shadow-sm animate-pulse-glow"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                View Pentest Report
                              </a>
                            )}
                            <button
                              onClick={() => {
                                setExpandedProjects((prev) => ({ ...prev, [proj.id]: !prev[proj.id] }));
                                document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="flex items-center gap-1 px-3 py-2 border border-border-ink hover:border-accent hover:text-accent rounded-lg text-[10px] font-mono cursor-pointer bg-paper transition-colors"
                            >
                              Trace Connection Map
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5 — THE MEMORY MAP (SIGNATURE INTERACTIVE) */}
      <section id="map-section" className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-1">Section 05 // Cognitive Constellation</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
              Explore My Mind
            </h2>
            <p className="text-xs text-ink-muted font-sans mt-2 max-w-lg">
              Every project began as a question. Click nodes directly in the graph below to trace questions, learning, failures, solutions, and active labs.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-paper-node border border-border-ink px-4 py-2 rounded-xl text-[10px] font-mono text-ink">
            Status: <span className="text-accent font-semibold">Decryption Engine Enabled</span>
          </div>
        </div>

        <ReactFlowProvider>
          <MemoryMapEmbed
            expandedProjects={expandedProjects}
            handleToggleExpand={handleToggleExpand}
            selectedSkill={selectedSkill}
            handleSelectSkill={handleSelectSkill}
            handlePaneClick={handlePaneClick}
          />
        </ReactFlowProvider>
      </section>

      {/* SECTION 5.5 — TECHNICAL BLOGS */}
      <section id="blogs-section" className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        {/* JSON-LD Structured Data for BlogPosting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "What 100+ TryHackMe Labs Taught Me About Cybersecurity",
              "image": [
                "https://www.linkedin.com/pulse/what-100-tryhackme-labs-taught-me-cybersecurity-chintala-sai-varun-u2hcf/"
              ],
              "datePublished": "2026-08-01T00:00:00Z",
              "dateModified": "2026-08-01T00:00:00Z",
              "author": [{
                "@type": "Person",
                "name": "Chintala Sai Varun",
                "url": "https://www.linkedin.com/in/saivarun1/"
              }],
              "description": "Lessons learned from completing 100+ hands-on TryHackMe labs covering web security, networking, Active Directory, SOC operations, malware analysis, privilege escalation, and defensive security."
            })
          }}
        />

        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-1">
            Section 05.5 // Intelligence Archive
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
            Technical Blogs
          </h2>
          <p className="text-xs text-ink-muted font-sans mt-2 max-w-2xl">
            Sharing practical insights from cybersecurity, AI security, penetration testing, malware analysis, threat intelligence, and secure software engineering.
          </p>
        </div>

        {/* Blog Statistics Counter Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { metric: 1, label: "Articles Published", desc: "Active dossiers online" },
            { metric: 9, label: "Articles Planned", desc: "Telemetry pending" },
            { metric: 13, label: "Topics Covered", desc: "Across cybersecurity domains" },
            { metric: 8, label: "Est. Reading Time", desc: "Minutes (published content)", suffix: " min" }
          ].map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-paper-node border border-border-ink shadow-sm text-center node-theme-experiment hover:scale-102 transition-transform duration-300">
              <span className="text-2xl md:text-3xl font-serif font-bold text-accent block leading-none">
                <Counter value={stat.metric} suffix={stat.suffix} />
              </span>
              <span className="text-[10px] font-mono text-ink block mt-2 font-bold leading-tight uppercase">{stat.label}</span>
              <span className="text-[9px] font-mono text-ink-muted block mt-1 uppercase leading-none">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* Featured Article Section */}
        {portfolioConfig.blogs.filter(b => b.isFeatured && !b.comingSoon && (selectedBlogCategory === "All" || b.category === selectedBlogCategory) && (blogSearchQuery === "" || b.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) || b.description.toLowerCase().includes(blogSearchQuery.toLowerCase()) || b.topics.some(t => t.toLowerCase().includes(blogSearchQuery.toLowerCase())))).map((blog) => (
          <div key={blog.id} className="mb-12 border border-accent/30 bg-paper-node rounded-2xl p-6 md:p-8 shadow-[0_0_20px_var(--color-accent-glow)] ring-1 ring-accent/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Featured Cover Image */}
              <div className="lg:col-span-5 relative w-full aspect-video lg:aspect-square max-h-[360px] rounded-xl overflow-hidden border border-border-ink/30 bg-paper/50">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-accent text-paper text-[8px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                    Featured
                  </span>
                  <span className="bg-ink text-paper text-[8px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-border-ink/20">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Featured Meta & Info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-4 text-[9px] font-mono text-ink-muted uppercase">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-accent" />
                    {blog.publishedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-accent" />
                    {blog.readingTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight">
                  {blog.title}
                </h3>

                <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed text-justify">
                  {blog.description}
                </p>

                {/* Topics pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {blog.topics.map((topic, index) => (
                    <span key={index} className="bg-paper border border-border-ink px-2 py-0.5 rounded text-[8px] font-mono text-ink">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Read Button */}
                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href={blog.readUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-6 py-3 bg-ink text-paper hover:bg-accent hover:shadow-[0_0_15px_var(--color-accent-glow)] border border-transparent rounded-full text-xs font-mono tracking-wider cursor-pointer shadow transition-all duration-300 hover:scale-102"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Article
                  </a>
                  {blog.githubUrl && blog.githubUrl !== "#" && (
                    <a
                      href={blog.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-5 py-3 border border-border-ink bg-paper-node/50 hover:border-accent hover:text-accent rounded-full text-xs font-mono tracking-wider cursor-pointer transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      GitHub Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Search and Filters Controller */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-b border-border-ink/20 py-6 mb-8 bg-paper-node/15 px-4 rounded-2xl">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 max-w-2xl">
            {["All", "Cybersecurity", "AI Security", "Application Security", "Threat Intelligence", "Malware Analysis", "Cloud Security", "Career"].map((cat) => {
              const isSelected = selectedBlogCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedBlogCategory(cat)}
                  aria-label={`Filter by ${cat}`}
                  className={`text-[9px] font-mono px-3 py-1.5 rounded-full transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "text-accent bg-accent/5 border-accent/25 font-bold shadow-sm"
                      : "text-ink-muted border-border-ink/15 bg-paper/30 hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Text Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted/50" />
            <input
              type="text"
              placeholder="Search threat reports..."
              aria-label="Search articles"
              value={blogSearchQuery}
              onChange={(e) => setBlogSearchQuery(e.target.value)}
              className="w-full bg-paper border border-border-ink/80 focus:border-accent pl-9 pr-4 py-2.5 rounded-full text-xs font-sans text-ink outline-none transition-colors"
            />
          </div>
        </div>

        {/* Blog Post List (Filtered Grid) */}
        {filteredBlogs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center py-12">
            <Terminal className="w-10 h-10 text-ink-muted/50 mb-3 animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-ink mb-1">No Decrypted Telemetry</h3>
            <p className="text-[10px] font-mono text-ink-muted uppercase max-w-xs">
              Search query did not yield matches in the current dossier logs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => {
              if (blog.isFeatured && !blog.comingSoon) return null; // Featured article is already rendered above in its full block

              return (
                <article
                  key={blog.id}
                  className={`border border-border-ink bg-paper-node rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 select-none ${
                    blog.comingSoon
                      ? "opacity-60 grayscale-[40%] node-theme-career"
                      : "hover:border-accent hover:scale-[1.01] hover:shadow-[0_0_15px_var(--color-accent-glow)] node-theme-skill"
                  }`}
                >
                  <div>
                    {/* Header category and coming soon */}
                    <div className="flex justify-between items-center text-[8px] font-mono tracking-widest uppercase font-semibold border-b border-border-ink/30 pb-2 mb-3">
                      <span className="text-ink-muted">{blog.category}</span>
                      {blog.comingSoon ? (
                        <span className="text-accent animate-pulse font-bold px-1.5 py-0.5 rounded bg-accent/5 border border-accent/25">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      )}
                    </div>

                    <h4 className="font-serif text-sm font-bold text-ink leading-tight mb-2 min-h-[38px] group-hover:text-accent">
                      {blog.title}
                    </h4>

                    {/* Metadata dates */}
                    <div className="flex items-center gap-3 text-[8px] font-mono text-ink-muted uppercase mb-3">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-2.5 h-2.5" />
                        {blog.publishedDate}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {blog.readingTime}
                      </span>
                    </div>

                    <p className="font-sans text-[11px] text-ink-muted leading-relaxed mb-4 text-justify min-h-[66px]">
                      {blog.description}
                    </p>
                  </div>

                  <div>
                    {/* Topics tags */}
                    <div className="flex flex-wrap gap-1 mb-4 border-t border-border-ink/20 pt-3">
                      {blog.topics.map((topic, tIdx) => (
                        <span key={tIdx} className="bg-paper border border-border-ink/30 px-1.5 py-0.5 rounded text-[8px] font-mono text-ink-muted">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Read Action Button */}
                    <div className="flex items-center gap-2">
                      <a
                        href={blog.readUrl}
                        aria-label={`Read ${blog.title}`}
                        onClick={(e) => {
                          if (blog.comingSoon) {
                            e.preventDefault();
                          } else {
                            playAudioTick(1200, 0.05);
                          }
                        }}
                        className={`flex-1 text-center py-2 rounded-lg text-[9px] font-mono cursor-pointer transition-colors ${
                          blog.comingSoon
                            ? "bg-border-ink/20 text-ink-muted/50 border border-border-ink/20 cursor-not-allowed"
                            : "bg-ink text-paper hover:bg-accent border border-transparent"
                        }`}
                      >
                        {blog.comingSoon ? "Telemetry Pending" : "Decrypt Article"}
                      </a>
                      {blog.githubUrl && blog.githubUrl !== "#" && !blog.comingSoon && (
                        <a
                          href={blog.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 border border-border-ink hover:border-accent hover:text-accent rounded-lg bg-paper cursor-pointer transition-colors"
                          title="View Source on GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 6 — EXPERIENCE & SECTION 7 — EDUCATION & SECTION 8 — CERTIFICATIONS */}
      <section className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Section 6: Experience */}
          <div id="experience-section" className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block">Section 06 // Work History</span>
            <h2 className="font-serif text-2xl font-light text-ink">Professional Record</h2>
            
            <div className="p-5 rounded-2xl bg-paper-node border border-border-ink space-y-4 shadow-sm node-theme-career">
              <div className="border-b border-border-ink/40 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-base font-bold text-ink leading-tight">{portfolioConfig.internship.role}</h3>
                  <p className="text-[10px] text-ink-muted font-medium mt-0.5">{portfolioConfig.internship.company}</p>
                </div>
                <span className="text-[9px] font-mono text-ink-muted">{portfolioConfig.internship.duration}</span>
              </div>

              <ul className="list-disc pl-4 space-y-2 text-[10px] text-ink-muted leading-relaxed">
                {portfolioConfig.internship.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>

              <div className="border-t border-border-ink/40 pt-3 flex flex-wrap gap-1">
                {portfolioConfig.internship.techStack.map((tech, idx) => (
                  <span key={idx} className="bg-paper border border-border-ink px-1.5 py-0.5 rounded text-[8px] font-mono text-ink">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 7: Education */}
          <div id="education-section" className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block">Section 07 // Academics</span>
            <h2 className="font-serif text-2xl font-light text-ink">Academic Dossier</h2>

            <div className="p-5 rounded-2xl bg-paper-node border border-border-ink space-y-4 shadow-sm node-theme-project">
              <div className="border-b border-border-ink/40 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-base font-bold text-ink leading-tight">{portfolioConfig.education.degree}</h3>
                  <p className="text-[10px] text-ink-muted font-medium mt-0.5">{portfolioConfig.education.major}</p>
                </div>
                <span className="text-[9px] font-mono text-ink-muted">{portfolioConfig.education.duration}</span>
              </div>

              <div className="bg-accent/5 p-3 border border-accent/20 rounded-xl">
                <span className="text-[8px] font-mono text-accent uppercase font-bold leading-none block">Scholastic Index</span>
                <span className="text-lg font-serif font-bold text-ink block mt-1 leading-none">CGPA: {portfolioConfig.education.highlights[0].match(/[\d.]+/)?.[0] || "9.56"}/10</span>
                <span className="text-[8px] font-mono text-ink-muted block mt-1 uppercase">Koneru Lakshmaiah Education Foundation</span>
              </div>

              <ul className="list-disc pl-4 space-y-1.5 text-[10px] text-ink-muted leading-relaxed">
                {portfolioConfig.education.highlights.slice(1).map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>

              <div className="border-t border-border-ink/40 pt-3">
                <span className="text-[8px] font-mono text-ink-muted block mb-1 uppercase">Coursework</span>
                <div className="flex flex-wrap gap-1">
                  {portfolioConfig.education.coursework.map((c, idx) => (
                    <span key={idx} className="bg-paper border border-border-ink px-1.5 py-0.5 rounded text-[8px] font-mono text-ink">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Certifications */}
          <div id="certifications-section" className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block">Section 08 // Verification Ledger</span>
            <h2 className="font-serif text-2xl font-light text-ink">Certifications</h2>

            <div className="space-y-3">
              {portfolioConfig.developer.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-paper-node border border-border-ink flex justify-between items-center shadow-sm node-theme-skill">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-accent" />
                      <h4 className="font-serif text-xs font-bold text-ink leading-snug">{cert.name}</h4>
                    </div>
                    <p className="text-[9px] text-ink-muted font-mono uppercase tracking-wider mt-1">{cert.issuer}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 border border-border-ink hover:border-accent hover:text-accent rounded bg-paper cursor-pointer transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9 — ACHIEVEMENTS & SECTION 10 — DIGITAL FOOTPRINT */}
      <section id="footprint-section" className="max-w-6xl mx-auto px-6 py-24 select-none border-b border-border-ink/15">
        <div className="mb-12">
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-1">Section 09 & 10 // Diagnostic Telemetry</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
            Digital Footprint Intelligence
          </h2>
          <p className="text-xs text-ink-muted font-sans mt-2">
            Subject activities and learning speeds verified across active platforms.
          </p>
        </div>

        {/* Section 9: Live Achievements Cards (Animate into Viewport) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { metric: "400+", label: "DSA Problems Solved", desc: "LeetCode & CodeChef" },
            { metric: "100+", label: "THM Labs Completed", desc: "Practical Threat Hunting" },
            { metric: "AWS Certified", label: "Cloud Practitioner", desc: "Infrastructure Basics" },
            { metric: "1426", label: "CodeChef Rating", desc: "Algorithmic Challenges" }
          ].map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-paper-node border border-border-ink shadow-sm text-center node-theme-experiment hover:scale-102 transition-transform duration-300">
              <span className="text-2xl md:text-3xl font-serif font-bold text-accent block leading-none">{stat.metric}</span>
              <span className="text-[10px] font-mono text-ink block mt-2 font-bold leading-tight uppercase">{stat.label}</span>
              <span className="text-[9px] font-mono text-ink-muted block mt-1 uppercase leading-none">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* Section 10: Platform Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* GitHub Panel */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-paper-node border border-border-ink space-y-4 shadow-sm node-theme-github">
            <div className="flex items-center justify-between border-b border-border-ink/40 pb-3">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-ink" />
                <h3 className="font-serif text-base font-bold text-ink leading-none">GitHub Repository Stream</h3>
              </div>
              <a
                href={portfolioConfig.developer.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] font-mono text-accent hover:text-ink-muted flex items-center gap-1 cursor-pointer"
              >
                Explore Archive
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-4 text-xs md:text-sm font-sans">
              <div className="grid grid-cols-2 gap-4 bg-paper/40 p-4 rounded-xl border border-border-ink/10">
                <div>
                  <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase leading-none font-bold">Total Repositories</span>
                  <span className="text-2xl md:text-3xl font-serif font-bold text-ink block mt-1.5 leading-none">{portfolioConfig.githubStats.repos} Repos</span>
                </div>
                <div>
                  <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase leading-none font-bold">Commit Activity</span>
                  <span className="text-xl md:text-2xl font-serif font-bold text-ink block mt-1.5 leading-tight">{portfolioConfig.githubStats.commits}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase block mb-1 font-bold">Most Employed Languages</span>
                <div className="space-y-2 pt-1">
                  {[
                    { lang: "Java (Backend microservices)", pct: "55%", color: "bg-accent" },
                    { lang: "Python (ML classification & forensics)", pct: "30%", color: "bg-ink-muted" },
                    { lang: "C / SQL (Low level & storage)", pct: "15%", color: "bg-border-ink" }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-ink">
                        <span>{item.lang}</span>
                        <span>{item.pct}</span>
                      </div>
                      <div className="h-1.5 bg-border-ink/20 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TryHackMe Intelligence Panel */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-paper-node border border-border-ink space-y-4 shadow-sm node-theme-experiment">
            <div className="flex items-center justify-between border-b border-border-ink/40 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-base font-bold text-ink leading-none">TryHackMe Cybersecurity Log</h3>
              </div>
              <a
                href={portfolioConfig.developer.tryhackmeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] font-mono text-accent hover:text-ink-muted flex items-center gap-1 cursor-pointer"
              >
                Inspect Research Log
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-4 text-xs md:text-sm font-sans">
              <div className="grid grid-cols-2 gap-4 bg-paper/40 p-4 rounded-xl border border-border-ink/10">
                <div>
                  <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase leading-none font-bold">Security Rank</span>
                  <span className="text-2xl md:text-3xl font-serif font-bold text-accent block mt-1.5 leading-none">Top 10%</span>
                </div>
                <div>
                  <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase leading-none font-bold">Rooms Audited</span>
                  <span className="text-2xl md:text-3xl font-serif font-bold text-ink block mt-1.5 leading-none">100+ Rooms</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] md:text-xs font-mono text-ink-muted uppercase block mb-1 font-bold">Cybersecurity Domains Explored</span>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {["Threat Hunting", "Network Security", "Web Security", "Malware Analysis", "Privilege Escalation", "SOC Auditing"].map((domain, idx) => (
                    <span key={idx} className="bg-paper border border-border-ink/45 px-2.5 py-1 rounded text-xs font-mono text-ink">
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 11 — CONTACT */}
      <section id="contact-section" className="max-w-6xl mx-auto px-6 py-24 select-none pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block">Section 11 // Intake Form</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink leading-tight">
              Establish Defensive Channels.
            </h2>
            <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed text-justify">
              I am actively seeking secure systems engineering, Java/Spring Boot backend, and cybersecurity research roles.
            </p>
            
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/25 flex items-center justify-between">
              <span className="text-[9px] font-mono text-accent uppercase tracking-widest font-bold">Intake status</span>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-ink bg-paper border border-border-ink px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Open For Intake
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[8px] font-mono text-ink-muted block uppercase">Secure Email Connection</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-between w-full px-4 py-3 bg-paper-node border border-border-ink hover:border-accent hover:text-accent rounded-xl text-xs font-mono transition-colors duration-200 cursor-pointer"
              >
                <span>{portfolioConfig.developer.email}</span>
                <span className="text-[10px] text-accent italic">
                  {emailCopied ? "Copied Successfully" : "Copy to clipboard"}
                </span>
              </button>
            </div>
          </div>

          {/* Right Intake Terminal Form */}
          <div className="lg:col-span-7 bg-paper-node border border-border-ink p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
              <Mail className="w-16 h-16 text-border-ink" />
            </div>

            <span className="text-[10px] font-mono tracking-widest text-accent uppercase block font-semibold border-b border-border-ink/40 pb-3 mb-6">
              Establish Communications Link
            </span>

            {formSubmitted ? (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 animate-text-fade">
                <CheckCircle className="w-12 h-12 text-accent" />
                <h3 className="font-serif text-lg font-bold text-ink">Transmission Transmitted</h3>
                <p className="text-[10px] font-mono text-ink-muted uppercase max-w-xs">
                  Your details have been successfully compiled and sent. Varun will react shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="text-[9px] font-mono text-ink-muted uppercase block leading-none">Sender Name</label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full bg-paper border border-border-ink/80 focus:border-accent px-4 py-3.5 rounded-xl text-ink outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="text-[9px] font-mono text-ink-muted uppercase block leading-none">Response Channel (Email)</label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full bg-paper border border-border-ink/80 focus:border-accent px-4 py-3.5 rounded-xl text-ink outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message-input" className="text-[9px] font-mono text-ink-muted uppercase block leading-none">Dossier Request / Message</label>
                  <textarea
                    id="message-input"
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Enter transmission payload details..."
                    className="w-full bg-paper border border-border-ink/80 focus:border-accent px-4 py-3.5 rounded-xl text-ink outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  id="submit-contact"
                  type="submit"
                  className="w-full py-3.5 bg-ink text-paper hover:bg-accent border border-transparent rounded-xl text-xs font-mono font-bold tracking-widest cursor-pointer transition-colors shadow-sm uppercase mt-4"
                >
                  Send Transmission Diagnostic
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
