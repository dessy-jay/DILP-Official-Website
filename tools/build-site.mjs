/* =========================================================================
   Generates every page except index.html:

     tracks/<slug>.html                 7 track pages
     articles/index.html                DILP Wednesdays hub
     articles/<slug>.html               the written-out article
     get-involved.html                  partnerships and donations

   Run:  node tools/build-site.mjs

   The site still needs no build to serve — this only keeps the shared
   header, footer and ticker identical across pages. Commit the output.
   ========================================================================= */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tracks, WEEKS } from './tracks.data.mjs';
import { articles, TOPICS, fullArticle } from './articles.data.mjs';
import { ticker, header, footer, head, esc, pad, PARTNERSHIPS_EMAIL } from './chrome.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const write = (rel, html) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, 'utf8');
  console.log('wrote', rel);
};

/* ======================================================= closing CTA band */

function finalCta(base) {
  return `
  <section class="final" id="apply">
    <div class="shell final__inner">
      <span class="final__pill reveal">COHORT 2 · APPLICATIONS CLOSED</span>

      <h2 class="final__headline reveal">
        <span class="accent">Twelve weeks from now,</span>
        <span>someone could have shipped something.</span>
      </h2>

      <p class="final__sub reveal">Applications for Cohort 2 are closed. You can still help the next cohort happen — partner with the programme or support a place.</p>

      <div class="final__ctas reveal">
        <a class="btn btn--yellow btn--pill-12" href="${base}get-involved.html">Get involved</a>
        <a class="btn btn--ghost-blue" style="padding:16px 26px;font-size:13px" href="mailto:${PARTNERSHIPS_EMAIL}?subject=Partnering%20with%20DILP">Partner with DILP</a>
        <a class="btn btn--ghost-blue" style="padding:16px 26px;font-size:13px" href="mailto:${PARTNERSHIPS_EMAIL}?subject=Supporting%20DILP">Support the programme</a>
      </div>

      <div class="final__avatars reveal">
        ${[1, 2, 3, 4].map((n) => `<img src="${base}assets/img/cohort-avatar-${n}.webp" width="52" height="52" alt="" loading="lazy">`).join('\n        ')}
        <span class="final__count">200+</span>
      </div>
    </div>
  </section>`;
}

/* ============================================================ track pages */

function trackPage(t) {
  const base = '../';
  const others = tracks.filter((o) => o.slug !== t.slug);

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(base, `${t.name} — DILP | Cedars Productivity Centre`, t.description, t.image)}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>
${ticker(base)}
${header(base, 'programmes', t.slug)}

<main id="main">

  <section class="track-hero">
    <div class="shell track-hero__inner">
      <div class="track-hero__copy">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="${base}index.html#tracks">Programmes</a>
          <span aria-hidden="true">›</span>
          <a href="${base}index.html#tracks">Tracks</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">${esc(t.shortName)}</span>
        </nav>

        <span class="chip-track">${esc(t.chip)}</span>

        <h1 class="track-hero__title">${esc(t.name)}</h1>
        <p class="track-hero__lede">${esc(t.description)}</p>

        <div class="track-hero__meta">
          <div class="meta-pill meta-pill--tight">
            <span class="meta-pill__item"><span class="ico ico--16"><img src="${base}assets/svg/icon-clock.svg" alt="" aria-hidden="true"></span><span>${WEEKS} weeks</span></span>
            <span class="meta-pill__rule"></span>
            <span class="meta-pill__item"><span class="ico ico--16"><img src="${base}assets/svg/icon-location.svg" alt="" aria-hidden="true"></span><span>Onsite (Bonny Island)</span></span>
          </div>
          <span class="chip-sponsored">✓&nbsp; Fully sponsored</span>
          <span class="chip-closed">Applications closed</span>
        </div>

        <div class="track-hero__ctas">
          <a class="btn btn--blue btn--track" href="#curriculum">See the curriculum</a>
          <a class="btn btn--paper btn--track" href="${base}get-involved.html">Get involved</a>
        </div>
      </div>

      <div class="track-hero__media">
        <img src="${base}assets/img/${t.image}" alt="${esc(t.imageAlt)}">
      </div>
    </div>
  </section>

  <section class="track-section track-section--white">
    <div class="shell track-section__inner">
      <h2 class="heading-track reveal"><span>What you</span> <span class="accent">will learn</span></h2>
      <div class="outcomes">
        ${t.outcomes.map(([title, body], i) => `<article class="outcome reveal">
          <span class="outcome__num">${pad(i + 1)}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(body)}</p>
        </article>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="track-section track-section--tint">
    <div class="shell track-section__inner">
      <h2 class="heading-track reveal"><span>How the</span> <span class="accent">${WEEKS} weeks run</span></h2>
      <div class="phases">
        ${t.phases.map((p) => `<article class="phase reveal">
          <span class="phase__weeks">${esc(p.weeks)}</span>
          <h3>${esc(p.name)}</h3>
          <p>${esc(p.body)}</p>
        </article>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="track-section track-section--white" id="curriculum">
    <div class="shell track-section__inner">
      <div class="curriculum__head reveal">
        <h2 class="heading-track"><span>Inside the</span> <span class="accent">curriculum</span></h2>
        <p>Five modules across ${WEEKS} weeks. Each one ends with something you can do, not something you have heard of.</p>
      </div>

      <div class="curriculum" data-accordion data-single="true">
        ${t.curriculum.map(([title, weeks, outcomes], i) => `<div class="curriculum__item" data-open="${i === 0}">
          <button class="accordion__head curriculum__head-row" type="button" aria-expanded="${i === 0}" aria-controls="module-${i + 1}" data-accordion-toggle>
            <span class="curriculum__label">
              <span class="curriculum__num">${pad(i + 1)}</span>
              <span class="curriculum__title">${esc(title)}</span>
            </span>
            <span class="curriculum__right">
              <span class="curriculum__weeks">${esc(weeks)}</span>
              <span class="accordion__sign" aria-hidden="true">${i === 0 ? '–' : '+'}</span>
            </span>
          </button>
          <div class="accordion__panel" id="module-${i + 1}" role="region">
            <div>
              <ul class="curriculum__outcomes">
                ${outcomes.map((o) => `<li><span aria-hidden="true">—</span>${esc(o)}</li>`).join('\n                ')}
              </ul>
            </div>
          </div>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="capstone">
    <div class="shell capstone__inner">
      <span class="chip-capstone reveal">THE CAPSTONE</span>
      <h2 class="heading-track heading-track--onblue reveal"><span>What you</span> <span class="accent">will build</span></h2>
      <p class="capstone__body reveal">${esc(t.capstone)}</p>
    </div>
  </section>

  <section class="track-section track-section--white">
    <div class="shell track-section__inner">
      <h2 class="heading-track reveal"><span>Who this</span> <span class="accent">is for</span></h2>
      <div class="fit">
        <div class="fit__col reveal">
          <h3>A good fit if you…</h3>
          <ul>
            ${t.goodFit.map((item) => `<li><span aria-hidden="true">—</span>${esc(item)}</li>`).join('\n            ')}
          </ul>
        </div>
        <div class="fit__col reveal">
          <h3>What you need to start</h3>
          <ul>
            ${t.requirements.map((item) => `<li><span aria-hidden="true">—</span>${esc(item)}</li>`).join('\n            ')}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="tools">
    <div class="shell tools__inner">
      <span class="tools__label">TOOLS YOU WILL USE</span>
      <div class="tools__chips">
        ${t.tools.map((tool) => `<span class="chip-tool">${esc(tool)}</span>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="track-section track-section--tint">
    <div class="shell track-section__inner">
      <h2 class="heading-track reveal"><span>The other</span> <span class="accent">six tracks</span></h2>
      <div class="other-tracks">
        ${others.map((o) => `<a class="other-track reveal" href="${o.slug}.html">
          <span class="other-track__name">${esc(o.name)}</span>
          <span class="other-track__meta">${WEEKS} weeks · Onsite</span>
          <span class="other-track__go">See the track <span class="other-track__arrow" aria-hidden="true">&rarr;</span></span>
        </a>`).join('\n        ')}
      </div>
    </div>
  </section>
${finalCta(base)}
</main>
${footer(base)}

<script src="${base}script.js"></script>
</body>
</html>
`;
}

/* ======================================================= articles hub page */

/* Only one article has been written. The rest keep the designed card but
   are not links, so the hub has no dead ends. Set `published: true` in
   articles.data.mjs once a page exists for one. */
function articleCard(a, base) {
  const media = a.published
    ? `<a class="article-card__media" href="${a.slug}.html"><img src="${base}assets/img/${a.image}" alt="${esc(a.imageAlt)}" loading="lazy"></a>`
    : `<span class="article-card__media"><img src="${base}assets/img/${a.image}" alt="${esc(a.imageAlt)}" loading="lazy"></span>`;

  const title = a.published
    ? `<a class="card-link" href="${a.slug}.html">${esc(a.title)}</a>`
    : esc(a.title);

  const foot = a.published
    ? `<span class="article-card__read">Read takeaways &rarr;</span>
              <span class="article-card__note">Example article</span>`
    : `<span class="article-card__read article-card__read--soon">Coming soon</span>
              <span class="article-card__note">Planned article</span>`;

  return `<article class="article-card${a.published ? '' : ' article-card--soon'} reveal">
          ${media}
          <div class="article-card__body">
            <div class="article-card__meta">
              <span class="article-card__topic">${esc(a.topic)}</span>
              <span class="article-card__time">${esc(a.readTime)}</span>
            </div>
            <h3>${title}</h3>
            <p>${esc(a.summary)}</p>
            <div class="article-card__foot">
              ${foot}
            </div>
          </div>
        </article>`;
}

function articlesHub() {
  const base = '../';
  const feature = articles.find((a) => a.featured);

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(base, 'DILP Wednesdays — Leadership hub | Cedars Productivity Centre', 'Ideas to think about. Habits to practise. A home for learning from DILP’s mentor-led Wednesday leadership sessions.', 'article-feature.webp')}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>
${ticker(base)}
${header(base, 'leadership')}

<main id="main">

  <section class="editorial">
    <div class="shell editorial__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${base}index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Leadership &amp; Character</span>
      </nav>

      <div class="masthead">
        <div class="masthead__title">
          <span class="editorial__label">LEADERSHIP &amp; CHARACTER</span>
          <h1>Wednesdays for<br><span class="accent">the leader in you</span><span class="masthead__dot" aria-hidden="true"></span></h1>
        </div>
        <div class="masthead__intro">
          <p>Ideas to think about. Habits to practise. A home for learning from DILP&rsquo;s mentor-led Wednesday leadership sessions.</p>
          <p class="masthead__note">Example articles for future session updates. Mentor details and session dates will be added after each session.</p>
        </div>
      </div>

      <article class="feature reveal">
        <div class="feature__story">
          <div class="feature__label">
            <span class="feature__badge">IN FOCUS</span>
            <span class="feature__series">DILP Wednesdays · Example article</span>
          </div>
          <div class="feature__copy">
            <h2><a class="card-link" href="${feature.slug}.html">${esc(feature.title)}</a></h2>
            <p>${esc(feature.featuredSummary)}</p>
          </div>
          <div class="feature__action">
            <a class="btn btn--yellow btn--feature" href="${feature.slug}.html">Read the takeaways &rarr;</a>
            <span class="feature__meta">${esc(feature.featuredMeta)}</span>
          </div>
        </div>
        <div class="feature__photo">
          <img src="${base}assets/img/article-feature.webp" alt="A DILP participant listening during a Wednesday leadership session." loading="lazy">
          <span class="feature__caption">From the DILP community · Programme photography</span>
        </div>
      </article>
    </div>
  </section>

  <section class="library">
    <div class="shell library__inner">
      <div class="library__head">
        <div class="library__heading">
          <span class="editorial__label">THE WEDNESDAY NOTEBOOK</span>
          <h2>Keep learning. Keep growing.</h2>
        </div>
        <label class="library__search">
          <span class="visually-hidden">Search leadership articles</span>
          <input type="search" placeholder="Search leadership articles" data-article-search>
          <span class="library__search-icon" aria-hidden="true">⌕</span>
        </label>
      </div>

      <div class="topics" role="group" aria-label="Browse by topic">
        ${TOPICS.map((t, i) => `<button class="topic${i === 0 ? ' is-active' : ''}" type="button" data-topic="${esc(t)}">${esc(t)}</button>`).join('\n        ')}
      </div>

      <div class="library__status">
        <span data-article-count>Showing ${articles.length} of ${articles.length} articles</span>
        <span>Sorted by: most recent</span>
      </div>

      <div class="article-grid" data-article-grid>
        ${articles.map((a) => articleCard(a, base)).join('\n        ')}
      </div>

      <p class="library__note" data-article-empty hidden>No articles match that search yet.</p>

      <div class="library__foot">
        <span>Showing ${articles.length} of ${articles.length}</span>
        <span>New articles are added after each Wednesday session.</span>
      </div>
    </div>
  </section>
</main>
${footer(base)}

<script src="${base}script.js"></script>
</body>
</html>
`;
}

/* ====================================================== single article page */

function articlePage() {
  const base = '../';
  const a = fullArticle;
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  const [first, ...rest] = a.sections;

  const sectionHtml = (s) => `<section class="prose__section" id="${s.id}">
          <h2>${esc(s.heading)}</h2>
          ${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
        </section>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(base, `${a.title.join(' ')} — DILP Wednesdays`, a.standfirst, a.image)}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>
${ticker(base)}
${header(base, 'leadership')}

<main id="main">

  <section class="article-intro">
    <div class="shell article-intro__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${base}index.html">Home</a>
        <span aria-hidden="true">/</span>
        <a href="index.html">Leadership</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">DILP Wednesdays</span>
      </nav>

      <div class="article-intro__headline">
        <div class="article-intro__labels">
          <span class="topic topic--static">${esc(a.topic)}</span>
          <span class="editorial__label">${esc(a.series)}</span>
        </div>
        <h1>${a.title.map(esc).join('<br>')}</h1>
        <p class="article-intro__standfirst">${esc(a.standfirst)}</p>
        <div class="article-intro__meta">
          <span class="article-intro__byline">${esc(a.byline)}</span>
          <span>${esc(a.meta)}</span>
          <a href="#main">Share ↗</a>
        </div>
      </div>

      <figure class="article-intro__figure">
        <img src="${base}assets/img/${a.image}" alt="${esc(a.imageAlt)}">
        <figcaption>
          <span>${esc(a.captionLeft)}</span>
          <span>${esc(a.captionRight)}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section class="reading">
    <div class="shell reading__inner">
      <aside class="reading__aside">
        <nav class="contents" aria-label="In this article">
          <span class="editorial__label">IN THIS ARTICLE</span>
          ${a.contents.map(([label, id], i) => `<a href="#${id}"${i === 0 ? ' class="is-current"' : ''}>${esc(label)}</a>`).join('\n          ')}
        </nav>

        <div class="lens">
          <span class="editorial__label">${esc(a.lens.label)}</span>
          <p class="lens__format">${esc(a.lens.format)}</p>
          <p class="lens__note">${esc(a.lens.note)}</p>
        </div>

        <a class="reading__back" href="index.html">← All Wednesday articles</a>
      </aside>

      <div class="prose">
        <p class="disclosure">${esc(a.disclosure)}</p>

        ${sectionHtml(first)}

        <div class="takeaways" id="key-takeaways">
          <h2>${esc(a.takeaways.title)}</h2>
          ${a.takeaways.items.map(([principle, explanation], i) => `<div class="takeaway">
            <span class="takeaway__num">${pad(i + 1)}</span>
            <div>
              <p class="takeaway__principle">${esc(principle)}</p>
              <p class="takeaway__explanation">${esc(explanation)}</p>
            </div>
          </div>`).join('\n          ')}
        </div>

        ${rest.map(sectionHtml).join('\n\n        ')}

        <div class="reflection" id="next-step">
          <span class="editorial__label">${esc(a.reflection.label)}</span>
          <h2>${esc(a.reflection.heading)}</h2>
          ${a.reflection.prompts.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
          <hr>
          <p class="reflection__follow">${esc(a.reflection.followUp)}</p>
        </div>

        <p class="prose__closing">${esc(a.closing)}</p>

        <div class="prose__foot">
          <span>${esc(a.credit)}</span>
          <a href="#main">Share this article ↗</a>
        </div>
      </div>
    </div>
  </section>

  <section class="library library--related">
    <div class="shell library__inner">
      <div class="library__head">
        <h2 class="related__heading">Keep learning</h2>
        <a class="related__all" href="index.html">All Wednesday articles &rarr;</a>
      </div>
      <div class="article-grid">
        ${related.map((r) => articleCard(r, base)).join('\n        ')}
      </div>
    </div>
  </section>
</main>
${footer(base)}

<script src="${base}script.js"></script>
</body>
</html>
`;
}

/* ========================================================= get involved page */

const PARTNER_OPTIONS = [
  ['involved-gift.svg', 'po--blue', 'Sponsorship', 'Fund a place so a participant pays nothing.', 'Support access to practical training and programme delivery.'],
  ['involved-mentor.svg', 'po--mint', 'Mentorship', 'Give a few hours a month to guide a team.', 'Share your experience, review work and help participants grow.'],
  ['involved-tools.svg', 'po--peach', 'Equipment & Connectivity', 'Supply laptops, tools or connectivity for the cohort.', 'Help put the right resources in the hands of learners.'],
  ['pillar-4.svg', 'po--amber', 'Opportunity Pathways', 'Open a door to an internship, a job or a live brief.', 'Connect practical learning with real-world experience.'],
];

const PARTNER_STEPS = [
  ['Share your interest', 'Tell us about your organisation, expertise or resources.'],
  ['Explore the fit', 'Discuss where your support can meet programme needs.'],
  ['Agree the next steps', 'Shape a practical contribution with the DILP team.'],
];

const SUPPORT_QA = [
  ['Can I contribute more than money?', 'Yes. Mentorship, equipment, connectivity and opportunity pathways are all ways to support DILP. Share your expertise, provide tools or open a door to an internship, a job or a live brief.'],
  ['Can an organisation partner with DILP?', 'Yes. Start a partnership enquiry to discuss sponsorship, mentorship, equipment or opportunities that fit your organisation and the programme’s needs.'],
  ['What will my donation support?', 'Support can go towards sponsored places, programme delivery, laptops, tools and connectivity. Discuss your intended contribution with the DILP team.'],
  ['Can I make a payment on this page?', 'This page starts a donation enquiry. Discuss contribution arrangements with the DILP team; it does not collect card or bank details.'],
];

function getInvolvedPage() {
  const base = '';
  const partnerMail = `mailto:${PARTNERSHIPS_EMAIL}?subject=${encodeURIComponent('Partnership enquiry — DILP')}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(base, 'Get involved — DILP | Cedars Productivity Centre', 'Partner with DILP or make a donation to support practical digital training, mentorship and opportunities for young people in Bonny Island.', 'involved-hero.webp')}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>
${ticker(base)}
${header(base, 'involved')}

<main id="main">

  <section class="involved-hero">
    <div class="shell involved-hero__inner">
      <div class="involved-hero__copy">
        <h1>Help build skills.<br>Open doors.<br><span class="accent">Shape what&rsquo;s next.</span></h1>
        <p class="involved-hero__lede">Partner with DILP or make a donation to support practical digital training, mentorship and opportunities for young people in Bonny Island.</p>
        <p class="involved-hero__promise"><span class="dot" aria-hidden="true"></span>Developing digital skills. Building responsible leaders.</p>
      </div>

      <div class="involved-hero__media">
        <img class="involved-hero__main" src="assets/img/involved-hero.webp" alt="The DILP cohort together at the Cedars Productivity Centre." loading="lazy">
        <div class="involved-hero__row">
          <img src="assets/img/involved-participants.webp" alt="DILP participants during a session." loading="lazy">
          <div class="involved-hero__note">
            <p>A place to learn.<br>A chance to grow.</p>
            <span>Help strengthen the pathway.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="contribute-ribbon" aria-label="Ways to contribute">
    <div class="shell contribute-ribbon__inner">
      ${['Sponsorship', 'Coaching', 'Equipment & Connectivity', 'Opportunity Pathways'].map((a) => `<span class="contribute-ribbon__item"><img src="assets/svg/marquee-sep.svg" alt="" aria-hidden="true">${esc(a)}</span>`).join('\n      ')}
    </div>
  </div>

  <section class="partnerships" id="partnerships">
    <div class="shell partnerships__inner">
      <div class="partnerships__head">
        <div class="partnerships__intro reveal">
          <span class="section-label">PARTNER WITH DILP</span>
          <h2>Your expertise. Your resources.<br>Makes a stronger pathway.</h2>
          <p>Partners widen access, deepen the work and connect participants to real opportunities. Here is where support goes.</p>
        </div>
        <a class="btn btn--blue btn--enquiry reveal" href="${partnerMail}">Start a partnership enquiry &nbsp;&rarr;</a>
      </div>

      <div class="partner-options">
        ${PARTNER_OPTIONS.map(([icon, cls, title, summary, detail]) => `<article class="partner-option ${cls} reveal">
          <img src="assets/svg/${icon}" alt="" aria-hidden="true">
          <h3>${esc(title)}</h3>
          <p class="partner-option__summary">${esc(summary)}</p>
          <p class="partner-option__detail">${esc(detail)}</p>
        </article>`).join('\n        ')}
      </div>

      <div class="partner-process reveal">
        <div class="partner-process__intro">
          <h3>Let&rsquo;s find the right fit.</h3>
          <p>Start with a conversation about how you&rsquo;d like to contribute.</p>
        </div>
        ${PARTNER_STEPS.map(([title, body], i) => `<div class="partner-step">
          <span class="partner-step__num">${pad(i + 1)}</span>
          <h4>${esc(title)}</h4>
          <p>${esc(body)}</p>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="donations" id="donate">
    <div class="shell donations__inner">
      <div class="donation-panel">
        <div class="why-give">
          <span class="section-label section-label--amber">MAKE A DONATION</span>
          <h2>Help keep the door<br>to learning open.</h2>
          <p class="why-give__lede">Support a place on the programme, contribute to delivery, or help provide the tools participants need to learn and build.</p>
          <ul class="why-give__list">
            ${['Practical digital training', 'Mentorship and capstone projects', 'Laptops, tools and connectivity'].map((p) => `<li><img src="assets/svg/icon-check.svg" alt="" aria-hidden="true">${esc(p)}</li>`).join('\n            ')}
          </ul>
          <img class="why-give__photo" src="assets/img/involved-at-work.webp" alt="DILP participants at work during a session." loading="lazy">
          <p class="why-give__note">No cost to selected participants. Your support helps strengthen that pathway.</p>
        </div>

        <form class="enquiry" data-donation-form>
          <div class="enquiry__intro">
            <h2>Start your donation</h2>
            <p>Tell us how you&rsquo;d like to give. This is an enquiry, not a payment.</p>
          </div>

          <div class="enquiry__row">
            <label class="enquiry__field">
              <span>Full name</span>
              <input type="text" name="name" placeholder="Your name" autocomplete="name" required>
            </label>
            <label class="enquiry__field">
              <span>Email address</span>
              <input type="email" name="email" placeholder="you@example.com" autocomplete="email" required>
            </label>
          </div>

          <label class="enquiry__field">
            <span>Organisation (optional)</span>
            <input type="text" name="organisation" placeholder="Organisation name" autocomplete="organization">
          </label>

          <label class="enquiry__field">
            <span>I&rsquo;d like to contribute</span>
            <select name="contribution" class="enquiry__select">
              <option>Financial support</option>
              <option>Equipment or connectivity</option>
              <option>Mentorship or coaching</option>
              <option>Opportunity pathways</option>
              <option>Something else</option>
            </select>
          </label>

          <label class="enquiry__field">
            <span>Proposed contribution (optional)</span>
            <input type="text" name="amount" placeholder="Amount, currency or items you&rsquo;d like to give">
          </label>

          <label class="enquiry__field">
            <span>Anything you&rsquo;d like us to know? (optional)</span>
            <textarea name="message" rows="3" placeholder="Tell us what you have in mind…"></textarea>
          </label>

          <button class="btn btn--blue btn--enquiry btn--block" type="submit">Send donation enquiry &nbsp;&rarr;</button>
          <p class="enquiry__note">Discuss donation arrangements with the DILP team before making a contribution. No payment details are collected here.</p>
        </form>
      </div>
    </div>
  </section>

  <section class="support-questions">
    <div class="shell support-questions__inner">
      <div class="support-questions__intro reveal">
        <span class="section-label">GOOD TO KNOW</span>
        <h2>A few questions,<br>answered.</h2>
        <p>Whether you&rsquo;re giving as an individual or bringing an organisation on board, there&rsquo;s more than one way to get involved.</p>
      </div>

      <div class="support-faq" data-accordion data-single="true">
        ${SUPPORT_QA.map(([q, answer], i) => `<div class="faq-item" data-open="${i === 0}">
          <button class="accordion__head" type="button" aria-expanded="${i === 0}" aria-controls="support-${i + 1}" data-accordion-toggle>
            ${esc(q)}
            <span class="accordion__sign" aria-hidden="true">${i === 0 ? '–' : '+'}</span>
          </button>
          <div class="accordion__panel" id="support-${i + 1}" role="region">
            <div><p>${esc(answer)}</p></div>
          </div>
        </div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="invitation">
    <div class="shell invitation__inner">
      <span class="section-label section-label--amber">BUILD THE PATHWAY WITH US</span>
      <h2><span class="accent">Skills need opportunity.</span><br>You can help connect the two.</h2>
      <p>Bring your resources, your experience or your network. Help young people turn learning into practical work.</p>
      <div class="invitation__ctas">
        <a class="btn btn--yellow btn--track" href="${partnerMail}">Start a partnership enquiry</a>
        <a class="btn btn--ghost-blue btn--track" href="#donate">Make a donation</a>
      </div>
    </div>
  </section>
</main>
${footer(base)}

<script src="script.js"></script>
</body>
</html>
`;
}

/* ================================================================== run */

for (const t of tracks) write(`tracks/${t.slug}.html`, trackPage(t));
write('articles/index.html', articlesHub());
write(`articles/${fullArticle.slug}.html`, articlePage());
write('get-involved.html', getInvolvedPage());

console.log(`\n${tracks.length} track pages + 2 article pages + get-involved generated.`);
