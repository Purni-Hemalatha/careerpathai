import { Code, Palette, Briefcase, Heart, Landmark, TrendingUp, DollarSign, Wrench, Stethoscope, Target } from 'lucide-react';

export const rawCareerData = [
  // Engineering
  { category: 'engineering', title: 'Software Engineer', skills: 'Python, Java, DSA, Git, Problem Solving' },
  { category: 'engineering', title: 'Civil Engineer', skills: 'AutoCAD, Structural Analysis, Site Management, MS Project' },
  { category: 'engineering', title: 'Mechanical Engineer', skills: 'SolidWorks, Thermodynamics, CAD/CAM, MATLAB' },
  { category: 'engineering', title: 'Electrical Engineer', skills: 'Circuit Design, PLC, SCADA, AutoCAD Electrical' },
  { category: 'engineering', title: 'Data Engineer', skills: 'SQL, Python, Apache Spark, ETL, Cloud (AWS/GCP)' },
  { category: 'engineering', title: 'AI/ML Engineer', skills: 'Python, TensorFlow, Machine Learning, Statistics, NLP' },
  { category: 'engineering', title: 'DevOps Engineer', skills: 'Docker, Kubernetes, CI/CD, Linux, AWS' },
  { category: 'engineering', title: 'Embedded Systems Engineer', skills: 'C/C++, Microcontrollers, RTOS, IoT Protocols' },

  // Medical
  { category: 'medical', title: 'Doctor (MBBS)', skills: 'Clinical Diagnosis, Patient Care, Medical Ethics, Anatomy' },
  { category: 'medical', title: 'Dentist', skills: 'Oral Surgery, Dental Radiology, Patient Management' },
  { category: 'medical', title: 'Pharmacist', skills: 'Drug Knowledge, Clinical Pharmacy, Lab Skills' },
  { category: 'medical', title: 'Physiotherapist', skills: 'Rehabilitation, Anatomy, Manual Therapy, Exercise Science' },
  { category: 'medical', title: 'Nurse', skills: 'Patient Care, First Aid, Medical Terminology, Empathy' },
  { category: 'medical', title: 'Radiologist', skills: 'MRI/CT Scan Reading, Anatomy, Medical Imaging Software' },
  { category: 'medical', title: 'Dietitian', skills: 'Nutrition Science, Meal Planning, Clinical Assessment' },
  { category: 'medical', title: 'Medical Lab Technician', skills: 'Lab Equipment, Sample Testing, Microbiology, Pathology' },

  // Government Jobs
  { category: 'government-jobs', title: 'IAS Officer (UPSC)', skills: 'General Knowledge, Essay Writing, Leadership, Decision Making' },
  { category: 'government-jobs', title: 'IPS Officer', skills: 'Physical Fitness, Law Knowledge, Crisis Management' },
  { category: 'government-jobs', title: 'Bank PO (IBPS)', skills: 'Quantitative Aptitude, Reasoning, English, Banking Awareness' },
  { category: 'government-jobs', title: 'SSC CGL Officer', skills: 'Reasoning, Mathematics, English, General Awareness' },
  { category: 'government-jobs', title: 'Railway Officer (RRB)', skills: 'Technical Knowledge, Aptitude, General Science' },
  { category: 'government-jobs', title: 'Defence (NDA/CDS)', skills: 'Physical Fitness, Mathematics, English, Leadership' },
  { category: 'government-jobs', title: 'EAPCET (AP State)', skills: 'Physics, Chemistry, Mathematics/Biology' },
  { category: 'government-jobs', title: 'TNPSC / TSPSC', skills: 'General Studies, Regional Language, Current Affairs' },

  // Creative
  { category: 'creative', title: 'Graphic Designer', skills: 'Adobe Photoshop, Illustrator, Typography, Color Theory' },
  { category: 'creative', title: 'UI/UX Designer', skills: 'Figma, Wireframing, User Research, Prototyping' },
  { category: 'creative', title: 'Video Editor', skills: 'Premiere Pro, After Effects, Storyboarding, Color Grading' },
  { category: 'creative', title: 'Animator', skills: 'Maya/Blender, Motion Graphics, 3D Modeling, Rigging' },
  { category: 'creative', title: 'Fashion Designer', skills: 'Sketching, Fabric Knowledge, Trend Analysis, Stitching' },
  { category: 'creative', title: 'Content Creator', skills: 'Video Production, Copywriting, Social Media, SEO' },
  { category: 'creative', title: 'Photographer', skills: 'Lighting, Composition, Photoshop, Camera Operation' },
  { category: 'creative', title: 'Interior Designer', skills: 'AutoCAD, Space Planning, Color Theory, 3D Visualization' },

  // Business
  { category: 'business', title: 'Business Analyst', skills: 'Excel, SQL, Data Analysis, Requirement Gathering, Power BI' },
  { category: 'business', title: 'Marketing Manager', skills: 'Digital Marketing, SEO, Google Ads, Brand Strategy' },
  { category: 'business', title: 'Entrepreneur', skills: 'Business Planning, Finance, Leadership, Risk Management' },
  { category: 'business', title: 'HR Manager', skills: 'Recruitment, Communication, Labor Law, HRMS Tools' },
  { category: 'business', title: 'Financial Analyst', skills: 'Excel, Financial Modeling, Accounting, Bloomberg' },
  { category: 'business', title: 'Product Manager', skills: 'Roadmapping, Agile, User Research, Jira, Analytics' },
  { category: 'business', title: 'Sales Manager', skills: 'CRM Tools, Negotiation, Communication, Target Management' },
  { category: 'business', title: 'Supply Chain Manager', skills: 'Logistics, SAP, Inventory Management, Data Analysis' },

  // Skill-based
  { category: 'skill-based', title: 'Electrician', skills: 'Wiring, Circuit Breakers, Safety Standards, Troubleshooting' },
  { category: 'skill-based', title: 'Plumber', skills: 'Pipe Fitting, Blueprint Reading, Hydraulics, Safety' },
  { category: 'skill-based', title: 'Web Developer (Self-taught)', skills: 'HTML, CSS, JavaScript, React, Git' },
  { category: 'skill-based', title: 'Mobile App Developer', skills: 'Flutter/React Native, Dart/JS, Firebase, UI Design' },
  { category: 'skill-based', title: 'Digital Marketer', skills: 'SEO, Google Ads, Facebook Ads, Analytics, Canva' },
  { category: 'skill-based', title: 'Cyber Security Analyst', skills: 'Ethical Hacking, Networking, Linux, Python, Kali Linux' },
  { category: 'skill-based', title: 'Stock Market Trader', skills: 'Technical Analysis, Financial Literacy, Risk Management' },
  { category: 'skill-based', title: 'Freelance Writer', skills: 'Content Writing, SEO, Research, Grammar, CMS Tools' }
];

export const categoryConfig = {
  'engineering': { icon: Code, color: 'bg-blue-500', iconBg: 'bg-blue-50 text-blue-500' },
  'medical': { icon: Heart, color: 'bg-pink-500', iconBg: 'bg-pink-50 text-pink-500' },
  'government-jobs': { icon: Landmark, color: 'bg-emerald-600', iconBg: 'bg-emerald-50 text-emerald-600' },
  'creative': { icon: Palette, color: 'bg-orange-500', iconBg: 'bg-orange-50 text-orange-500' },
  'business': { icon: Briefcase, color: 'bg-purple-600', iconBg: 'bg-purple-50 text-purple-600' },
  'skill-based': { icon: TrendingUp, color: 'bg-indigo-500', iconBg: 'bg-indigo-50 text-indigo-500' }
};

export const allMatches = rawCareerData.map((c, i) => ({
  id: c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  title: c.title,
  category: c.category,
  desc: `Professional role specializing in ${c.skills.split(', ')[0]} and related areas.`,
  match: 80 + (i % 16),
  salary: `₹${3 + (i % 5)}-${10 + (i % 15)} LPA`,
  demand: i % 3 === 0 ? 'Very High Demand' : 'High Demand',
  icon: categoryConfig[c.category]?.icon || Target,
  color: categoryConfig[c.category]?.color || 'bg-slate-500',
  iconBg: categoryConfig[c.category]?.iconBg || 'bg-slate-50 text-slate-500',
  tags: [c.category === 'engineering' || c.category === 'skill-based' ? 'Technical' : 'High Salary'],
  requiredSkills: c.skills.split(', ')
}));

// Explicitly detailed data from user
const detailedCareers = {
  "software-engineer": {
    description: "Software engineers design, build, and maintain applications and systems using programming languages to create solutions for users and businesses.",
    salary: "₹4–18 LPA", cost: "Medium", demand: 95,
    skills: ["Python", "JavaScript", "React", "Node.js", "Git", "DSA", "Problem Solving", "Cloud Computing"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Learn Programming Basics', desc: 'Python/JavaScript, DSA, Git, Simple Projects', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Learn Web Development', desc: 'HTML, CSS, React, Backend (Node.js/Express)', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Advanced Topics', desc: 'System Design, Cloud Platforms (AWS/GCP), DevOps', timeline: '18+ months' }
    ]
  },
  "civil-engineer": {
    description: "Civil engineers plan, design, and oversee construction of infrastructure like roads, bridges, buildings, and dams.",
    salary: "₹3–12 LPA", cost: "Medium", demand: 78,
    skills: ["AutoCAD", "Structural Analysis", "Site Management", "MS Project", "Surveying", "Estimation"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Engineering Basics', desc: 'Engineering Drawing, AutoCAD Basics, Building Materials', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Core Civil Studies', desc: 'Structural Analysis & Design, STAAD Pro / ETABS', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Specialisation', desc: 'Project Management (MS Project), GATE/PSU exams', timeline: '18+ months' }
    ]
  },
  "mechanical-engineer": {
    description: "Mechanical engineers design, analyse, and manufacture mechanical systems and machines used in industries.",
    salary: "₹3–14 LPA", cost: "Medium", demand: 74,
    skills: ["SolidWorks", "AutoCAD", "Thermodynamics", "CAD/CAM", "MATLAB", "Manufacturing Processes"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Mechanical Basics', desc: 'Engineering Drawing, AutoCAD, Thermodynamics', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Design & Manufacturing', desc: 'SolidWorks / CATIA 3D Modelling, Fluid Mechanics', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Simulation & Specialisation', desc: 'MATLAB/Simulink, CNC & CAM programming', timeline: '18+ months' }
    ]
  },
  "electrical-engineer": {
    description: "Electrical engineers design and develop electrical systems, equipment, and power distribution networks.",
    salary: "₹3–14 LPA", cost: "Medium", demand: 76,
    skills: ["Circuit Design", "PLC", "SCADA", "AutoCAD Electrical", "Power Systems", "Embedded C"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Electrical Basics', desc: 'Basic Electrical Theory, Circuit Analysis, AutoCAD Electrical', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Advanced Systems', desc: 'PLC Programming, SCADA Systems, Power Electronics', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Smart Tech & Career', desc: 'Smart Grid Technology, Industrial automation', timeline: '18+ months' }
    ]
  },
  "ai-ml-engineer": {
    description: "AI/ML engineers build intelligent systems that learn from data to automate decisions and predictions.",
    salary: "₹6–25 LPA", cost: "Low", demand: 97,
    skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Statistics", "NLP", "Data Preprocessing"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Data & Math Basics', desc: 'Python, Statistics, Linear Algebra, Pandas/NumPy', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Core ML & Deep Learning', desc: 'TensorFlow/PyTorch, NLP, Computer Vision, Projects', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Deployment & Research', desc: 'MLOps, Transformer models (BERT, GPT)', timeline: '18+ months' }
    ]
  },
  "devops-engineer": {
    description: "DevOps engineers bridge development and operations by automating deployments, infrastructure, and monitoring pipelines.",
    salary: "₹5–20 LPA", cost: "Low", demand: 90,
    skills: ["Docker", "Kubernetes", "CI/CD", "Linux", "AWS", "Terraform", "Jenkins", "Shell Scripting"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Systems & Networking', desc: 'Linux basics, Shell scripting, Networking, Git', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Automation & Cloud', desc: 'Docker, Jenkins CI/CD, AWS core services, Terraform', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Orchestration & Security', desc: 'Kubernetes orchestration, SRE, DevSecOps', timeline: '18+ months' }
    ]
  },
  "doctor--mbbs-": {
    description: "Doctors diagnose and treat illnesses, injuries, and medical conditions in hospitals, clinics, and healthcare centres.",
    salary: "₹6–18 LPA", cost: "High", demand: 88,
    skills: ["Clinical Diagnosis", "Patient Care", "Medical Ethics", "Anatomy", "Physiology", "Pharmacology"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Pre-Medical', desc: 'Clear NEET UG exam, Study PCB (Physics, Chemistry, Biology)', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'MBBS Foundation', desc: 'Anatomy, Physiology, Biochemistry, Clinical ward postings', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Specialisation', desc: 'Pathology, Surgery rotations, 1-year internship, Prepare for NEET PG', timeline: '18+ months' }
    ]
  },
  "dentist": {
    description: "Dentists diagnose and treat problems with teeth, gums, and the mouth, and promote oral hygiene.",
    salary: "₹7–19 LPA", cost: "High", demand: 85,
    skills: ["Oral Surgery", "Dental Radiology", "Patient Management", "Prosthodontics", "Endodontics"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Pre-Dental', desc: 'Clear NEET UG, Study Biology and Chemistry, basic anatomy', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'BDS Block', desc: 'Preclinical dentistry, Dental materials, clinical postings', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Specialisation & Practice', desc: 'Oral surgery, 1-year rotatory internship, MDS entrance', timeline: '18+ months' }
    ]
  },
  "pharmacist": {
    description: "Pharmacists dispense medications, counsel patients, and ensure safe medication practices.",
    salary: "₹3–20 LPA", cost: "Medium", demand: 80,
    skills: ["Drug Knowledge", "Clinical Pharmacy", "Lab Skills", "Pharmacokinetics", "Drug Interactions"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Foundation', desc: 'Complete D.Pharm or enrol in B.Pharm, Pharmaceutical basics', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Clinical Pharmacy', desc: 'Pharmacology, Hospital or retail pharmacy internship', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Speciality & Regulatory', desc: 'M.Pharm specialisation, Clinical research, Drug regulatory jobs', timeline: '18+ months' }
    ]
  },
  "physiotherapist": {
    description: "Physiotherapists help patients recover from injuries, surgeries, and physical conditions through exercise and therapy.",
    salary: "₹4–21 LPA", cost: "Medium", demand: 82,
    skills: ["Rehabilitation", "Anatomy", "Manual Therapy", "Exercise Science", "Electrotherapy"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Foundation', desc: 'Enrol in BPT, Anatomy & Physiology, rehabilitation concepts', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Clinical Postings', desc: 'Hospital postings, electrotherapy techniques, Sports rehabilitation', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Specialisation', desc: 'MPT specialisation, Open clinic, Work in corporate wellness', timeline: '18+ months' }
    ]
  },
  "nurse": {
    description: "Nurses provide patient care, administer medications, and assist doctors in hospitals and healthcare settings.",
    salary: "₹5–22 LPA", cost: "Low", demand: 92,
    skills: ["Patient Care", "First Aid", "Medical Terminology", "IV Administration", "Empathy", "Clinical Assessment"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Nursing Basics', desc: 'Enrol in GNM or B.Sc Nursing, Anatomy, Basic patient care', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Clinical Rotations', desc: 'Medicine, surgery, paediatrics, IV techniques, wound care', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Advanced Care', desc: 'M.Sc Nursing, Nurse practitioner roles, Abroad opportunities', timeline: '18+ months' }
    ]
  },
  "ias-officer--upsc-": {
    description: "IAS officers are top civil servants who manage administration, policy implementation, and governance at district and state levels.",
    salary: "₹7–18 LPA", cost: "Low", demand: 70,
    skills: ["General Knowledge", "Essay Writing", "Leadership", "Decision Making", "Current Affairs", "Ethics"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Foundation', desc: 'Complete graduation, start reading NCERTs and The Hindu', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'UPSC Syllabus', desc: 'Cover GS Paper 1–4, Optional subject preparation, mock essays', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Mains & Interview', desc: 'CSAT prep, Mains answer writing, Interview preparation', timeline: '18+ months' }
    ]
  },
  "bank-po--ibps-": {
    description: "Bank POs manage banking operations, customer service, credit, and branch administration in public sector banks.",
    salary: "₹5–14 LPA", cost: "Low", demand: 85,
    skills: ["Quantitative Aptitude", "Reasoning", "English", "Banking Awareness", "Computer Knowledge"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Basics & Aptitude', desc: 'Basic aptitude, Reasoning puzzles, seating arrangement', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Prep & Mocks', desc: 'English grammar, Banking awareness, daily mock tests', timeline: '3–8 months' },
      { phase: 'ADVANCED', label: 'Final Polish', desc: 'Full-length mocks, Interview prep, Group discussion practice', timeline: '8+ months' }
    ]
  },
  "ssc-cgl-officer": {
    description: "SSC CGL officers work in central government departments in roles like income tax inspector, auditor, and assistant section officer.",
    salary: "₹4–12 LPA", cost: "Low", demand: 88,
    skills: ["Reasoning", "Mathematics", "English", "General Awareness", "Computer Basics"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Structure & Basics', desc: 'Quant shortcuts, Reasoning daily practice', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Tier 1 & 2', desc: 'English vocabulary, General awareness, advanced maths', timeline: '3–9 months' },
      { phase: 'ADVANCED', label: 'Tier 3 & 4', desc: 'Descriptive paper practice, computer skill test, Interview', timeline: '9+ months' }
    ]
  },
  "defence--nda-cds-": {
    description: "Defence officers serve in the Indian Armed Forces in leadership, combat, and technical roles.",
    salary: "₹6–20 LPA", cost: "Low", demand: 75,
    skills: ["Physical Fitness", "Mathematics", "English", "Leadership", "General Knowledge", "Teamwork"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Foundation', desc: 'Physical fitness training, Study maths and English', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Written & SSB Prep', desc: 'Written exam prep, SSB interview preparation, group tasks', timeline: '6–12 months' },
      { phase: 'ADVANCED', label: 'SSB Clear & Join', desc: 'SSB Stage 1 & 2, Medical clearance, Join Academy', timeline: '12+ months' }
    ]
  },
  "graphic-designer": {
    description: "Graphic designers create visual content for brands, media, and digital platforms using design tools and creative thinking.",
    salary: "₹3–14 LPA", cost: "Low", demand: 80,
    skills: ["Adobe Photoshop", "Illustrator", "Typography", "Color Theory", "Branding", "InDesign"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Design Basics', desc: 'Photoshop basics, Colour theory and typography', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Vectors & Portfolio', desc: 'Adobe Illustrator, Brand identity design, Behance portfolio', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Advanced Techs', desc: 'Motion graphics (After Effects), UI/UX basics, Agencies', timeline: '12+ months' }
    ]
  },
  "ui-ux-designer": {
    description: "UI/UX designers create user-friendly digital interfaces and experiences for apps and websites.",
    salary: "₹4–20 LPA", cost: "Low", demand: 91,
    skills: ["Figma", "Wireframing", "User Research", "Prototyping", "Usability Testing", "Design Systems"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Figma & Principles', desc: 'Figma basics, hierarchy, spacing, contrast', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Research & Wireframing', desc: 'User research methods, wireframes, 3-5 case studies', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Systems & Testing', desc: 'Design systems, A/B testing, product-based companies', timeline: '12+ months' }
    ]
  },
  "video-editor": {
    description: "Video editors assemble, cut, and enhance video footage for films, YouTube, advertisements, and social media.",
    salary: "₹3–15 LPA", cost: "Low", demand: 83,
    skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Storyboarding", "Color Grading", "Audio Mixing"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Basic Editing', desc: 'Premiere Pro basics, cut/assemble footage, pacing', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Motion & Effects', desc: 'After Effects, Color grading with LUTs, Edit reels', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Professional Grading', desc: 'DaVinci Resolve, Short films/ads, Media houses', timeline: '12+ months' }
    ]
  },
  "content-creator": {
    description: "Content creators produce videos, blogs, social media posts, and multimedia content for brands and platforms.",
    salary: "₹3–20 LPA", cost: "Low", demand: 88,
    skills: ["Video Production", "Copywriting", "SEO", "Social Media Strategy", "Canva", "Analytics"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Niche & Launch', desc: 'Choose niche, basic shooting, Canva graphics, launch channel', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Consistency & SEO', desc: 'Video editing, SEO, consistent posting, reach milestone', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Monetisation', desc: 'Brand partnerships, AdSense, affiliate marketing, personal brand', timeline: '12+ months' }
    ]
  },
  "business-analyst": {
    description: "Business analysts bridge the gap between business needs and technology solutions by analysing data, processes, and stakeholder requirements.",
    salary: "₹5–18 LPA", cost: "Medium", demand: 87,
    skills: ["Excel", "SQL", "Power BI", "Data Analysis", "Requirement Gathering", "Process Mapping", "Communication"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Data Basics', desc: 'Advanced Excel, SQL basics, Business communication', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Dashboards & Processes', desc: 'Power BI/Tableau, Process flow diagrams, Case studies', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Agile & Certification', desc: 'Agile/Scrum, CBAP certification, Domain expertise', timeline: '12+ months' }
    ]
  },
  "marketing-manager": {
    description: "Marketing managers plan and execute campaigns to promote products and services across digital and traditional media channels.",
    salary: "₹5–20 LPA", cost: "Medium", demand: 85,
    skills: ["Digital Marketing", "SEO", "Google Ads", "Brand Strategy", "Content Marketing", "Analytics", "CRM"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Marketing Fundamentals', desc: 'Digital marketing basics, Social media, SEO', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Campaigns & Analytics', desc: 'Google Ads, Email marketing (Mailchimp), GA4', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Strategy & Leadership', desc: 'Brand strategy, Performance marketing (ROAS), CRM', timeline: '12+ months' }
    ]
  },
  "entrepreneur": {
    description: "Entrepreneurs identify opportunities, build businesses, manage teams, and create products or services that solve real-world problems.",
    salary: "Variable", cost: "Low", demand: 100,
    skills: ["Business Planning", "Finance", "Leadership", "Risk Management", "Networking", "Problem Solving", "Marketing"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Ideation', desc: 'Read business books, identify problem, learn finance basics', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'MVP & Registration', desc: 'Build MVP, Register business, Apply to incubators', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Scale & Funding', desc: 'Product-market fit, Hire team, Pitch/Raise funds, Scale', timeline: '18+ months' }
    ]
  },
  "financial-analyst": {
    description: "Financial analysts evaluate financial data to help businesses and individuals make investment and budgeting decisions.",
    salary: "₹5–22 LPA", cost: "Medium", demand: 84,
    skills: ["Excel", "Financial Modelling", "Accounting", "Valuation", "Bloomberg Terminal", "CFA concepts"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Accounting Basics', desc: 'Financial Accounting, Advanced Excel, P&L statements', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Modelling & Reports', desc: 'Financial modelling (DCF), Equity research, Terminal training', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Certification & Portfolio', desc: 'CFA Level 1 & 2, Portfolio management, Investment banking', timeline: '12+ months' }
    ]
  },
  "web-developer--self-taught-": {
    description: "Web developers build and maintain websites and web applications using front-end and back-end technologies.",
    salary: "₹3–15 LPA", cost: "Low", demand: 92,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Responsive Design", "REST APIs"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Frontend Basics', desc: 'HTML structure, CSS styling, JavaScript basics', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Full Stack Frameworks', desc: 'React.js, Node.js backend, Database basics, GitHub projects', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Deployment & APIs', desc: 'REST API design, Deployment (Vercel/AWS), Freelance/Startups', timeline: '12+ months' }
    ]
  },
  "digital-marketer": {
    description: "Digital marketers promote products online using SEO, paid ads, social media, and content strategies.",
    salary: "₹3–16 LPA", cost: "Low", demand: 88,
    skills: ["SEO", "Google Ads", "Facebook Ads", "Google Analytics", "Canva", "Email Marketing", "Copywriting"],
    roadmap: [
      { phase: 'BEGINNER', label: 'SEO & Content', desc: 'Google Digital Garage, SEO basics, Canva/Social media', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Paid Ads & Analytics', desc: 'Google Ads & Meta Ads, GA4, Email marketing, practice projects', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Performance & Agency', desc: 'Performance marketing (ROAS), Agency clients, Niche selection', timeline: '12+ months' }
    ]
  },
  "cyber-security-analyst": {
    description: "Cyber security analysts protect organisations from digital threats, breaches, and attacks.",
    salary: "₹5–22 LPA", cost: "Low", demand: 93,
    skills: ["Ethical Hacking", "Networking", "Linux", "Python", "Kali Linux", "OWASP", "Firewalls", "SIEM Tools"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Network & System Basics', desc: 'Networking basics, Linux command line, Security+ concepts', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Hacking & Web Sec', desc: 'Ethical hacking (Kali Linux), OWASP Top 10, CTF challenges', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Certifications & Defence', desc: 'CEH certification, SOC Analyst, Pen-testing reports', timeline: '12+ months' }
    ]
  },
  "stock-market-trader": {
    description: "Stock market traders analyse financial markets and execute trades in equities, derivatives, and commodities.",
    salary: "₹3–50 LPA", cost: "Low", demand: 79,
    skills: ["Technical Analysis", "Fundamental Analysis", "Financial Literacy", "Risk Management", "Trading Psychology"],
    roadmap: [
      { phase: 'BEGINNER', label: 'Market Basics', desc: 'Learn NSE/BSE basics, study charts, paper trading', timeline: '0–3 months' },
      { phase: 'INTERMEDIATE', label: 'Analysis & Small Trades', desc: 'Technical indicators (RSI), Fundamental analysis, small capital trades', timeline: '3–12 months' },
      { phase: 'ADVANCED', label: 'Strategy & Risk', desc: 'Personal strategy, Risk management, NISM certification, full-time trading', timeline: '12+ months' }
    ]
  }
};

export const getCareerById = (id) => {
  // Try to find the basic match from the array
  const match = allMatches.find(c => c.id === id);
  const baseTitle = match ? match.title : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const baseSkills = match ? match.requiredSkills : ["Domain Knowledge", "Communication", "Problem Solving", "Technical Skills"];
  const baseCategory = match ? match.category : 'engineering';
  
  if (detailedCareers[id]) {
    // Return explicit data + merged visual properties from the match array
    return { 
      ...detailedCareers[id], 
      title: baseTitle, 
      id,
      icon: categoryConfig[baseCategory]?.icon || Target,
      infoIcon: DollarSign, costIcon: DollarSign, demandIcon: TrendingUp // generic bindings
    };
  }
  
  // Generic fallback if user clicks a job from ExploreCareers that wasn't in detailed text
  return {
    id,
    title: baseTitle,
    description: `Professional role specialising in ${baseSkills[0]} and delivering value across their domain.`,
    salary: "₹4–15 LPA",
    cost: "Medium",
    demand: 80,
    skills: baseSkills,
    icon: categoryConfig[baseCategory]?.icon || Target,
    infoIcon: DollarSign, costIcon: DollarSign, demandIcon: TrendingUp,
    roadmap: [
      { phase: 'BEGINNER', label: 'Foundation Skills', desc: 'Learn the core tools, theories, and basics of the industry.', timeline: '0–6 months' },
      { phase: 'INTERMEDIATE', label: 'Practical Application', desc: 'Gain real-world experience through projects or junior roles.', timeline: '6–18 months' },
      { phase: 'ADVANCED', label: 'Specialisation & Mastery', desc: 'Take on leadership, master advanced tools, and obtain certifications.', timeline: '18+ months' }
    ]
  };
};
