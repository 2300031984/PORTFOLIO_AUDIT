"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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

import { portfolioConfig, Project, BuildLogYear, CurrentExperiment, ProofItem } from "@/config/portfolio";
import CentralNode from "@/components/nodes/CentralNode";
import CategoryBranchNode from "@/components/nodes/CategoryBranchNode";
import ProjectNode from "@/components/nodes/ProjectNode";
import JourneyNode from "@/components/nodes/JourneyNode";
import SkillNode from "@/components/nodes/SkillNode";
import GithubNode from "@/components/nodes/GithubNode";
import CareerNode from "@/components/nodes/CareerNode";
import ExperimentNode from "@/components/nodes/ExperimentNode";
import BuildLogNode from "@/components/nodes/BuildLogNode";
import ProofNode from "@/components/nodes/ProofNode";

import ThemeToggle from "@/components/ui/ThemeToggle";
import GraphControls from "@/components/ui/GraphControls";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import CognitiveScan from "@/components/ui/CognitiveScan";
import ProjectDetailDrawer from "@/components/ui/ProjectDetailDrawer";

import {
  ExternalLink,
  Award,
  Terminal,
  Volume2,
  VolumeX,
  BookOpen,
  Code2,
  Cpu,
  History,
  Compass,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Copy
} from "lucide-react";

// Register all custom mind-map node types
const nodeTypes = {
  central: CentralNode,
  category: CategoryBranchNode,
  project: ProjectNode,
  journey: JourneyNode,
  skill: SkillNode,
  github: GithubNode,
  career: CareerNode,
  experiment: ExperimentNode,
  buildlog: BuildLogNode,
  proof: ProofNode,
};

function MemoryMapEmbed({
  expandedProjects,
  selectedCategory,
  handleSelectCategory,
  selectedSkill,
  handleSelectSkill,
  handleSelectProjectForDrawer,
  handlePaneClick,
  className
}: {
  expandedProjects: Record<string, boolean>;
  handleToggleExpand: (id: string) => void;
  selectedCategory: string | null;
  handleSelectCategory: (id: string | null) => void;
  selectedSkill: string | null;
  handleSelectSkill: (id: string) => void;
  handleSelectProjectForDrawer: (proj: Project) => void;
  handlePaneClick: () => void;
  className?: string;
}) {
  // Generate nodes and edges dynamically based on portfolio config and selection state
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

    // 7 Major Category Branch Nodes surrounding Central Node
    const categoryBranches: {
      id: string;
      title: string;
      category: "software" | "ai" | "security" | "cloud" | "buildlog" | "experiments" | "proof";
      subtext: string;
      x: number;
      y: number;
    }[] = [
      { id: "cat-software", title: "SOFTWARE ENGINEERING", category: "software", subtext: "Java, Spring Boot, REST APIs, Python, Microservices", x: -440, y: -180 },
      { id: "cat-ai", title: "AI & AGENTIC WORKFLOWS", category: "ai", subtext: "Gemini API, LangChain, RAG, ChromaDB", x: 440, y: -180 },
      { id: "cat-security", title: "CYBERSECURITY & APPSEC", category: "security", subtext: "OWASP WSTG, Pentest, Threat Intel, HashLens", x: -440, y: 180 },
      { id: "cat-cloud", title: "CLOUD & DEVOPS", category: "cloud", subtext: "AWS Certified (981/1000), Docker, K8s, CI/CD", x: 440, y: 180 },
      { id: "cat-buildlog", title: "BUILD LOG", category: "buildlog", subtext: "2026, 2025, 2024 Timeline & Work Milestones", x: 0, y: -340 },
      { id: "cat-experiments", title: "RESEARCH LABS", category: "experiments", subtext: "Active AI, Security, & System Experiments", x: -240, y: 380 },
      { id: "cat-proof", title: "PROOF OF WORK", category: "proof", subtext: "AWS 981/1000, 100+ THM, 400+ Algorithmic Solved", x: 240, y: 380 },
    ];

    categoryBranches.forEach((branch) => {
      const isSelected = selectedCategory === branch.id;
      listNodes.push({
        id: branch.id,
        type: "category",
        position: { x: branch.x, y: branch.y },
        data: {
          title: branch.title,
          category: branch.category,
          subtext: branch.subtext,
          isSelected,
          onSelect: () => handleSelectCategory(isSelected ? null : branch.id),
        },
      });

      listEdges.push({
        id: `edge-central-to-${branch.id}`,
        source: "central-node",
        target: branch.id,
        className: isSelected ? "active animate-pulse-glow" : "dimmed opacity-60",
      });
    });

    // Career History Nodes
    listNodes.push({
      id: "career-internship",
      type: "career",
      position: { x: -680, y: -40 },
      data: {
        type: "experience",
        title: portfolioConfig.internship.company,
        subTitle: portfolioConfig.internship.role,
        duration: portfolioConfig.internship.duration,
        onClick: () => {
          document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });

    listNodes.push({
      id: "career-education",
      type: "career",
      position: { x: -680, y: 80 },
      data: {
        type: "education",
        title: portfolioConfig.education.institution,
        subTitle: portfolioConfig.education.degree + " - CGPA 9.56",
        duration: portfolioConfig.education.duration,
        onClick: () => {
          document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
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

    // Active Projects List
    const activeProjectIds: string[] = [];
    if (selectedSkill) {
      const skillCluster = portfolioConfig.skills.find((s) => s.id === selectedSkill);
      if (skillCluster) {
        activeProjectIds.push(...skillCluster.relatedProjects);
      }
    }

    // Projects Arc
    const totalProjects = portfolioConfig.projects.length;
    portfolioConfig.projects.forEach((proj, idx) => {
      const isExpanded = !!expandedProjects[proj.id];
      const isActive = selectedSkill ? activeProjectIds.includes(proj.id) : false;
      const isDimmed = selectedSkill ? !activeProjectIds.includes(proj.id) : false;

      const frac = totalProjects > 1 ? idx / (totalProjects - 1) : 0.5;
      const px = Math.round(-720 + frac * 1440);
      const normX = px / 720;
      const py = Math.round(-480 + normX * normX * 160);

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
          onToggleExpand: () => handleSelectProjectForDrawer(proj),
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

          if (px < -350) {
            jx = px - 180 - jIdx * 240;
            jy = py + (jIdx % 2 === 0 ? -30 : 30);
          } else if (px < -100) {
            jx = px - 100 - jIdx * 220;
            jy = py - 140 - jIdx * 60;
          } else if (px <= 100) {
            jx = px + (jIdx % 2 === 0 ? -80 : 80);
            jy = py - 150 - jIdx * 160;
          } else if (px <= 350) {
            jx = px + 100 + jIdx * 220;
            jy = py - 140 - jIdx * 60;
          } else {
            jx = px + 180 + jIdx * 240;
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

    // Skills Clusters
    portfolioConfig.skills.forEach((skill, idx) => {
      const isHighlighted = selectedSkill === skill.id;
      const isDimmed = selectedSkill ? selectedSkill !== skill.id : false;

      let sx = 0;
      let sy = 0;
      if (idx === 0) { sx = -560; sy = 240; }
      else if (idx === 1) { sx = -280; sy = 240; }
      else if (idx === 2) { sx = 280; sy = 240; }
      else if (idx === 3) { sx = 560; sy = 240; }
      else if (idx === 4) { sx = -160; sy = 480; }
      else if (idx === 5) { sx = 160; sy = 480; }

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

    // Build Log Milestone Nodes
    portfolioConfig.buildLog.forEach((yearItem, idx) => {
      const bx = -460 + idx * 460;
      const by = -560;
      listNodes.push({
        id: `buildlog-${yearItem.year}`,
        type: "buildlog",
        position: { x: bx, y: by },
        data: {
          year: yearItem.year,
          summary: yearItem.summary,
          itemCount: yearItem.items.length,
          onClickYear: () => {
            document.getElementById("buildlog-section")?.scrollIntoView({ behavior: "smooth" });
          },
        },
      });

      listEdges.push({
        id: `edge-cat-buildlog-to-${yearItem.year}`,
        source: "cat-buildlog",
        target: `buildlog-${yearItem.year}`,
        className: "dimmed opacity-60",
      });
    });

    // Verified Proof Nodes
    const topProofs = portfolioConfig.proof.slice(0, 4);
    topProofs.forEach((p, idx) => {
      const px = -520 + idx * 340;
      const py = 600;
      listNodes.push({
        id: `proof-${p.id}`,
        type: "proof",
        position: { x: px, y: py },
        data: {
          title: p.title,
          category: p.category,
          detail: p.detail,
          highlight: p.highlight,
          verificationLink: p.verificationLink,
          onClick: () => {
            document.getElementById("proof-section")?.scrollIntoView({ behavior: "smooth" });
          },
        },
      });

      listEdges.push({
        id: `edge-cat-proof-to-${p.id}`,
        source: "cat-proof",
        target: `proof-${p.id}`,
        className: "dimmed opacity-45",
      });
    });

    // Github Stats Node
    listNodes.push({
      id: "github-stats",
      type: "github",
      position: { x: 680, y: -40 },
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
  }, [expandedProjects, selectedCategory, selectedSkill, handleSelectCategory, handleSelectSkill, handleSelectProjectForDrawer]);

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  useEffect(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges, setRfNodes, setRfEdges]);

  return (
    <div className={className || "w-full h-[650px] border border-border-ink rounded-2xl relative overflow-hidden bg-paper-node/30 shadow-inner"}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15, minZoom: 0.3, maxZoom: 1.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        zoomOnScroll={false}
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

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [cognitiveScanActive, setCognitiveScanActive] = useState(false);
  
  // Dynamic UI States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [selectedDrawerProject, setSelectedDrawerProject] = useState<Project | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("hero-section");

  // Audio feedback state
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

  useEffect(() => {
    setMounted(true);

    const sections = [
      "hero-section",
      "map-section",
      "buildlog-section",
      "projects-section",
      "experiments-section",
      "proof-section",
      "skills-section",
      "about-section",
      "blogs-section",
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

  const handleToggleExpand = useCallback((projectId: string) => {
    setExpandedProjects((prev) => {
      const isCurrentlyExpanded = !prev[projectId];
      if (isCurrentlyExpanded) {
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

  const handleSelectCategory = useCallback((catId: string | null) => {
    setSelectedCategory(catId);
    if (catId) playAudioTick(783.99, 0.06);
  }, [playAudioTick]);

  const handlePaneClick = useCallback(() => {
    setSelectedSkill(null);
    setSelectedCategory(null);
    playAudioTick(440, 0.03, "sine");
  }, [playAudioTick]);

  const handleSelectProjectForDrawer = useCallback((proj: Project) => {
    setSelectedDrawerProject(proj);
    playAudioTick(880, 0.08);
  }, [playAudioTick]);

  const publishedBlogs = useMemo(() => {
    return (portfolioConfig.blogs || []).filter((blog) => !blog.comingSoon);
  }, []);

  if (!mounted) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-paper text-ink paper-texture select-none">
        <div className="flex flex-col items-center text-center max-w-sm px-4">
          <span className="text-accent font-serif italic text-lg mb-1 animate-pulse">
            Decrypting System Mind Map
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink mb-3">
            {portfolioConfig.developer.name}
          </h1>
          <div className="text-ink-muted font-serif italic text-sm space-y-1 opacity-80">
            <p>&quot;Every system leaves traces. Every trace tells a story.&quot;</p>
            <p>&quot;A map of the systems I&apos;ve built, studied, secured, and explored.&quot;</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink paper-texture font-sans selection:bg-accent/20">
      {/* Decorative watercolor background */}
      <div className="watercolor-bg" />

      {/* Top System Status Bar */}
      <div className="w-full bg-paper-node/90 border-b border-border-ink/40 py-1.5 px-4 text-[10px] font-mono flex items-center justify-between text-ink-muted relative z-50">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-accent font-bold">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            SYSTEM {portfolioConfig.systemStatus.status}
          </span>
          <span className="hidden sm:inline text-border-ink">|</span>
          <span className="hidden sm:inline font-semibold text-ink">
            FOCUS: {portfolioConfig.systemStatus.focus}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline italic text-ink-muted">
            BUILDING: {portfolioConfig.systemStatus.currentlyBuilding}
          </span>
          <span className="text-border-ink hidden md:inline">|</span>
          <span className="text-accent font-semibold">
            UPDATED: {portfolioConfig.systemStatus.lastUpdated}
          </span>
        </div>
      </div>

      {/* Dynamic Navigation bar */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-3.5 bg-paper/90 backdrop-blur-md border-b border-border-ink/40">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-accent" />
          <span className="text-xs font-mono tracking-widest text-ink uppercase font-bold">
            Sai Varun // System Mind Map 2.0
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-paper-node/80 border border-border-ink/50 p-1 rounded-full shadow-sm">
          {[
            { label: "Profile", id: "hero-section" },
            { label: "Mind Map", id: "map-section" },
            { label: "Build Log", id: "buildlog-section" },
            { label: "Projects", id: "projects-section" },
            { label: "Experiments", id: "experiments-section" },
            { label: "Proof", id: "proof-section" },
            { label: "Capabilities", id: "skills-section" },
            { label: "About", id: "about-section" },
            { label: "Publications", id: "blogs-section" },
            { label: "Contact", id: "contact-section" }
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
                    ? "text-accent bg-accent/10 border-accent/30 font-semibold"
                    : "text-ink-muted hover:text-ink hover:bg-paper/40 border-transparent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full border border-border-ink bg-paper-node hover:border-accent hover:text-accent text-ink cursor-pointer transition-colors"
            title={soundEnabled ? "Mute interface feedback" : "Unmute interface feedback"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-accent" /> : <VolumeX className="w-4 h-4 text-ink-muted" />}
          </button>

          <button
            onClick={() => {
              playAudioTick(880, 0.05);
              setCognitiveScanActive(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 transition-all cursor-pointer text-xs font-mono font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Cognitive Scan
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <ParticleCanvas />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-ink bg-paper-node/80 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-xs font-mono tracking-widest text-ink uppercase font-semibold">
              Computer Science Engineer &bull; Software &bull; AI &bull; Security &bull; Cloud
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-ink">
            {portfolioConfig.developer.name}
          </h1>

          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {portfolioConfig.developer.specializations.map((spec, idx) => (
              <span key={idx} className="text-xs font-mono px-3 py-1 rounded-md border border-border-ink/60 bg-paper-node/60 text-accent font-semibold">
                {spec}
              </span>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-border-ink/60 bg-paper-node/40 backdrop-blur-md shadow-sm max-w-xl mx-auto space-y-2">
            <p className="font-serif italic text-base md:text-lg text-ink">
              &quot;Every system leaves traces. Every trace tells a story.&quot;
            </p>
            <p className="font-serif italic text-xs md:text-sm text-ink-muted">
              &quot;A map of the systems I&apos;ve built, studied, secured, and explored across Software, AI, Cybersecurity, and Cloud.&quot;
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-3 rounded-xl border border-border-ink/40 bg-paper-node/40">
              <span className="text-xl font-serif font-bold text-accent block">9.56</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase">Academic CGPA</span>
            </div>
            <div className="p-3 rounded-xl border border-border-ink/40 bg-paper-node/40">
              <span className="text-xl font-serif font-bold text-accent block">981/1000</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase">AWS Certified</span>
            </div>
            <div className="p-3 rounded-xl border border-border-ink/40 bg-paper-node/40">
              <span className="text-xl font-serif font-bold text-accent block">100+</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase">THM Security Labs</span>
            </div>
            <div className="p-3 rounded-xl border border-border-ink/40 bg-paper-node/40">
              <span className="text-xl font-serif font-bold text-accent block">400+</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase">DSA Challenges</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <button
              onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full bg-ink text-paper hover:bg-accent font-serif text-sm transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
            >
              Explore Interactive Mind Map
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full border border-border-ink bg-paper-node hover:border-accent text-ink font-serif text-sm transition-all duration-300 cursor-pointer"
            >
              View Projects &amp; Architecture
            </button>
          </div>
        </div>
      </section>

      {/* CENTRAL INTERACTIVE MIND MAP SECTION */}
      <section id="map-section" className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-border-ink/40 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
                Navigation &amp; System Architecture Layer
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              Interactive Cognitive Mind Map 2.0
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-ink-muted max-w-md">
            The mind-map serves as the primary navigation. Click branch nodes to explore domains, click project nodes to decrypt complete technical dossiers, or recenter with graph controls.
          </p>
        </div>

        <ReactFlowProvider>
          <MemoryMapEmbed
            expandedProjects={expandedProjects}
            handleToggleExpand={handleToggleExpand}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
            selectedSkill={selectedSkill}
            handleSelectSkill={handleSelectSkill}
            handleSelectProjectForDrawer={handleSelectProjectForDrawer}
            handlePaneClick={handlePaneClick}
            className="w-full h-[680px] border border-border-ink rounded-3xl relative overflow-hidden bg-paper-node/30 shadow-lg"
          />
        </ReactFlowProvider>
      </section>

      {/* BUILD LOG SECTION */}
      <section id="buildlog-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-5 h-5 text-accent" />
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
            Chronological Work Timeline
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          Build Log
        </h2>
        <p className="font-sans text-sm text-ink-muted max-w-2xl mb-10">
          A year-by-year chronicle of engineered systems, security assessments, AI agent implementations, and foundational milestones.
        </p>

        <div className="space-y-12">
          {portfolioConfig.buildLog.map((yearLog: BuildLogYear) => (
            <div key={yearLog.year} className="p-6 md:p-8 rounded-3xl border border-border-ink bg-paper-node/40 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border-ink/40 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-accent">
                    {yearLog.year}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-border-ink bg-paper-node font-semibold">
                    {yearLog.items.length} Major Milestones
                  </span>
                </div>
                <p className="font-serif italic text-xs md:text-sm text-ink-muted">
                  {yearLog.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {yearLog.items.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl border border-border-ink/60 bg-paper/60 space-y-3 hover:border-accent transition-colors">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-accent font-bold uppercase">{item.category}</span>
                      <span className="text-ink-muted">{item.period}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-ink leading-tight">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-ink-muted leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border-ink/30">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded border border-border-ink/40 bg-paper-node text-ink-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-accent hover:underline inline-flex items-center gap-1 font-bold"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="w-5 h-5 text-accent" />
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
            Architectures &amp; Technical Systems
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          Featured Engineering Works
        </h2>
        <p className="font-sans text-sm text-ink-muted max-w-2xl mb-10">
          Click any project card to open its technical dossier complete with system architecture flow diagrams, security controls, and journey milestones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.projects.map((proj: Project) => (
            <div
              key={proj.id}
              onClick={() => handleSelectProjectForDrawer(proj)}
              className="p-6 rounded-3xl border border-border-ink bg-paper-node/50 hover:border-accent cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-bold">
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted group-hover:text-accent transition-colors">
                    Click to Open Dossier &rarr;
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-ink leading-tight group-hover:text-accent transition-colors">
                  {proj.title}
                </h3>

                <p className="font-sans text-xs text-ink-muted leading-relaxed line-clamp-3">
                  {proj.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-ink/40 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded border border-border-ink/40 bg-paper text-ink-muted">
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="text-[10px] font-mono text-accent">+{proj.techStack.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-accent font-bold pt-1">
                  <span>View Architecture Flow</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIMENTS & RESEARCH LABS SECTION */}
      <section id="experiments-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
            Active Research &amp; Prototyping
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          Experiments &amp; Technical Labs
        </h2>
        <p className="font-sans text-sm text-ink-muted max-w-2xl mb-10">
          Targeted technical investigations into AI agent swarms, vector RAG retrieval optimization, container security, honeypots, and stateful ledger systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.experiments.map((exp: CurrentExperiment) => (
            <div key={exp.id} className="p-6 rounded-3xl border border-border-ink bg-paper-node/50 space-y-4 shadow-sm hover:border-accent transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-accent">
                  {exp.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>

              <h3 className="font-serif text-lg font-bold text-ink leading-tight">
                {exp.title}
              </h3>

              <div className="space-y-2 text-xs font-sans text-ink leading-relaxed">
                <div>
                  <span className="text-[9px] font-mono text-accent uppercase block font-bold">Research Question</span>
                  <p className="font-serif italic text-xs text-ink">&quot;{exp.researchQuestion}&quot;</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-ink-muted uppercase block font-bold">Current Progress</span>
                  <p className="text-ink-muted text-xs">{exp.progress}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-ink-muted uppercase block font-bold">Future Direction</span>
                  <p className="text-ink-muted text-xs">{exp.futureDirection}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF OF WORK & VERIFIED CREDENTIALS SECTION */}
      <section id="proof-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-accent" />
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
            Verified Credentials &amp; Accomplishments
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          Proof of Work
        </h2>
        <p className="font-sans text-sm text-ink-muted max-w-2xl mb-10">
          Strictly verified technical certifications, practical security labs, competitive programming metrics, and academic leadership.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioConfig.proof.map((item: ProofItem) => (
            <div key={item.id} className="p-5 rounded-2xl border border-border-ink bg-paper-node/50 space-y-3 flex flex-col justify-between hover:border-accent transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-accent uppercase px-2 py-0.5 rounded bg-accent/10">
                    {item.category}
                  </span>
                  {item.verificationLink && (
                    <a
                      href={item.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted hover:text-accent transition-colors"
                      title="Verify Credential"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h3 className="font-serif text-base font-bold text-ink leading-tight">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-ink-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-border-ink/30 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-accent">{item.highlight}</span>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS CONSTELLATION SECTION */}
      <section id="skills-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-accent" />
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
            Technical Capabilities
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          Skills Constellation
        </h2>
        <p className="font-sans text-sm text-ink-muted max-w-2xl mb-10">
          Core technical proficiencies across Software Engineering, AI &amp; Agentic Workflows, Cybersecurity, Cloud, Languages, and Systems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioConfig.skills.map((cluster) => (
            <div key={cluster.id} className="p-6 rounded-3xl border border-border-ink bg-paper-node/50 space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink">
                {cluster.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cluster.items.map((item, idx) => (
                  <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg border border-border-ink/60 bg-paper text-ink font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT & EXPERIENCE SECTION */}
      <section id="about-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Internship */}
          <div className="p-8 rounded-3xl border border-border-ink bg-paper-node/40 space-y-6">
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase">
              <Briefcase className="w-4 h-4 text-accent" />
              Professional Internship
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink">
                {portfolioConfig.internship.role}
              </h3>
              <p className="font-serif italic text-sm text-ink-muted mt-1">
                {portfolioConfig.internship.company} &bull; {portfolioConfig.internship.duration}
              </p>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-ink-muted font-sans list-disc pl-4 leading-relaxed">
              {portfolioConfig.internship.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-2">
              {portfolioConfig.internship.techStack.map((tech, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded border border-border-ink bg-paper text-ink">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-8 rounded-3xl border border-border-ink bg-paper-node/40 space-y-6">
            <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase">
              <GraduationCap className="w-4 h-4 text-accent" />
              Academic Credentials
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-ink">
                {portfolioConfig.education.degree} in {portfolioConfig.education.major}
              </h3>
              <p className="font-serif italic text-sm text-ink-muted mt-1">
                {portfolioConfig.education.institution} &bull; {portfolioConfig.education.duration}
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-xs font-bold">
                CGPA: {portfolioConfig.education.cgpa}
              </div>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-ink-muted font-sans list-disc pl-4 leading-relaxed">
              {portfolioConfig.education.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BLOGS & PUBLICATIONS SECTION */}
      <section id="blogs-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-accent" />
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
            Publications &amp; Technical Insights
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          Security &amp; Technical Research Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {publishedBlogs.map((blog) => (
            <div key={blog.id} className="p-6 rounded-3xl border border-border-ink bg-paper-node/50 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accent font-bold uppercase">{blog.category}</span>
                <span className="text-ink-muted">{blog.readingTime}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-ink">
                {blog.title}
              </h3>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">
                {blog.description}
              </p>
              <div className="pt-2 flex items-center justify-between">
                <a
                  href={blog.readUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-ink bg-ink text-paper hover:bg-accent font-mono text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  Read Article <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & TERMINAL SECTION */}
      <section id="contact-section" className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-border-ink/40">
        <div className="p-8 md:p-12 rounded-3xl border border-border-ink bg-paper-node/60 max-w-4xl mx-auto space-y-8 text-center">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold block mb-2">
              Communications Terminal
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink">
              Connect with Sai Varun
            </h2>
            <p className="font-serif italic text-sm text-ink-muted mt-2 max-w-lg mx-auto">
              Open to Software Engineering, AI Systems, AppSec, and Cloud Architecture roles.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-full border border-ink bg-ink text-paper hover:bg-accent font-mono text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              {emailCopied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {emailCopied ? "Email Copied!" : portfolioConfig.developer.email}
            </button>

            <a
              href={portfolioConfig.developer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-border-ink bg-paper-node hover:border-accent text-ink font-mono text-xs transition-colors"
            >
              LinkedIn Profile
            </a>

            <a
              href={portfolioConfig.developer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-border-ink bg-paper-node hover:border-accent text-ink font-mono text-xs transition-colors"
            >
              GitHub Repositories
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border-ink/40 text-center text-xs font-mono text-ink-muted">
        <p>&copy; 2026 Chintala Sai Varun. All systems verified and active.</p>
      </footer>

      {/* Cognitive Scan Tour Modal */}
      <CognitiveScan
        isActive={cognitiveScanActive}
        onClose={() => setCognitiveScanActive(false)}
        onExpandProject={handleSetExpand}
        onSetProjectSelection={() => {}}
      />

      {/* Project Detail Drawer with Architecture Flow Diagram */}
      <ProjectDetailDrawer
        project={selectedDrawerProject}
        onClose={() => setSelectedDrawerProject(null)}
      />
    </div>
  );
}
