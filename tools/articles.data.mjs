/* =========================================================================
   DILP Wednesdays — leadership articles.
   Transcribed from the Figma designs (hub 2097:14720, article 2097:14979).
   The library status and publishing-note lines are written to match the
   design's voice; everything else is the designed copy.
   ========================================================================= */

export const articles = [
  {
    slug: 'listen-first-lead-better',
    topic: 'Communication',
    readTime: '7 min read',
    title: 'Listen first. Lead better.',
    summary: 'Build trust by listening to understand, not just waiting for your turn to speak.',
    image: 'article-card-a.webp',
    imageAlt: 'A DILP facilitator leading a session in front of a whiteboard.',
  },
  {
    slug: 'lead-before-you-have-a-title',
    topic: 'Self-leadership',
    readTime: '6 min read',
    title: 'Lead before you have a title',
    summary: 'Turn everyday responsibility into a practical leadership habit.',
    image: 'article-card-b.webp',
    imageAlt: 'DILP participants working together during a session.',
    published: true,
    featured: true,
    featuredSummary: 'Leadership begins in the small things: taking ownership, keeping your word and making room for others.',
    featuredMeta: 'Self-leadership · 6 min read',
  },
  {
    slug: 'feedback-that-helps-people-grow',
    topic: 'Communication',
    readTime: '5 min read',
    title: 'Feedback that helps people grow',
    summary: 'Move from vague criticism to specific, supportive conversations.',
    image: 'article-card-c.webp',
    imageAlt: 'A DILP participant speaking during a group discussion.',
  },
  {
    slug: 'integrity-is-built-in-small-decisions',
    topic: 'Character & values',
    readTime: '6 min read',
    title: 'Integrity is built in small decisions',
    summary: 'Choose a clear next step when the easy option is not the right one.',
    image: 'article-card-d.webp',
    imageAlt: 'DILP participants listening during a leadership session.',
  },
  {
    slug: 'a-team-is-more-than-a-group',
    topic: 'Teamwork',
    readTime: '5 min read',
    title: 'A team is more than a group',
    summary: 'Agree on roles, share responsibility and make progress together.',
    image: 'article-card-c.webp',
    imageAlt: 'A DILP team working through a problem together.',
  },
  {
    slug: 'make-reflection-a-weekly-habit',
    topic: 'Growth & purpose',
    readTime: '4 min read',
    title: 'Make reflection a weekly habit',
    summary: 'Pause, notice what is changing and turn a lesson into your next action.',
    image: 'article-card-a.webp',
    imageAlt: 'A DILP participant reflecting during a Wednesday session.',
  },
];

export const TOPICS = [
  'All topics',
  'Self-leadership',
  'Communication',
  'Character & values',
  'Teamwork',
  'Growth & purpose',
];

/** The one article written out in full, per the Figma article page. */
export const fullArticle = {
  slug: 'lead-before-you-have-a-title',
  topic: 'Self-leadership',
  series: 'DILP WEDNESDAYS',
  title: ['Lead before you', 'have a title'],
  standfirst:
    'You do not need a position to make a positive difference. Start with the promises you keep, the problems you own and the people you bring along.',
  byline: 'DILP by Cedars',
  meta: '6 min read · Example article',
  image: 'article-hero.webp',
  imageAlt: 'A DILP participant speaking during a Wednesday leadership session.',
  captionLeft: 'DILP community photography · Leadership & Character',
  captionRight: 'Programme image; not a record of this example session.',
  disclosure:
    'An example for future DILP Wednesday updates. These are illustrative learning notes, not a recap or transcript of a session that has taken place.',
  contents: [
    ['The leadership mindset', 'leadership-mindset'],
    ['Three key takeaways', 'key-takeaways'],
    ['Make responsibility visible', 'responsibility'],
    ['Bring others into the work', 'bring-others'],
    ['Your next small step', 'next-step'],
  ],
  lens: {
    label: 'THE WEDNESDAY LENS',
    format: 'Mentor-led learning · Self-leadership & responsibility',
    note: 'Mentor and date to be added with a future session update.',
  },
  sections: [
    {
      id: 'leadership-mindset',
      heading: 'Leadership is a practice, not a position',
      paragraphs: [
        'It is easy to imagine leadership as something that begins when someone puts you in charge. In everyday work, it often starts earlier: noticing that a teammate is stuck, asking a useful question or doing the task you said you would do. These actions give people a reason to trust you before there is any title attached.',
        'For DILP’s Leadership & Character focus, this is a useful starting point. Technical skills help you contribute to a project; the way you use those skills shapes the experience of everyone around you. The question is not only “What can I do?” It is also “How can I help this group move forward?”',
      ],
    },
    {
      id: 'responsibility',
      heading: 'Make responsibility visible',
      paragraphs: [
        'Consider a team preparing a project presentation. Everyone assumes someone else will check the final slides. A small act of leadership is to name the gap, ask who can help and agree on a clear owner. You do not need to take over the project. You need to make the next step easier to understand.',
        'Responsibility becomes useful when it is specific. Replace “I will help with the presentation” with “I will check the opening slides and share my notes before our next review.” The second promise gives the team something it can plan around. Before you commit, check your time and capacity; an honest, smaller promise is better than an impressive one you cannot keep.',
        'If you fall behind, say so early. Explain what has changed, what you have completed and what support or revised plan would help. Accountability is not pretending everything is fine. It is staying involved in finding a workable way forward.',
      ],
    },
    {
      id: 'bring-others',
      heading: 'Bring others into the work',
      paragraphs: [
        'Taking initiative does not mean becoming the loudest person in the room. Ask whose perspective is missing. Invite a quieter teammate to explain their approach, and give them enough time to respond. When someone makes a useful contribution, recognise the work rather than claiming the credit.',
        'You can also offer support without removing someone’s ownership. Ask “Would it help to think through the first step together?” instead of immediately doing the task for them. That small difference keeps learning in the hands of the person doing the work and makes collaboration more respectful.',
      ],
    },
  ],
  takeaways: {
    title: 'Three ideas to take with you',
    items: [
      ['Own the next useful action.', 'Look for a contribution you can make, rather than waiting to be selected.'],
      ['Make your word dependable.', 'Agree on a realistic commitment and communicate early when it changes.'],
      ['Create room for others.', 'Leadership is not doing everything yourself; it is helping others contribute.'],
    ],
  },
  reflection: {
    label: 'PAUSE. REFLECT. PUT IT TO WORK.',
    heading: 'Your next small step',
    prompts: [
      'Notice: Where am I waiting for permission to make a useful contribution?',
      'Choose: What is one realistic promise I can make to my team this week?',
      'Act: Write down the action, who it helps and when I will check back.',
    ],
    followUp: 'At your next check-in, ask: Did my action make the work clearer or easier for someone else?',
  },
  closing:
    'Leadership does not have to begin with a big moment. Begin with a small, useful action. Keep your word, learn from the response and do it again.',
  credit: 'Leadership & Character · DILP by Cedars',
};
