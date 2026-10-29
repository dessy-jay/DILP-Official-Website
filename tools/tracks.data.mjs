/* =========================================================================
   Track page content — the single source for the generated track pages.
   Edit here, then run:  node tools/build-site.mjs
   =========================================================================

   Content provenance
   ------------------
   Front-End Development, Graphic Design, AI & Automation and Data Analytics
   take their description, overview, outcomes, careers and curriculum straight
   from the official DILP curriculum PDFs. Their phases, capstone copy, tools,
   requirements and "good fit" lines are still drafted.

   The Cybersecurity track is transcribed from the Figma design
   (node 2012:9321). Back-End Development and Product Design are drafted
   throughout and need sign-off (see ../content/curriculum.md).

   Curriculum entries come in two shapes:
     [title, weeks, bullets]  drafted tracks, which assign week ranges
     [title, bullets]         PDF tracks, where the source gives no weeks

   Every track runs 12 weeks.                                               */

const PHASE_COPY = {
  foundations: 'Core concepts, tooling and the vocabulary of the field.',
  build: 'A real brief from a community organisation. You scope it and build it.',
  present: 'Show the work, take feedback and package your portfolio.',
};

/** Four phases across the 12 weeks. */
function phases(practiceCopy) {
  return [
    { weeks: 'Weeks 1–3', name: 'Foundations', body: PHASE_COPY.foundations },
    { weeks: 'Weeks 4–7', name: 'Practice', body: practiceCopy },
    { weeks: 'Weeks 8–10', name: 'Build', body: PHASE_COPY.build },
    { weeks: 'Weeks 11–12', name: 'Present', body: PHASE_COPY.present },
  ];
}

/** The "What you need to start" column is the same on every track. */
const REQUIREMENTS = [
  'No prior tech experience — we start from the fundamentals',
  'A laptop, or willingness to use a shared programme device',
  'Reliable availability for weekly sessions and mentor reviews',
  'A completed application before the cohort closes',
];

/** The last three "good fit" bullets are shared; the first is per-track. */
function goodFit(first) {
  return [
    first,
    'Can commit to 12 weeks of consistent, hands-on work',
    'Want proof of work, not just a certificate',
    'Are based in or able to travel to Bonny Island',
  ];
}

export const WEEKS = 12;

export const tracks = [
  /* ---------------------------------------------------------------- 1 */
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity & Digital Safety',
    shortName: 'Cybersecurity',
    chip: 'MOST APPLIED-TO TRACK',
    tag: 'CORE TRACK',
    tagClass: 'tag--core-green',
    image: 'track-featured.webp',
    imageAlt: 'DILP participants working through a lab session on laptops.',
    cardBlurb: 'Learn how attacks happen, then practise defending against them.',
    description:
      'Learn how attacks actually happen, then practise defending against them in supervised lab work. You finish by securing a system for a real community organisation.',
    outcomes: [
      ['Threat fundamentals', 'How common attacks work — phishing, malware, weak credentials and misconfiguration.'],
      ['Securing systems', 'Harden accounts, devices and networks using controls you can apply the same day.'],
      ['Monitoring & detection', 'Read logs, spot anomalies and recognise an incident before it spreads.'],
      ['Incident response', 'Contain, document and report an incident using a repeatable checklist.'],
      ['Safe practice & ethics', 'Handle data responsibly and understand the legal limits of security work.'],
      ['Capstone project', 'Assess and secure a live system for a real community organisation.'],
    ],
    phases: phases('Guided lab work with a mentor reviewing what you produce.'),
    curriculum: [
      ['How systems get broken into', 'Weeks 1–3', [
        'Read a network diagram and say where it is weakest',
        'Explain the common attack types in plain language',
        'Set up a lab you can safely break things in',
      ]],
      ['Identity, access and the human layer', 'Weeks 4–5', [
        'Configure accounts, passwords and MFA the way a small organisation actually can',
        'Run a phishing simulation and brief the people who clicked',
        'Write an access policy someone will follow',
      ]],
      ['Defending a live system', 'Weeks 6–8', [
        'Harden a server and a workstation from a known-bad baseline',
        'Read logs and spot the thing that does not belong',
        'Respond to an incident on a clock, with someone watching',
      ]],
      ['Digital safety for a community', 'Weeks 9–10', [
        'Audit an organisation’s exposure without touching anything you should not',
        'Teach a non-technical team what to do and what to stop doing',
        'Produce a findings report a director can act on',
      ]],
      ['Capstone: secure a real system', 'Weeks 11–12', [
        'Scope the work with the partner organisation',
        'Implement the fixes and verify they hold',
        'Hand over documentation and present what changed',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you run a security assessment on a live system, fix what you find, and hand over documentation the organisation can actually use. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Are curious about how systems break and how to protect them'),
    requirements: REQUIREMENTS,
    tools: ['Wireshark', 'Nmap', 'Kali Linux', 'Burp Suite', 'VirtualBox', 'Linux CLI', 'Password managers', 'Incident report templates'],
  },

  /* ---------------------------------------------------------------- 2 */
  {
    slug: 'front-end-development',
    name: 'Front-End Development',
    shortName: 'Front-End Development',
    chip: 'CORE TRACK',
    tag: 'CORE TRACK',
    tagClass: 'tag--core-blue',
    image: 'track-frontend-top.webp',
    imageAlt: 'DILP participants concentrating during a front-end session.',
    cardBlurb: 'Build the screens people actually use — responsive, accessible and fast.',
    description:
      'An intensive, hands-on track in building modern, responsive and user-friendly websites and web applications. You learn to turn ideas, designs and user needs into engaging digital experiences using HTML, CSS, JavaScript and React.',
    overview: [
      'The Front-End Development track is an intensive, hands-on course designed to equip learners with the skills needed to build modern, responsive and user-friendly websites and web applications.',
      'You learn how to translate ideas, designs and user needs into engaging digital experiences using industry-standard technologies such as HTML, CSS, JavaScript and React. The track takes you from beginner to job-ready in three months, combining technical training, design thinking, real-world projects and the practices used by professional development teams globally.',
    ],
    careers: ['Frontend Developer', 'UI Developer', 'Web Developer', 'JavaScript Engineer', 'React Developer'],
    outcomes: [
      ['Responsive, standards-based sites', 'Build responsive, accessible and standards-compliant websites using HTML5, CSS3 and modern JavaScript (ES6+).'],
      ['Dynamic React applications', 'Develop dynamic, interactive web applications using React.js.'],
      ['API integration', 'Consume and integrate APIs to connect front-end applications with back-end services.'],
      ['Version control and collaboration', 'Use Git and GitHub for version control and team collaboration.'],
      ['Deployment and maintenance', 'Deploy and maintain production-ready web applications using modern hosting platforms.'],
    ],
    phases: phases('Guided build work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Introduction to the Web', [
        'How the internet and web work',
        'Overview of web technologies',
        'Frontend vs backend roles',
      ]],
      ['HTML Fundamentals', [
        'Page structure, tags and attributes',
        'Links, lists and images',
      ]],
      ['Advanced HTML & Semantic Layout', [
        'Forms, tables and multimedia',
        'Semantic elements and accessibility',
      ]],
      ['CSS Basics', [
        'Selectors, colours and the box model',
        'Typography and inheritance',
      ]],
      ['Layout Techniques', [
        'Flexbox and grid systems',
        'Responsive layout strategies',
      ]],
      ['CSS Styling & Animations', [
        'Transitions and keyframes',
        'Custom fonts and UI design principles',
      ]],
      ['JavaScript Basics', [
        'Variables, data types and operators',
        'Conditionals, loops and functions',
      ]],
      ['DOM Manipulation & Events', [
        'Selecting and modifying elements',
        'Event handling and form validation',
      ]],
      ['ES6+ Features', [
        'let and const',
        'Arrow functions and destructuring',
        'Template literals and modules',
      ]],
      ['APIs & Asynchronous JavaScript', [
        'Fetch API, promises and async/await',
        'Working with JSON data',
      ]],
      ['Career Readiness & Next Steps', [
        'Git basics, branching and merging',
        'Collaboration on GitHub',
        'Hosting projects on GitHub',
      ]],
      ['Introduction to React', [
        'Components, props and state',
        'JSX and project setup',
      ]],
      ['React Routing & API Integration', [
        'React Router',
        'Fetching data from APIs',
      ]],
      ['Capstone Project', [
        'Build and deploy a complete front-end web app',
        'Apply all learned concepts in a real-world project',
        'Present and document the project for your portfolio and Demo Day',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you take a design or a rough idea, build the interface, test it on a low-end phone and a slow connection, and deploy it where the organisation can use it. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Like making things people can see, click and use'),
    requirements: REQUIREMENTS,
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Git & GitHub', 'Figma', 'Chrome DevTools', 'Netlify'],
  },

  /* ---------------------------------------------------------------- 3 */
  {
    slug: 'back-end-development',
    name: 'Back-End Development',
    shortName: 'Back-End Development',
    chip: 'CORE TRACK',
    tag: 'CORE TRACK',
    tagClass: 'tag--core-green',
    image: 'track-backend-top.webp',
    imageAlt: 'A DILP participant presenting during a back-end session.',
    cardBlurb: 'Build the logic, data and APIs that keep an application running.',
    description:
      'Build the logic, data and APIs that keep an application running. You finish by building the back end for a real community organisation.',
    outcomes: [
      ['Programming foundations', 'Functions, data structures and tests you can actually run.'],
      ['Databases', 'Model a problem as tables and relationships, then query it for a real answer.'],
      ['APIs', 'Design endpoints another developer can use without having to ask you.'],
      ['Auth and validation', 'Authenticate requests, check input, and return errors that help.'],
      ['Deployment and operations', 'Put it on a server, keep it up, and find the slow query.'],
      ['Capstone project', 'Build and document the back end of a tool a real organisation needs.'],
    ],
    phases: phases('Guided build work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Programming foundations', 'Weeks 1–3', [
        'Write functions and data structures you can test',
        'Use git without fear',
        'Read someone else’s code and change it safely',
      ]],
      ['Data and storage', 'Weeks 4–5', [
        'Model a problem as tables and relationships',
        'Write queries that answer a real question',
        'Change a schema without losing data',
      ]],
      ['APIs', 'Weeks 6–8', [
        'Design endpoints another developer can use without asking you',
        'Authenticate and authorise requests',
        'Validate input and return errors that help',
      ]],
      ['Running it in the real world', 'Weeks 9–10', [
        'Deploy to a server and keep it up',
        'Log, monitor, and find the slow query',
        'Handle secrets and backups like someone will audit you',
      ]],
      ['Capstone: the system behind the service', 'Weeks 11–12', [
        'Build the back end for a partner organisation’s tool',
        'Document it for whoever maintains it next',
        'Present the architecture and the trade-offs you made',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you build the services and data behind a tool a real organisation needs, deploy it, and document it well enough that the next person can maintain it. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Would rather understand how the thing works than how it looks'),
    requirements: REQUIREMENTS,
    tools: ['Python', 'PostgreSQL', 'Git & GitHub', 'Postman', 'Docker', 'Linux CLI', 'REST APIs', 'Render'],
  },

  /* ---------------------------------------------------------------- 4 */
  {
    slug: 'product-design',
    name: 'Product Design',
    shortName: 'Product Design',
    chip: 'DESIGN TRACK',
    tag: 'DESIGN TRACK',
    tagClass: 'tag--design',
    image: 'track-design-top.webp',
    imageAlt: 'DILP participants collaborating around laptops in a design session.',
    cardBlurb: 'Research a real problem, then design the solution end to end.',
    description:
      'Research a real problem, then design the solution end to end. You finish by designing and testing a product for a real community organisation.',
    outcomes: [
      ['Research', 'Interview people without leading them, and turn the notes into a problem worth solving.'],
      ['Flows and structure', 'Map what a person actually does, end to end, before drawing a single screen.'],
      ['Interface craft', 'Type, colour and spacing systems — and the states nobody remembers to design.'],
      ['Prototyping and testing', 'Put something clickable in front of a user and change it when they struggle.'],
      ['Handoff', 'Specifications a developer can build from without guessing.'],
      ['Capstone project', 'Research, design and test a solution for a real community organisation.'],
    ],
    phases: phases('Guided studio work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Finding the real problem', 'Weeks 1–3', [
        'Interview people without leading them',
        'Turn messy notes into a problem statement',
        'Say clearly what you are not solving',
      ]],
      ['Structure before surface', 'Weeks 4–5', [
        'Map the flow a person takes end to end',
        'Wireframe fast, and throw work away',
        'Test an idea before it is pretty',
      ]],
      ['Interface craft', 'Weeks 6–8', [
        'Build a type, colour and spacing system and stick to it',
        'Design the empty, loading and error states, not just the happy one',
        'Make a prototype people can actually click',
      ]],
      ['Designing with constraints', 'Weeks 9–10', [
        'Design for a low-end phone and a bad connection',
        'Meet accessibility requirements by default',
        'Hand off to a developer so they do not have to guess',
      ]],
      ['Capstone: design it end to end', 'Weeks 11–12', [
        'Research, design and test a solution for a real organisation',
        'Defend your decisions with evidence',
        'Present to the people who will use it',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you research the problem with the people who have it, design the solution, test it with them, and hand a developer something they can build. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Notice when something is badly made and want to know why'),
    requirements: REQUIREMENTS,
    tools: ['Figma', 'FigJam', 'Maze', 'Google Forms', 'Notion', 'Pen & paper', 'Contrast checkers', 'Design tokens'],
  },

  /* ---------------------------------------------------------------- 5 */
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    shortName: 'Graphic Design',
    chip: 'DESIGN TRACK',
    tag: 'DESIGN TRACK',
    tagClass: 'tag--design',
    image: 'gallery-6.webp',
    imageAlt: 'A DILP participant setting up a presentation in the training room.',
    cardBlurb: 'Make the identity, layouts and campaign work an organisation runs on.',
    description:
      'A hands-on introduction to graphic design fundamentals, visual storytelling and brand communication. You progress from basic design principles to professional-quality digital and print work.',
    overview: [
      'This hands-on track introduces learners to graphic design fundamentals, visual storytelling and brand communication. Participants progress from understanding basic design principles to producing professional-quality digital and print designs.',
      'Over three months, learners work on practical design tasks, collaborative challenges and a final capstone project aligned with real community or business needs.',
    ],
    careers: ['Graphics Designer', 'Visual Communication Assistant', 'Brand & Media Designer', 'Social Media Designer', 'Creative Support Officer', 'Freelance Designer'],
    outcomes: [
      ['Visual communication', 'Communicate ideas clearly through visual design.'],
      ['CorelDRAW and Canva', 'Create professional graphics using CorelDRAW and Canva.'],
      ['Branding and content assets', 'Design branding, marketing and digital content assets.'],
      ['Design principles in practice', 'Apply design principles to real-world problems.'],
      ['Creative collaboration', 'Work collaboratively on creative projects.'],
      ['A professional portfolio', 'Build and present a professional design portfolio.'],
    ],
    phases: phases('Guided studio work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Foundations of Graphic Design', [
        'What is graphic design?',
        'The role of design in business and innovation',
        'Understanding visual communication',
        'Introduction to CorelDRAW and Canva',
      ]],
      ['Design Principles & Visual Storytelling', [
        'Elements and principles of design',
        'Layout, balance, contrast and hierarchy',
        'Visual storytelling for impact',
        'Designing for different audiences',
      ]],
      ['Typography & Color for Brand Communication', [
        'Typography basics and font pairing',
        'Readability and visual hierarchy',
        'Colour theory and psychology',
        'Creating brand colour systems',
      ]],
      ['CorelDRAW Essentials', [
        'The CorelDRAW interface and tools',
        'Shapes, text, alignment and layers',
        'Image importing and editing',
        'Layout composition',
      ]],
      ['CorelDRAW for Branding & Print', [
        'Logo design fundamentals',
        'Business cards and stationery',
        'Banners, posters and print layouts',
        'Preparing files for print',
      ]],
      ['Canva for Digital & Social Media Design', [
        'The Canva workspace and templates',
        'Social media and marketing designs',
        'Presentations and campaign materials',
        'Brand kits and consistency',
      ]],
      ['Branding & Visual Identity Systems', [
        'What is branding?',
        'Visual identity systems',
        'Consistency across digital platforms',
        'Brand storytelling',
      ]],
      ['Designing for Digital Platforms', [
        'Designing for social media platforms',
        'Image sizes and platform standards',
        'Visuals for engagement and conversion',
        'Mobile-first design thinking',
      ]],
      ['Print Design & Production', [
        'Print vs digital design',
        'File formats and colour modes',
        'Working with printers',
        'Quality control',
      ]],
      ['Creative Workflow & Collaboration', [
        'Understanding design briefs',
        'Research, ideation and concept development',
        'Feedback, iteration and improvement',
        'Team collaboration',
      ]],
      ['Career Readiness & Personal Branding', [
        'Building a design portfolio',
        'Presenting design work',
        'Freelancing and career pathways',
        'Professional ethics',
      ]],
      ['DILP Capstone Project', [
        'Design a complete visual solution for a startup, a business or a community initiative',
        'Include a logo plus marketing and social media designs',
        'Present the project at DILP Demo Day',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you design the identity a community organisation will actually use — the mark, the palette, the type and the templates — and hand over files they can keep working with. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Notice bad spacing, crooked layouts and ugly posters'),
    requirements: REQUIREMENTS,
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Canva', 'Colour theory', 'Type pairing', 'Print specs', 'Brand guidelines'],
  },

  /* ---------------------------------------------------------------- 6 */
  {
    slug: 'ai-and-automation',
    name: 'AI & Automation',
    shortName: 'AI & Automation',
    chip: 'CORE TRACK',
    tag: 'DATA TRACK',
    tagClass: 'tag--data',
    image: 'gallery-1.webp',
    imageAlt: 'A speaker presenting at a DILP session.',
    cardBlurb: 'Put AI to work on real tasks, and automate the ones done by hand.',
    description:
      'Practical, no-code skills to design, build and deploy AI-powered automation systems using visual tools and platforms, without writing a single line of code.',
    overview: [
      'This track equips learners with practical, no-code skills to design, build and deploy AI-powered automation systems using visual tools and platforms, without writing a single line of code.',
      'Participants learn how to apply AI tools, build intelligent workflows, create chatbots and AI agents, and automate real business processes using no-code platforms such as ChatGPT, Make, n8n and ManyChat. The track is beginner-friendly, hands-on and portfolio-driven.',
    ],
    careers: ['AI Automation Specialist', 'Business Process Automation Consultant', 'No-Code AI Developer', 'AI Product Manager', 'Intelligent Systems Analyst'],
    outcomes: [
      ['AI and automation principles', 'Understand the core principles of artificial intelligence, machine learning and automation.'],
      ['No-code workflows', 'Build simple automation workflows using no-code and low-code tools such as Zapier, Make, n8n and the ChatGPT API.'],
      ['AI for business', 'Apply AI tools for business operations, marketing, analytics and productivity enhancement.'],
      ['End-to-end integration', 'Integrate AI tools into end-to-end workflows.'],
      ['Automation-driven solutions', 'Design and deploy automation-driven solutions that improve efficiency and decision-making.'],
      ['Responsible use of AI', 'Apply ethical and responsible AI practices.'],
    ],
    phases: phases('Guided build work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Introduction to Artificial Intelligence', [
        'What AI is (and what it is not)',
        'A brief history and evolution of AI',
        'Types of AI: narrow AI, generative AI, assistive AI',
        'AI capabilities and limitations',
        'Real-world AI use cases across industries',
      ]],
      ['Generative AI Fundamentals', [
        'How generative AI produces outputs, in plain language',
        'Text, image and data AI tools',
        'Strengths, limitations and reliability',
        'Common failure patterns and how to handle them',
        'Practical use cases: writing, research, brainstorming, analysis',
      ]],
      ['Prompt Engineering Fundamentals', [
        'What is prompt engineering?',
        'How AI interprets instructions',
        'Prompt structures: role, context, task, output',
        'Prompt testing and refinement',
        'Common prompting mistakes',
      ]],
      ['AI for Productivity, Business & Creativity', [
        'AI for personal productivity',
        'AI for business operations and decision-making',
        'AI for content, communication and creativity',
        'Identifying high-impact AI opportunities',
        'Human-in-the-loop workflows',
      ]],
      ['Introduction to Automation', [
        'What is automation?',
        'Types of automation: task, process, intelligent',
        'Overview of no-code automation platforms',
        'Relationships and advanced data structures',
        'Visual data mapping (tables, records, fields)',
      ]],
      ['Building No-Code Automated Workflows', [
        'Designing simple automation workflows',
        'Connecting apps and tools without code',
        'Automating emails, forms, notifications and file management',
        'Testing and improving automated processes',
      ]],
      ['Workflow Design & Best Practices', [
        'Automation planning and scoping',
        'Workflow documentation',
        'Naming, structure and maintainability',
        'Scaling no-code workflows',
        'Common business automation patterns',
      ]],
      ['Chatbot Development & Implementation', [
        'What chatbots are and where they add value',
        'Designing chatbot conversations',
        'No-code chatbot platforms: Chatbase, Voiceflow, ManyChat, n8n',
        'Knowledge bases and FAQ bots',
        'Advanced features: memory, fallback, escalation',
      ]],
      ['AI Agents & Agentic Systems', [
        'Understanding AI agents and their types',
        'What AI agents are, explained non-technically',
        'Task-based vs conversational agents',
        'Agent capabilities: memory, tools, decision steps',
        'No-code agent platforms: n8n, Relevance AI, Flowise, Lindy',
        'Human oversight and safety',
      ]],
      ['AI + Automation Integration', [
        'Combining AI tools with automation platforms',
        'Automating AI outputs into workflows',
        'Customer support, content and operations pipelines',
        'Designing intelligent business processes',
        'Exercise: design an AI agent workflow and build a no-code AI agent system',
      ]],
      ['Productivity Systems & Personal Automation', [
        'AI for time management and task prioritisation',
        'Automating personal workflows',
        'Building smart daily, weekly and project systems',
        'Reducing manual work and cognitive load with AI',
      ]],
      ['Ethics, Governance & Responsible Use of AI', [
        'AI ethics and bias',
        'Governance and accountability',
        'Data privacy and security',
        'Safe and responsible AI use',
      ]],
      ['Career Readiness & Professional Application', [
        'Positioning yourself as an AI and automation professional',
        'Building a portfolio of AI and automation use cases',
        'Communicating AI value to teams and organisations',
        'Preparing for AI-driven roles and opportunities',
      ]],
      ['Capstone Project', [
        'Design and build a complete AI-powered automation system',
        'Solve a real-world problem',
        'Document workflows, prompts and impact',
        'Present at Demo Day',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you find the task somebody does by hand every week, automate it, and hand over something that keeps running after you leave. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Keep thinking there must be a faster way to do this'),
    requirements: REQUIREMENTS,
    tools: ['ChatGPT', 'Claude', 'Python', 'n8n', 'Zapier', 'APIs', 'Google Sheets', 'Prompt patterns'],
  },

  /* ---------------------------------------------------------------- 7 */
  {
    slug: 'data-analytics',
    name: 'Data Analytics',
    shortName: 'Data Analytics',
    chip: 'DATA TRACK',
    tag: 'DATA TRACK',
    tagClass: 'tag--data',
    image: 'track-data-top.webp',
    imageAlt: 'A facilitator at a whiteboard during a data analytics class.',
    cardBlurb: 'Turn messy data into answers a decision-maker can act on.',
    description:
      'Turn data into actionable insights that drive smarter decisions. You learn to collect, clean, analyse and visualise data using the tools trusted by leading organisations, with no prior experience required.',
    overview: [
      'The Data Analytics track is designed to help you master the art of turning data into actionable insights that drive smarter business decisions.',
      'Through a combination of theory, tools and hands-on projects, you learn how to collect, clean, analyse and visualise data effectively, using the same tools and techniques trusted by leading organisations. The track is beginner-friendly, requires no prior experience, and prepares you for high-demand roles in data analytics, business intelligence and strategy.',
    ],
    careers: ['Data Analyst', 'Business Intelligence Analyst', 'Data Visualization Specialist', 'Operations Data Analyst', 'Junior Data Scientist'],
    outcomes: [
      ['Principles of analytics', 'Understand the key principles of data analytics and how data informs decision-making.'],
      ['Excel and Power BI', 'Use tools like Excel and Power BI to analyse, clean and visualise datasets.'],
      ['Data storytelling', 'Communicate findings effectively through data storytelling and dashboards.'],
      ['Real-world problem solving', 'Apply real-world analytics techniques to solve business and organisational problems.'],
    ],
    phases: phases('Guided analysis work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Introduction to Data Analysis', [
        'What data analysis is and why it matters',
        'The process of data analysis',
        'Data analyst roles, skills and career paths',
        'Exercise: identify how data is used in a business you admire',
      ]],
      ['Understanding the Data Landscape', [
        'Data sources: databases, files, APIs and online platforms',
        'Structured vs unstructured data',
        'The data analysis workflow: collect, clean, analyse, visualise, report',
        'Exercise: research a dataset relevant to your field of interest',
      ]],
      ['Core Analytical Skills & Foundations', [
        'Technical skills: Excel formulas, syntax and the Power BI interface',
        'Analytical thinking: asking the right questions and interpreting data',
        'Soft skills: communication, storytelling with data, attention to detail',
      ]],
      ['Mastering Excel for Data Analysis', [
        'Data cleaning, formatting and transformation',
        'Advanced formulas (VLOOKUP, INDEX-MATCH, IF, SUMIFS and more)',
        'Pivot tables and charts',
        'Exercise: analyse sales data and generate insights',
      ]],
      ['Power BI for Visualization & Dashboards', [
        'Introduction to the Power BI interface',
        'Connecting and transforming data with Power Query',
        'Building data models and relationships',
        'Creating interactive dashboards and reports',
        'Exercise: build a Power BI dashboard for a sample business',
      ]],
      ['Practical Data Projects', [
        'End-to-end data analysis using Excel and Power BI',
        'Real-world project simulation',
        'Assignment: present your final project dashboard',
      ]],
      ['SQL for Data Querying & Insights', [
        'Understanding databases and relationships',
        'Basic SQL syntax (SELECT, WHERE, ORDER BY, GROUP BY)',
        'Exercise: write SQL queries to extract insights from a sample database',
      ]],
      ['Analyzing Data with AI', [
        'Introduction to AI tools for analysts (ChatGPT, Copilot)',
        'Using AI for data cleaning, summarisation and reporting',
        'Integrating AI into Power BI and Excel workflows',
        'Exercise: use AI to automate part of your analysis process',
      ]],
      ['Building Your Portfolio & Resume', [
        'Structuring your data analysis portfolio',
        'Resume templates for data roles',
        'Exercise: upload one finished project to your portfolio',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you scope a question with the organisation, do the analysis, sanity-check it against what they already know, and present findings they can act on. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Want to know whether something is actually true, not just plausible'),
    requirements: REQUIREMENTS,
    tools: ['Excel', 'SQL', 'Python', 'pandas', 'Power BI', 'Google Sheets', 'Jupyter', 'Data storytelling'],
  },

  /* ---------------------------------------------------------------- 8 */
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    shortName: 'Social Media Marketing',
    chip: 'MEDIA TRACK',
    tag: 'MEDIA TRACK',
    tagClass: 'tag--media',
    image: 'gallery-7.webp',
    imageAlt: 'A DILP participant presenting to the room with a phone in hand.',
    cardBlurb: 'Build a brand people follow — strategy, content and campaigns that convert.',
    description:
      'Build powerful digital brands and drive measurable growth. You learn to craft brand narratives, produce high-performing video and visual content, run data-driven campaigns and turn audiences into communities.',
    overview: [
      'The Social Media Marketing & Content Creation track is designed to equip you with the strategic, creative and analytical skills needed to build powerful digital brands and drive measurable growth.',
      'This track goes beyond posting content. You learn how to craft compelling brand narratives, produce high-performing visual and video content, execute data-driven campaigns, and turn audiences into loyal communities and customers. This is where creativity meets strategy, and storytelling meets performance.',
    ],
    careers: ['Social Media Manager', 'Content Creator', 'Content Strategist', 'Community Manager', 'Digital Marketing Executive', 'Influencer Marketing Specialist'],
    outcomes: [
      ['Social media strategy', 'Develop and execute comprehensive social media strategies for businesses and personal brands.'],
      ['Content production', 'Plan, script, create and edit engaging content — short-form video, carousels, reels and brand visuals.'],
      ['Content calendars', 'Build and manage content calendars aligned with business goals.'],
      ['Analytics and ROI', 'Use analytics and insights to measure ROI, audience growth, engagement and conversion.'],
      ['Brand voice and targeting', 'Build brand voice, positioning and audience targeting strategies.'],
      ['Organic growth', 'Leverage trends, storytelling and platform algorithms for organic growth.'],
    ],
    phases: phases('Guided campaign work with a mentor reviewing what you publish.'),
    curriculum: [
      ['Introduction to Social Media Marketing', [
        'The evolution of social media and its impact on business',
        'Understanding platforms and audience behaviour',
        'The marketing funnel and social media touchpoints',
        'Organic vs paid social: how they work together',
        'Key metrics: reach, engagement, conversion, retention',
      ]],
      ['Social Media Strategy & Planning', [
        'Creating content calendars and campaign roadmaps',
        'Building brand tone, messaging and identity',
        'Tools for scheduling and collaboration (Buffer, Hootsuite, Notion)',
      ]],
      ['Introduction to the Creator Economy', [
        'Introduction to content creation',
        'Understanding today’s creator ecosystem and digital influence',
        'Creator business models: personal brand, faceless brand, niche expert, educator, entertainer',
        'The difference between a content creator, an influencer and an entrepreneur',
        'Finding your niche and purpose as a creator',
      ]],
      ['Content Strategy, Creative Development & Storytelling', [
        'Storytelling frameworks and content pillars',
        'Balancing education, entertainment and engagement',
        'Designing for visual impact',
        'Writing engaging captions and calls to action',
        'Trends, reels and viral content strategies',
        'Tools: Canva, CapCut, ChatGPT',
      ]],
      ['Content Creation & Production Skills', [
        'Content planning, scripting and storytelling',
        'Balancing value-driven content: educational, inspirational, entertaining',
        'Shooting professional video on a phone or camera',
        'Lighting, framing and audio techniques for all budgets',
        'Editing for speed and engagement with CapCut, VN, Canva and Descript',
        'Batch creation and time management for consistency',
      ]],
      ['Platform Strategy & Community Growth', [
        'Building and nurturing online communities',
        'Instagram and TikTok: short-form storytelling and trends',
        'LinkedIn: B2B authority and thought leadership',
        'YouTube: long-form content, SEO and monetisation',
        'X (Twitter): conversation marketing and real-time engagement',
        'Managing DMs, feedback and user-generated content',
      ]],
      ['Paid Advertising & Performance Marketing', [
        'Understanding paid social campaign structure and objectives',
        'Running ad campaigns on Meta, TikTok and LinkedIn',
        'Targeting, budgeting and A/B testing',
        'Audience targeting, lookalike audiences and retargeting',
        'Understanding ad metrics and reporting (CPC, CTR, ROAS, CPM)',
      ]],
      ['Analytics, Growth & Community Management', [
        'Tracking performance using native insights and Google Analytics',
        'Managing online communities and handling feedback',
        'Building brand loyalty and influencer collaborations',
      ]],
      ['Influencer Marketing, Collaboration & B2B Social Media', [
        'Identifying and partnering with influencers and creators',
        'How to build influencer contracts, briefs and deliverables',
        'B2B social media strategies for LinkedIn and YouTube',
        'Employer branding and thought leadership',
        'Measuring campaign ROI and brand lift',
        'Personal branding as a social media professional',
      ]],
      ['Capstone Project', [
        'Develop a complete 360° social media campaign for a brand or personal project',
        'Define objectives, create content calendars, set up ad campaigns and report on results',
        'Build sample posts, video scripts and engagement plans',
        'Present your growth roadmap and personal creator portfolio',
        'Build your professional portfolio: case study and content samples',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you plan and run a full social campaign — objectives, content calendar, the posts and video themselves, and a paid push — then report on what it actually moved. It goes in your portfolio, and it is the work we introduce you with.',
    goodFit: goodFit('Like telling a brand’s story and watching an audience grow'),
    requirements: REQUIREMENTS,
    tools: ['Canva', 'CapCut', 'ChatGPT', 'Buffer', 'Notion', 'Meta Ads Manager', 'Google Analytics', 'Descript'],
  },
];
