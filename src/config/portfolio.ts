export interface ProjectJourney {
  question: string;
  learning: string;
  experiment: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  subtext?: string;
  type?: "input" | "process" | "ai" | "storage" | "output" | "security";
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  skills: string[];
  techStack: string[];
  githubUrl?: string;
  reportUrl?: string;
  features: string[];
  architectureFlow?: ArchitectureNode[];
  journey: ProjectJourney;
}

export interface SkillCluster {
  id: string;
  title: string;
  items: string[];
  relatedProjects: string[];
}

export interface CurrentExperiment {
  id: string;
  title: string;
  category: string;
  researchQuestion: string;
  progress: string;
  challenges: string;
  futureDirection: string;
}

export interface BuildLogItem {
  id: string;
  title: string;
  category: "Software" | "AI" | "Security" | "Cloud" | "Research";
  period: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface BuildLogYear {
  year: string;
  summary: string;
  items: BuildLogItem[];
}

export interface Internship {
  role: string;
  company: string;
  location: string;
  duration: string;
  highlights: string[];
  techStack: string[];
}

export interface Education {
  degree: string;
  major: string;
  institution: string;
  duration: string;
  cgpa: string;
  highlights: string[];
  coursework: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  score?: string;
  badge?: string;
  link: string;
}

export interface ProofItem {
  id: string;
  title: string;
  category: "Certification" | "Achievement" | "Leadership" | "Academic";
  detail: string;
  verificationLink?: string;
  highlight: string;
}

export interface FeedbackCard {
  name: string;
  role: string;
  comment: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  description: string;
  topics: string[];
  readUrl: string;
  githubUrl?: string;
  imageUrl: string;
  isFeatured?: boolean;
  comingSoon?: boolean;
}

export interface SystemStatus {
  status: string;
  focus: string;
  currentlyBuilding: string;
  lastUpdated: string;
}

export interface PortfolioConfig {
  developer: {
    name: string;
    title: string;
    subTitle: string;
    about: string;
    lovesSolving: string;
    email: string;
    githubUrl: string;
    linkedinUrl: string;
    tryhackmeUrl: string;
    leetcodeUrl: string;
    codechefUrl: string;
    hackerrankUrl: string;
    specializations: string[];
    certifications: Certification[];
    securityTraining: string;
    problemSolving: string;
    objective: string;
  };
  systemStatus: SystemStatus;
  internship: Internship;
  education: Education;
  projects: Project[];
  skills: SkillCluster[];
  experiments: CurrentExperiment[];
  buildLog: BuildLogYear[];
  proof: ProofItem[];
  feedback: FeedbackCard[];
  githubStats: {
    commits: string;
    repos: string;
    primaryTech: string;
    contributions: string;
  };
  blogs: Blog[];
}

export const portfolioConfig: PortfolioConfig = {
  developer: {
    name: "Chintala Sai Varun",
    title: "Computer Science Engineer",
    subTitle: "Every system leaves traces. Every trace tells a story. A map of the systems I've built, studied, secured, and explored.",
    about: "I build high-performance backend systems, AI-powered applications, Retrieval-Augmented Generation (RAG) pipelines, secure cloud infrastructure, and security automation platforms. Experienced across Java, Spring Boot, Python, FastAPI, Gemini LLMs, Docker, AWS, and OWASP vulnerability auditing.",
    lovesSolving: "Agentic AI workflows, secure access delegation protocols, high-throughput backend pipelines, and tamper-evident cryptographic ledgers.",
    email: "saivarun699@gmail.com",
    githubUrl: "https://github.com/2300031984",
    linkedinUrl: "https://www.linkedin.com/in/saivarun1/",
    tryhackmeUrl: "https://tryhackme.com/p/SaiVarun",
    leetcodeUrl: "https://leetcode.com/u/klu2300031984/",
    codechefUrl: "https://www.codechef.com/users/saivarun_12",
    hackerrankUrl: "https://www.hackerrank.com/profile/h2300031984",
    specializations: [
      "Software Engineering",
      "AI & Agentic Systems",
      "Cybersecurity & AppSec",
      "Cloud & DevOps"
    ],
    certifications: [
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        score: "Score: 981 / 1000",
        badge: "CLF-C02 Verified",
        link: "AWS_Certified_Cloud_Practitioner_certificate.pdf"
      },
      {
        name: "Oracle AI Foundations Associate",
        issuer: "Oracle Corporation",
        badge: "AI & ML Certified",
        link: "https://education.oracle.com/verification"
      },
      {
        name: "Microsoft Certified: Security Operations Analyst Associate",
        issuer: "Microsoft",
        badge: "SC-200 Verified",
        link: "Microsoft_Certified_Security_Operations_Analyst_Associate.pdf"
      },
      {
        name: "Smart Coder Certification (Silver)",
        issuer: "Smart Interviews",
        badge: "400+ Algorithmic Problems",
        link: "https://smartinterviews.in/certificate/2aca3234"
      }
    ],
    securityTraining: "100+ TryHackMe Labs Completed",
    problemSolving: "400+ Algorithmic Challenges Solved",
    objective: "Building scalable, intelligent, and tamper-evident systems capable of executing complex workflows securely."
  },
  systemStatus: {
    status: "ONLINE",
    focus: "SOFTWARE · AI · SECURITY · CLOUD",
    currentlyBuilding: "AI Threat Intel SOC Platform & HashLens Forensics",
    lastUpdated: "SEP 2026"
  },
  internship: {
    role: "Java Full Stack Development Intern",
    company: "EduSkills (Supported by NEAT Cell, NCTE)",
    location: "Remote",
    duration: "April 2025 – June 2025",
    highlights: [
      "Developed secure backend applications using Java and Spring Boot following MVC architecture and software engineering best practices.",
      "Integrated Spring Security with JWT Authentication to implement secure role-based access control.",
      "Designed and optimized MySQL database schemas to improve data organization and application performance.",
      "Tested and validated REST APIs using Postman while ensuring secure coding, functionality, and reliability.",
      "Used Git for version control and collaborated in an Agile development environment."
    ],
    techStack: ["Java", "Spring Boot", "REST APIs", "Spring Security", "JWT Authentication", "Hibernate ORM", "MySQL"]
  },
  education: {
    degree: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    institution: "Koneru Lakshmaiah Education Foundation, Vijayawada",
    duration: "2023 – 2027",
    cgpa: "9.56 / 10.0",
    highlights: [
      "Maintained an excellent CGPA of 9.56/10.",
      "Specializing in Software Engineering, AI Applications, and Cloud Systems integrations.",
      "Active participant in CTFs and security hackathons.",
      "Maintained a strong analytical focus on algorithms, protocols, networks, and system design."
    ],
    coursework: ["Cryptography", "Computer Networks", "Information Security", "Operating Systems", "Database Management Systems", "Data Structures & Algorithms", "Artificial Intelligence"]
  },
  projects: [
    {
      id: "soc-automation-platform",
      title: "AI Cybersecurity Threat Intelligence & SOC Automation Platform",
      category: "AI & Cybersecurity",
      tagline: "Enterprise-grade AI-powered Threat Intelligence & SOC automation platform combining LangChain RAG, SOAR workflows, and agentic vulnerability management.",
      skills: ["backend-constellation", "security-constellation", "cloud-constellation", "programming-constellation", "core-cs-constellation", "ai-constellation"],
      techStack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "n8n SOAR", "LangChain", "Google Gemini", "Docker", "JWT RBAC"],
      githubUrl: "https://github.com/2300031984/AI-Cybersecurity-SOC-Automation-Platform",
      features: [
        "Multi-Tenant Isolation: Implemented strict row-level segregation using SQLAlchemy query filters to isolate organization-specific vulnerability data.",
        "SOAR Automation & Ingestion: Orchestrated automated threat syncing and alert webhooks utilizing n8n pipelines.",
        "AI Incident Response: Compiled instant containment playbooks, Snort firewall rules, and Splunk SPL queries using Google Gemini.",
        "AI Security Copilot: Built a conversational security assistant (LangChain RAG) translating natural language to safe parameterized SQL SELECT queries.",
        "Threat Feed Integration: Aggregated telemetry feeds (NVD CVE API, CISA KEV, EPSS likelihood index, VirusTotal, AbuseIPDB)."
      ],
      architectureFlow: [
        { id: "1", label: "Threat Feeds API", subtext: "NVD CVE / CISA KEV / EPSS Index", type: "input" },
        { id: "2", label: "n8n SOAR Engine", subtext: "Automated Ingestion Pipelines", type: "process" },
        { id: "3", label: "LangChain RAG & Gemini", subtext: "Playbooks & Natural-Language SQL", type: "ai" },
        { id: "4", label: "PostgreSQL DB", subtext: "Row-Level Segregation (RBAC)", type: "storage" },
        { id: "5", label: "FastAPI Backend", subtext: "Async REST Service & Security Filters", type: "security" },
        { id: "6", label: "SOC Analyst Dashboard", subtext: "Containment Rules & Telemetry", type: "output" }
      ],
      journey: {
        question: "How can we orchestrate and automate live threat intelligence ingestion, risk prioritization, and incident response playbooks within a single multi-tenant enterprise system?",
        learning: "Deepened expertise in row-level database segregation, SOAR workflow design, automated API integration (NVD/EPSS/CISA KEV), and RAG networks translating natural language to secure SQL queries.",
        experiment: "Synthesized live vulnerability telemetry indices and automated alerting pipelines using FastAPI, PostgreSQL, and n8n orchestration.",
        challenge: "Compiling database queries dynamically via the AI Security Copilot without exposing the system to SQL injection or cross-tenant data leaks.",
        solution: "Implemented parameterized SQLAlchemy query builders combined with role-based access control (RBAC) validations and strict tenant-specific session filters.",
        impact: "Streamlined SOC analyst investigation workflows by reducing incident response compilation latency and isolating threat metrics securely for separate organizations."
      }
    },
    {
      id: "hashlens",
      title: "HASHLENS — File Integrity & Hash Forensics Platform",
      category: "Digital Forensics & Cybersecurity",
      tagline: "Streaming multi-algorithm hashing, chunk fingerprinting, & tamper-evident chain ledger",
      skills: ["security-constellation", "forensics-constellation", "backend-constellation", "programming-constellation", "core-cs-constellation"],
      techStack: ["Python", "FastAPI", "Streamlit", "SQLite", "PostgreSQL", "Docker", "Cryptography", "REST API", "Pytest"],
      githubUrl: "https://github.com/2300031984/HASHLENS",
      features: [
        "Multi-Algorithm Cryptographic Hashing: Concurrent streaming calculation of MD5, SHA-1, SHA-256, and SHA-512 for text inputs and streaming file uploads.",
        "Chunk-Level Block Fingerprinting: Fixed-size block mapping to isolate modified byte ranges without loading entire files into memory.",
        "Forensic 'Why Did My Hash Change?' Engine: Rule-driven 7-tier diagnostic classifier translating chunk diffs, size shifts, and header signatures into plain-language forensic assessments.",
        "Tamper-Evident Hash Chain Ledger: Per-user cryptographic linked-list ledger maintaining append-only audit histories with active tamper detection (CHAIN_VALID vs CHAIN_BROKEN).",
        "Certified Evidence Reports: Deterministic canonical JSON SHA-256 digest calculation (EvidenceService.compute_report_hash()) and independent verification.",
        "REST API & Forensic Dashboard: Production FastAPI backend with interactive OpenAPI / Swagger UI documentation, Streamlit web interface, and native Python CLI."
      ],
      architectureFlow: [
        { id: "1", label: "Binary / Text Stream", subtext: "Multi-Gigabyte File Ingestion", type: "input" },
        { id: "2", label: "Multi-Hasher Engine", subtext: "Concurrent MD5/SHA1/SHA256/SHA512", type: "process" },
        { id: "3", label: "Chunk Fingerprinter", subtext: "Fixed Block Byte Mapping", type: "process" },
        { id: "4", label: "7-Tier Forensic Classifier", subtext: "Rule-Driven Diff Diagnostic", type: "security" },
        { id: "5", label: "Hash Chain Ledger", subtext: "Tamper-Evident Digest Chain", type: "storage" },
        { id: "6", label: "FastAPI / Streamlit UI", subtext: "Certified Evidence Reports (70/70 Tests)", type: "output" }
      ],
      journey: {
        question: "Why did my file's hash change, and how can we cryptographically prove file integrity changes without loading multi-gigabyte binaries into memory?",
        learning: "Streaming cryptographic hashing, fixed-size chunk block fingerprinting, linked-list ledger digests (previous_record_hash), and canonical JSON report envelope hashing.",
        experiment: "Engineered a local-first forensic engine combining multi-algorithm streaming hashers, fixed-size chunk maps, diagnostic diff classifiers, tamper-evident audit ledgers, FastAPI backend, and Streamlit dashboard.",
        challenge: "Detecting minute byte-level tamper events across binary revisions efficiently while maintaining append-only tamper-evident verification.",
        solution: "Implemented fixed-size block mapping for chunk-level diffing alongside a cryptographic linked-list ledger storing previous_record_hash digests with automated chain validation.",
        impact: "Built a production-verified forensic platform with 70/70 passing unit tests, 25/25 live production acceptance tests, 0 known CVEs, and deterministic certified evidence reports."
      }
    },
    {
      id: "ai-resume-analyzer",
      title: "AI Resume Analyzer",
      category: "AI & Software Engineering",
      tagline: "AI-powered resume analysis, ATS scoring, and semantic gap matching using RAG.",
      skills: ["backend-constellation", "programming-constellation", "ai-constellation"],
      techStack: ["Spring Boot", "Gemini AI", "LangChain", "ChromaDB", "RAG", "REST APIs"],
      githubUrl: "https://github.com/2300031984/AI-Resume-Analyzer",
      features: [
        "Semantic Profiling: Parsed unstructured resume blocks using Gemini LLM and chunked profiles for high-accuracy match rates.",
        "Retrieval-Augmented Generation: Integrated ChromaDB vector store to compare candidate experience embeddings against specific job requirements.",
        "ATS Scoring Engine: Formulated scoring logic to analyze keyword relevance, skill gaps, and experience alignment.",
        "Spring Backend Architecture: Built a scalable Spring Boot REST API layer handling secure document ingestion, search pipelines, and recommendation flows."
      ],
      architectureFlow: [
        { id: "1", label: "Resume Document", subtext: "PDF / DOCX Ingestion", type: "input" },
        { id: "2", label: "Gemini Chunking Engine", subtext: "Hierarchical Text Decomposition", type: "process" },
        { id: "3", label: "ChromaDB Vector Store", subtext: "Dense Embedding Indexes", type: "storage" },
        { id: "4", label: "LangChain RAG Matcher", subtext: "Semantic Job Matching", type: "ai" },
        { id: "5", label: "Spring Boot REST API", subtext: "High-Throughput Ingestion Layer", type: "process" },
        { id: "6", label: "ATS Gap Report", subtext: "Scored Metrics & Recommendations", type: "output" }
      ],
      journey: {
        question: "Can we engineer a high-throughput backend that performs semantic resume parsing and ATS matching without compromising document structure?",
        learning: "Vector database indexing, Retrieval-Augmented Generation (RAG) chunking strategies, and processing multi-format resume documents.",
        experiment: "Developed a pipeline integrating Spring Boot with ChromaDB and LangChain to index resume content and compare against target job descriptions.",
        challenge: "Parsing irregular layouts in PDF resumes and matching unstructured career data to structured skills taxonomies.",
        solution: "Implemented hierarchical semantic chunking combined with Gemini LLM extraction to map resume text to normalized vector embeddings.",
        impact: "Built a scalable automated screening system generating detailed ATS reports, semantic gap analyses, and personalized skill recommendations."
      }
    },
    {
      id: "ride-sharing-pentest",
      title: "RideSharing Security Audit & Penetration Test",
      category: "Application Security & Pentesting",
      tagline: "Manual security assessment & OWASP WSTG vulnerability audit",
      skills: ["security-constellation", "backend-constellation"],
      techStack: ["Burp Suite", "OWASP WSTG", "JWT Security", "API Security", "Penetration Testing"],
      reportUrl: "Penetration_Test_Report.pdf",
      features: [
        "Conducted a comprehensive manual penetration testing assessment of a self-developed Ride-Sharing Web Application using Burp Suite Community Edition.",
        "Audited 48 manual security test cases covering Authentication, Authorization, JWT Security, and IDOR.",
        "Identified Broken Access Control (IDOR), Mass Assignment, Client-Side Fare Manipulation, and Missing Rate Limiting.",
        "Prepared a professional report mapping vulnerabilities, severities, evidence, remediation, and OWASP mappings."
      ],
      architectureFlow: [
        { id: "1", label: "Target Application", subtext: "REST Endpoints & JWT Auth", type: "input" },
        { id: "2", label: "Burp Suite Interceptor", subtext: "Request Modulation & Scope", type: "process" },
        { id: "3", label: "48 WSTG Test Cases", subtext: "Manual Exploitation Suite", type: "security" },
        { id: "4", label: "Vulnerability Auditor", subtext: "IDOR, Mass Assignment, Fare Tamper", type: "security" },
        { id: "5", label: "Remediation Matrix", subtext: "OWASP Alignment & Defense Rules", type: "storage" },
        { id: "6", label: "Audit Report PDF", subtext: "Verified Vulnerability Dossier", type: "output" }
      ],
      journey: {
        question: "How secure is our Ride-Sharing application against critical business logic and OWASP vulnerabilities?",
        learning: "OWASP Web Security Testing Guide (WSTG), manual penetration testing tools, and severe access control flaws.",
        experiment: "Designed 48 manual security test cases using Burp Suite to audit the authentication and API endpoints.",
        challenge: "Detecting client-side validation bypasses and IDOR parameters in dynamic JWT session states.",
        solution: "Configured target scopes in Burp Suite, intercepted session tokens, and verified unauthorized modifications.",
        impact: "Compiled a professional penetration testing report mapping identified vulnerabilities to remediation guides."
      }
    },
    {
      id: "deepfake-detection",
      title: "DeepFake Detection",
      category: "AI & Digital Forensics",
      tagline: "AI-powered deepfake classification & digital forensics",
      skills: ["security-constellation", "forensics-constellation", "ai-constellation"],
      techStack: ["Python", "CNNs", "Feature Extraction", "PyTorch", "Digital Forensics"],
      githubUrl: "https://github.com/2300031984/DeepFake_Detection-",
      features: [
        "Engineered automated frame feature extractors processing micro-expression sequences.",
        "Trained Convolutional Neural Networks (CNNs) to recognize blending borders and frequency artifacts.",
        "Processed high-resolution video streams to extract facial regions of interest.",
        "Formulated classification confidence scores to verify authenticity of digital identity media."
      ],
      architectureFlow: [
        { id: "1", label: "Video Frame Stream", subtext: "Digital Identity Input", type: "input" },
        { id: "2", label: "Facial ROI Extractor", subtext: "Micro-expression Extraction", type: "process" },
        { id: "3", label: "Frequency Inspector", subtext: "FFT Spectral Artifact Analysis", type: "security" },
        { id: "4", label: "PyTorch CNN Model", subtext: "Classification Neural Net", type: "ai" },
        { id: "5", label: "Authenticity Engine", subtext: "Confidence Score Matrix", type: "output" }
      ],
      journey: {
        question: "How can deep learning model patterns detect artificially synthesized facial frames?",
        learning: "Convolutional Neural Networks, spatial frame analysis, and deepfake generation artifacts.",
        experiment: "Trained classification architectures on manipulated identity clips.",
        challenge: "High resolution faces and subtle blending boundaries that escape simple filter sweeps.",
        solution: "Integrated localized face parsing and trained network layers on pixel-level texture maps.",
        impact: "Constructed a high-fidelity classification pipeline isolating synthetic modifications."
      }
    },
    {
      id: "malware-analysis-lab",
      title: "Malware Analysis Project",
      category: "Cybersecurity & Reverse Engineering",
      tagline: "Static analysis, dynamic behavior, & reverse engineering",
      skills: ["security-constellation", "forensics-constellation"],
      techStack: ["Python", "Static Analysis", "Dynamic Behavior", "Reverse Engineering", "PE Headers"],
      githubUrl: "https://github.com/2300031984/malware-analysis-project",
      features: [
        "Explored file headers and PE signatures to identify packer obfuscation and compiler metadata.",
        "Audited malicious runtime events including memory allocations, process spawns, and file writes.",
        "Reverse-engineered basic assembly blocks to trace control flow and conditional execution anomalies.",
        "Documented evasion indicators and compiled signatures to feed defensive detection systems."
      ],
      architectureFlow: [
        { id: "1", label: "Binary File Sample", subtext: "Packed PE Payload", type: "input" },
        { id: "2", label: "PE Header Parser", subtext: "Section & Import Inspection", type: "process" },
        { id: "3", label: "Assembly Decompiler", subtext: "x86/x64 Control Flow Audit", type: "security" },
        { id: "4", label: "Sandbox Telemetry", subtext: "Memory & Syscall Logging", type: "storage" },
        { id: "5", label: "Threat Signature", subtext: "YARA / Detection Rules", type: "output" }
      ],
      journey: {
        question: "How can we identify structural indicators of malicious code before execution?",
        learning: "Assembly instructions, PE file format parsing, and sandbox telemetry logs.",
        experiment: "Deconstructed dynamic system logs and binary exports from packed file payloads.",
        challenge: "Isolating evasive packers designed to disable virtual debugger loops.",
        solution: "Configured kernel-level logging hooks and analyzed memory-injected payloads statically.",
        impact: "Formulated robust detection signatures identifying packaged threats dynamically."
      }
    },
    {
      id: "network-traffic-analysis",
      title: "Network Traffic Analysis using Wireshark",
      category: "Network Security & Incident Response",
      tagline: "Packet captures & incident detection logs",
      skills: ["forensics-constellation", "cloud-constellation"],
      techStack: ["Wireshark", "Network Security", "TCP/IP", "DNS SEC", "Packet Capture"],
      githubUrl: "https://github.com/2300031984/Network-Traffic-Analysis-using-Wireshark",
      features: [
        "Logged and parsed raw packet captures (PCAP) to identify unusual handshake sequences.",
        "Analyzed application layer protocols including DNS query loads and HTTP headers.",
        "Audited port scans, flood attempts, and abnormal data exchanges.",
        "Simulated security event streams logging threat patterns for incident response teams."
      ],
      architectureFlow: [
        { id: "1", label: "Raw PCAP Capture", subtext: "Network Interface Traffic", type: "input" },
        { id: "2", label: "Wireshark Dissector", subtext: "Protocol & Handshake Analyzer", type: "process" },
        { id: "3", label: "Anomalous Log Filter", subtext: "Port Scans & Flood Identifiers", type: "security" },
        { id: "4", label: "Threat Map Report", subtext: "Incident Telemetry Digest", type: "output" }
      ],
      journey: {
        question: "Can we isolate suspicious patterns buried in high-volume raw packet streams?",
        learning: "Protocol handshake states, packet structures, and Wireshark filter syntax.",
        experiment: "Captured and parsed network logs from simulated attack vectors.",
        challenge: "Filtering out background service chatter to isolate malicious beaconing.",
        solution: "Formulated specific socket query profiles and parsed data streams sequentially.",
        impact: "Successfully mapped and documented threat payloads and brute-force events."
      }
    },
    {
      id: "secure-ride-sharing",
      title: "RideSharing Platform",
      category: "Web & Software Engineering",
      tagline: "Interactive Ride Booking & Management Platform",
      skills: ["backend-constellation", "cloud-constellation"],
      techStack: ["JavaScript", "HTML", "CSS", "Browser APIs"],
      githubUrl: "https://github.com/2300031984/RideSharing",
      features: [
        "Designed an interactive web interface matching riders and drivers in real-time.",
        "Implemented client-side trip routing and fare calculation logic.",
        "Optimized DOM rendering loops to handle active driver locations smoothly.",
        "Created secure session states for managing user authentication and active bookings."
      ],
      architectureFlow: [
        { id: "1", label: "User / Driver Web UI", subtext: "Interactive Browser Interface", type: "input" },
        { id: "2", label: "Dispatch State Engine", subtext: "Client-side Route & Fare Logic", type: "process" },
        { id: "3", label: "Real-time Renderer", subtext: "DOM Throttled Location Loop", type: "output" }
      ],
      journey: {
        question: "Can we build a responsive transportation dispatch interface directly in the browser?",
        learning: "DOM manipulation, asynchronous network requests, and real-time state synchronization.",
        experiment: "Developed a functional ride-sharing platform simulating dispatch triggers.",
        challenge: "Handling concurrent driver status updates without lagging the main UI thread.",
        solution: "Implemented throttling and optimized state updates for active driver maps.",
        impact: "Delivered a lightweight, highly responsive dispatch mock with instant state reactions."
      }
    }
  ],
  skills: [
    {
      id: "backend-constellation",
      title: "Software Engineering & Backend",
      items: ["Java", "Spring Boot", "FastAPI", "Python", "REST APIs", "JWT Auth", "Spring Security", "MySQL", "PostgreSQL", "Hibernate ORM", "Microservices"],
      relatedProjects: ["secure-ride-sharing", "ride-sharing-pentest", "soc-automation-platform", "ai-resume-analyzer", "hashlens"]
    },
    {
      id: "ai-constellation",
      title: "AI, LLMs & Agentic Systems",
      items: ["Google Gemini API", "Large Language Models (LLMs)", "LangChain", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "ChromaDB Vector DB", "n8n Workflow Automation"],
      relatedProjects: ["soc-automation-platform", "ai-resume-analyzer", "deepfake-detection"]
    },
    {
      id: "security-constellation",
      title: "Cybersecurity & AppSec",
      items: ["OWASP Top 10", "OWASP WSTG", "Penetration Testing", "API Security", "Threat Hunting", "Incident Response", "Vulnerability Assessment", "Secure Coding", "Malware Analysis", "Digital Forensics"],
      relatedProjects: ["malware-analysis-lab", "deepfake-detection", "ride-sharing-pentest", "soc-automation-platform", "hashlens"]
    },
    {
      id: "cloud-constellation",
      title: "Cloud & DevOps",
      items: ["AWS (EC2, S3, IAM, RDS)", "Docker Containers", "Kubernetes (basics)", "Linux Administration", "Git", "GitHub Actions", "CI/CD Pipelines", "Deployment Automation"],
      relatedProjects: ["secure-ride-sharing", "network-traffic-analysis", "soc-automation-platform", "ai-resume-analyzer", "hashlens"]
    },
    {
      id: "programming-constellation",
      title: "Languages & Scripts",
      items: ["Java", "Python", "SQL", "C", "Bash scripting", "Competitive Programming"],
      relatedProjects: ["secure-ride-sharing", "malware-analysis-lab", "deepfake-detection", "ride-sharing-pentest", "soc-automation-platform", "ai-resume-analyzer", "hashlens"]
    },
    {
      id: "core-cs-constellation",
      title: "Core CS & Algorithms",
      items: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "System Design", "400+ Algorithmic Problems Solved"],
      relatedProjects: ["secure-ride-sharing", "malware-analysis-lab", "network-traffic-analysis", "ride-sharing-pentest", "soc-automation-platform", "ai-resume-analyzer", "hashlens"]
    }
  ],
  buildLog: [
    {
      year: "2026",
      summary: "Advanced AI Agentic Systems, Cryptographic Forensic Ledgers & Enterprise Security Automation",
      items: [
        {
          id: "log-2026-1",
          title: "AI Threat Intelligence & SOC Automation Platform",
          category: "AI",
          period: "Jan 2026 – Present",
          description: "Engineered multi-tenant SOC automation platform integrating FastAPI, Google Gemini RAG, n8n SOAR workflows, and PostgreSQL row-level security.",
          tech: ["FastAPI", "PostgreSQL", "LangChain", "Gemini AI", "n8n", "Docker"],
          link: "https://github.com/2300031984/AI-Cybersecurity-SOC-Automation-Platform"
        },
        {
          id: "log-2026-2",
          title: "HASHLENS Forensic Integrity Engine",
          category: "Security",
          period: "Aug 2026 – Sep 2026",
          description: "Built local-first streaming cryptographic hash calculator, chunk fingerprinting engine, and tamper-evident append-only ledger with 70/70 unit tests.",
          tech: ["Python", "FastAPI", "Streamlit", "SQLite", "Cryptography", "Docker"],
          link: "https://github.com/2300031984/HASHLENS"
        },
        {
          id: "log-2026-3",
          title: "AI Resume Analyzer & Semantic RAG System",
          category: "AI",
          period: "Feb 2026 – May 2026",
          description: "Designed Spring Boot REST API backed by ChromaDB vector store and Gemini LLM for ATS semantic job match scoring.",
          tech: ["Spring Boot", "ChromaDB", "LangChain", "Gemini API", "REST APIs"],
          link: "https://github.com/2300031984/AI-Resume-Analyzer"
        },
        {
          id: "log-2026-4",
          title: "TryHackMe Security Research Publication",
          category: "Security",
          period: "August 2026",
          description: "Published technical article detailing key lessons from completing 100+ hands-on TryHackMe security labs across SOC, AppSec, and networking.",
          tech: ["TryHackMe", "OWASP", "SOC", "Network Analysis"],
          link: "https://www.linkedin.com/pulse/what-100-tryhackme-labs-taught-me-cybersecurity-chintala-sai-varun-u2hcf/"
        }
      ]
    },
    {
      year: "2025",
      summary: "Full Stack Java Backend Engineering, Security Audits, Network Packet Forensics & TryHackMe",
      items: [
        {
          id: "log-2025-1",
          title: "Java Full Stack Development Internship",
          category: "Software",
          period: "April 2025 – June 2025",
          description: "Developed enterprise Spring Boot backends, implemented JWT authentication, designed MySQL schemas, and built secure REST APIs at EduSkills.",
          tech: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "Hibernate"]
        },
        {
          id: "log-2025-2",
          title: "RideSharing Application Penetration Test Audit",
          category: "Security",
          period: "July 2025 – Sep 2025",
          description: "Executed 48 manual security test cases using Burp Suite following OWASP WSTG, uncovering IDOR and fare manipulation flaws.",
          tech: ["Burp Suite", "OWASP WSTG", "JWT Security", "API Security"]
        },
        {
          id: "log-2025-3",
          title: "Network Traffic Analysis & Packet Dissection",
          category: "Security",
          period: "Aug 2025 – Nov 2025",
          description: "Parsed raw PCAP streams with Wireshark to investigate TCP handshakes, DNS anomalies, and simulated flood attack vectors.",
          tech: ["Wireshark", "TCP/IP", "DNSSEC", "PCAP Analysis"],
          link: "https://github.com/2300031984/Network-Traffic-Analysis-using-Wireshark"
        },
        {
          id: "log-2025-4",
          title: "100+ TryHackMe Labs Completion",
          category: "Security",
          period: "2025 – 2026",
          description: "Completed over 100 offensive and defensive labs covering web application security, Linux privilege escalation, network auditing, and Active Directory.",
          tech: ["TryHackMe", "Linux", "Nmap", "Wireshark", "Metasploit"]
        },
        {
          id: "log-2025-5",
          title: "DeepFake AI Detection & Forensics Framework",
          category: "AI",
          period: "Sep 2025 – Dec 2025",
          description: "Trained PyTorch CNN models on facial micro-expressions and spatial frame boundary artifacts to classify synthetic media.",
          tech: ["Python", "PyTorch", "CNNs", "OpenCV", "Forensics"],
          link: "https://github.com/2300031984/DeepFake_Detection-"
        },
        {
          id: "log-2025-6",
          title: "Malware Static Analysis & PE Structure Lab",
          category: "Security",
          period: "June 2025 – Oct 2025",
          description: "Analyzed PE headers, obfuscated packers, dynamic sandbox telemetry, and decompiled assembly control flow.",
          tech: ["Python", "PEfile", "Assembly x86", "Sandbox Telemetry"],
          link: "https://github.com/2300031984/malware-analysis-project"
        }
      ]
    },
    {
      year: "2024",
      summary: "Data Structures, Algorithmic Problem Solving (2023 – 2026) & Computer Science Foundations",
      items: [
        {
          id: "log-2024-1",
          title: "400+ Algorithmic Problem Solving Mastery",
          category: "Software",
          period: "2023 – 2026",
          description: "Earned Smart Coder Silver certification by solving 400+ data structure and algorithm challenges across LeetCode, CodeChef, and HackerRank.",
          tech: ["Java", "Python", "Data Structures", "Algorithms"]
        }
      ]
    }
  ],
  experiments: [
    {
      id: "exp-1",
      title: "AI Threat Intelligence & SOC Automation",
      category: "AI / Cybersecurity",
      researchQuestion: "Can AI-assisted threat intelligence improve vulnerability triage and SOC automation?",
      progress: "Built a multi-tenant SOC platform integrating NVD, CISA KEV, EPSS, MITRE ATT&CK and AI-assisted analysis through automated workflows.",
      challenges: "Ensuring reliable correlation across disparate vulnerability feeds without false positives.",
      futureDirection: "Expanding automated playbook triggers for real-time threat response."
    },
    {
      id: "exp-2",
      title: "Contextual RAG & Vector Search",
      category: "AI / ML",
      researchQuestion: "Can retrieval-augmented generation improve contextual security analysis while maintaining source-grounded responses?",
      progress: "Implemented contextual retrieval using LangChain and ChromaDB for security-oriented document and data retrieval.",
      challenges: "Minimizing retrieval latency and context window pollution.",
      futureDirection: "Integrating dense hybrid embeddings with semantic SQL query filters."
    },
    {
      id: "exp-3",
      title: "API Security & Access Control",
      category: "Cybersecurity",
      researchQuestion: "How can API authorization weaknesses be systematically identified during security testing?",
      progress: "Tested REST APIs for authentication, authorization, IDOR, mass assignment, JWT handling and HTTP method manipulation.",
      challenges: "Detecting fine-grained privilege escalation flaws across complex endpoint routes.",
      futureDirection: "Automating OAS/Swagger schema diffing for shadow API detection."
    },
    {
      id: "exp-4",
      title: "HASHING — File Integrity & Forensics",
      category: "Digital Forensics / Cybersecurity",
      researchQuestion: "Can cryptographic hashing provide a verifiable integrity chain for continuously changing evidence?",
      progress: "Developed HASHLENS around chunk fingerprinting, cryptographic hashing and tamper-evident integrity verification.",
      challenges: "Mitigating performance overhead during real-time multi-algorithm streaming.",
      futureDirection: "Adding merkle tree verification for distributed file audit trails."
    },
    {
      id: "exp-5",
      title: "OWASP Web Application Security Testing",
      category: "Application Security",
      researchQuestion: "Can systematic OWASP-based testing identify authorization and API weaknesses before exploitation?",
      progress: "Performed manual security testing across authentication, IDOR, mass assignment, HTTP methods, JWT handling and security controls.",
      challenges: "Correlating complex multi-step request sequences with OWASP WSTG test cases.",
      futureDirection: "Building automated test harnesses for recurring web application audits."
    },
    {
      id: "exp-6",
      title: "JWT Authentication & Authorization Analysis",
      category: "API Security",
      researchQuestion: "How can weaknesses in token-based authentication and authorization be detected during API security testing?",
      progress: "Analyzed JWT authentication, authorization boundaries, token handling and access-control behavior in Spring Boot REST APIs.",
      challenges: "Preventing algorithm confusion and token expiration bypass vulnerabilities.",
      futureDirection: "Enforcing central OAuth2 token revocation checks via distributed caches."
    },
    {
      id: "exp-7",
      title: "Network Traffic Analysis & Packet Inspection",
      category: "Network Security",
      researchQuestion: "Can packet-level analysis reveal suspicious communication patterns and potential security incidents?",
      progress: "Analyzed TCP/IP, DNS and application traffic using Wireshark and hands-on network security investigations.",
      challenges: "Parsing encrypted TLS stream metadata without deep packet inspection.",
      futureDirection: "Automating pcap flow parsing for anomaly detection scripts."
    },
    {
      id: "exp-8",
      title: "Malware Static Analysis & PE Structures",
      category: "Malware Analysis",
      researchQuestion: "Can static PE analysis reveal suspicious characteristics without executing potentially malicious binaries?",
      progress: "Performed controlled static analysis of PE structures, metadata, sections, imports and executable characteristics.",
      challenges: "Identifying obfuscated imports and packed binary sections.",
      futureDirection: "Integrating YARA rule matching for automated sample triage."
    },
    {
      id: "exp-9",
      title: "Threat Intelligence Correlation",
      category: "Cybersecurity",
      researchQuestion: "Can multiple threat-intelligence sources produce better vulnerability prioritization than CVE data alone?",
      progress: "Worked with NVD, CISA KEV, EPSS and MITRE ATT&CK data as part of the AI SOC platform.",
      challenges: "Aligning heterogeneous scoring models across rapidly updating feeds.",
      futureDirection: "Synthesizing dynamic risk scores based on live EPSS exploit probabilities."
    },
    {
      id: "exp-10",
      title: "Security Automation with n8n",
      category: "Security Automation",
      researchQuestion: "Can repetitive threat-intelligence collection and enrichment be transformed into a reliable automated SOC workflow?",
      progress: "Built automated workflows connecting vulnerability feeds, enrichment sources, AI analysis and PostgreSQL storage.",
      challenges: "Handling API rate limits and webhook error retries across automation nodes.",
      futureDirection: "Creating self-healing workflow nodes with automated fallback paths."
    },
    {
      id: "exp-11",
      title: "Container & Docker Security",
      category: "Cloud / DevSecOps",
      researchQuestion: "How can container configuration and runtime behavior introduce security weaknesses into application environments?",
      progress: "Worked with Docker-based development environments and investigated container configuration and service security.",
      challenges: "Securing rootless container execution without breaking host resource bindings.",
      futureDirection: "Integrating container image scanning into automated CI/CD pipelines."
    },
    {
      id: "exp-12",
      title: "Cloud IAM Security Analysis",
      category: "Cloud Security",
      researchQuestion: "How can excessive cloud permissions and IAM configuration weaknesses increase attack surface?",
      progress: "Studied AWS IAM policies, permissions, identity controls and cloud security fundamentals through hands-on learning.",
      challenges: "Tracing wildcard permission inheritance across complex multi-role policies.",
      futureDirection: "Building least-privilege IAM policy generation scripts."
    }
  ],
  proof: [
    {
      id: "proof-aws",
      title: "AWS Certified Cloud Practitioner",
      category: "Certification",
      detail: "Amazon Web Services (CLF-C02) — Achieved high score of 981 / 1000.",
      verificationLink: "AWS_Certified_Cloud_Practitioner_certificate.pdf",
      highlight: "Score: 981 / 1000"
    },
    {
      id: "proof-oracle",
      title: "Oracle AI Foundations Associate",
      category: "Certification",
      detail: "Oracle Corporation — Certified in Machine Learning, AI algorithms, and neural networks.",
      verificationLink: "https://education.oracle.com/verification",
      highlight: "AI & ML Verified"
    },
    {
      id: "proof-ms",
      title: "Microsoft Certified: Security Operations Analyst Associate",
      category: "Certification",
      detail: "Microsoft (SC-200) — Certified in incident response, threat hunting, and Defender/Sentinel.",
      verificationLink: "Microsoft_Certified_Security_Operations_Analyst_Associate.pdf",
      highlight: "SC-200 Certified"
    },
    {
      id: "proof-smart-coder",
      title: "Smart Coder Certification (Silver)",
      category: "Certification",
      detail: "Smart Interviews — Verified mastery of Data Structures, Algorithms & System Design.",
      verificationLink: "https://smartinterviews.in/certificate/2aca3234",
      highlight: "400+ Algorithmic Problems"
    },
    {
      id: "proof-thm",
      title: "100+ TryHackMe Security Labs",
      category: "Achievement",
      detail: "Completed 100+ practical labs covering Web AppSec, SOC operations, malware analysis, and network auditing.",
      verificationLink: "https://tryhackme.com/p/SaiVarun",
      highlight: "100+ Practical Labs"
    },
    {
      id: "proof-cgpa",
      title: "Academic Excellence — 9.56 / 10.0 CGPA",
      category: "Academic",
      detail: "Koneru Lakshmaiah Education Foundation — B.Tech Computer Science and Engineering (2023-2027).",
      highlight: "CGPA 9.56 / 10.0"
    },
    {
      id: "proof-leadership",
      title: "Technical Team Lead",
      category: "Leadership",
      detail: "KL Student Activity Center — Leading technical workshops, hackathons, and software engineering projects.",
      highlight: "Student Team Lead"
    },
    {
      id: "proof-github",
      title: "169+ GitHub Contributions",
      category: "Achievement",
      detail: "Maintained active open-source contribution record across 19 public repositories.",
      verificationLink: "https://github.com/2300031984",
      highlight: "19 Repositories"
    }
  ],
  feedback: [
    {
      name: "Prof. K. Raghava",
      role: "Department of Computer Science Engineering",
      comment: "Sai Varun shows outstanding analytical aptitude. His focus on AI security paradigms, protocol audits, and system architecture reflects real academic depth."
    },
    {
      name: "S. Srinivasan",
      role: "Internship Director at EduSkills",
      comment: "Varun quickly understood our transactional APIs. He designed Spring Security integrations that eliminated multiple session vulnerability vectors."
    },
    {
      name: "T. Nitish Kumar",
      role: "Security Research Partner",
      comment: "Collaborating with Varun on threat hunting projects is seamless. His Wireshark investigations reveal anomalies that others typically skip."
    }
  ],
  githubStats: {
    commits: "169 contributions in the last year",
    repos: "19",
    primaryTech: "Java / Python / JS / TS",
    contributions: "169 Contributions"
  },
  blogs: [
    {
      id: "tryhackme-100-labs",
      title: "What 100+ TryHackMe Labs Taught Me About Cybersecurity",
      category: "Cybersecurity",
      publishedDate: "August 2026",
      readingTime: "8 min read",
      description: "Lessons learned from completing 100+ hands-on TryHackMe labs covering web security, networking, Active Directory, SOC operations, malware analysis, privilege escalation, and defensive security. The article explains how practical labs helped build a strong cybersecurity mindset and influenced my real-world security projects.",
      topics: ["TryHackMe", "Cybersecurity", "Web Security", "SOC", "OWASP", "Networking", "Linux"],
      readUrl: "https://www.linkedin.com/pulse/what-100-tryhackme-labs-taught-me-cybersecurity-chintala-sai-varun-u2hcf/",
      imageUrl: "/tryhackme_blog_thumbnail.png",
      isFeatured: true
    }
  ]
};
