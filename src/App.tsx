import { useState, type FormEvent } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Braces, ExternalLink, Mail, Menu, Network, Phone, Send, Shield, ShieldCheck, Terminal, X } from 'lucide-react'
import { skills } from './data/skills'
import { certifications } from './data/certifications'
import { socialLinks } from './data/social-links'
import { assetUrl } from './utils/assetUrl'
import './App.css'

const projects = [
  { title: 'Recon-Automation-Framework', category: 'Offensive Security', image: assetUrl('images/projects/recon-automation-framework/recon-automation-framework.png'), github: 'https://github.com/sahadatx/Recon-Automation-Framework', status: 'Modular framework · public repository', description: 'A Python framework to organize and automate authorized attack-surface discovery.', overview: 'A plugin-based reconnaissance framework for authorized penetration testing and bug bounty workflows. It reduces repetitive command execution by organizing discovery tasks into a repeatable workflow, normalizing results, and preparing them for review.', highlights: ['Automates subdomain enumeration, DNS resolution, HTTP probing, port scanning, technology detection, and screenshots.', 'Supports web discovery tasks such as URL and JavaScript analysis, directory fuzzing, virtual host discovery, WAF/CDN checks, TLS analysis, and takeover detection.', 'Designed for modular tool integration, structured reporting, dashboard support, and extensible workflows.'], tags: ['Python', 'Subfinder', 'Assetfinder', 'Amass', 'HTTPX', 'Naabu', 'Nuclei'] },
  { title: 'Web-Vulnerability-Scanner', category: 'Application Security', github: 'https://github.com/sahadatx/Web-Vulnerability-Scanner', image: assetUrl('images/projects/web-vulnerability-scanner/web-vulnerability-scanner.png'), status: 'Modular scanner · feature scope under verification', description: 'A planned modular workflow for discovering web attack surfaces and testing for vulnerabilities.', overview: 'A modular web application security testing project intended to move from attack-surface discovery to vulnerability checks and security configuration analysis. The technical overview describes the design and planned modules; each feature should be confirmed against the current repository before being presented as implemented.', highlights: ['Discovery plan: crawling, JavaScript analysis, endpoint and parameter discovery, directory discovery, and virtual-host checks.', 'Detection scope includes SQLi, XSS, LFI/RFI, SSRF, open redirect, command injection, CRLF, path traversal, insecure uploads, XXE, SSTI, and IDOR.', 'Additional planned areas include header, cookie, CORS, CSP, TLS, misconfiguration, authentication, and authorization testing.'], tags: ['Python', 'Web Crawling', 'Vulnerability Detection', 'CLI'] },
  { title: 'SentinelSIEM', category: 'Blue Team', github: 'https://github.com/sahadatx/SentinelSIEM', image: assetUrl('images/projects/sentinel-siem/sentinel-siem.png'), status: 'Security platform · backend and RBAC focus', description: 'A security monitoring and management platform focused on events, access control, and investigation workflows.', overview: 'A full-stack SIEM and security administration platform. Its technical design emphasizes clear API contracts and separation between authentication, authorization, business logic, data access, and frontend integration.', highlights: ['Defines five roles: ADMIN, SECURITY_ANALYST, SOC_ANALYST, INVESTIGATOR, and VIEWER, with backend-enforced permissions.', 'Uses one canonical audit source, `siem_auth_audit`, for global audit logs and individual user history.', 'Includes user and session administration, audit workflows, event analysis, and a backend-first implementation approach.'], tags: ['Python', 'TypeScript', 'SIEM', 'RBAC', 'Audit Logging', 'SOC'] },
  { title: 'CloudSentinel', category: 'Cloud Security', github: 'https://github.com/sahadatx/CloudSentinel', image: assetUrl('images/projects/cloud-sentinel/cloud-sentinel.png'), status: 'In progress · AWS integration validation pending', description: 'An AWS-first cloud security posture management platform with a multi-tenant architecture.', overview: 'CloudSentinel is an enterprise-oriented CSPM platform designed to inventory cloud assets, identify misconfigurations, preserve evidence, assess risk, and manage remediation. Its architecture is backend-first and multi-tenant; full AWS assessment is not yet verified because the workload identity prerequisite remains unresolved.', highlights: ['Planned stack: FastAPI, PostgreSQL, Redis, Celery, Boto3, React, and TypeScript.', 'Designed for temporary AWS role assumption (STS), tenant isolation, asset inventory, policy findings, evidence, and approval-based remediation.', 'Roadmap covers authentication and RBAC, organizations, AWS integration, scanning, findings, risk/compliance, dashboards, remediation, alerts, and reporting.'], tags: ['AWS', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript'] },
  { title: 'Email-Bomb-Detection-Platform', category: 'Security Research', github: 'https://github.com/sahadatx/Email-Bomb-Detection-Platform', image: assetUrl('images/projects/email-bombing-attack/email-bombing-attack.png'), status: 'In development · detection status to verify', description: 'An email threat detection platform concept for analyzing suspicious message patterns and supporting investigations.', overview: 'A modular email security platform designed to collect and parse authorized email data, extract features, run detection workflows, assess risk, and support investigation and reporting. The architecture and modules are documented, while the current completion state of each module should be verified against the project repository.', highlights: ['Conceptual pipeline: email collection → parsing → feature extraction → preprocessing → detection → risk analysis → reporting.', 'Architecture separates authentication/RBAC, email records, datasets, preprocessing runs, model management, detection, analysis, reports, and audit.', 'Detection is intended to combine rules and/or machine learning; suspicious activity should be treated as an investigative signal, not automatic proof of an attack.'], tags: ['Python', 'Email Security', 'Data Processing', 'ML Workflows', 'RBAC'] },
  { title: 'Network-Intrusion-Detection-System', category: 'Blue Team', github: 'https://github.com/sahadatx/Network-Intrusion-Detection-System', image: assetUrl('images/projects/network-intrusion-detection-system/network-intrusion-detection-system.png'), status: 'Locally exercised · Snort 3 rules', description: 'A Snort 3 network monitoring project with custom rules and alert logging.', overview: 'A defensive network detection project using Snort 3 to monitor selected traffic patterns and generate alerts for investigation. The focus is on writing and exercising rules, reviewing alert context, and recording events—not treating every alert as a confirmed incident.', highlights: ['Configured custom rules for selected TCP SYN scan, HTTP, and ICMP activity; the resume also describes rules for SSH and FTP.', 'Ran Snort against a local network interface and observed alerts during controlled testing.', 'Worked on saving alerts to a log file and producing structured TXT, CSV, and JSON reporting.'], tags: ['Snort 3', 'Custom Rules', 'Linux', 'Network Monitoring'] },
  { title: 'Secure-Coding-Review', category: 'Application Security', image: assetUrl('images/projects/secure-code-review/secure-coding-review.png'), github: 'https://github.com/sahadatx/Secure-Coding-Review', status: 'Flask application · SAST performed', description: 'A Flask application demonstrating secure coding controls and static security analysis.', overview: 'A Flask web application built to demonstrate secure coding practices. The application is organized into focused route areas and includes security controls, while static analysis was used to identify issues and guide remediation.', highlights: ['Implements password hashing, SQL injection prevention, role-based access control, secure file uploads, and session-based authentication.', 'Organizes application areas such as authentication, main pages, profiles, search, uploads, and administration using Flask Blueprints.', 'Scanned 18 source files with Bandit and Semgrep across 151 security rules; applied OWASP secure coding principles.'], tags: ['Python', 'Flask', 'SQLite', 'Blueprints', 'Bandit', 'Semgrep'] },
  { title: 'Basic-Network-Sniffer', category: 'Network Security', github: 'https://github.com/sahadatx/Basic-Network-Sniffer', image: assetUrl('images/projects/basic-network-sniffer/basic-network-sniffer.png'), status: 'Built · Scapy packet analysis', description: 'A Scapy-based Python tool for capturing, inspecting, and exporting network packets.', overview: 'A packet capture and analysis utility built with Scapy. It helps make network traffic easier to inspect by extracting protocol details, adding useful timestamps and numbering, and supporting structured output for later analysis.', highlights: ['Captures and analyzes TCP, UDP, ICMP, and ARP traffic, with Berkeley Packet Filters and real-time statistics.', 'Exports packet data as CSV, JSON, and PCAP for analysis in tools such as Wireshark.', 'Includes logging, automated tests, and GitHub Actions CI.'], tags: ['Python', 'Scapy', 'TCP/IP', 'Wireshark', 'Pytest'] },
]

const projectDeepDive: Record<string, { architecture: string; workflow: string[]; validation: string }> = {
  CloudSentinel: {
    architecture: 'Backend-first, multi-tenant design. The planned stack is FastAPI for APIs, PostgreSQL for persistent data, Redis and Celery for background jobs, Boto3 for AWS integration, and React with TypeScript for the interface. Customer access is designed around temporary, read-only AWS STS AssumeRole credentials.',
    workflow: ['Authenticate a user and resolve their organization and access scope.', 'Connect an authorized AWS account and discover cloud resources.', 'Run assessments asynchronously, then attach policy results and evidence to affected assets.', 'Prioritize findings, track remediation approvals, and prepare reports.'],
    validation: 'AWS integration is not yet confirmed end to end. A previous validation reached NoCredentialsError because the CloudSentinel workload itself still needs an AWS identity before it can assume a customer role. Mock providers or LocalStack are appropriate for development validation.'
  },
  'Email-Bomb-Detection-Platform': {
    architecture: 'Backend-first modular platform. Authentication and RBAC protect email records and investigations; separate modules manage collection, parsing, feature extraction, datasets, preprocessing runs and artifacts, model management, detection, risk, analysis, reports, audit, and administration.',
    workflow: ['Ingest authorized email records or a suitable test dataset.', 'Parse metadata into a consistent structure while minimizing unnecessary sensitive-content retention.', 'Extract features and run traceable preprocessing steps.', 'Evaluate suspicious patterns with rules and/or ML, then present evidence for analyst review and reporting.'],
    validation: 'Unusually high email volume alone is not proof of an attack. Detection quality should be evaluated with precision, recall, F1, and false-positive rates. Preserve the original collection and labels so dataset versions and experiments remain interpretable. Current completion of individual modules should be checked against the repository.'
  },
  SentinelSIEM: {
    architecture: 'Layered application design: authentication → authorization → services → repositories → database → API routes → frontend. The RBAC design defines five roles and an 18-permission contract. Global audit and per-user audit views share the canonical siem_auth_audit source through the audit service and repository.',
    workflow: ['Authenticate the analyst and enforce permissions in backend routes.', 'Ingest and organize security events and administrative activity.', 'Correlate related activity and provide investigation context.', 'Review global or per-user audit history, with access controlled by the established role contract.'],
    validation: 'The technical overview reports a prior full pytest run of 187 passing tests, but that historical result does not establish that every planned feature is complete today. Re-check the current repository and test scope before making a current coverage claim. The documented audit API includes GET /audit, GET /audit/{id}, GET /audit/{id}/related, and GET /audit/export.'
  },
  'Web-Vulnerability-Scanner': {
    architecture: 'Planned as independent modules so discovery and detectors can be developed and tested separately. The intended pipeline validates target scope, discovers routes and inputs, runs selected checks, validates and deduplicates findings, assigns severity and confidence, then saves and reports results.',
    workflow: ['Phase 1 — discover pages, JavaScript references, endpoints, parameters, directories, and virtual hosts.', 'Phase 2 — test the planned vulnerability classes, including SQLi, XSS, SSRF, SSTI, XXE, LFI/RFI, IDOR, CSRF, and path traversal.', 'Phase 3 — review headers, cookies, CORS, CSP, TLS, and security misconfiguration.', 'Phase 4 — assess authentication, sessions, roles, and authorization boundaries.'],
    validation: 'This document describes a roadmap and intended CLI, not proof that every detector or option currently works. Use only explicitly authorized targets. A professional finding should include the affected URL or parameter, evidence, severity, confidence, reproduction steps, remediation, and validation status.'
  },
  'Recon-Automation-Framework': {
    architecture: 'A modular, plugin-oriented Python framework. The documented design separates the core engine, target-scope manager, plugin registry, discovery modules, result normalizer, deduplication, and report generation so tools can be extended without coupling the whole workflow.',
    workflow: ['Define an authorized target scope and exclusions.', 'Run selected discovery modules for subdomains, DNS, HTTP services, technologies, endpoints, and ports where supported.', 'Normalize and deduplicate outputs while recording module errors and timeouts.', 'Review structured results and generate reports for a later assessment stage.'],
    validation: 'This is a reconnaissance and asset-organization tool, distinct from the Web Vulnerability Scanner. Treat them as complementary standalone tools unless direct data exchange between them is implemented and verified. Respect scope, rate limits, and out-of-scope exclusions.'
  },
  'Network-Intrusion-Detection-System': {
    architecture: 'Snort 3 monitors a selected interface and evaluates observed packet traffic against local custom rules. Matching events are emitted as alerts that can be logged and reviewed; an alert is an investigative signal, not automatic confirmation of an incident.',
    workflow: ['Configure Snort 3 and the local rule set.', 'Capture traffic on the selected interface (the documented lab used wlan0).', 'Evaluate traffic against rules for selected patterns such as TCP SYN scanning, HTTP, or ICMP.', 'Review the alert context and retain logs for investigation.'],
    validation: 'The documented lab used Snort 3.12.2.0 and observed alerts for TCP SYN scanning, HTTP, and ICMP activity. SSH and FTP are listed in the resume rule scope, but the specific prior validation notes do not confirm observed alerts for those cases. Benign activity can also match a rule; evaluate false positives with reproducible traffic or PCAPs.'
  },
  'Basic-Network-Sniffer': {
    architecture: 'Python with Scapy for packet capture and protocol-layer inspection. The tool presents packet details in a structured format with packet numbers and timestamps, and supports export formats that can be reviewed in other analysis tools.',
    workflow: ['Select an interface and start capture with the required system permissions.', 'Inspect captured packets and decode supported layers such as TCP, UDP, ICMP, and ARP.', 'Apply Berkeley Packet Filters and review packet details and traffic statistics.', 'Export results to CSV, JSON, or PCAP for later analysis in Wireshark or other tools.'],
    validation: 'Capture visibility depends on the selected interface, permissions, and network environment. The resume documents protocol analysis, BPF, real-time statistics, CSV/JSON/PCAP export, automated testing, logging, and GitHub Actions CI. Use authorized networks and test captures.'
  },
  'Secure-Coding-Review': {
    architecture: 'A Flask application organized into Blueprints for authentication, main pages, search, profiles, uploads, and administration. The app entry point registers each route group, keeping responsibilities separated and making the codebase easier to review.',
    workflow: ['Route requests to the appropriate Blueprint and template.', 'Apply authentication and authorization checks to protected operations.', 'Validate user input and handle database access and file uploads safely.', 'Run Bandit and Semgrep, review findings, and document remediation.'],
    validation: 'The resume reports analysis of 18 source files with 151 security rules and lists password hashing, SQL injection prevention, RBAC, secure file upload, and session-based authentication. These controls should still be demonstrated in the actual application. The technical notes also record a TemplateNotFound issue for upload.html, illustrating the need to verify route-to-template paths.'
  }
}

const skillIcons = [Shield, Network, Braces, ShieldCheck, Network, Braces, ShieldCheck, Terminal]

const nav = [['About', 'about'], ['Projects', 'projects'], ['Skills', 'skills'], ['Experience', 'experience'], ['Education', 'education'], ['Certifications', 'certifications'], ['Contact', 'contact']]

function App() {
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null)
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const filters = ['All Projects', 'Offensive Security', 'Blue Team', 'Application Security', 'Network Security', 'Cloud Security', 'Security Research']
  const visibleProjects = activeFilter === 'All Projects' ? projects : projects.filter((project) => project.category === activeFilter)
  const selectedDetails = selectedProject ? projectDeepDive[selectedProject.title] : undefined

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setContactStatus('sending')
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      message: String(formData.get('message')),
      _subject: `Portfolio message from ${String(formData.get('name'))}`,
      _template: 'table',
      _honey: String(formData.get('_honey') ?? ''),
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/pentester.sahadathossain@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json() as { success?: boolean | string }
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('Message delivery failed')
      setContactStatus('sent')
      form.reset()
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Sahadat Hossain home"><span className="wordmark-mark terminal-mark">&gt;_</span><span className="wordmark-name">/sahadat.sh <i>SECURITY PORTFOLIO</i></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a></nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> APPLICATION SECURITY · BANGLADESH</div>
            <h1><span className="hero-greeting">Hello, I’m</span><br /><span className="hero-name">Sahadat Hossain</span></h1>
            <div className="hero-role">I’m a <span>Junior Penetration Tester</span> focused on application security.</div>
            <p className="hero-intro">I assess web applications, validate security findings, and turn technical risks into clear, practical guidance.</p>
            <div className="hero-actions"><a className="button button-primary" href="#contact"><ShieldCheck size={17} /> Contact Me</a><a className="button button-quiet" href="#projects"><ArrowDownRight size={17} /> View My Work</a><a className="button button-quiet resume-button" href={assetUrl('documents/Sahadat Hossain Resume.pdf')} target="_blank" rel="noreferrer">View Resume <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="hero-art"><div className="art-grid" /><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="hero-photo-wrap"><img src={assetUrl('images/profile/sahadat.png')} alt="Sahadat Hossain" /></div><div className="hero-stamp"><span className="status-dot" /> ONLINE</div></div>
          <a className="scroll-cue" href="#about"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
          <div className="hero-index">01 <span>/</span> 07</div>
        </section>

        <section className="intro-section section-wrap" id="about"><div className="about-heading"><div className="about-label"><ShieldCheck size={14} /> ABOUT ME</div><h2>Practical security.<br /><span>Clear outcomes.</span></h2><p>I combine structured testing with clear reporting to help teams understand and reduce application security risk.</p></div><div className="about-layout"><article className="about-profile-card"><div className="about-window"><span>ABOUT / SAHADAT HOSSAIN</span><span>NSTU · BANGLADESH</span></div><div className="about-person"><div className="about-avatar"><ShieldCheck size={24} /></div><div><h3>Sahadat Hossain</h3><span>CSTE Undergraduate · Junior Penetration Tester</span></div></div><p>I’m pursuing a degree in Computer Science and Telecommunication Engineering at Noakhali Science and Technology University. My work and independent projects focus on web application security, penetration testing, and vulnerability assessment.</p><p>At Byte Capsule, I contributed to reconnaissance, security assessments, vulnerability validation, and technical reporting. I continue to build practical tools and projects to strengthen my testing skills and communicate findings clearly.</p><div className="about-tags"><span>Application Security</span><span>Security Assessment</span><span>Recon &amp; Enumeration</span><span>Technical Reporting</span></div></article><aside className="about-stats"><h3><span>◎</span> Quick Stats</h3><div className="about-stat-grid"><div><ShieldCheck /><b>4</b><span>Credentials</span></div><div><Braces /><b>8</b><span>Projects</span></div><div><Network /><b>3.40</b><span>CGPA / 4.00</span></div><div><Terminal /><b>2022–26</b><span>B.Sc. CSTE · NSTU</span></div></div></aside></div></section>

        <section className="projects-section" id="projects"><div className="section-wrap"><div className="section-heading"><div><div className="section-kicker">02 / SELECTED WORK</div><h2>Security projects,<br /><span>from discovery to defense.</span></h2></div><p>Hands-on work in reconnaissance, application testing, network detection, secure coding, and cloud security.</p></div><div className="filter-row">{filters.map((filter) => <button className={activeFilter === filter ? 'filter active' : 'filter'} key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt={`${project.title} preview`} loading="lazy" /><span className="project-number">0{index + 1}</span></div><div className="project-info"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><button className="project-overview" onClick={() => setSelectedProject(project)}><ExternalLink size={14} /> Overview</button><a className="project-github" href={project.github} target="_blank" rel="noreferrer"><span>GH</span> GitHub <ArrowUpRight size={14} /></a></div></div></article>)}</div><div className="projects-foot"><span>BUILD · TEST · LEARN · REPEAT</span><a href="https://github.com/sahadatx" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div></div></section>

        <section className="skills-section section-wrap" id="skills"><div className="section-kicker">03 / SKILLS &amp; EXPERTISE</div><div className="section-heading"><h2>Security knowledge,<br /><span>put into practice.</span></h2><p>A focused toolkit across web application testing, reconnaissance, detection, network analysis, and secure development.</p></div><div className="skill-grid">{skills.map(({ title, focus, items }, index) => { const Icon = skillIcons[index % skillIcons.length]; return <article className="skill-card" key={title}><div className="skill-card-heading"><div className="skill-icon"><Icon size={20} /></div><div><div className="skill-index">AREA {String(index + 1).padStart(2, '0')}</div><h3>{title}</h3><p>{focus}</p></div></div><div className="skill-card-content"><div className="skill-content-label">SKILLS &amp; TOOLS <span>{String(items.length).padStart(2, '0')}</span></div><div className="skill-chip-list">{items.map((item) => <span key={item}>{item}</span>)}</div></div></article> })}</div><p className="skill-note">Cloud and platform architecture topics reflect project design work; implementation status is described in each project overview.</p></section>

        <section className="experience-section" id="experience"><div className="section-wrap"><div className="section-kicker">04 / PROFESSIONAL EXPERIENCE</div><div className="section-heading experience-heading"><h2>Applied security<br /><span>experience.</span></h2><p>Web application testing, vulnerability validation, and reporting during my Byte Capsule internship.</p></div><div className="journey-grid journey-single"><article className="journey-card"><div className="journey-card-top"><span>BYTE CAPSULE · TRAINING INTERNSHIP</span><span className="journey-period">AUG 2025 — OCT 2025</span></div><div className="journey-body"><div className="journey-marker"><ShieldCheck size={20} /></div><div className="journey-details"><h3>Junior Penetration Tester</h3><div className="journey-role">Remote <i>·</i> Security Assessment</div><p>Performed web application security assessments using Burp Suite and manual testing. Conducted reconnaissance and asset discovery, validated vulnerabilities with Nuclei using OWASP Top 10 methodology, and prepared technical reports with risk ratings and remediation guidance.</p><div className="journey-tags"><span>Web Security</span><span>Reconnaissance</span><span>Vulnerability Validation</span><span>Technical Reporting</span></div></div></div></article></div></div></section>

        <section className="education-section" id="education"><div className="section-wrap"><div className="section-kicker">05 / EDUCATION</div><div className="section-heading experience-heading"><h2>Academic foundation<br /><span>in computing.</span></h2><p>Computer science and telecommunications studies at NSTU.</p></div><div className="journey-grid journey-single"><article className="journey-card education-card"><div className="journey-card-top"><span>UNDERGRADUATE DEGREE</span><span className="journey-period">2022 — 2026</span></div><div className="journey-marker"><Braces size={20} /></div><h3>B.Sc. Computer Science &amp;<br />Telecommunication Engineering</h3><div className="journey-role">Noakhali Science and Technology University <i>·</i> NSTU</div><p>Undergraduate study focused on computing and telecommunications, complemented by hands-on cybersecurity projects and specialist training.</p><div className="journey-tags"><span>CGPA 3.40 / 4.00</span><span>Noakhali, Bangladesh</span></div></article></div></div></section>

        <section className="cert-section section-wrap" id="certifications"><div className="section-kicker">06 / CREDENTIALS</div><div className="section-heading"><h2>Learning, <span>recognized.</span></h2><p>Professional credentials, training, and recognition from my cybersecurity journey.</p></div><div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert.name}>{cert.image ? <a href={cert.image} target="_blank" rel="noreferrer" className="cert-image" aria-label={`Open ${cert.name} document`}><img src={cert.image} alt={`${cert.name} document`} loading="lazy" /></a> : <div className="cert-image cert-placeholder"><div className="credential-mark"><ShieldCheck size={25} /></div><span>DOCUMENT NOT AVAILABLE</span></div>}<div className="cert-details"><div className="cert-meta"><span>{cert.type}</span><b>{String(index + 1).padStart(2, '0')}</b></div><h3>{cert.name}</h3><p>{cert.issuer}</p>{cert.image ? <a className="cert-view-link" href={cert.image} target="_blank" rel="noreferrer"><span><ShieldCheck size={14} /> View Certificate</span><ArrowUpRight size={14} /></a> : <span className="cert-view-link unavailable" aria-disabled="true">Document unavailable</span>}</div></article>)}</div><p className="cert-caption">Open a certificate preview to view the full document. Credentials without a local image are listed from my resume.</p></section>

        <section className="contact-section" id="contact">
          <div className="section-wrap contact-wrap">
            <div className="contact-layout">
              <div className="contact-left-column">
                <div className="contact-heading">
                  <div className="contact-label"><Mail size={13} /> CONTACT</div>
                  <h2>Let’s start a<br /><span>conversation.</span></h2>
                  <p>Have a security project, collaboration idea, or a question? Choose the channel that works for you.</p>
                </div>
                <article className="contact-panel contact-info-panel">
                  <div className="contact-panel-bar"><i /><i /><i /><span>~/contact_info.sh</span></div>
                  <div className="contact-panel-content">
                    <h3><span className="terminal-prompt">$</span> cat contact_info</h3>
                    <div className="contact-link-list">
                      {socialLinks.map((link) => <a className="contact-info-link" href={link.href} key={link.label} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}>
                        <span className="contact-info-icon">{link.label === 'Email' ? <Mail size={17} /> : link.label === 'LinkedIn' ? <Network size={17} /> : link.label === 'GitHub' ? <Braces size={17} /> : link.label === 'Portfolio' ? <ExternalLink size={17} /> : <Terminal size={17} />}</span>
                        <span className="contact-info-copy"><i>{link.label}</i><b>{link.handle}</b></span><ArrowUpRight className="contact-link-arrow" size={14} />
                      </a>)}
                      <a className="contact-info-link" href="tel:+8801859920189" aria-label="Call +880 1859-920189" title="Call this number"><span className="contact-info-icon"><Phone size={17} /></span><span className="contact-info-copy"><i>Phone</i><b>+880 1859-920189</b></span><ArrowUpRight className="contact-link-arrow" size={14} /></a>
                    </div>
                    <div className="secure-note"><h4><ShieldCheck size={15} /> A quick note</h4><p>For security discussions, include useful context and avoid sending passwords, credentials, or sensitive personal data.</p></div>
                  </div>
                </article>
              </div>
              <article className="contact-panel contact-form-panel">
                <div className="contact-panel-bar"><i /><i /><i /><span>~/send_message.sh</span></div>
                <div className="contact-form-intro"><span className="form-step">01 <i>/</i> 01</span><h3>Send a message</h3><p>Your message will be delivered directly to my inbox.</p></div>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <input className="contact-honeypot" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
                  <label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                  <label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" placeholder="Tell me a little about what you have in mind..." rows={5} required />
                  <button type="submit" disabled={contactStatus === 'sending'}><Send size={15} /> {contactStatus === 'sending' ? 'Sending…' : contactStatus === 'sent' ? 'Message Sent' : 'Send Message'} <ArrowUpRight size={14} /></button>
                  <p className="form-note" aria-live="polite">{contactStatus === 'sent' ? 'Your message was sent successfully.' : contactStatus === 'error' ? 'The message could not be sent. Please try again or email me directly.' : 'Your message is delivered through FormSubmit. The site does not store submissions.'}</p>
                </form>
              </article>
            </div>
            <div className="contact-footer-line"><span><Terminal size={14} /> NOAKHALI, BANGLADESH</span><span><i /> OPEN TO PROFESSIONAL CONNECTIONS</span></div>
          </div>
        </section>
      </main>
      {selectedProject && selectedDetails && <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project overview"><X size={18} /></button><img src={selectedProject.image} alt={`${selectedProject.title} project preview`} /><div className="modal-content"><div className="modal-kicker"><span /> PROJECT OVERVIEW <span className="modal-category">{selectedProject.category}</span></div><h2 id="project-modal-title">{selectedProject.title}</h2><div className="implementation-status"><span>IMPLEMENTATION SNAPSHOT</span><b>{selectedProject.status}</b></div><div className="modal-section-title">Overview</div><p className="modal-summary">{selectedProject.overview}</p><div className="modal-detail-block"><h3>Architecture &amp; design</h3><p>{selectedDetails.architecture}</p></div><div className="modal-highlights"><h3>Key capabilities &amp; technical approach</h3><ul>{selectedProject.highlights.map((highlight) => <li key={highlight}><span>↳</span>{highlight}</li>)}</ul></div><div className="modal-detail-block"><h3>Workflow</h3><ol>{selectedDetails.workflow.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="modal-detail-block validation-note"><h3>Validation &amp; scope notes</h3><p>{selectedDetails.validation}</p></div><div className="modal-tech"><h3>Technologies &amp; focus</h3><div className="tag-list">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="modal-actions"><a className="project-github" href={selectedProject.github} target="_blank" rel="noreferrer"><span>GH</span> View on GitHub <ArrowUpRight size={14} /></a><button className="project-overview" onClick={() => setSelectedProject(null)}>Close overview</button></div></div></section></div>}
      <footer className="footer section-wrap"><a className="wordmark" href="#home"><span className="wordmark-mark terminal-mark">&gt;_</span><span className="wordmark-name">SAHADAT HOSSAIN <i>SECURITY PORTFOLIO</i></span></a><span>© 2026 SAHADAT HOSSAIN</span><a href="#home">BACK TO TOP ↑</a></footer>
    </div>
  )
}

export default App
