const SKILL_TAXONOMY = {
  "Web Development": {
    Frontend: [
      {
        id: "HTML",
        name: "HTML",
        type: "hard",
        synonyms: ["HTML5", "HyperText Markup Language"],
      },
      {
        id: "CSS",
        name: "CSS",
        type: "hard",
        synonyms: ["CSS3", "Cascading Style Sheets", "Styling"],
      },
      {
        id: "JavaScript",
        name: "JavaScript",
        type: "hard",
        synonyms: ["JS", "ES6", "ECMAScript", "Vanilla JS"],
      },
      { id: "TypeScript", name: "TypeScript", type: "hard", synonyms: ["TS"] },
      {
        id: "React",
        name: "React",
        type: "hard",
        synonyms: ["ReactJS", "React.js"],
      },
      { id: "Vue", name: "Vue.js", type: "hard", synonyms: ["Vue", "VueJS"] },
      {
        id: "Responsive Design",
        name: "Responsive Design",
        type: "hard",
        synonyms: ["Mobile-First", "Bootstrap"],
      },
      {
        id: "Accessibility",
        name: "Web Accessibility",
        type: "hard",
        synonyms: ["a11y", "WCAG"],
      },
    ],
    Backend: [
      {
        id: "Node.js",
        name: "Node.js",
        type: "hard",
        synonyms: ["NodeJS", "Node"],
      },
      { id: "PHP", name: "PHP", type: "hard", synonyms: [] },
      {
        id: "Python",
        name: "Python",
        type: "hard",
        synonyms: ["Python3", "py"],
      },
      {
        id: "REST APIs",
        name: "REST APIs",
        type: "hard",
        synonyms: ["RESTful API", "API Development", "REST"],
      },
      {
        id: "Authentication",
        name: "Authentication",
        type: "hard",
        synonyms: ["JWT", "OAuth", "Auth"],
      },
      {
        id: "SQL",
        name: "SQL",
        type: "hard",
        synonyms: ["MySQL", "PostgreSQL", "Relational Databases", "Database"],
      },
      {
        id: "NoSQL",
        name: "NoSQL",
        type: "hard",
        synonyms: ["MongoDB", "Firebase", "DynamoDB"],
      },
    ],
  },
  "Data & Analytics": {
    "Data Science": [
      {
        id: "Data Analysis",
        name: "Data Analysis",
        type: "hard",
        synonyms: ["Data Analytics", "Analysis"],
      },
      {
        id: "Statistics",
        name: "Statistics",
        type: "hard",
        synonyms: ["Statistical Analysis", "Probability"],
      },
      {
        id: "Data Visualization",
        name: "Data Visualization",
        type: "hard",
        synonyms: ["Data Viz", "Charts", "Dashboards"],
      },
      {
        id: "Machine Learning",
        name: "Machine Learning",
        type: "hard",
        synonyms: ["ML", "Supervised Learning", "AI/ML"],
      },
      {
        id: "Excel",
        name: "Microsoft Excel",
        type: "hard",
        synonyms: ["Excel", "Spreadsheets", "Google Sheets"],
      },
    ],
    "BI Tools": [
      { id: "Tableau", name: "Tableau", type: "hard", synonyms: [] },
      { id: "Power BI", name: "Power BI", type: "hard", synonyms: ["PowerBI"] },
    ],
  },
  Design: {
    "UI/UX": [
      { id: "Figma", name: "Figma", type: "hard", synonyms: ["Figma Design"] },
      {
        id: "Wireframing",
        name: "Wireframing",
        type: "hard",
        synonyms: ["Lo-fi Design", "Mockups"],
      },
      {
        id: "User Research",
        name: "User Research",
        type: "hard",
        synonyms: ["UX Research", "Usability Testing"],
      },
      {
        id: "Prototyping",
        name: "Prototyping",
        type: "hard",
        synonyms: ["Interactive Prototypes"],
      },
      {
        id: "Design Systems",
        name: "Design Systems",
        type: "hard",
        synonyms: ["Component Libraries", "Style Guides"],
      },
    ],
  },
  "DevOps & Infrastructure": {
    DevOps: [
      {
        id: "Git",
        name: "Git & Version Control",
        type: "hard",
        synonyms: ["GitHub", "GitLab", "Version Control"],
      },
      {
        id: "Linux",
        name: "Linux",
        type: "hard",
        synonyms: ["Unix", "Bash", "Command Line", "Shell"],
      },
      {
        id: "Docker",
        name: "Docker",
        type: "hard",
        synonyms: ["Containerisation", "Containers"],
      },
      {
        id: "CI/CD",
        name: "CI/CD Pipelines",
        type: "hard",
        synonyms: ["DevOps Pipeline", "GitHub Actions", "Jenkins"],
      },
      {
        id: "Cloud Services",
        name: "Cloud Services",
        type: "hard",
        synonyms: ["AWS", "Azure", "GCP", "Cloud Computing"],
      },
      {
        id: "Kubernetes",
        name: "Kubernetes",
        type: "hard",
        synonyms: ["K8s", "Container Orchestration"],
      },
      {
        id: "Scripting",
        name: "Shell Scripting",
        type: "hard",
        synonyms: ["Bash Scripting", "Automation Scripts"],
      },
    ],
  },
  Cybersecurity: {
    Security: [
      {
        id: "Networking",
        name: "Networking",
        type: "hard",
        synonyms: ["Computer Networks", "TCP/IP", "Network Protocols"],
      },
      {
        id: "Security Fundamentals",
        name: "Security Fundamentals",
        type: "hard",
        synonyms: ["InfoSec", "Cybersecurity Basics", "CIA Triad"],
      },
      {
        id: "Penetration Testing",
        name: "Penetration Testing",
        type: "hard",
        synonyms: ["Pen Testing", "Ethical Hacking"],
      },
      {
        id: "Risk Assessment",
        name: "Risk Assessment",
        type: "hard",
        synonyms: ["Threat Modelling", "Vulnerability Assessment"],
      },
    ],
  },
  Mobile: {
    "Mobile Development": [
      { id: "React Native", name: "React Native", type: "hard", synonyms: [] },
      {
        id: "Flutter",
        name: "Flutter",
        type: "hard",
        synonyms: ["Dart", "Flutter/Dart"],
      },
      {
        id: "Mobile UI",
        name: "Mobile UI Design",
        type: "hard",
        synonyms: ["Mobile Design Patterns"],
      },
    ],
  },
  "Soft Skills": {
    Professional: [
      {
        id: "Communication",
        name: "Communication",
        type: "soft",
        synonyms: ["Written Communication", "Verbal Communication"],
      },
      {
        id: "Problem Solving",
        name: "Problem Solving",
        type: "soft",
        synonyms: ["Critical Thinking", "Analytical Thinking"],
      },
      {
        id: "Teamwork",
        name: "Teamwork",
        type: "soft",
        synonyms: ["Collaboration", "Cross-functional Teams"],
      },
      {
        id: "Time Management",
        name: "Time Management",
        type: "soft",
        synonyms: ["Organisation", "Prioritisation"],
      },
      {
        id: "Adaptability",
        name: "Adaptability",
        type: "soft",
        synonyms: ["Flexibility", "Learning Agility"],
      },
      {
        id: "Data Structures",
        name: "Data Structures & Algorithms",
        type: "hard",
        synonyms: ["DSA", "Algorithms", "Complexity Analysis"],
      },
    ],
  },
};

const SKILL_FLAT = Object.values(SKILL_TAXONOMY).flatMap((cat) =>
  Object.values(cat).flat(),
);

const JOB_ROLES = [
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    level: "Junior",
    category: "Web Development",
    description:
      "Build and maintain user-facing web interfaces using modern JavaScript frameworks. Translate UI designs into responsive, accessible code.",
    required: [
      { id: "HTML", weight: 2.0, label: "Critical" },
      { id: "CSS", weight: 2.0, label: "Critical" },
      { id: "JavaScript", weight: 2.0, label: "Critical" },
      { id: "Git", weight: 1.5, label: "Important" },
      { id: "Responsive Design", weight: 1.5, label: "Important" },
      { id: "React", weight: 1.5, label: "Important" },
      { id: "REST APIs", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "TypeScript", weight: 0.5 },
      { id: "Accessibility", weight: 0.5 },
      { id: "Vue", weight: 0.5 },
    ],
    resources: {
      HTML: {
        platform: "MDN Web Docs",
        url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
        duration: "2 weeks",
      },
      CSS: {
        platform: "CSS Tricks",
        url: "https://css-tricks.com/where-do-you-learn-html-css-in-2020/",
        duration: "3 weeks",
      },
      JavaScript: {
        platform: "The Odin Project",
        url: "https://www.theodinproject.com/paths/full-stack-javascript",
        duration: "3 months",
      },
      Git: {
        platform: "GitHub Skills",
        url: "https://skills.github.com/",
        duration: "1 week",
      },
      "Responsive Design": {
        platform: "freeCodeCamp",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        duration: "2 weeks",
      },
      React: {
        platform: "React Official Docs",
        url: "https://react.dev/learn",
        duration: "6 weeks",
      },
      "REST APIs": {
        platform: "Postman Learning",
        url: "https://learning.postman.com/docs/introduction/overview/",
        duration: "1 week",
      },
      TypeScript: {
        platform: "Total TypeScript",
        url: "https://www.totaltypescript.com/tutorials/beginners-typescript",
        duration: "3 weeks",
      },
      Accessibility: {
        platform: "web.dev Accessibility",
        url: "https://web.dev/learn/accessibility/",
        duration: "2 weeks",
      },
    },
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    level: "Junior",
    category: "Web Development",
    description:
      "Design and build server-side logic, databases, and APIs that power web applications. Ensure performance, security, and scalability.",
    required: [
      { id: "Node.js", weight: 2.0, label: "Critical" },
      { id: "REST APIs", weight: 2.0, label: "Critical" },
      { id: "SQL", weight: 2.0, label: "Critical" },
      { id: "Git", weight: 1.5, label: "Important" },
      { id: "Authentication", weight: 1.5, label: "Important" },
      { id: "Data Structures", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "Docker", weight: 0.5 },
      { id: "NoSQL", weight: 0.5 },
      { id: "Cloud Services", weight: 0.5 },
    ],
    resources: {
      "Node.js": {
        platform: "Node.js Official Docs",
        url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
        duration: "6 weeks",
      },
      "REST APIs": {
        platform: "Postman Learning",
        url: "https://learning.postman.com/docs/introduction/overview/",
        duration: "1 week",
      },
      SQL: {
        platform: "SQLZoo",
        url: "https://sqlzoo.net/wiki/SQL_Tutorial",
        duration: "3 weeks",
      },
      Git: {
        platform: "GitHub Skills",
        url: "https://skills.github.com/",
        duration: "1 week",
      },
      Authentication: {
        platform: "Auth0 Docs",
        url: "https://auth0.com/docs/get-started",
        duration: "2 weeks",
      },
      "Data Structures": {
        platform: "CS50 on edX",
        url: "https://cs50.harvard.edu/x/2024/",
        duration: "8 weeks",
      },
      Docker: {
        platform: "Docker Official Docs",
        url: "https://docs.docker.com/get-started/",
        duration: "2 weeks",
      },
      "Cloud Services": {
        platform: "AWS Skill Builder",
        url: "https://skillbuilder.aws/",
        duration: "6 weeks",
      },
    },
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    level: "Entry",
    category: "Data & Analytics",
    description:
      "Analyse datasets to uncover insights, build reports, and support data-driven decision-making across the organisation.",
    required: [
      { id: "Python", weight: 2.0, label: "Critical" },
      { id: "SQL", weight: 2.0, label: "Critical" },
      { id: "Statistics", weight: 2.0, label: "Critical" },
      { id: "Data Visualization", weight: 1.5, label: "Important" },
      { id: "Excel", weight: 1.5, label: "Important" },
    ],
    nice: [
      { id: "Tableau", weight: 0.5 },
      { id: "Power BI", weight: 0.5 },
      { id: "Machine Learning", weight: 0.5 },
    ],
    resources: {
      Python: {
        platform: "Python.org Tutorial",
        url: "https://docs.python.org/3/tutorial/",
        duration: "4 weeks",
      },
      SQL: {
        platform: "Mode SQL Tutorial",
        url: "https://mode.com/sql-tutorial/",
        duration: "3 weeks",
      },
      Statistics: {
        platform: "Khan Academy Statistics",
        url: "https://www.khanacademy.org/math/statistics-probability",
        duration: "4 weeks",
      },
      "Data Visualization": {
        platform: "Matplotlib Tutorials",
        url: "https://matplotlib.org/stable/tutorials/index.html",
        duration: "2 weeks",
      },
      Excel: {
        platform: "Microsoft Excel Training",
        url: "https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb",
        duration: "2 weeks",
      },
      Tableau: {
        platform: "Tableau Training",
        url: "https://www.tableau.com/learn/training/20241",
        duration: "3 weeks",
      },
      "Power BI": {
        platform: "Microsoft Learn Power BI",
        url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi",
        duration: "3 weeks",
      },
      "Machine Learning": {
        platform: "Coursera ML Specialisation",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        duration: "3 months",
      },
    },
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    level: "Junior",
    category: "Design",
    description:
      "Design intuitive, accessible user experiences — from research and wireframes through to high-fidelity prototypes.",
    required: [
      { id: "Figma", weight: 2.0, label: "Critical" },
      { id: "Wireframing", weight: 2.0, label: "Critical" },
      { id: "Prototyping", weight: 1.5, label: "Important" },
      { id: "User Research", weight: 1.5, label: "Important" },
      { id: "Design Systems", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "HTML", weight: 0.5 },
      { id: "CSS", weight: 0.5 },
      { id: "Accessibility", weight: 0.5 },
    ],
    resources: {
      Figma: {
        platform: "Figma Learn",
        url: "https://help.figma.com/hc/en-us/categories/360002051613-Get-started",
        duration: "3 weeks",
      },
      Wireframing: {
        platform: "UX Matters",
        url: "https://www.uxmatters.com/mt/archives/2017/09/wireframing-in-ux-design.php",
        duration: "2 weeks",
      },
      Prototyping: {
        platform: "Figma Prototyping Guide",
        url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma",
        duration: "2 weeks",
      },
      "User Research": {
        platform: "Nielsen Norman Group",
        url: "https://www.nngroup.com/articles/which-ux-research-methods/",
        duration: "3 weeks",
      },
      "Design Systems": {
        platform: "Figma Design Systems Guide",
        url: "https://www.figma.com/best-practices/guide-to-design-systems/",
        duration: "2 weeks",
      },
      HTML: {
        platform: "MDN Web Docs",
        url: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
        duration: "2 weeks",
      },
      CSS: {
        platform: "CSS Tricks",
        url: "https://css-tricks.com/where-do-you-learn-html-css-in-2020/",
        duration: "3 weeks",
      },
      Accessibility: {
        platform: "web.dev Accessibility",
        url: "https://web.dev/learn/accessibility/",
        duration: "2 weeks",
      },
    },
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    level: "Entry",
    category: "DevOps & Infrastructure",
    description:
      "Build and manage infrastructure, automate deployment pipelines, and ensure system reliability and scalability.",
    required: [
      { id: "Linux", weight: 2.0, label: "Critical" },
      { id: "Docker", weight: 2.0, label: "Critical" },
      { id: "Git", weight: 1.5, label: "Important" },
      { id: "CI/CD", weight: 1.5, label: "Important" },
      { id: "Cloud Services", weight: 1.5, label: "Important" },
      { id: "Scripting", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "Kubernetes", weight: 0.5 },
      { id: "Python", weight: 0.5 },
    ],
    resources: {
      Linux: {
        platform: "Linux Journey",
        url: "https://linuxjourney.com/",
        duration: "4 weeks",
      },
      Docker: {
        platform: "Docker Official Docs",
        url: "https://docs.docker.com/get-started/",
        duration: "2 weeks",
      },
      Git: {
        platform: "GitHub Skills",
        url: "https://skills.github.com/",
        duration: "1 week",
      },
      "CI/CD": {
        platform: "GitHub Actions Quickstart",
        url: "https://docs.github.com/en/actions/writing-workflows/quickstart",
        duration: "2 weeks",
      },
      "Cloud Services": {
        platform: "AWS Skill Builder (Free)",
        url: "https://skillbuilder.aws/",
        duration: "6 weeks",
      },
      Scripting: {
        platform: "Shell Scripting Tutorial",
        url: "https://www.shellscript.sh/",
        duration: "2 weeks",
      },
      Kubernetes: {
        platform: "Kubernetes Official Docs",
        url: "https://kubernetes.io/docs/tutorials/",
        duration: "4 weeks",
      },
      Python: {
        platform: "Python.org Tutorial",
        url: "https://docs.python.org/3/tutorial/",
        duration: "4 weeks",
      },
    },
  },
  {
    id: "mobile-dev",
    title: "Mobile Developer",
    level: "Junior",
    category: "Mobile",
    description:
      "Develop cross-platform mobile applications for iOS and Android. Deliver responsive, native-feeling experiences.",
    required: [
      { id: "React Native", weight: 2.0, label: "Critical" },
      { id: "JavaScript", weight: 2.0, label: "Critical" },
      { id: "REST APIs", weight: 1.5, label: "Important" },
      { id: "Git", weight: 1.5, label: "Important" },
      { id: "Mobile UI", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "TypeScript", weight: 0.5 },
      { id: "Flutter", weight: 0.5 },
    ],
    resources: {
      "React Native": {
        platform: "React Native Official Docs",
        url: "https://reactnative.dev/docs/getting-started",
        duration: "6 weeks",
      },
      JavaScript: {
        platform: "The Odin Project",
        url: "https://www.theodinproject.com/paths/full-stack-javascript",
        duration: "3 months",
      },
      "REST APIs": {
        platform: "Postman Learning",
        url: "https://learning.postman.com/docs/introduction/overview/",
        duration: "1 week",
      },
      Git: {
        platform: "GitHub Skills",
        url: "https://skills.github.com/",
        duration: "1 week",
      },
      "Mobile UI": {
        platform: "React Native Style Docs",
        url: "https://reactnative.dev/docs/style",
        duration: "2 weeks",
      },
      TypeScript: {
        platform: "Total TypeScript",
        url: "https://www.totaltypescript.com/tutorials/beginners-typescript",
        duration: "3 weeks",
      },
      Flutter: {
        platform: "Flutter Official Codelabs",
        url: "https://docs.flutter.dev/get-started/codelab",
        duration: "6 weeks",
      },
    },
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    level: "Entry",
    category: "Cybersecurity",
    description:
      "Identify and mitigate security threats to protect organisational systems and data through monitoring, testing, and risk management.",
    required: [
      { id: "Networking", weight: 2.0, label: "Critical" },
      { id: "Linux", weight: 2.0, label: "Critical" },
      { id: "Security Fundamentals", weight: 2.0, label: "Critical" },
      { id: "Risk Assessment", weight: 1.5, label: "Important" },
      { id: "Penetration Testing", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "Python", weight: 0.5 },
      { id: "Cloud Services", weight: 0.5 },
    ],
    resources: {
      Networking: {
        platform: "Cisco Networking Academy",
        url: "https://www.netacad.com/courses/networking",
        duration: "6 weeks",
      },
      Linux: {
        platform: "Linux Journey",
        url: "https://linuxjourney.com/",
        duration: "4 weeks",
      },
      "Security Fundamentals": {
        platform: "Cybrary — Intro to Cybersecurity",
        url: "https://www.cybrary.it/course/intro-to-it-and-cybersecurity/",
        duration: "6 weeks",
      },
      "Risk Assessment": {
        platform: "NIST Cybersecurity Framework",
        url: "https://www.nist.gov/cyberframework/getting-started",
        duration: "3 weeks",
      },
      "Penetration Testing": {
        platform: "TryHackMe Beginner Path",
        url: "https://tryhackme.com/path/outline/beginner",
        duration: "8 weeks",
      },
      Python: {
        platform: "Python.org Tutorial",
        url: "https://docs.python.org/3/tutorial/",
        duration: "4 weeks",
      },
      "Cloud Services": {
        platform: "AWS Skill Builder (Free)",
        url: "https://skillbuilder.aws/",
        duration: "6 weeks",
      },
    },
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    level: "Junior",
    category: "Data & Analytics",
    description:
      "Build, train, and deploy ML models to solve real-world problems. Bring models from research into production systems.",
    required: [
      { id: "Python", weight: 2.0, label: "Critical" },
      { id: "Machine Learning", weight: 2.0, label: "Critical" },
      { id: "Statistics", weight: 2.0, label: "Critical" },
      { id: "Data Structures", weight: 1.5, label: "Important" },
      { id: "SQL", weight: 1.0, label: "Standard" },
    ],
    nice: [
      { id: "Cloud Services", weight: 0.5 },
      { id: "Docker", weight: 0.5 },
    ],
    resources: {
      Python: {
        platform: "Python.org Tutorial",
        url: "https://docs.python.org/3/tutorial/",
        duration: "4 weeks",
      },
      "Machine Learning": {
        platform: "Coursera ML Specialisation",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        duration: "3 months",
      },
      Statistics: {
        platform: "Khan Academy Statistics",
        url: "https://www.khanacademy.org/math/statistics-probability",
        duration: "4 weeks",
      },
      "Data Structures": {
        platform: "CS50 on edX",
        url: "https://cs50.harvard.edu/x/2024/",
        duration: "8 weeks",
      },
      SQL: {
        platform: "SQLZoo",
        url: "https://sqlzoo.net/wiki/SQL_Tutorial",
        duration: "3 weeks",
      },
      "Cloud Services": {
        platform: "AWS Skill Builder (Free)",
        url: "https://skillbuilder.aws/",
        duration: "6 weeks",
      },
      Docker: {
        platform: "Docker Official Docs",
        url: "https://docs.docker.com/get-started/",
        duration: "2 weeks",
      },
    },
  },
];

const SKILL_QUIZZES = {
  HTML: {
    passMark: 2,
    questions: [
      {
        q: "Which element defines the most important heading?",
        options: ["<h6>", "<heading>", "<h1>", "<header>"],
        answer: 2,
      },
      {
        q: "What does the 'alt' attribute on an <img> tag do?",
        options: [
          "Sets image alignment",
          "Provides alternative text for screen readers and broken images",
          "Defines image height",
          "Links to another page",
        ],
        answer: 1,
      },
      {
        q: "Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
      },
    ],
  },
  CSS: {
    passMark: 2,
    questions: [
      {
        q: "Which CSS property controls the text size?",
        options: ["text-size", "font-size", "text-style", "type-size"],
        answer: 1,
      },
      {
        q: "What does 'display: flex' do?",
        options: [
          "Hides the element",
          "Makes children arrange in a flexible row/column layout",
          "Makes the element full-width",
          "Adds a flex animation",
        ],
        answer: 1,
      },
      {
        q: "Which selector targets elements with class 'box'?",
        options: ["#box", "box", ".box", "*box"],
        answer: 2,
      },
    ],
  },
  JavaScript: {
    passMark: 2,
    questions: [
      {
        q: "Which keyword declares a block-scoped variable in modern JS?",
        options: ["var", "let", "set", "define"],
        answer: 1,
      },
      {
        q: "What does typeof null return?",
        options: ["'null'", "'undefined'", "'object'", "'number'"],
        answer: 2,
      },
      {
        q: "Which method creates a new array by calling a function on every element?",
        options: [".filter()", ".forEach()", ".map()", ".find()"],
        answer: 2,
      },
    ],
  },
  Python: {
    passMark: 2,
    questions: [
      {
        q: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fn", "define"],
        answer: 1,
      },
      {
        q: "What is the output of: print(type([]))?",
        options: [
          "<class 'tuple'>",
          "<class 'dict'>",
          "<class 'list'>",
          "<class 'array'>",
        ],
        answer: 2,
      },
      {
        q: "How do you start a comment in Python?",
        options: ["//", "/**/", "#", "--"],
        answer: 2,
      },
    ],
  },
  SQL: {
    passMark: 2,
    questions: [
      {
        q: "Which SQL clause filters rows after grouping?",
        options: ["WHERE", "FILTER", "HAVING", "ORDER BY"],
        answer: 2,
      },
      {
        q: "What does SELECT DISTINCT do?",
        options: [
          "Selects only NULL values",
          "Returns only unique rows",
          "Sorts alphabetically",
          "Joins two tables",
        ],
        answer: 1,
      },
      {
        q: "Which JOIN returns all rows from the left table plus matched rows from the right?",
        options: ["INNER JOIN", "RIGHT JOIN", "FULL JOIN", "LEFT JOIN"],
        answer: 3,
      },
    ],
  },
  Git: {
    passMark: 2,
    questions: [
      {
        q: "What does 'git clone' do?",
        options: [
          "Creates a new branch",
          "Copies a remote repository to your local machine",
          "Deletes a repository",
          "Merges two branches",
        ],
        answer: 1,
      },
      {
        q: "What command stages all changes for commit?",
        options: ["git push", "git add .", "git commit -m", "git stage all"],
        answer: 1,
      },
      {
        q: "What is a pull request used for?",
        options: [
          "Downloading new code from remote",
          "Proposing changes to be merged into a branch",
          "Reverting a commit",
          "Creating a new repository",
        ],
        answer: 1,
      },
    ],
  },
  React: {
    passMark: 2,
    questions: [
      {
        q: "Which hook manages state in a React function component?",
        options: ["useEffect", "useContext", "useState", "useRef"],
        answer: 2,
      },
      {
        q: "What is JSX?",
        options: [
          "A JavaScript testing library",
          "A syntax extension allowing HTML-like code in JavaScript",
          "A CSS framework",
          "A type system",
        ],
        answer: 1,
      },
      {
        q: "What does the 'key' prop on list items help React do?",
        options: [
          "Style the item",
          "Link to another component",
          "Efficiently identify which items changed during re-renders",
          "Pass data to children",
        ],
        answer: 2,
      },
    ],
  },
  "Node.js": {
    passMark: 2,
    questions: [
      {
        q: "Node.js runs JavaScript on which environment?",
        options: [
          "The browser DOM",
          "The server / backend",
          "Mobile devices only",
          "A virtual machine",
        ],
        answer: 1,
      },
      {
        q: "Which built-in module handles file system operations?",
        options: ["http", "path", "fs", "os"],
        answer: 2,
      },
      {
        q: "What is npm?",
        options: [
          "Node Performance Monitor",
          "Node Package Manager",
          "New Programming Method",
          "Network Protocol Module",
        ],
        answer: 1,
      },
    ],
  },
  Docker: {
    passMark: 2,
    questions: [
      {
        q: "What is a Docker container?",
        options: [
          "A virtual machine",
          "A lightweight, isolated runtime environment for an application",
          "A cloud server",
          "A CI/CD pipeline",
        ],
        answer: 1,
      },
      {
        q: "What file defines how a Docker image is built?",
        options: [
          "docker-compose.yml",
          "Dockerfile",
          ".dockerignore",
          "container.json",
        ],
        answer: 1,
      },
      {
        q: "Which command pulls an image from Docker Hub?",
        options: ["docker run", "docker fetch", "docker pull", "docker get"],
        answer: 2,
      },
    ],
  },
  Linux: {
    passMark: 2,
    questions: [
      {
        q: "Which command lists files in a directory?",
        options: ["dir", "list", "ls", "show"],
        answer: 2,
      },
      {
        q: "What does 'chmod 755 file.sh' do?",
        options: [
          "Deletes the file",
          "Sets read/write/execute for owner and read/execute for group/others",
          "Moves the file",
          "Renames the file",
        ],
        answer: 1,
      },
      {
        q: "Which command displays the current working directory?",
        options: ["dir", "pwd", "cwd", "path"],
        answer: 1,
      },
    ],
  },
  Statistics: {
    passMark: 2,
    questions: [
      {
        q: "Which measure of central tendency is most affected by outliers?",
        options: ["Median", "Mode", "Mean", "Range"],
        answer: 2,
      },
      {
        q: "A p-value of 0.03 at a 5% significance level means you should:",
        options: [
          "Fail to reject the null hypothesis",
          "Reject the null hypothesis",
          "Accept the alternative with certainty",
          "Collect more data",
        ],
        answer: 1,
      },
      {
        q: "What does a correlation coefficient of -0.9 indicate?",
        options: [
          "No relationship",
          "Weak positive relationship",
          "Strong negative relationship",
          "Perfect positive relationship",
        ],
        answer: 2,
      },
    ],
  },
  "Machine Learning": {
    passMark: 2,
    questions: [
      {
        q: "Which type of learning uses labelled training data?",
        options: [
          "Unsupervised Learning",
          "Reinforcement Learning",
          "Supervised Learning",
          "Semi-supervised Learning",
        ],
        answer: 2,
      },
      {
        q: "What is overfitting?",
        options: [
          "When a model fails to train",
          "When a model learns training data too well and generalises poorly",
          "When there is too little data",
          "When a model has too few parameters",
        ],
        answer: 1,
      },
      {
        q: "Which algorithm is commonly used for classification?",
        options: ["K-Means", "Linear Regression", "Random Forest", "PCA"],
        answer: 2,
      },
    ],
  },
  Figma: {
    passMark: 2,
    questions: [
      {
        q: "What are Figma Components used for?",
        options: [
          "Writing JavaScript",
          "Creating reusable UI elements updatable globally",
          "Exporting assets to PDF",
          "Managing team permissions",
        ],
        answer: 1,
      },
      {
        q: "Which Figma feature creates interactive click-through flows?",
        options: [
          "Auto Layout",
          "Prototyping",
          "Vector Networks",
          "Constraints",
        ],
        answer: 1,
      },
      {
        q: "What does Auto Layout do?",
        options: [
          "Selects font sizes automatically",
          "Creates frames that resize and rearrange contents dynamically",
          "Exports designs automatically",
          "Generates colour palettes",
        ],
        answer: 1,
      },
    ],
  },
  "Security Fundamentals": {
    passMark: 2,
    questions: [
      {
        q: "What does the CIA Triad stand for?",
        options: [
          "Code, Integration, Access",
          "Confidentiality, Integrity, Availability",
          "Control, Identity, Authentication",
          "Cyber, Intrusion, Analysis",
        ],
        answer: 1,
      },
      {
        q: "What is a phishing attack?",
        options: [
          "A denial-of-service attack",
          "Exploiting a software vulnerability",
          "Tricking users into revealing credentials via deceptive messages",
          "Intercepting network traffic",
        ],
        answer: 2,
      },
      {
        q: "What does a firewall do?",
        options: [
          "Encrypts hard drive data",
          "Monitors and controls incoming/outgoing network traffic based on rules",
          "Scans files for viruses",
          "Provides a VPN connection",
        ],
        answer: 1,
      },
    ],
  },
  Networking: {
    passMark: 2,
    questions: [
      {
        q: "What does IP stand for?",
        options: [
          "Internet Program",
          "Internal Protocol",
          "Internet Protocol",
          "Integrated Package",
        ],
        answer: 2,
      },
      {
        q: "Which OSI layer handles routing between networks?",
        options: [
          "Data Link (Layer 2)",
          "Network (Layer 3)",
          "Transport (Layer 4)",
          "Application (Layer 7)",
        ],
        answer: 1,
      },
      {
        q: "What is the purpose of DNS?",
        options: [
          "Encrypts web traffic",
          "Translates domain names to IP addresses",
          "Assigns IP addresses dynamically",
          "Routes packets between subnets",
        ],
        answer: 1,
      },
    ],
  },
};

const PROFICIENCY_LEVELS = [
  { id: 1, label: "Novice", desc: "Aware of concept, no practical experience" },
  {
    id: 2,
    label: "Beginner",
    desc: "Limited hands-on experience, learning basics",
  },
  {
    id: 3,
    label: "Intermediate",
    desc: "Can work independently on standard tasks",
  },
  {
    id: 4,
    label: "Advanced",
    desc: "Deep understanding, handles complex scenarios",
  },
  { id: 5, label: "Expert", desc: "Mastery — can teach others and innovate" },
];
