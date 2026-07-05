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
}

export const portfolioConfig: PortfolioConfig = {
  developer: {
    name: "Chintala Sai Varun",
    title: "Secure Systems Engineer",
    subTitle: "Every system leaves traces. Every trace tells a story. My work begins where patterns emerge.",
    about: "I build secure intelligent systems at the intersection of backend engineering, threat detection, and cloud architecture. Fascinated by detecting patterns hidden inside complex data flows.",
    lovesSolving: "Threat patterns, secure access delegation protocols, and high-throughput backend pipelines.",
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
    company: "EduSkills Foundation",
    location: "Remote",
    duration: "Oct 2023 – Nov 2023",
    highlights: [
      "Designed and developed responsive web interfaces utilizing HTML5, CSS3, and JavaScript.",
      "Implemented database schemas, SQL queries, and connections using Spring Boot microservices.",
      "Built server-side web application components utilizing Spring Boot and MVC architectural guidelines.",
      "Conducted debugging and integration checks to isolate latency spikes in API routers."
    ],
    techStack: ["Java", "Spring Boot", "REST APIs", "Database Optimization", "Authentication Systems", "API Testing"]
  },
  education: {
    degree: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    institution: "Koneru Lakshmaiah Education Foundation (KL University)",
    duration: "2021 – 2025",
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
    }
  ],
  skills: [
    {
      id: "backend-constellation",
      title: "Backend Engineering",
      items: ["Java", "Spring Boot", "REST APIs", "JWT", "Spring Security", "MySQL", "PostgreSQL"],
      relatedProjects: ["secure-ride-sharing", "ride-sharing-pentest"]
    },
    {
      id: "security-constellation",
      title: "Cybersecurity",
      items: ["Threat Hunting", "Incident Response", "Security Operations (SIEM/SOAR)", "Microsoft Sentinel", "OWASP Top 10", "Vulnerability Assessment", "Malware Analysis", "Digital Forensics"],
      relatedProjects: ["malware-analysis-lab", "deepfake-detection", "ride-sharing-pentest"]
    },
    {
      id: "cloud-constellation",
      title: "Cloud & DevOps",
      items: ["AWS", "Docker", "Linux", "Git", "Deployment Automation", "Infrastructure Fundamentals"],
      relatedProjects: ["secure-ride-sharing", "network-traffic-analysis"]
    },
    {
      id: "programming-constellation",
      title: "Programming",
      items: ["Java", "Python", "C", "SQL", "Bash scripting", "Competitive Programming"],
      relatedProjects: ["secure-ride-sharing", "malware-analysis-lab", "deepfake-detection", "ride-sharing-pentest"]
    },
    {
      id: "core-cs-constellation",
      title: "Core Computer Science",
      items: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "System Design"],
      relatedProjects: ["secure-ride-sharing", "malware-analysis-lab", "network-traffic-analysis", "ride-sharing-pentest"]
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
  }
};
