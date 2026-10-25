/* =========================================================================
   Track page content — the single source for the generated track pages.
   Edit here, then run:  node tools/build-tracks.mjs
   =========================================================================

   Content provenance
   ------------------
   The Cybersecurity track is transcribed from the Figma design
   (node 2012:9321). Everything for the other tracks — outcomes, capstone
   copy, tools, the "good fit" line — is drafted to the same shape and needs
   sign-off. The curriculum modules on every track are drafted
   (see ../content/curriculum.md).

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
      'Build the screens people actually use — responsive, accessible and fast. You finish by shipping a front end for a real community organisation.',
    outcomes: [
      ['Structure and style', 'Semantic HTML and CSS that still makes sense when someone else opens it.'],
      ['Responsive layout', 'One build that holds up from a 320px phone to a desktop monitor.'],
      ['JavaScript in the browser', 'Handle events, state and data — and recover when a request fails.'],
      ['Components and routing', 'Break a design into reusable parts and ship a multi-screen app.'],
      ['Accessibility and speed', 'Keyboard, screen reader, contrast and load time treated as requirements.'],
      ['Capstone project', 'Build and deploy the front end of a tool a real organisation asked for.'],
    ],
    phases: phases('Guided build work with a mentor reviewing what you produce.'),
    curriculum: [
      ['The web, properly', 'Weeks 1–3', [
        'Write semantic HTML and CSS you can still read in a month',
        'Build a layout that holds up from a 320px phone to a desktop monitor',
        'Use browser dev tools to find out why something moved',
      ]],
      ['JavaScript that does something', 'Weeks 4–5', [
        'Handle events, state and data without reaching for a framework',
        'Call an API and deal with it failing',
        'Debug from the error message rather than by guessing',
      ]],
      ['Components and frameworks', 'Weeks 6–8', [
        'Break a design into components that get reused',
        'Manage state across a screen without it becoming a knot',
        'Ship a multi-screen app with routing',
      ]],
      ['Accessible and fast', 'Weeks 9–10', [
        'Make it work with a keyboard and with a screen reader',
        'Measure load performance, then actually improve it',
        'Meet a contrast and focus standard rather than guessing at one',
      ]],
      ['Capstone: build and ship', 'Weeks 11–12', [
        'Take a real brief from a community organisation',
        'Build, test and deploy the front end',
        'Present it and hand over the code',
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
      'Make the identity, layouts and campaign work an organisation runs on. You finish by designing a full visual identity for a real community organisation.',
    outcomes: [
      ['Design fundamentals', 'Composition, hierarchy and the grid that holds a layout together.'],
      ['Typography', 'Choose and pair type, then set it so people actually read it.'],
      ['Colour and brand', 'Build a palette and the rules that keep it consistent everywhere.'],
      ['Layout and print', 'Design a poster, a flyer and a feed post without starting over each time.'],
      ['Working to a brief', 'Take notes from a client and come back with options, not guesses.'],
      ['Capstone project', 'Design a full visual identity for a real community organisation.'],
    ],
    phases: phases('Guided studio work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Seeing like a designer', 'Weeks 1–3', [
        'Compose a layout that leads the eye where you want it',
        'Use a grid, and know when to break it',
        'Critique work without saying "I like it"',
      ]],
      ['Type that reads', 'Weeks 4–5', [
        'Pair typefaces with a reason you can defend',
        'Set body text people actually finish',
        'Fix the spacing problems you could not see before',
      ]],
      ['Colour and identity', 'Weeks 6–8', [
        'Build a palette that works in print and on a screen',
        'Design a mark that survives being shrunk',
        'Write the rules so someone else stays on brand',
      ]],
      ['From brief to artwork', 'Weeks 9–10', [
        'Turn a vague client request into a brief',
        'Produce three options instead of one',
        'Prepare files that print without surprises',
      ]],
      ['Capstone: a full identity', 'Weeks 11–12', [
        'Design the identity for a partner organisation',
        'Package the mark, palette, type and templates',
        'Present the system and hand over the files',
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
      'Put AI tools to work on real tasks, and automate the ones nobody should be doing by hand. You finish by shipping a working automation for a real community organisation.',
    outcomes: [
      ['How these tools work', 'What a model can and cannot do, explained in plain language.'],
      ['Prompting with intent', 'Get a useful answer on the second try, not the tenth.'],
      ['Automating real work', 'Connect tools so a manual, repeated task runs itself.'],
      ['Building with AI', 'Add a model to something you built, and handle it getting things wrong.'],
      ['Judgement and ethics', 'Know when not to use it, and what never to put into it.'],
      ['Capstone project', 'Ship an automation that saves a real organisation real hours.'],
    ],
    phases: phases('Guided build work with a mentor reviewing what you produce.'),
    curriculum: [
      ['What these tools actually do', 'Weeks 1–3', [
        'Explain in plain language what a model is doing',
        'Say where it will be confidently wrong',
        'Pick the right tool for a task instead of the loudest one',
      ]],
      ['Getting useful output', 'Weeks 4–5', [
        'Write prompts that produce work you can actually use',
        'Give a model context without drowning it',
        'Check output rather than trusting it',
      ]],
      ['Automating the boring part', 'Weeks 6–8', [
        'Map a manual process end to end',
        'Connect tools so the process runs without you',
        'Handle the step that fails at two in the morning',
      ]],
      ['Building something with a model in it', 'Weeks 9–10', [
        'Call an AI API from your own project',
        'Design for the times it gets things wrong',
        'Keep cost and data under control',
      ]],
      ['Capstone: automate real work', 'Weeks 11–12', [
        'Find the task an organisation does by hand every week',
        'Build and test the automation with them',
        'Hand it over with instructions they can follow',
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
      'Turn messy data into answers a decision-maker can act on. You finish by answering a real question for a real community organisation.',
    outcomes: [
      ['Clean data', 'Spot the rows that will ruin your answer, and document what you changed.'],
      ['Querying', 'Write SQL that answers a question someone asked in words.'],
      ['Analysis', 'Choose a summary that does not mislead, and test whether a difference is real.'],
      ['Visualisation', 'Charts that make the point in one look, not in three paragraphs.'],
      ['Communicating findings', 'Brief a decision-maker in five minutes, without the jargon.'],
      ['Capstone project', 'Answer a real question for a real community organisation, with a recommendation.'],
    ],
    phases: phases('Guided analysis work with a mentor reviewing what you produce.'),
    curriculum: [
      ['Getting to clean data', 'Weeks 1–3', [
        'Work a spreadsheet properly before reaching for anything heavier',
        'Spot the rows that will ruin your answer',
        'Document what you changed and why',
      ]],
      ['Querying and shaping', 'Weeks 4–5', [
        'Write SQL that answers a question asked in words',
        'Join data from more than one source',
        'Automate a step you have now done three times',
      ]],
      ['Analysis that holds up', 'Weeks 6–8', [
        'Choose a summary that does not mislead',
        'Test whether a difference is real',
        'Say what the data cannot tell you',
      ]],
      ['Showing the answer', 'Weeks 9–10', [
        'Build a chart that makes the point in one look',
        'Assemble a dashboard someone will check weekly',
        'Brief a decision-maker in five minutes',
      ]],
      ['Capstone: answer a real question', 'Weeks 11–12', [
        'Scope the question with a partner organisation',
        'Do the analysis, then sanity-check it',
        'Present the findings and a recommendation',
      ]],
    ],
    capstone:
      'Every track ends the same way: a real brief from a real organisation. On this track you scope a question with the organisation, do the analysis, sanity-check it against what they already know, and present findings they can act on. It goes in your portfolio — and it is the work we introduce you with.',
    goodFit: goodFit('Want to know whether something is actually true, not just plausible'),
    requirements: REQUIREMENTS,
    tools: ['Excel', 'SQL', 'Python', 'pandas', 'Power BI', 'Google Sheets', 'Jupyter', 'Data storytelling'],
  },
];
