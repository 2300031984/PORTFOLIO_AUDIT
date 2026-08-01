export interface ProjectJourney {
  question: string;
  learning: string;
  experiment: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  skills: string[];
  techStack: string[];
  githubUrl?: string;
  reportUrl?: string;
  features: string[];
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
  researchQuestion: string;
  progress: string;
  challenges: string;
  futureDirection: string;
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
  highlights: string[];
  coursework: string[];
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
    certifications: {
      name: string;
      issuer: string;
      link: string;
    }[];
    securityTraining: string;
    problemSolving: string;
    objective: string;
  };
  internship: Internship;
  education: Education;
  projects: Project[];
  skills: SkillCluster[];
  experiments: CurrentExperiment[];
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
    title: "Secure Systems Engineer",
    subTitle: "Every system leaves traces. Every trace tells a story. My work begins where patterns emerge.",
    about: "I build secure intelligent systems, AI-powered backend applications, LLM-driven workflows, and security automation platforms. Experienced in Python, Java, Spring Boot, FastAPI, RAG, and cloud architecture.",
    lovesSolving: "Agentic AI workflows, secure access delegation protocols, and high-throughput backend pipelines.",
    email: "saivarun699@gmail.com",
    githubUrl: "https://github.com/2300031984",
    linkedinUrl: "https://www.linkedin.com/in/saivarun1/",
    tryhackmeUrl: "https://tryhackme.com/p/SaiVarun",
    leetcodeUrl: "https://leetcode.com/u/klu2300031984/",
    codechefUrl: "https://www.codechef.com/users/saivarun_12",
    hackerrankUrl: "https://www.hackerrank.com/profile/h2300031984",
    specializations: [
      "Backend Engineering",
      "Cybersecurity",
      "Cloud Computing",
      "AI Security"
    ],
    certifications: [
      {
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        link: "AWS_Certified_Cloud_Practitioner_certificate.pdf"
      },
      {
        name: "Oracle AI Foundations Associate",
        issuer: "Oracle Corporation",
        link: "https://education.oracle.com/verification"
      },
      {
        name: "Microsoft Certified: Security Operations Analyst Associate",
        issuer: "Microsoft",
        link: "Microsoft_Certified_Security_Operations_Analyst_Associate.pdf"
      },
      {
        name: "Smart Coder Certification (Silver)",
        issuer: "Smart Interviews",
        link: "https://smartinterviews.in/certificate/2aca3234"
      }
    ],
    securityTraining: "100+ TryHackMe Labs Completed",
    problemSolving: "400+ Algorithmic Challenges Solved",
    objective: "Building intelligent systems capable of understanding and defending themselves."
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
    highlights: [
      "Maintained an excellent CGPA of 9.56/10.",
      "Specializing in Secure Software Engineering and Cloud Systems integrations.",
      "Active participant in CTFs and security hackathons.",
      "Maintained a strong analytical focus on data structures, protocols, and networks."
    ],
    coursework: ["Cryptography", "Computer Networks", "Information Security", "Operating Systems", "Database Management Systems", "Data Structures & Algorithms"]
  },
  projects: [
    {
      id: "secure-ride-sharing",
      title: "RideSharing",
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
      journey: {
        question: "Can we build a responsive transportation dispatch interface directly in the browser?",
        learning: "DOM manipulation, asynchronous network requests, and real-time state synchronization.",
        experiment: "Developed a functional ride-sharing platform simulating dispatch triggers.",
        challenge: "Handling concurrent driver status updates without lagging the main UI thread.",
        solution: "Implemented throttling and optimized state updates for active driver maps.",
        impact: "Delivered a lightweight, highly responsive dispatch mock with instant state reactions."
      }
    },
    {
      id: "malware-analysis-lab",
      title: "Malware Analysis Project",
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
      id: "deepfake-detection",
      title: "DeepFake Detection",
      tagline: "AI-powered deepfake classification & forensics",
      skills: ["security-constellation", "forensics-constellation"],
      techStack: ["Python", "CNNs", "Feature Extraction", "PyTorch", "Digital Forensics"],
      githubUrl: "https://github.com/2300031984/DeepFake_Detection-",
      features: [
        "Engineered automated frame feature extractors processing micro-expression sequences.",
        "Trained Convolutional Neural Networks (CNNs) to recognize blending borders and frequency artifacts.",
        "Processed high-resolution video streams to extract facial regions of interest.",
        "Formulated classification confidence scores to verify authenticity of digital identity media."
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
      id: "network-traffic-analysis",
      title: "Network Traffic Analysis using Wireshark",
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
      id: "ride-sharing-pentest",
      title: "RideSharing Pentest",
      tagline: "Manual security assessment & OWASP WSTG audits",
      skills: ["security-constellation", "backend-constellation"],
      techStack: ["Burp Suite", "OWASP WSTG", "JWT Security", "API Security", "Penetration Testing"],
      reportUrl: "Penetration_Test_Report.pdf",
      features: [
        "Conducted a comprehensive manual penetration testing assessment of a self-developed Ride-Sharing Web Application using Burp Suite Community Edition.",
        "Audited 48 manual security test cases covering Authentication, Authorization, JWT Security, and IDOR.",
        "Identified Broken Access Control (IDOR), Mass Assignment, Client-Side Fare Manipulation, and Missing Rate Limiting.",
        "Prepared a professional report mapping vulnerabilities, severities, evidence, remediation, and OWASP mappings."
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
      id: "soc-automation-platform",
      title: "AI Agentic Threat Intelligence & SOC Automation Platform",
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
      id: "ai-resume-analyzer",
      title: "AI Resume Analyzer",
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
      journey: {
        question: "Can we engineer a high-throughput backend that performs semantic resume parsing and ATS matching without compromising document structure?",
        learning: "Vector database indexing, Retrieval-Augmented Generation (RAG) chunking strategies, and processing multi-format resume documents.",
        experiment: "Developed a pipeline integrating Spring Boot with ChromaDB and LangChain to index resume content and compare against target job descriptions.",
        challenge: "Parsing irregular layouts in PDF resumes and matching unstructured career data to structured skills taxonomies.",
        solution: "Implemented hierarchical semantic chunking combined with Gemini LLM extraction to map resume text to normalized vector embeddings.",
        impact: "Built a scalable automated screening system generating detailed ATS reports, semantic gap analyses, and personalized skill recommendations."
      }
    }
  ],
  skills: [
    {
      id: "backend-constellation",
      title: "Backend Engineering",
      items: ["Java", "Spring Boot", "FastAPI", "REST APIs", "JWT Authentication", "Spring Security", "MySQL", "PostgreSQL", "Hibernate ORM", "Microservices"],
      relatedProjects: ["secure-ride-sharing", "ride-sharing-pentest", "soc-automation-platform", "ai-resume-analyzer"]
    },
    {
      id: "security-constellation",
      title: "Application Security & Cybersecurity",
      items: ["OWASP Top 10", "OWASP WSTG", "Penetration Testing", "API Security", "Threat Hunting", "Incident Response", "Vulnerability Assessment", "Secure Coding", "Secure SDLC", "Authentication & Authorization", "Malware Analysis", "Digital Forensics"],
      relatedProjects: ["malware-analysis-lab", "deepfake-detection", "ride-sharing-pentest", "soc-automation-platform"]
    },
    {
      id: "cloud-constellation",
      title: "Cloud & DevOps",
      items: ["AWS (EC2, S3, IAM, RDS)", "Docker", "Kubernetes (basics)", "Linux", "Git", "GitHub Actions", "CI/CD Pipelines", "Deployment Automation"],
      relatedProjects: ["secure-ride-sharing", "network-traffic-analysis", "soc-automation-platform", "ai-resume-analyzer"]
    },
    {
      id: "programming-constellation",
      title: "Programming",
      items: ["Java", "Python", "SQL", "C", "Bash scripting", "Competitive Programming"],
      relatedProjects: ["secure-ride-sharing", "malware-analysis-lab", "deepfake-detection", "ride-sharing-pentest", "soc-automation-platform", "ai-resume-analyzer"]
    },
    {
      id: "core-cs-constellation",
      title: "Core Computer Science",
      items: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
      relatedProjects: ["secure-ride-sharing", "malware-analysis-lab", "network-traffic-analysis", "ride-sharing-pentest", "soc-automation-platform", "ai-resume-analyzer"]
    },
    {
      id: "ai-constellation",
      title: "AI, LLMs & Agentic Systems",
      items: ["Gemini API", "Large Language Models (LLMs)", "LangChain", "Retrieval-Augmented Generation (RAG)", "Prompt Engineering", "ChromaDB", "n8n Workflow Automation"],
      relatedProjects: ["soc-automation-platform", "ai-resume-analyzer", "deepfake-detection"]
    }
  ],
  experiments: [
    {
      id: "ai-agents",
      title: "AI Agents",
      researchQuestion: "Can multi-agent swarms automate dynamic security incident isolation?",
      progress: "Prototyped a localized router agent selecting sub-agents for log analysis.",
      challenges: "Ensuring zero prompt injection drift in command executions.",
      futureDirection: "Integrating local WebGPU LLMs for isolated agent decision clusters."
    },
    {
      id: "rag-systems",
      title: "RAG Systems",
      researchQuestion: "Can RAG networks extract contextual CVE vulnerabilities without query leak?",
      progress: "Indexed historical vulnerability databases inside local vectors.",
      challenges: "Minimizing retrieval latency and context pollution.",
      futureDirection: "Integrating dense embeddings with semantic search filters."
    },
    {
      id: "cloud-security",
      title: "Cloud Security",
      researchQuestion: "Can serverless functions automate identity credential audits dynamically?",
      progress: "Deployed auditing lambda scripts reacting to IAM permission modifications.",
      challenges: "Policy complexity in cross-account cloud environments.",
      futureDirection: "Synthesizing automated path validation for policy validation."
    },
    {
      id: "threat-intel-automation",
      title: "Threat Intelligence Automation",
      researchQuestion: "Can we synthesize live honeypot anomaly patterns automatically?",
      progress: "Configuring automated SSH monitors capturing malicious inputs.",
      challenges: "Distinguishing coordinated scans from individual script attempts.",
      futureDirection: "Compiling behavior maps dynamically to feed active firewall rules."
    },
    {
      id: "advanced-system-design",
      title: "Advanced System Design",
      researchQuestion: "How do we design stateful backends that auto-recover from system partitions?",
      progress: "Simulating multi-node consensus algorithms over virtual connections.",
      challenges: "Mitigating split-brain latency states on slow networks.",
      futureDirection: "Deploying raft consensus layers directly inside edge nodes."
    },
    {
      id: "security-monitoring",
      title: "Security Monitoring Platforms",
      researchQuestion: "Can we build an open telemetry hub mapping packet streams in micro-services?",
      progress: "Routing Docker log streams to a unified console visualization.",
      challenges: "Parsing disparate log layouts from dynamic container systems.",
      futureDirection: "Developing customizable parsers for structured cloud registries."
    }
  ],
  feedback: [
    {
      name: "Prof. K. Raghava",
      role: "Department of Computer Science Engineering",
      comment: "Sai Varun shows outstanding analytical aptitude. His focus on AI security paradigms and protocol audits reflects real academic depth."
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
    commits: "87 contributions in the last year",
    repos: "14",
    primaryTech: "Java / Python / JS / TS",
    contributions: "87 Contributions"
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
    },
    {
      id: "ai-threat-intel-soc",
      title: "Building an Enterprise AI-Powered Threat Intelligence & SOC Automation Platform",
      category: "AI Security",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "Learn how to build and orchestrate automated threat intelligence pipelines and incident response workflows using FastAPI, LangChain, n8n, and Google Gemini.",
      topics: ["AI Security", "Threat Intelligence", "SOC", "Automation", "FastAPI"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "manual-web-pentesting",
      title: "Manual Web Application Penetration Testing Using OWASP WSTG",
      category: "Application Security",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "A comprehensive guide on executing structured manual security assessments for web applications following the OWASP Web Security Testing Guide.",
      topics: ["Application Security", "OWASP", "Penetration Testing", "WSTG"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "malware-analysis-sandbox",
      title: "Building a Malware Analysis Sandbox with Python",
      category: "Malware Analysis",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "A deep dive into configuring dynamic and static malware analysis environments and parsing binary PE structure using custom Python automation.",
      topics: ["Malware Analysis", "Python", "Static Analysis", "Cybersecurity"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "idor-testing-practical",
      title: "Understanding IDOR Through Practical Testing",
      category: "Application Security",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "Exploring Broken Object Level Authorization (BOLA/IDOR) vulnerabilities, demonstrating detection methods and remediation techniques.",
      topics: ["Application Security", "IDOR", "Web Security", "Penetration Testing"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "jwt-security-best-practices",
      title: "JWT Authentication Security Best Practices",
      category: "Cloud Security",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "Secure authorization design using JSON Web Tokens in production, covering signature verification, token algorithms, and secure storage.",
      topics: ["Cloud Security", "JWT", "Authentication", "API Security"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "automating-threat-intel-nvd",
      title: "Automating Threat Intelligence Using NVD, EPSS & CISA KEV",
      category: "Threat Intelligence",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "How to aggregate live vulnerability feeds using API integrations with the National Vulnerability Database, EPSS risk scoring, and CISA's Known Exploited Vulnerabilities.",
      topics: ["Threat Intelligence", "Automation", "CVE", "EPSS", "CISA KEV"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "ai-security-copilot",
      title: "Building an AI Security Copilot with LangChain & Gemini",
      category: "AI Security",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "Engineering conversational AI agents capable of answering specialized security queries and parsing threat logs using Retrieval-Augmented Generation.",
      topics: ["AI Security", "LangChain", "Gemini", "RAG", "LLM"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "responsible-bug-bounty",
      title: "Responsible Bug Bounty Hunting: My Learning Journey",
      category: "Cybersecurity",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "Sharing methodologies, tools, and ethical frameworks for identifying and reporting security vulnerabilities responsibly in public programs.",
      topics: ["Cybersecurity", "Bug Bounty", "Ethical Hacking", "Vulnerability Hunting"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    },
    {
      id: "cybersecurity-student-roadmap",
      title: "From Student to Security Engineer: My Cybersecurity Roadmap",
      category: "Career",
      publishedDate: "Coming Soon",
      readingTime: "Coming Soon",
      description: "An actionable engineering guide covering essential concepts, practical labs, resources, and credentials to transition into cybersecurity engineering.",
      topics: ["Career", "Roadmap", "Cybersecurity", "Learning Path"],
      readUrl: "#",
      imageUrl: "",
      comingSoon: true
    }
  ]
};
