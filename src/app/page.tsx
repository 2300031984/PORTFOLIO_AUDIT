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
  Activity,
  Calendar,
  Clock,
  ExternalLink,
  Award,
  Shield,
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
  Copy,
  ChevronDown,
  ChevronUp,
  User
} from "lucide-react";

// Unified Domain Color Helper locked strictly to Burnt Technical Orange (#F97316 / #E26E4A)
function getDomainStyle(category: string) {
  const cat = (category || "").toLowerCase();
  let domainName = "Software Engineering";
  if (cat.includes("ai") || cat.includes("ml") || cat.includes("agent") || cat.includes("deepfake")) domainName = "AI & Agentic Systems";
  else if (cat.includes("cloud") || cat.includes("devops") || cat.includes("aws") || cat.includes("docker")) domainName = "Cloud & DevOps";
  else if (cat.includes("research") || cat.includes("experiment") || cat.includes("lab") || cat.includes("academic") || cat.includes("leadership")) domainName = "Research / Labs";
  else if (cat.includes("security") || cat.includes("pentest") || cat.includes("forensics") || cat.includes("malware") || cat.includes("threat") || cat.includes("appsec") || cat.includes("wireshark") || cat.includes("network")) domainName = "Cybersecurity & AppSec";

  return {
    text: "text-accent",
    border: "border-accent/30",
    bg: "bg-[#181816]/80",
    badge: "border border-accent/30 text-accent bg-[#181816]/80 backdrop-blur-sm",
    glow: "hover:border-accent/50 hover:bg-[#1C1C19] transition-all",
    domainName
  };
}

function BlogCardThumbnail({ blog }: { blog: typeof portfolioConfig.blogs[0] }) {
  const [imgFailed, setImgFailed] = useState(false);
  const basePath = process.env.NODE_ENV === "production" ? "/PORTFOLIO_AUDIT" : "";
  const rawUrl = blog.imageUrl || "/tryhackme_blog_thumbnail.png";
  const imageSrc = rawUrl.startsWith("http") ? rawUrl : `${basePath}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;

  return (
    <div className="lg:col-span-5 relative rounded-xl overflow-hidden shadow-md aspect-[4/3] border border-border-ink/60 bg-[#181816] flex items-center justify-center">
      {!imgFailed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageSrc}
          alt={blog.title}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <div className="w-full h-full p-6 bg-gradient-to-br from-[#FAF8F2]/10 via-[#F97316]/15 to-[#121211] flex flex-col items-center justify-center text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center mb-2 shadow-lg">
            <Shield className="w-7 h-7 text-accent animate-pulse" />
          </div>
          <span className="font-serif text-base font-bold text-white mb-1">
            TRYHACKME
          </span>
          <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-widest">
            100+ Security Labs
          </span>
        </div>
      )}
      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
        <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full border border-accent/40 bg-accent/30 text-accent font-bold uppercase backdrop-blur-md">
          FEATURED
        </span>
        <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full border border-white/30 bg-black/60 text-white font-bold uppercase backdrop-blur-md">
          {blog.category.toUpperCase()}
        </span>
      </div>
    </div>
  );
}

// Custom mind-map node types
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

    // 7 Category Branch Nodes
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
    <div className={className || "w-full h-[540px] border border-border-ink rounded-xl relative overflow-hidden bg-paper-node/30 shadow-inner"}>
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12, minZoom: 0.3, maxZoom: 1.2 }}
        minZoom={0.2}
        maxZoom={1.5}
        zoomOnScroll={false}
        panOnScroll={false}
        zoomOnDoubleClick={false}
        className="w-full h-full"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="var(--color-edge)" />
      </ReactFlow>
      <div className="absolute bottom-3 right-3 z-10 scale-85">
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
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllExperiments, setShowAllExperiments] = useState(false);

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
      "patterns-section",
      "buildlog-section",
      "projects-section",
      "casestudies-section",
      "experiments-section",
      "proof-section",
      "skills-section",
      "about-section",
      "blogs-section",
      "explore-section",
      "contact-section"
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
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
        setTimeout(() => {
          document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
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

  const visibleProjects = useMemo(() => {
    let list = portfolioConfig.projects;
    if (selectedSkill) {
      const skillCluster = portfolioConfig.skills.find(s => s.id === selectedSkill);
      if (skillCluster && skillCluster.relatedProjects.length > 0) {
        list = list.filter(p => skillCluster.relatedProjects.includes(p.id));
      }
    }
    if (!showAllProjects && !selectedSkill) {
      return list.slice(0, 6);
    }
    return list;
  }, [showAllProjects, selectedSkill]);

  if (!mounted) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-paper text-ink paper-texture select-none">
        <div className="flex flex-col items-center text-center max-w-sm px-4">
          <span className="text-accent font-serif italic text-sm mb-1 animate-pulse">
            Decrypting System Mind Map
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink mb-2">
            {portfolioConfig.developer.name}
          </h1>
          <div className="text-ink-muted font-serif italic text-xs space-y-1 opacity-80">
            <p>&quot;Every system leaves traces. Every trace tells a story.&quot;</p>
            <p>&quot;My work begins where patterns emerge.&quot;</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink paper-texture font-sans selection:bg-accent/20 text-[14px]">
      {/* Decorative watercolor background */}
      <div className="watercolor-bg" />

      {/* Top System Status Bar */}
      <div className="w-full bg-paper-node/90 border-b border-border-ink/40 py-1 px-4 text-[10px] font-mono flex items-center justify-between text-ink-muted relative z-50">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 text-accent font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            SYSTEM {portfolioConfig.systemStatus.status}
          </span>
          <span className="hidden sm:inline text-border-ink">|</span>
          <span className="hidden sm:inline font-semibold text-ink">
            FOCUS: {portfolioConfig.systemStatus.focus}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline italic text-ink-muted">
            BUILDING: {portfolioConfig.systemStatus.currentlyBuilding}
          </span>
          <span className="text-border-ink hidden md:inline">|</span>
          <span className="text-accent font-semibold">
            UPDATED: {portfolioConfig.systemStatus.lastUpdated}
          </span>
        </div>
      </div>

      {/* Compact Navigation bar */}
      <nav className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-2 bg-paper/90 backdrop-blur-md border-b border-border-ink/40">
        <div className="flex items-center gap-2">
          <span className="text-accent font-mono font-bold text-xs">&gt;_</span>
          <span className="text-[11px] font-mono tracking-widest text-ink uppercase font-bold hidden sm:inline">
            SAI VARUN // SYSTEM MIND MAP 2.0
          </span>
          <span className="text-[11px] font-mono tracking-widest text-ink uppercase font-bold sm:hidden">
            SAI VARUN
          </span>
        </div>

        {/* Compact Navigation Links */}
        <div className="hidden xl:flex items-center gap-0.5 bg-paper-node/80 border border-border-ink/50 p-0.5 rounded-full shadow-sm max-w-full overflow-x-auto">
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
                className={`text-[11px] font-mono px-3 py-1 rounded-full transition-all duration-200 cursor-pointer border whitespace-nowrap ${
                  isActive
                    ? "text-accent bg-accent/10 border-accent/40 font-semibold shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                    : "text-ink-muted hover:text-ink hover:bg-paper/40 border-transparent"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-full border border-border-ink bg-paper-node hover:border-accent hover:text-accent text-ink cursor-pointer transition-colors"
            title={soundEnabled ? "Mute audio feedback" : "Unmute audio feedback"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-accent" /> : <VolumeX className="w-3.5 h-3.5 text-ink-muted" />}
          </button>

          <button
            onClick={() => {
              playAudioTick(880, 0.05);
              setCognitiveScanActive(true);
            }}
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 transition-all cursor-pointer text-[11px] font-mono font-semibold"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Cognitive Scan</span>
          </button>

          <ThemeToggle />
        </div>
      </nav>

      {/* 1. HERO SECTION (FULL VIEWPORT HEIGHT COVERAGE) */}
      <section id="hero-section" className="relative min-h-[calc(100vh-80px)] py-8 px-4 md:px-6 max-w-[1100px] mx-auto flex flex-col items-center justify-center text-center">
        <ParticleCanvas />

        <div className="relative z-10 w-full space-y-6">
          {/* Top Eyebrow Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-accent/40 bg-paper-node/90 shadow-sm transition-all hover:border-accent/70">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-bold">
                SECURE SYSTEMS ARCHITECT
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border-ink bg-paper-node/80 shadow-sm">
              <span className="text-[11px] font-mono tracking-widest text-ink uppercase font-semibold">
                COMPUTER SCIENCE ENGINEER &bull; SOFTWARE &bull; AI &bull; SECURITY &bull; CLOUD
              </span>
            </div>
          </div>

          {/* Main Headline Name (Prominent Single-Line / Responsive Layout) */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] text-center select-none">
            Chintala Sai Varun
          </h1>

          {/* Specialization Badges Row */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {portfolioConfig.developer.specializations.map((spec, idx) => (
              <span key={idx} className="text-xs font-mono px-3 py-1.5 rounded-md border border-accent/30 bg-[#181816]/80 text-accent font-semibold shadow-sm backdrop-blur-sm">
                {spec}
              </span>
            ))}
          </div>

          {/* Quote Container */}
          <div className="p-4 rounded-xl border border-border-ink/60 bg-paper-node/40 backdrop-blur-md shadow-sm max-w-xl mx-auto space-y-1 text-center">
            <p className="font-serif italic text-base md:text-lg text-white font-semibold">
              &quot;Every system leaves traces. Every trace tells a story.&quot;
            </p>
            <p className="font-serif italic text-xs md:text-sm text-ink-muted">
              &quot;A map of the systems I&apos;ve built, studied, secured, and explored across Software, AI, Cybersecurity, and Cloud.&quot;
            </p>
          </div>

          {/* Quick Metrics Bar (4 horizontal cards with Orange numbers) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-3 rounded-xl border border-border-ink/50 bg-paper-node/40 hover:border-accent/50 transition-colors text-center">
              <span className="text-2xl font-serif font-bold text-accent block">9.56</span>
              <span className="text-[9px] font-mono text-ink-muted uppercase font-semibold">ACADEMIC CGPA</span>
            </div>
            <div className="p-3 rounded-xl border border-border-ink/50 bg-paper-node/40 hover:border-accent/50 transition-colors text-center">
              <span className="text-2xl font-serif font-bold text-accent block">981/1000</span>
              <span className="text-[9px] font-mono text-ink-muted uppercase font-semibold">AWS CERTIFIED</span>
            </div>
            <div className="p-3 rounded-xl border border-border-ink/50 bg-paper-node/40 hover:border-accent/50 transition-colors text-center">
              <span className="text-2xl font-serif font-bold text-accent block">100+</span>
              <span className="text-[9px] font-mono text-ink-muted uppercase font-semibold">THM SECURITY LABS</span>
            </div>
            <div className="p-3 rounded-xl border border-border-ink/50 bg-paper-node/40 hover:border-accent/50 transition-colors text-center">
              <span className="text-2xl font-serif font-bold text-accent block">400+</span>
              <span className="text-[9px] font-mono text-ink-muted uppercase font-semibold">DSA CHALLENGES</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-1">
            <button
              onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer hover:bg-white/90"
            >
              Explore Interactive Mind Map
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2.5 rounded-full border border-border-ink bg-paper-node/80 hover:border-accent text-white font-sans text-xs font-semibold transition-all duration-300 cursor-pointer"
            >
              View Projects &amp; Architecture
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE COGNITIVE MIND MAP 2.0 */}
      <section id="map-section" className="py-6 px-4 md:px-6 max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2 border-b border-border-ink/40 pb-2.5">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                Navigation &amp; System Architecture Layer
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-[30px] font-bold text-ink leading-tight">
              Interactive Cognitive Mind Map 2.0
            </h2>
          </div>
          <p className="font-sans text-xs text-ink-muted max-w-sm">
            Central identity: <strong className="text-ink">CHINTALA SAI VARUN</strong>. Click branch nodes to focus domains, click project hubs to open full technical dossiers.
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
            className="w-full h-[540px] border border-border-ink rounded-xl relative overflow-hidden bg-paper-node/30 shadow-md"
          />
        </ReactFlowProvider>
      </section>

      {/* 3. PATTERNS REVEAL THE SYSTEM (EXACT REFERENCE DESIGN) */}
      <section id="patterns-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Subject Profile */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block">
              SECTION 02 // SUBJECT PROFILE
            </span>

            <h2 className="font-serif text-2xl md:text-[32px] font-bold text-white leading-[1.15]">
              Patterns reveal the<br />system.
            </h2>

            <div className="space-y-2.5 font-sans text-[12px] text-ink-muted leading-relaxed">
              <p className="text-white font-medium">
                I am a Computer Science undergraduate focused on building secure, scalable, and intelligent software systems.
              </p>

              <p>
                My work spans backend engineering, cybersecurity, cloud technologies, and AI-driven security solutions. I enjoy analyzing how systems behave under pressure, identifying hidden vulnerabilities, and designing architectures that remain reliable, secure, and efficient.
              </p>

              <p>
                Through hands-on experience with Spring Boot, REST APIs, database optimization, malware analysis, network traffic investigation, and cloud platforms, I have developed a strong foundation in both software engineering and security research.
              </p>

              <p>
                My goal is to build next-generation intelligent systems that not only solve problems but also understand, monitor, and defend themselves against evolving threats.
              </p>
            </div>
          </div>

          {/* Right Column: Subject Development Timeline Card */}
          <div className="lg:col-span-7">
            <div className="p-5 rounded-xl border border-border-ink/70 bg-paper-node/50 shadow-sm relative space-y-4">
              <div className="flex items-center justify-between border-b border-border-ink/40 pb-2.5">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  SUBJECT DEVELOPMENT TIMELINE
                </span>
                <User className="w-4 h-4 text-ink-muted/50" />
              </div>

              {/* Connected Timeline list */}
              <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-border-ink/60">
                <div className="relative space-y-0.5">
                  <span className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-paper-node" />
                  <span className="text-[10px] font-mono font-bold text-accent">2023</span>
                  <h3 className="font-serif text-xs md:text-sm font-bold text-white leading-tight">Engineering Foundations</h3>
                  <p className="font-sans text-[11px] text-ink-muted leading-relaxed">
                    Started Computer Science Engineering with a focus on programming, algorithms, databases, operating systems, and computer networks.
                  </p>
                </div>

                <div className="relative space-y-0.5">
                  <span className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-paper-node" />
                  <span className="text-[10px] font-mono font-bold text-accent">2024</span>
                  <h3 className="font-serif text-xs md:text-sm font-bold text-white leading-tight">Backend Engineering Internship</h3>
                  <p className="font-sans text-[11px] text-ink-muted leading-relaxed">
                    Developed Spring Boot applications, designed REST APIs, implemented JWT authentication, optimized databases, and worked on secure backend systems during my Full Stack Development.
                  </p>
                </div>

                <div className="relative space-y-0.5">
                  <span className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-paper-node" />
                  <span className="text-[10px] font-mono font-bold text-accent">2025</span>
                  <h3 className="font-serif text-xs md:text-sm font-bold text-white leading-tight">Security Exploration &amp; Problem Solving</h3>
                  <p className="font-sans text-[11px] text-ink-muted leading-relaxed">
                    Completed 100+ TryHackMe labs, strengthened cybersecurity fundamentals, and solved 400+ algorithmic problems across coding platforms.
                  </p>
                </div>

                <div className="relative space-y-0.5">
                  <span className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-paper-node animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-accent">2026</span>
                  <h3 className="font-serif text-xs md:text-sm font-bold text-white leading-tight">Intelligent Secure Systems</h3>
                  <p className="font-sans text-[11px] text-ink-muted leading-relaxed">
                    Exploring AI-powered security, threat detection, intelligent monitoring platforms to build secure and adaptive software systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUILD LOG */}
      <section id="buildlog-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-1.5 mb-1">
          <History className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
            Chronological Timeline
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-[30px] font-bold text-ink mb-1">
          Build Log
        </h2>
        <p className="font-sans text-xs text-ink-muted max-w-xl mb-5 leading-relaxed">
          A year-by-year chronicle of engineered systems, security assessments, AI agent implementations, and foundational milestones.
        </p>

        <div className="space-y-4">
          {portfolioConfig.buildLog.map((yearLog: BuildLogYear) => (
            <div key={yearLog.year} className="p-4 rounded-xl border border-border-ink bg-paper-node/40 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 border-b border-border-ink/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-accent">
                    {yearLog.year}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border-ink bg-paper-node font-semibold">
                    {yearLog.items.length} Milestones
                  </span>
                </div>
                <p className="font-serif italic text-xs text-ink-muted">
                  {yearLog.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {yearLog.items.map((item) => {
                  const dStyle = getDomainStyle(item.category);
                  return (
                    <div key={item.id} className={`p-3.5 rounded-lg border border-border-ink/60 bg-paper/60 space-y-1.5 transition-colors ${dStyle.glow}`}>
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className={`${dStyle.text} font-bold uppercase`}>{item.category}</span>
                        <span className="text-ink-muted">{item.period}</span>
                      </div>

                      <h3 className="font-serif text-[15px] font-bold text-ink leading-tight">
                        {item.title}
                      </h3>

                      <p className="font-sans text-[12px] text-ink-muted leading-relaxed line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border-ink/30">
                        <div className="flex flex-wrap gap-1">
                          {item.tech.map((t, idx) => (
                            <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border-ink/40 bg-paper-node text-ink-muted">
                              {t}
                            </span>
                          ))}
                        </div>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-[9px] font-mono ${dStyle.text} hover:underline inline-flex items-center gap-0.5 font-bold`}
                          >
                            View <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED ENGINEERING WORKS */}
      <section id="projects-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-1.5 mb-1">
          <Code2 className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
            Architectures &amp; Systems
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-3 gap-2">
          <div>
            <h2 className="font-serif text-2xl md:text-[30px] font-bold text-ink leading-tight">
              Featured Engineering Works
            </h2>
            <p className="font-sans text-xs text-ink-muted max-w-xl mt-0.5 leading-relaxed">
              Click any project card to open its technical dossier complete with system architecture flow diagrams, security controls, and journey milestones.
            </p>
          </div>

          {selectedSkill && (
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-accent text-accent hover:bg-accent/10 transition-colors flex items-center gap-1 self-start cursor-pointer"
            >
              Clear Filter ({selectedSkill}) &times;
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {visibleProjects.map((proj: Project) => {
            const dStyle = getDomainStyle(proj.category);
            return (
              <div
                key={proj.id}
                onClick={() => handleSelectProjectForDrawer(proj)}
                className={`p-3.5 rounded-xl border border-border-ink bg-paper-node/50 cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-sm ${dStyle.glow}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${dStyle.badge} font-bold`}>
                      {proj.category}
                    </span>
                    <span className="text-[9px] font-mono text-ink-muted group-hover:text-accent transition-colors">
                      Dossier &rarr;
                    </span>
                  </div>

                  <h3 className="font-serif text-[15px] font-bold text-ink leading-tight group-hover:text-accent transition-colors">
                    {proj.title}
                  </h3>

                  <p className="font-sans text-[12px] text-ink-muted leading-relaxed line-clamp-2">
                    {proj.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border-ink/40 space-y-1.5">
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border-ink/40 bg-paper text-ink-muted">
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className={`text-[9px] font-mono ${dStyle.text}`}>+{proj.techStack.length - 4}</span>
                    )}
                  </div>

                  <div className={`flex items-center justify-between text-[10px] font-mono ${dStyle.text} font-bold pt-0.5`}>
                    <span>View Architecture Flow</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All / Toggle Projects Button */}
        {portfolioConfig.projects.length > 6 && !selectedSkill && (
          <div className="mt-5 text-center">
            <button
              onClick={() => {
                playAudioTick(783.99, 0.05);
                setShowAllProjects(prev => !prev);
              }}
              className="px-4.5 py-1.5 rounded-full border border-border-ink bg-paper-node hover:border-accent text-ink font-mono text-[11px] font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {showAllProjects ? (
                <>Show Top 6 Strongest Works <ChevronUp className="w-3.5 h-3.5 text-accent" /></>
              ) : (
                <>Explore All {portfolioConfig.projects.length} Works &amp; Blueprints <ChevronDown className="w-3.5 h-3.5 text-accent" /></>
              )}
            </button>
          </div>
        )}
      </section>



      {/* 7. EXPERIMENTS & TECHNICAL LABS */}
      <section id="experiments-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-1.5 mb-1">
          <Compass className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
            Active Research &amp; Prototyping
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-[30px] font-bold text-ink mb-1">
          Experiments &amp; Technical Labs
        </h2>
        <p className="font-sans text-xs text-ink-muted max-w-2xl mb-5 leading-relaxed">
          Technical investigations across AI security, application security, threat intelligence, digital forensics, network analysis, cloud security, and security automation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {(showAllExperiments ? portfolioConfig.experiments : portfolioConfig.experiments.slice(0, 6)).map((exp: CurrentExperiment) => {
            return (
              <div key={exp.id} className="p-4 rounded-xl border border-border-ink/70 bg-paper-node/40 backdrop-blur-sm space-y-2.5 shadow-sm hover:border-accent/40 transition-all duration-300 flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider uppercase font-bold text-accent px-2 py-0.5 rounded border border-accent/30 bg-[#181816]/80">
                      {exp.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  </div>

                  <h3 className="font-serif text-sm font-bold text-white leading-snug">
                    {exp.title}
                  </h3>
                </div>

                <div className="space-y-2 text-xs font-sans text-ink leading-relaxed pt-1">
                  <div>
                    <span className="text-[8px] font-mono text-accent uppercase font-bold block mb-0.5">Research Question</span>
                    <p className="font-serif italic text-[11px] text-ink-muted leading-relaxed">&quot;{exp.researchQuestion}&quot;</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-ink-muted uppercase font-bold block mb-0.5">Current Progress</span>
                    <p className="font-sans text-[11px] text-ink leading-relaxed">&quot;{exp.progress}&quot;</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {portfolioConfig.experiments.length > 6 && (
          <div className="flex justify-center pt-6">
            <button
              onClick={() => {
                playAudioTick(783.99, 0.05);
                setShowAllExperiments((prev) => !prev);
              }}
              className="px-5 py-2 rounded-full border border-border-ink bg-paper-node/80 hover:border-accent text-ink font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              {showAllExperiments ? (
                <>
                  Show Fewer Experiments <ChevronUp className="w-3.5 h-3.5 text-accent" />
                </>
              ) : (
                <>
                  Explore All {portfolioConfig.experiments.length} Experiments &amp; Labs <ChevronDown className="w-3.5 h-3.5 text-accent" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* 8. PROOF OF WORK */}
      <section id="proof-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-1.5 mb-1">
          <Award className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
            Verified Credentials &amp; Evidence
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-[30px] font-bold text-ink mb-1">
          Proof of Work
        </h2>
        <p className="font-sans text-xs text-ink-muted max-w-xl mb-5 leading-relaxed">
          Strictly verified technical certifications, practical security labs, algorithmic metrics, and academic leadership. Real values only.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {portfolioConfig.proof.map((item: ProofItem) => {
            const dStyle = getDomainStyle(item.category);
            return (
              <div key={item.id} className={`p-3 rounded-lg border border-border-ink bg-paper-node/50 space-y-1.5 flex flex-col justify-between transition-all duration-300 ${dStyle.glow}`}>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${dStyle.badge}`}>
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
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  <h3 className="font-serif text-[13px] font-bold text-ink leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[11px] text-ink-muted leading-relaxed line-clamp-2">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-1 border-t border-border-ink/30 flex items-center justify-between text-[10px] font-mono">
                  <span className={`font-bold ${dStyle.text}`}>{item.highlight}</span>
                  <CheckCircle2 className={`w-3 h-3 ${dStyle.text}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. SKILLS CONSTELLATION */}
      <section id="skills-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="flex items-center gap-1.5 mb-1">
          <Cpu className="w-3.5 h-3.5 text-accent" />
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
            Technical Capabilities
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-[30px] font-bold text-ink mb-1">
          Skills Constellation
        </h2>
        <p className="font-sans text-xs text-ink-muted max-w-xl mb-5 leading-relaxed">
          Core technical proficiencies categorized across Software Engineering, AI/ML, Cybersecurity, Cloud, Languages, and Systems. Click any cluster to filter works.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {portfolioConfig.skills.map((cluster) => {
            const dStyle = getDomainStyle(cluster.title);
            const isSelected = selectedSkill === cluster.id;
            return (
              <div
                key={cluster.id}
                onClick={() => handleSelectSkill(cluster.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 bg-paper-node/50 space-y-2 shadow-sm ${
                  isSelected ? `ring-2 ring-accent border-accent ${dStyle.glow}` : `border-border-ink ${dStyle.glow}`
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xs md:text-sm font-bold text-ink leading-tight">
                    {cluster.title}
                  </h3>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${dStyle.badge}`}>
                    {isSelected ? "Active Filter" : "Filter Works"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cluster.items.map((item, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border-ink/60 bg-paper text-ink font-medium">
                      {item}
                    </span>
                  ))}
                </div>

                <div className={`pt-1 border-t border-border-ink/30 text-[9px] font-mono flex items-center justify-between ${dStyle.text}`}>
                  <span>{cluster.relatedProjects.length} Related Projects</span>
                  <span>{isSelected ? "Click to reset" : "Click to view application &rarr;"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. EDUCATION / PROFESSIONAL RECORD */}
      <section id="about-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Internship */}
          <div className="p-4 rounded-xl border border-border-ink bg-paper-node/40 space-y-3 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-1.5 text-accent text-[10px] font-mono font-bold uppercase">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              Professional Internship
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-ink">
                {portfolioConfig.internship.role}
              </h3>
              <p className="font-serif italic text-xs text-ink-muted mt-0.5">
                {portfolioConfig.internship.company} &bull; {portfolioConfig.internship.duration}
              </p>
            </div>
            <ul className="space-y-1 text-xs text-ink-muted font-sans list-disc pl-4 leading-relaxed">
              {portfolioConfig.internship.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1 pt-1">
              {portfolioConfig.internship.techStack.map((tech, idx) => (
                <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded border border-border-ink bg-paper text-ink">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-4 rounded-xl border border-border-ink bg-paper-node/40 space-y-3 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-1.5 text-accent text-[10px] font-mono font-bold uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              Academic Record
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-ink">
                {portfolioConfig.education.degree} in {portfolioConfig.education.major}
              </h3>
              <p className="font-serif italic text-xs text-ink-muted mt-0.5">
                {portfolioConfig.education.institution} &bull; {portfolioConfig.education.duration}
              </p>
              <div className="inline-block mt-1 px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-[10px] font-bold">
                CGPA: {portfolioConfig.education.cgpa}
              </div>
            </div>
            <ul className="space-y-1 text-xs text-ink-muted font-sans list-disc pl-4 leading-relaxed">
              {portfolioConfig.education.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* 11. TECHNICAL BLOGS */}
      <section id="blogs-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40 space-y-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-1.5">
            Technical Blogs
          </h2>
          <p className="font-sans text-xs md:text-sm text-ink-muted max-w-2xl leading-relaxed">
            Sharing practical insights from cybersecurity, AI security, penetration testing, malware analysis, threat intelligence, and secure software engineering.
          </p>
        </div>

        {/* Top 3 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl border border-border-ink bg-paper-node/50 text-center shadow-sm space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-accent block">1</span>
            <span className="text-[10px] font-mono tracking-widest text-ink font-bold uppercase block">ARTICLES PUBLISHED</span>
            <span className="text-[9px] font-mono text-ink-muted uppercase block">ACTIVE DOSSIERS ONLINE</span>
          </div>
          <div className="p-4 rounded-xl border border-border-ink bg-paper-node/50 text-center shadow-sm space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-accent block">7</span>
            <span className="text-[10px] font-mono tracking-widest text-ink font-bold uppercase block">TOPICS COVERED</span>
            <span className="text-[9px] font-mono text-ink-muted uppercase block">ACROSS CYBERSECURITY DOMAINS</span>
          </div>
          <div className="p-4 rounded-xl border border-border-ink bg-paper-node/50 text-center shadow-sm space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-accent block">8 min</span>
            <span className="text-[10px] font-mono tracking-widest text-ink font-bold uppercase block">EST. TOTAL READING TIME</span>
            <span className="text-[9px] font-mono text-ink-muted uppercase block">MINUTES OF PUBLISHED CONTENT</span>
          </div>
        </div>

        {/* Featured Article Card */}
        {publishedBlogs.map((blog) => (
          <div key={blog.id} className="p-5 md:p-6 rounded-2xl border border-border-ink/80 bg-paper-node/40 backdrop-blur-md shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Image Thumbnail */}
              <BlogCardThumbnail blog={blog} />

              {/* Right Article Details */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[10px] font-mono text-accent uppercase font-bold tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {blog.publishedDate.toUpperCase()}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {blog.readingTime.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                  {blog.title}
                </h3>

                <p className="font-sans text-xs md:text-sm text-ink-muted leading-relaxed">
                  {blog.description}
                </p>

                {/* Topic Badges */}
                {blog.topics && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {blog.topics.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-0.5 rounded border border-accent/30 bg-[#181816]/80 text-ink font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read Action Button */}
                <div className="pt-2">
                  <a
                    href={blog.readUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-white text-black font-sans font-semibold text-xs transition-all duration-300 hover:bg-white/90 shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Article
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>



      {/* 13. CONTACT */}
      <section id="contact-section" className="py-8 px-4 md:px-6 max-w-[1100px] mx-auto border-t border-border-ink/40">
        <div className="p-5 md:p-6 rounded-xl border border-border-ink bg-paper-node/60 max-w-lg mx-auto space-y-4 text-center shadow-sm">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-0.5">
              Communications Terminal
            </span>
            <h2 className="font-serif text-2xl font-bold text-ink">
              Connect with Sai Varun
            </h2>
            <p className="font-serif italic text-xs text-ink-muted mt-0.5 max-w-xs mx-auto">
              Open to Software Engineering, AI Systems, AppSec, and Cloud Architecture roles.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2.5">
            <button
              onClick={handleCopyEmail}
              className="px-4.5 py-2 rounded-full border border-ink bg-ink text-paper hover:bg-accent font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {emailCopied ? <CheckCircle className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
              {emailCopied ? "Email Copied!" : portfolioConfig.developer.email}
            </button>

            <a
              href={portfolioConfig.developer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4.5 py-2 rounded-full border border-border-ink bg-paper-node hover:border-accent text-ink font-mono text-xs transition-colors"
            >
              LinkedIn Profile
            </a>

            <a
              href={portfolioConfig.developer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4.5 py-2 rounded-full border border-border-ink bg-paper-node hover:border-accent text-ink font-mono text-xs transition-colors"
            >
              GitHub Repositories
            </a>
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="py-3 border-t border-border-ink/40 text-center text-[10px] font-mono text-ink-muted">
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
