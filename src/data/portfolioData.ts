export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDetails: string;
  tech: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  demoType: "portfolio-manager" | "client-portfolio" | "data-grid" | "reporting";
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string[];
    outcome: string;
  };
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
}

export const portfolioData = {
  personalInfo: {
    name: "Prathamesh Ethiraj",
    title: "Full Stack Developer",
    animatedTitles: [
      "Full Stack Developer",
      "React.js Developer",
      "Next.js Developer",
      "Node.js Developer",
      "AI Chatbot Developer",
      "E-Commerce Developer",
    ],
    tagline: "I build enterprise-grade web applications — from financial platforms & e-commerce stores to AI chatbots & education tools — that drive real business outcomes.",
    email: "prathameshethiraj@gmail.com",
    phone: "7045339934",
    linkedin: "https://linkedin.com/in/prathamesh-ethiraj-35936a209",
    github: "https://github.com/prathamesh-ethiraj",
    whatsapp: "https://wa.me/917045339934",
    location: "Mumbai, India",
    resumeUrl: "/Prathamesh_Ethiraj_Resume.pdf",
    aboutMe:
      "Results-driven Full Stack Developer with 4+ years of hands-on experience building responsive, scalable enterprise web applications. I specialize in financial software platforms, performance-critical dashboards, and RESTful API design. Proficient in React.js, Next.js, Node.js, and .NET Core—I bridge front-end polish with robust back-end architecture.",
  },
  stats: {
    hero: [
      { label: "Years Experience", value: "4+" },
      { label: "Freelance Projects", value: "2" },
      { label: "Domains", value: "Finance, E-com, Edu" },
      { label: "Type", value: "Full Stack" },
    ],
    about: [
      { label: "Years Experience", value: "4+" },
      { label: "Freelance Projects", value: "2" },
      { label: "Modules Built", value: "10+" },
      { label: "Responsive Design", value: "100%" },
    ],
  },
  education: [
    {
      degree: "Bachelor of Science in IT Management",
      institution: "SIES College of Commerce and Economics (AUTONOMOUS)",
      duration: "2020 – 2023",
      score: "CGPA: 9.6",
      board: "Mumbai University",
    },
    {
      degree: "Science with Computer Science",
      institution: "SIES College of Arts, Commerce and Science (AUTONOMOUS)",
      duration: "2018 – 2020",
      score: "Percentage: 62%",
      board: "HSC Board",
    },
  ],
  experience: [
    {
      company: "Capital Market of Internet Technology",
      role: "Software Developer",
      duration: "Aug 2023 – Present (3+ Years)",
      description:
        "Leading front-end development, API migrations, and high-performance data visualization tools for financial-grade platforms used by thousands of analysts.",
      highlights: [
        "Developed dynamic user interfaces and reusable component libraries using React.js, Redux, and Context API.",
        "Migrated a legacy .NET/Angular application to React.js, improving load time by 40% and developer efficiency.",
        "Built and integrated RESTful APIs using .NET Core and Node.js (Express) to modernize legacy backend services.",
        "Implemented high-performance virtual data grids featuring real-time updates, sorting, filtering, CSV export, and custom pagination.",
        "Deployed cloud-hosted APIs to AWS EC2 with secure token-based authentication.",
        "Collaborated with UI/UX designers and QA teams for seamless product releases.",
      ],
      tech: ["React.js", "Next.js", "Node.js", "Express.js", ".NET Core", "AWS", "SQL Server", "Redux", "Tailwind CSS"],
    },
    {
      company: "P2B Ace Solutions",
      role: "React Native Developer",
      duration: "Mar 2023 – Aug 2023 (5 Months)",
      description:
        "Designed and developed cross-platform mobile UI for business applications, ensuring pixel-perfect parity across iOS and Android.",
      highlights: [
        "Built responsive UI screens for a cross-platform mobile application using React Native.",
        "Created reusable component libraries ensuring consistent design across Android and iOS platforms.",
        "Migrated legacy web features to mobile-first experiences, increasing user accessibility.",
      ],
      tech: ["React Native", "JavaScript", "Redux", "REST APIs", "Android/iOS"],
    },
  ] as Experience[],
  skills: [
    {
      category: "Frontend",
      icon: "FaCode",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Next.js", level: 88 },
        { name: "JavaScript (ES6+)", level: 93 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Redux & Context API", level: 90 },
      ],
    },
    {
      category: "Backend",
      icon: "FaServer",
      skills: [
        { name: "Node.js (Express)", level: 85 },
        { name: ".NET Core", level: 82 },
        { name: "REST API Design", level: 90 },
      ],
    },
    {
      category: "Database",
      icon: "FaDatabase",
      skills: [
        { name: "MySQL", level: 82 },
        { name: "SQL Server", level: 80 },
        { name: "MariaDB", level: 78 },
        { name: "PostgreSQL", level: 75 },
      ],
    },
    {
      category: "Tools & Cloud",
      icon: "FaTools",
      skills: [
        { name: "AWS (EC2/S3)", level: 72 },
        { name: "AI Chatbot Dev", level: 78 },
        { name: "Git & GitHub", level: 88 },
        { name: "Postman", level: 85 },
      ],
    },
  ] as SkillCategory[],
  projects: [
    {
      id: "portfolio-management",
      title: "Portfolio Management System",
      subtitle: "Enterprise Stock & Asset Management Platform",
      description:
        "Enterprise platform for managing stock portfolios, mutual funds, transactions, performance analytics, benchmark comparison, document management, CSV imports, and reporting.",
      fullDetails:
        "Built for financial analysts, this dashboard provides robust tracking of client assets, offering visual representation of portfolio value distributions, CSV statement parsers, and custom benchmark plotting.",
      tech: ["Next.js", "Node.js", "MySQL", "Tailwind CSS", "Framer Motion"],
      features: [
        "Real-time portfolio evaluation and gains/losses breakdown",
        "Interactive CSV importer that maps broker/bank statement formats",
        "Custom charts comparing portfolio vs. benchmark indices (NIFTY 50, S&P 500)",
        "Document repository for client invoices and transaction statements",
        "Multi-client portfolio management with role-based access control",
      ],
      metrics: [
        { label: "Data Latency", value: "< 200ms" },
        { label: "CSV Processing", value: "Instant" },
        { label: "Active Investors", value: "12,000+" },
      ],
      liveUrl: "https://qalpha.in",
      demoType: "portfolio-manager",
      caseStudy: {
        problem:
          "Financial advisors were manually tracking client portfolios across multiple spreadsheets, causing errors, slow reporting, and poor visibility into performance.",
        solution:
          "Built a centralized, real-time dashboard integrating broker APIs, CSV parsers, and custom charting—cutting report generation time by 80%.",
        architecture: [
          "Next.js frontend with SSR for SEO and performance",
          "Node.js REST API with Express.js middleware for auth and validation",
          "MySQL database with normalized financial schema",
          "Recharts for benchmark comparison charts",
          "AWS S3 for document storage",
        ],
        outcome:
          "Adopted by financial advisory firms managing 12,000+ investor accounts. Reporting time reduced from hours to minutes.",
      },
    },
    {
      id: "client-portfolio",
      title: "Client Portfolio Website",
      subtitle: "Responsive Business Showcase Platform",
      description:
        "A fast, fully-responsive business portfolio with gorgeous page transitions, animated project galleries, and a lead capture contact workflow.",
      fullDetails:
        "Developed to demonstrate how high-performance single-page portfolios can elevate business presence. Employs advanced Framer Motion transitions and async form submission.",
      tech: ["React.js", "Framer Motion", "Tailwind CSS", "EmailJS"],
      features: [
        "Smooth page routing transitions and entry micro-animations",
        "Responsive grid layout compatible with mobile, tablet, and desktop",
        "Fully validated contact forms with interactive status feedback",
        "SEO-optimized with semantic HTML and Open Graph metadata",
      ],
      metrics: [
        { label: "Lighthouse Score", value: "100/100" },
        { label: "Load Time", value: "0.6s" },
        { label: "Conversion Rate", value: "14%" },
      ],
      demoType: "client-portfolio",
      caseStudy: {
        problem:
          "A business client had no online presence and was losing leads to competitors with polished websites.",
        solution:
          "Designed and developed a premium portfolio SPA with brand-consistent animations and a conversion-optimized contact form with EmailJS integration.",
        architecture: [
          "React.js with Vite for ultra-fast builds",
          "Framer Motion for page-level and component-level animations",
          "Tailwind CSS with custom design tokens",
          "EmailJS for zero-backend form submissions",
          "Vercel for instant global deployment",
        ],
        outcome:
          "Client saw 14% contact form conversion rate in the first month, directly attributable to the clean UX design.",
      },
    },
    {
      id: "capitaline-aws",
      title: "Capitaline AWS",
      subtitle: "Cloud Financial Analytics Platform",
      description:
        "High-performance platform migrating .NET Angular systems to React.js, hosting secure .NET Core APIs on AWS for real-time market reporting and company financial data.",
      fullDetails:
        "A large-scale migration increasing front-end rendering efficiency. Virtualized data grids render 100,000+ financial items instantly with multi-column sorting, filtering, and PDF/CSV exports. Live at alpha.capitaline.com.",
      tech: ["React.js", ".NET Core", "AWS EC2/S3", "SQL Server", "Redux"],
      features: [
        "Migration of legacy Angular to modular React, boosting build speed by 50%",
        "Virtualized list rendering for zero-lag with 100k+ rows of financial data",
        "Secure token-based API integration hosted on AWS infrastructure",
        "Export functionality supporting CSV, XLS, and customized PDF templates",
        "Economy module at economy.capitaline.com for macro-economic data reporting",
      ],
      metrics: [
        { label: "Page Weight Reduced", value: "40%" },
        { label: "Grid Row Limit", value: "100k+" },
        { label: "API Uptime", value: "99.99%" },
      ],
      liveUrl: "https://alpha.capitaline.com",
      demoType: "data-grid",
      caseStudy: {
        problem:
          "A legacy .NET/Angular monolith was serving 100,000+ financial data rows with slow render performance and high maintenance costs.",
        solution:
          "Progressively migrated modules to React.js with virtualized rendering and refactored .NET Core APIs deployed on AWS EC2 behind an HTTPS load balancer.",
        architecture: [
          "React.js micro-frontend modules replacing Angular components incrementally",
          "TanStack Virtual (virtualized rendering) for massive dataset grids",
          ".NET Core 7 REST APIs on AWS EC2 with JWT authentication",
          "AWS S3 for static asset delivery via CloudFront CDN",
          "SQL Server with optimized query plans and indexing",
        ],
        outcome:
          "40% reduction in page bundle size. Grid rendering improved from 8 seconds to under 200ms. 99.99% API uptime post-migration. Live at alpha.capitaline.com & economy.capitaline.com.",
      },
    },
    {
      id: "nav-india",
      title: "NAV India",
      subtitle: "Financial Reporting & Ledger Reconciliation",
      description:
        "Reporting interface and Express.js backends for Net Asset Value aggregation, ledger data fetches, and unified state management for seamless financial auditing. Live at beta.navindia.com.",
      fullDetails:
        "Designed to aggregate complex NAV records from multiple bank servers, providing auditors a centralized screen to search, verify, and lock financial declarations.",
      tech: ["React.js", "Node.js", "Express.js", "Context API", "Redux"],
      features: [
        "Unified state management preventing race conditions between concurrent fetches",
        "Interactive ledger matching tool with highlighted discrepancy alerts",
        "Async backend polling queues for high-volume financial books",
        "Cryptographic audit lock once reconciliation is approved",
      ],
      metrics: [
        { label: "Discrepancy Detection", value: "10x Faster" },
        { label: "State Sync Delay", value: "0ms" },
        { label: "Auditor Efficiency", value: "+35%" },
      ],
      liveUrl: "http://beta.navindia.com",
      demoType: "reporting",
      caseStudy: {
        problem:
          "Auditors were manually cross-referencing bank custody data against internal ledgers across spreadsheets, causing a 2-day reconciliation cycle prone to errors.",
        solution:
          "Built a real-time reconciliation dashboard that auto-fetches custody data, cross-matches entries, and highlights discrepancies with one-click resolution and cryptographic locking.",
        architecture: [
          "React.js with Context API for shared audit state across panels",
          "Node.js/Express backend polling multiple bank APIs asynchronously",
          "Custom debounced reconciliation engine in Node.js",
          "Redis-style in-memory queue for high-throughput data aggregation",
          "MySQL audit log tables with immutable write-once records",
        ],
        outcome:
          "Reconciliation cycle reduced from 2 days to under 3 hours. Error rate dropped by 95%. Adopted by auditing team of 12 analysts. Live at beta.navindia.com.",
      },
    },
  ] as Project[],
  services: [
    {
      title: "Web Application Development",
      description:
        "End-to-end responsive web apps with React/Next.js front-ends and Node.js or .NET Core back-ends. From MVPs to enterprise platforms.",
      icon: "FaLaptopCode",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Full-featured online stores with product catalogs, cart, payment integration, order management, and seller dashboards.",
      icon: "FaShoppingCart",
    },
    {
      title: "Admin Dashboards",
      description:
        "Feature-rich admin panels with role-based access, real-time data grids, analytics charts, and export tools.",
      icon: "FaRegChartBar",
    },
    {
      title: "AI Chatbot Development",
      description:
        "Intelligent chatbots integrated into your website or app — customer support bots, FAQ assistants, and lead qualification bots.",
      icon: "FaRobot",
    },
    {
      title: "Education Platforms",
      description:
        "LMS systems, test-mode quiz platforms, student portals, course management tools, and progress tracking dashboards.",
      icon: "FaGraduationCap",
    },
    {
      title: "Portfolio Management Systems",
      description:
        "Specialized platforms for tracking stocks, mutual funds, NAV calculations, P&L analytics, and client reporting.",
      icon: "FaChartLine",
    },
    {
      title: "Node.js API Development",
      description:
        "Scalable, secure RESTful APIs with Express.js. Authentication, rate limiting, caching, and AWS deployment.",
      icon: "FaServer",
    },
    {
      title: "Business Software",
      description:
        "Custom CRM, ERP modules, inventory systems, and workflow automation tools tailored to your business processes.",
      icon: "FaBriefcase",
    },
    {
      title: "Performance Optimization",
      description:
        "React code-splitting, lazy loading, database query tuning, and bundle optimization to hit Lighthouse 95+.",
      icon: "FaBolt",
    },
  ] as Service[],
  whyWorkWithMe: [
    {
      title: "Clean Code",
      description:
        "Every line is written with maintainability in mind. Well-structured components, consistent naming, and thorough comments.",
      icon: "FaCode",
    },
    {
      title: "On-Time Delivery",
      description:
        "I scope projects accurately and communicate early if blockers arise. Deadlines are commitments, not targets.",
      icon: "FaClock",
    },
    {
      title: "Responsive Communication",
      description:
        "Daily or weekly progress updates depending on project phase. You are never in the dark about your project status.",
      icon: "FaComments",
    },
    {
      title: "Scalable Architecture",
      description:
        "Systems designed to handle growth—whether it's 100 users or 100,000. Architecture decisions made for the long run.",
      icon: "FaLayerGroup",
    },
    {
      title: "Business-Oriented Solutions",
      description:
        "I don't just write code. I understand your business goal and ensure the software solves the right problem.",
      icon: "FaBriefcase",
    },
  ],
  process: [
    {
      step: 1,
      title: "Requirement Discussion",
      description: "Deep-dive into your goals, user needs, and technical constraints. Define scope, stack, and success metrics.",
      icon: "FaComments",
    },
    {
      step: 2,
      title: "UI/UX Design",
      description: "Wireframes and interactive mockups so you can visualize the product before a single line of code is written.",
      icon: "FaPencilRuler",
    },
    {
      step: 3,
      title: "Development",
      description: "Iterative, test-driven development with regular demo checkpoints. Clean code with proper documentation.",
      icon: "FaCode",
    },
    {
      step: 4,
      title: "Testing & QA",
      description: "Cross-browser, cross-device testing. Performance profiling to ensure Lighthouse scores above 90.",
      icon: "FaFlask",
    },
    {
      step: 5,
      title: "Deployment",
      description: "Zero-downtime deployment to Vercel, AWS, or your preferred cloud. SSL, CI/CD, and monitoring set up.",
      icon: "FaRocket",
    },
    {
      step: 6,
      title: "Ongoing Support",
      description: "Post-launch support for bug fixes, feature additions, and performance improvements. Long-term partnership.",
      icon: "FaLifeRing",
    },
  ],
  testimonials: [
    {
      name: "Sanjay Shah",
      role: "Lead Architect",
      company: "Capital Market of IT",
      feedback:
        "Prathamesh masterfully migrated our legacy .NET structures into React. His attention to grid performance, sorting speed, and clean code helped our project launch weeks ahead of schedule.",
      rating: 5,
    },
    {
      name: "Elena Geller",
      role: "Product Owner",
      company: "P2B Ace Solution",
      feedback:
        "We tasked Prathamesh with migrating our web interface to React Native. He delivered a pixel-perfect, highly responsive mobile experience on both iOS and Android. Excellent team player!",
      rating: 5,
    },
  ] as Testimonial[],
};
