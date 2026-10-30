import { useState, type FormEvent } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Braces, ExternalLink, FileText, Mail, Menu, Network, Phone, Send, Shield, ShieldCheck, Terminal, X } from 'lucide-react'
import { skills } from './data/skills'
import { certifications } from './data/certifications'
import { socialLinks } from './data/social-links'
import { assetUrl } from './utils/assetUrl'
import './App.css'

const projects = [
  { title: 'Recon Automation Framework', category: 'Offensive Security', image: assetUrl('images/projects/recon-automation-framework.png'), github: 'https://github.com/sahadatx/Recon-Automation-Framework', status: '17 specialized modules documented · public repository', description: 'A plugin-based Python framework for phased, multi-threaded attack-surface discovery and reporting.', overview: 'A plugin-based reconnaissance framework for authorized penetration testing and bug bounty workflows. It reduces repetitive command execution by organizing discovery tasks into a repeatable workflow, normalizing results, and preparing them for review.', highlights: ['Automates subdomain enumeration, DNS resolution, HTTP probing, port scanning, technology detection, and screenshots.', 'Supports web discovery tasks such as URL and JavaScript analysis, directory fuzzing, virtual host discovery, WAF/CDN checks, TLS analysis, and takeover detection.', 'Designed for modular tool integration, structured reporting, dashboard support, and extensible workflows.'], tags: ['Python', 'Subfinder', 'Assetfinder', 'Amass', 'HTTPX', 'Naabu', 'Nuclei'] },
  { title: 'Web Vulnerability Scanner', category: 'Application Security', github: 'https://github.com/sahadatx/Web-Vulnerability-Scanner', image: assetUrl('images/projects/web-vulnerability-scanner.png'), status: '52 discoverable modules documented · authorized testing only', description: 'A modular Python CLI for authorized web testing, dependency-aware checks, and JSON or HTML reports.', overview: 'A Python command-line toolkit that discovers available scan modules, resolves dependencies, and runs selected checks against authorized targets. It summarizes results in the terminal and generates JSON and HTML reports.', highlights: ['Dynamically discovers modules and resolves dependencies before selected checks run.', 'Supports multi-threaded execution and structured JSON and HTML reports.', 'Findings remain candidates for analyst review and validation; a completed scan does not prove exploitability.'], tags: ['Python', 'Web Crawling', 'Vulnerability Detection', 'CLI'] },
  { title: 'SentinelSIEM', category: 'Blue Team', github: 'https://github.com/sahadatx/SentinelSIEM', image: assetUrl('images/projects/sentinel-siem.png'), status: 'Open-source SIEM · automated tests included', description: 'A security monitoring platform for detection, incident response, threat intelligence, access control, and auditing.', overview: 'A full-stack SIEM and security administration platform. Its technical design emphasizes clear API contracts and separation between authentication, authorization, business logic, data access, and frontend integration.', highlights: ['Defines five roles: ADMIN, SECURITY_ANALYST, SOC_ANALYST, INVESTIGATOR, and VIEWER, with backend-enforced permissions.', 'Uses one canonical audit source, `siem_auth_audit`, for global audit logs and individual user history.', 'Includes user and session administration, audit workflows, event analysis, and a backend-first implementation approach.'], tags: ['Python', 'TypeScript', 'SIEM', 'RBAC', 'Audit Logging', 'SOC'] },
  { title: 'CloudSentinel', category: 'Cloud Security', github: 'https://github.com/sahadatx/CloudSentinel', image: assetUrl('images/projects/cloud-sentinel.png'), status: 'Concept · no source files published', description: 'A cloud security posture management concept for asset inventory, policy findings, evidence, and remediation workflows.', overview: 'CloudSentinel is a proposed AWS-first CSPM platform concept. This portfolio entry describes its intended direction; the public repository does not currently contain source files.', highlights: ['Proposed stack: FastAPI, PostgreSQL, Redis, Celery, Boto3, React, and TypeScript.', 'Concept includes tenant-aware account connections, asset inventory, policy findings, evidence, and remediation review.', 'These are planned capabilities and are not presented as a verified implementation.'], tags: ['AWS', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript'] },
  { title: 'Email Bomb Detection Platform', category: 'Security Research', github: 'https://github.com/sahadatx/Email-Bomb-Detection-Platform', image: assetUrl('images/projects/email-bombing-detection.png'), status: 'In development · detection quality needs validation', description: 'A React and FastAPI platform for email ingestion, model-based detection, risk analysis, and investigation.', overview: 'The web application and API connect email ingestion and parsing with feature engineering, model management, detection, risk analysis, and investigation reports. Detection outputs should be reviewed with their supporting evidence.', highlights: ['Ingests and parses email data for analysis.', 'Provides model-backed detection, risk analysis, and investigation workflows.', 'Includes analytics and threat-intelligence context; detection quality still needs measured validation.'], tags: ['React', 'FastAPI', 'SQLite', 'Machine Learning', 'Threat Intelligence'] },
  { title: 'Network Intrusion Detection System', category: 'Blue Team', github: 'https://github.com/sahadatx/Network-Intrusion-Detection-System', image: assetUrl('images/projects/network-intrusion-detection-system.png'), status: 'Snort 3 monitoring · dashboard and reports', description: 'Custom Snort 3 rules with alert logs, a log-analysis dashboard, and automated reporting.', overview: 'A defensive network detection project using Snort 3 to monitor selected traffic patterns and generate alerts for investigation. The focus is on writing and exercising rules, reviewing alert context, and recording events—not treating every alert as a confirmed incident.', highlights: ['Configured custom rules for selected TCP SYN scan, HTTP, and ICMP activity; the resume also describes rules for SSH and FTP.', 'Ran Snort against a local network interface and observed alerts during controlled testing.', 'Worked on saving alerts to a log file and producing structured TXT, CSV, and JSON reporting.'], tags: ['Snort 3', 'Custom Rules', 'Linux', 'Network Monitoring'] },
  { title: 'Secure Coding Review', category: 'Application Security', image: assetUrl('images/projects/secure-coding-review.png'), github: 'https://github.com/sahadatx/Secure-Coding-Review', status: 'Flask application · SAST performed', description: 'A Flask application demonstrating secure coding controls and static security analysis.', overview: 'A Flask web application built to demonstrate secure coding practices. The application is organized into focused route areas and includes security controls, while static analysis was used to identify issues and guide remediation.', highlights: ['Implements password hashing, SQL injection prevention, role-based access control, secure file uploads, and session-based authentication.', 'Organizes application areas such as authentication, main pages, profiles, search, uploads, and administration using Flask Blueprints.', 'Scanned 18 source files with Bandit and Semgrep across 151 security rules; applied OWASP secure coding principles.'], tags: ['Python', 'Flask', 'SQLite', 'Blueprints', 'Bandit', 'Semgrep'] },
  { title: 'Basic Network Sniffer', category: 'Network Security', github: 'https://github.com/sahadatx/Basic-Network-Sniffer', image: assetUrl('images/projects/basic-network-sniffer.png'), status: 'Scapy CLI · BPF and multi-format export', description: 'Command-line packet capture and protocol analysis with BPF filters and CSV, JSON, and PCAP exports.', overview: 'A packet capture and analysis utility built with Scapy. It helps make network traffic easier to inspect by extracting protocol details, adding useful timestamps and numbering, and supporting structured output for later analysis.', highlights: ['Captures and analyzes TCP, UDP, ICMP, and ARP traffic, with Berkeley Packet Filters and real-time statistics.', 'Exports packet data as CSV, JSON, and PCAP for analysis in tools such as Wireshark.', 'Includes logging, automated tests, and GitHub Actions CI.'], tags: ['Python', 'Scapy', 'TCP/IP', 'Wireshark', 'Pytest'] },

  { title: 'API Sentinel', category: 'Application Security', image: assetUrl('images/projects/api-sentinel.png'), github: 'https://github.com/sahadatx/APISentinel', status: 'Public repository · early project scaffold', description: 'An API security assessment project exploring inventory, authorization reviews, coverage, and evidence across web and mobile apps.', overview: 'API Sentinel explores a workflow for cataloging API endpoints and organizing security assessment work across web, Android, and iOS applications. Its public repository contains the early project scaffold, while the supplied artwork illustrates the intended product workflow.', highlights: ['API inventory concepts for documenting methods, routes, and scope.', 'Assessment areas for authorization, coverage tracking, and evidence collection.', 'A report view intended to help communicate assessment scope and results.'], tags: ['API Security', 'Web', 'Android', 'iOS', 'Assessment Reporting'] },
]

const projectDeepDive: Record<string, { architecture: string; workflow: string[]; validation: string }> = {
  CloudSentinel: {
    architecture: 'Proposed multi-tenant CSPM design using FastAPI, PostgreSQL, Redis and Celery, Boto3, and a React with TypeScript interface.',
    workflow: ['Connect an authorized cloud account.', 'Inventory resources and evaluate planned security policies.', 'Attach evidence to findings and prioritize remediation.', 'Prepare review workflows and reports.'],
    validation: 'The public CloudSentinel repository is currently empty. This entry describes the concept and planned architecture; it does not claim that the AWS integration or assessment workflow is implemented.'
  },
  'Email Bomb Detection Platform': {
    architecture: 'React frontend and FastAPI backend with SQLite as the default database. The repository organizes ingestion, parsing, feature engineering, model management, detection, risk analysis, analytics, and investigation features into separate modules.',
    workflow: ['Ingest authorized email records or a suitable test dataset.', 'Parse metadata into a consistent structure while minimizing unnecessary sensitive-content retention.', 'Extract features and run traceable preprocessing steps.', 'Evaluate suspicious patterns with rules and/or ML, then present evidence for analyst review and reporting.'],
    validation: 'Unusually high email volume alone is not proof of an attack. Detection quality should be evaluated with precision, recall, F1, and false-positive rates. Preserve the original collection and labels so dataset versions and experiments remain interpretable. Current completion of individual modules should be checked against the repository.'
  },
  SentinelSIEM: {
    architecture: 'Layered application design: authentication → authorization → services → repositories → database → API routes → frontend. The RBAC design defines five roles and an 18-permission contract. Global audit and per-user audit views share the canonical siem_auth_audit source through the audit service and repository.',
    workflow: ['Authenticate the analyst and enforce permissions in backend routes.', 'Ingest and organize security events and administrative activity.', 'Correlate related activity and provide investigation context.', 'Review global or per-user audit history, with access controlled by the established role contract.'],
    validation: 'The repository includes automated tests for critical functionality. Test results should be checked against the current branch before making a release-readiness claim. The documented audit API includes GET /audit, GET /audit/{id}, GET /audit/{id}/related, and GET /audit/export.'
  },
  'Web Vulnerability Scanner': {
    architecture: 'A Python CLI dynamically discovers scan modules, resolves module dependencies, and coordinates selected checks with multi-threaded execution and JSON or HTML reporting.',
    workflow: ['Confirm target ownership or written authorization and set the scan scope.', 'Select applicable scanner modules and their required dependencies.', 'Run the checks and review terminal output plus generated JSON or HTML reports.', 'Validate candidate findings against the target and retain evidence and remediation notes.'],
    validation: 'The repository documents 52 discoverable modules. A completed scan does not prove that a candidate finding is exploitable; review evidence and validate findings. Use only explicitly authorized targets.'
  },
  'Recon Automation Framework': {
    architecture: 'A modular, plugin-oriented Python framework. The documented design separates the core engine, target-scope manager, plugin registry, discovery modules, result normalizer, deduplication, and report generation so tools can be extended without coupling the whole workflow.',
    workflow: ['Define an authorized target scope and exclusions.', 'Run selected discovery modules for subdomains, DNS, HTTP services, technologies, endpoints, and ports where supported.', 'Normalize and deduplicate outputs while recording module errors and timeouts.', 'Review structured results and generate reports for a later assessment stage.'],
    validation: 'This is a reconnaissance and asset-organization tool, distinct from the Web Vulnerability Scanner. Treat them as complementary standalone tools unless direct data exchange between them is implemented and verified. Respect scope, rate limits, and out-of-scope exclusions.'
  },
  'Network Intrusion Detection System': {
    architecture: 'Snort 3 monitors a selected interface and evaluates observed packet traffic against local custom rules. Matching events are emitted as alerts that can be logged and reviewed; an alert is an investigative signal, not automatic confirmation of an incident.',
    workflow: ['Configure Snort 3 and the local rule set.', 'Capture traffic on the selected interface (the documented lab used wlan0).', 'Evaluate traffic against rules for selected patterns such as TCP SYN scanning, HTTP, or ICMP.', 'Review the alert context and retain logs for investigation.'],
    validation: 'The documented lab used Snort 3.12.2.0 and observed alerts for TCP SYN scanning, HTTP, and ICMP activity. SSH and FTP are listed in the resume rule scope, but the specific prior validation notes do not confirm observed alerts for those cases. Benign activity can also match a rule; evaluate false positives with reproducible traffic or PCAPs.'
  },
  'Basic Network Sniffer': {
    architecture: 'Python with Scapy for packet capture and protocol-layer inspection. The tool presents packet details in a structured format with packet numbers and timestamps, and supports export formats that can be reviewed in other analysis tools.',
    workflow: ['Select an interface and start capture with the required system permissions.', 'Inspect captured packets and decode supported layers such as TCP, UDP, ICMP, and ARP.', 'Apply Berkeley Packet Filters and review packet details and traffic statistics.', 'Export results to CSV, JSON, or PCAP for later analysis in Wireshark or other tools.'],
    validation: 'Capture visibility depends on the selected interface, permissions, and network environment. The resume documents protocol analysis, BPF, real-time statistics, CSV/JSON/PCAP export, automated testing, logging, and GitHub Actions CI. Use authorized networks and test captures.'
  },
  'Secure Coding Review': {
    architecture: 'A Flask application organized into Blueprints for authentication, main pages, search, profiles, uploads, and administration. The app entry point registers each route group, keeping responsibilities separated and making the codebase easier to review.',
    workflow: ['Route requests to the appropriate Blueprint and template.', 'Apply authentication and authorization checks to protected operations.', 'Validate user input and handle database access and file uploads safely.', 'Run Bandit and Semgrep, review findings, and document remediation.'],
    validation: 'The resume reports analysis of 18 source files with 151 security rules and lists password hashing, SQL injection prevention, RBAC, secure file upload, and session-based authentication. These controls should still be demonstrated in the actual application. The technical notes also record a TemplateNotFound issue for upload.html, illustrating the need to verify route-to-template paths.'
  },
  'API Sentinel': {
    architecture: 'Conceptual workspace for documenting API endpoints and organizing assessment areas, authorization review, evidence, and reporting across web and mobile applications.',
    workflow: ['Define authorized API scope and record known endpoints.', 'Review authentication and authorization controls for each in-scope route.', 'Track assessment coverage and retain supporting evidence.', 'Summarize scope and observations in a report for review.'],
    validation: 'This is a design concept based on the supplied artwork, not a verified scanning tool or published implementation. Assess only APIs you own or are explicitly authorized to test.'
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

        <section className="intro-section section-wrap" id="about"><div className="about-heading"><div className="about-label"><ShieldCheck size={14} /> ABOUT ME</div><h2>Practical security.<br /><span>Clear outcomes.</span></h2><p>I combine structured testing with clear reporting to help teams understand and reduce application security risk.</p></div><div className="about-layout"><article className="about-profile-card"><div className="about-window"><span>ABOUT / SAHADAT HOSSAIN</span><span>NSTU · BANGLADESH</span></div><div className="about-person"><div className="about-avatar"><ShieldCheck size={24} /></div><div><h3>Sahadat Hossain</h3><span>CSTE Undergraduate · Junior Penetration Tester</span></div></div><p>I’m pursuing a degree in Computer Science and Telecommunication Engineering at Noakhali Science and Technology University. My work and independent projects focus on web application security, penetration testing, and vulnerability assessment.</p><p>At Byte Capsule, I contributed to reconnaissance, security assessments, vulnerability validation, and technical reporting. I continue to build practical tools and projects to strengthen my testing skills and communicate findings clearly.</p><div className="about-tags"><span>Application Security</span><span>Security Assessment</span><span>Recon &amp; Enumeration</span><span>Technical Reporting</span></div></article><aside className="about-stats"><h3><span>◎</span> Quick Stats</h3><div className="about-stat-grid"><div><ShieldCheck /><b>{certifications.length}</b><span>Credentials</span></div><div><Braces /><b>{projects.length}</b><span>Projects</span></div><div><Network /><b>3.40</b><span>CGPA / 4.00</span></div><div><Terminal /><b>2022–26</b><span>B.Sc. CSTE · NSTU</span></div></div></aside></div></section>

        <section className="projects-section" id="projects"><div className="section-wrap"><div className="section-heading"><div><div className="section-kicker">02 / SELECTED WORK</div><h2>Security projects,<br /><span>from discovery to defense.</span></h2></div><p>Open-source tools and design concepts across API, web, cloud, and network security, with a focus on clear evidence and usable workflows.</p></div><div className="filter-row">{filters.map((filter) => <button className={activeFilter === filter ? 'filter active' : 'filter'} key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => <article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt={`${project.title} preview`} loading="lazy" /><span className="project-number">0{index + 1}</span></div><div className="project-info"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><button className="project-overview" onClick={() => setSelectedProject(project)}><ExternalLink size={14} /> Overview</button>{project.github ? <a className="project-github" href={project.github} target="_blank" rel="noreferrer"><span>GH</span> GitHub <ArrowUpRight size={14} /></a> : <span className="project-concept-label"><FileText size={14} /> Design concept</span>}</div></div></article>)}</div><div className="projects-foot"><span>BUILD · TEST · LEARN · REPEAT</span><a href="https://github.com/sahadatx" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={15} /></a></div></div></section>

        <section className="skills-section section-wrap" id="skills"><div className="section-kicker">03 / SKILLS &amp; EXPERTISE</div><div className="section-heading"><h2>Security knowledge,<br /><span>put into practice.</span></h2><p>A focused toolkit across web application testing, reconnaissance, detection, network analysis, and secure development.</p></div><div className="skill-grid">{skills.map(({ title, focus, items }, index) => { const Icon = skillIcons[index % skillIcons.length]; return <article className="skill-card" key={title}><div className="skill-card-heading"><div className="skill-icon"><Icon size={20} /></div><div><div className="skill-index">AREA {String(index + 1).padStart(2, '0')}</div><h3>{title}</h3><p>{focus}</p></div></div><div className="skill-card-content"><div className="skill-content-label">SKILLS &amp; TOOLS <span>{String(items.length).padStart(2, '0')}</span></div><div className="skill-chip-list">{items.map((item) => <span key={item}>{item}</span>)}</div></div></article> })}</div><p className="skill-note">Cloud and platform architecture topics reflect project design work; implementation status is described in each project overview.</p></section>

        <section className="experience-section" id="experience"><div className="section-wrap"><div className="section-kicker">04 / PROFESSIONAL EXPERIENCE</div><div className="section-heading experience-heading"><h2>Applied security<br /><span>experience.</span></h2><p>Web application testing, vulnerability validation, and reporting during my Byte Capsule internship.</p></div><div className="journey-grid journey-single"><article className="journey-card"><div className="journey-card-top"><span>BYTE CAPSULE · TRAINING INTERNSHIP</span><span className="journey-period">AUG 2025 — OCT 2025</span></div><div className="journey-body"><div className="journey-marker"><ShieldCheck size={20} /></div><div className="journey-details"><h3>Junior Penetration Tester</h3><div className="journey-role">Remote <i>·</i> Security Assessment</div><p>Performed web application security assessments using Burp Suite and manual testing. Conducted reconnaissance and asset discovery, validated vulnerabilities with Nuclei using OWASP Top 10 methodology, and prepared technical reports with risk ratings and remediation guidance.</p><div className="journey-tags"><span>Web Security</span><span>Reconnaissance</span><span>Vulnerability Validation</span><span>Technical Reporting</span></div></div></div></article></div></div></section>

        <section className="education-section" id="education"><div className="section-wrap"><div className="section-kicker">05 / EDUCATION</div><div className="section-heading experience-heading"><h2>Academic foundation<br /><span>in computing.</span></h2><p>Computer science and telecommunications studies at NSTU.</p></div><div className="journey-grid journey-single"><article className="journey-card education-card"><div className="journey-card-top"><span>UNDERGRADUATE DEGREE</span><span className="journey-period">2022 — 2026</span></div><div className="journey-marker"><Braces size={20} /></div><h3>B.Sc. Computer Science &amp;<br />Telecommunication Engineering</h3><div className="journey-role">Noakhali Science and Technology University <i>·</i> NSTU</div><p>Undergraduate study focused on computing and telecommunications, complemented by hands-on cybersecurity projects and specialist training.</p><div className="journey-tags"><span>CGPA 3.40 / 4.00</span><span>Noakhali, Bangladesh</span></div></article></div></div></section>

        <section className="cert-section section-wrap" id="certifications"><div className="section-kicker">06 / CREDENTIALS</div><div className="section-heading"><h2>Learning, <span>recognized.</span></h2><p>Professional credentials, training, and recognition from my cybersecurity journey.</p></div><div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert.name}><a href={cert.document} target="_blank" rel="noreferrer" className={cert.preview ? 'cert-image' : 'cert-image cert-document'} aria-label={`Open ${cert.name} document`}>{cert.preview ? <img src={cert.preview} alt={`${cert.name} certificate`} loading="lazy" /> : <div className="cert-document-preview"><FileText size={30} /><span>PDF CERTIFICATE</span><b>{cert.issuer}</b></div>}</a><div className="cert-details"><div className="cert-meta"><span>{cert.type}</span><b>{String(index + 1).padStart(2, '0')}</b></div><h3>{cert.name}</h3><p>{cert.issuer}</p><a className="cert-view-link" href={cert.document} target="_blank" rel="noreferrer"><span><ShieldCheck size={14} /> View Certificate</span><ArrowUpRight size={14} /></a></div></article>)}</div><p className="cert-caption">Includes professional credentials, recognition, and course completions. Open any certificate card to view its original document.</p></section>

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
      {selectedProject && selectedDetails && <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project overview"><X size={18} /></button><img src={selectedProject.image} alt={`${selectedProject.title} project preview`} /><div className="modal-content"><div className="modal-kicker"><span /> PROJECT OVERVIEW <span className="modal-category">{selectedProject.category}</span></div><h2 id="project-modal-title">{selectedProject.title}</h2><div className="implementation-status"><span>IMPLEMENTATION SNAPSHOT</span><b>{selectedProject.status}</b></div><div className="modal-section-title">Overview</div><p className="modal-summary">{selectedProject.overview}</p><div className="modal-detail-block"><h3>Architecture &amp; design</h3><p>{selectedDetails.architecture}</p></div><div className="modal-highlights"><h3>Key capabilities &amp; technical approach</h3><ul>{selectedProject.highlights.map((highlight) => <li key={highlight}><span>↳</span>{highlight}</li>)}</ul></div><div className="modal-detail-block"><h3>Workflow</h3><ol>{selectedDetails.workflow.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="modal-detail-block validation-note"><h3>Validation &amp; scope notes</h3><p>{selectedDetails.validation}</p></div><div className="modal-tech"><h3>Technologies &amp; focus</h3><div className="tag-list">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="modal-actions">{selectedProject.github ? <a className="project-github" href={selectedProject.github} target="_blank" rel="noreferrer"><span>GH</span> View on GitHub <ArrowUpRight size={14} /></a> : <span className="project-concept-label"><FileText size={14} /> Design concept · no public repository</span>}<button className="project-overview" onClick={() => setSelectedProject(null)}>Close overview</button></div></div></section></div>}
      <footer className="footer section-wrap"><a className="wordmark" href="#home"><span className="wordmark-mark terminal-mark">&gt;_</span><span className="wordmark-name">SAHADAT HOSSAIN <i>SECURITY PORTFOLIO</i></span></a><span>© 2026 SAHADAT HOSSAIN</span><a href="#home">BACK TO TOP ↑</a></footer>
    </div>
  )
}

export default App
