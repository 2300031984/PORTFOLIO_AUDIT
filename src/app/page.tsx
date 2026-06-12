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
  CheckCircle
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
  handlePaneClick
}: {
  expandedProjects: Record<string, boolean>;
  handleToggleExpand: (id: string) => void;
  selectedSkill: string | null;
  handleSelectSkill: (id: string) => void;
  handlePaneClick: () => void;
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
      if (idx === 0) { px = -480; py = -220; }
      else if (idx === 1) { px = -160; py = -320; }
      else if (idx === 2) { px = 160; py = -320; }
      else if (idx === 3) { px = 480; py = -220; }

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
      else if (idx === 1) { sx = -200; sy = 280; }
      else if (idx === 2) { sx = 200; sy = 280; }
      else if (idx === 3) { sx = 520; sy = 220; }
      else if (idx === 4) { sx = 0; sy = 340; } // Core CS cluster in center-bottom

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
    <div className="w-full h-[600px] border border-border-ink rounded-2xl relative overflow-hidden bg-paper-node/30 shadow-inner">
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

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [cognitiveScanActive, setCognitiveScanActive] = useState(false);
  
  // Dynamic UI States
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  const [selectedProjectSpec, setSelectedProjectSpec] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form states
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setMounted(true);
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
    setExpandedProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  }, []);

  const handleSetExpand = useCallback((projectId: string, expand: boolean) => {
    setExpandedProjects((prev) => ({ ...prev, [projectId]: expand }));
  }, []);

  const handleSelectSkill = useCallback((skillId: string) => {
    setSelectedSkill((prev) => (prev === skillId ? null : skillId));
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  const activeProjectIds = useMemo(() => {
    if (!selectedSkill) return [];
    const skillCluster = portfolioConfig.skills.find((s) => s.id === selectedSkill);
    return skillCluster ? skillCluster.relatedProjects : [];
  }, [selectedSkill]);

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
            { label: "Memory Map", id: "map-section" },
            { label: "Audit Ledger", id: "footprint-section" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-[10px] font-mono px-3 py-1.5 rounded-full text-ink-muted hover:text-ink hover:bg-paper/40 cursor-pointer transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setCognitiveScanActive(true)}
            className="group flex items-center gap-2 px-5 py-2 rounded-full border border-ink bg-paper-node hover:bg-ink hover:text-paper text-ink font-serif italic text-xs tracking-wider shadow-sm hover:scale-102 hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-all duration-300 cursor-pointer"
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

        {/* 5-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
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
                  cluster.id === "programming-constellation" ? "github" : "experiment"
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
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 border border-ink bg-ink text-paper hover:bg-accent rounded-lg text-[10px] font-mono cursor-pointer transition-colors shadow-sm"
                            >
                              <Github className="w-3.5 h-3.5" />
                              Decrypt Code Base
                            </a>
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
          <div className="space-y-4">
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
