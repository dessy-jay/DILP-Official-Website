/* =========================================================================
   Shared page chrome: ticker, header (with mobile nav) and footer.
   Used by every generated page. `base` is '' for pages at the site root
   and '../' for pages one folder deep.
   ========================================================================= */

import { tracks, WEEKS } from './tracks.data.mjs';

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export const pad = (n) => String(n).padStart(2, '0');

/* Applications are closed for the current cohort. The ticker, the header
   action and every status chip on the site are driven from here. */
export const APPLICATIONS_OPEN = false;

/* How many tracks there are, in words, so the ticker, the Programmes
   dropdown and the footer cannot drift when a track is added. */
const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
export const TRACK_COUNT = tracks.length;
export const numberWord = (n) => NUMBER_WORDS[n] || String(n);
export const TRACK_COUNT_WORD = numberWord(TRACK_COUNT);

export const TICKER_ITEMS = [
  APPLICATIONS_OPEN ? 'COHORT 2 APPLICATIONS ARE OPEN' : 'APPLICATIONS ARE CURRENTLY CLOSED',
  `${WEEKS} WEEKS · BONNY ISLAND`,
  'NO COST TO SELECTED PARTICIPANTS',
  'MENTOR-LED · PROJECT-BASED',
  `${TRACK_COUNT_WORD.toUpperCase()} TRACKS TO CHOOSE FROM`,
  'DELIVERED BY CEDARS PRODUCTIVITY CENTRE',
];

export const PARTNERSHIPS_EMAIL = 'partnerships@cedarsprohub.com';

/* -------------------------------------------------------------------------
   Paystack payment links. Paste the live payment-page URL between the
   quotes — nothing else needs changing; the "Give now" section on
   get-involved.html picks them up on the next `node tools/build-site.mjs`.
   A currency left blank renders as a disabled "link coming soon" button
   instead of a dead link, so the page is safe to ship before they exist.
   ------------------------------------------------------------------------- */
export const PAYSTACK = {
  ngn: '',   // e.g. https://paystack.shop/pay/dilp-naira
  usd: '',   // e.g. https://paystack.shop/pay/dilp-dollar
};

export function ticker(base = '') {
  return `
<div class="ticker" aria-label="Programme announcements">
  <div class="marquee" style="--marquee-duration: 42s" data-marquee>
    <div class="marquee__track" data-marquee-track>
      ${TICKER_ITEMS.map((t) => `<p class="ticker__item">${esc(t)} <img class="ticker__dot" src="${base}assets/svg/ticker-dot.svg" alt="" aria-hidden="true"></p>`).join('\n      ')}
    </div>
  </div>
</div>`;
}

/**
 * @param base   '' at the site root, '../' one folder deep
 * @param active one of: home | programmes | leadership | involved
 * @param slug   current track slug, when on a track page
 */
export function header(base = '', active = '', slug = '') {
  const trackLinks = tracks.map((t) =>
    `<a role="menuitem" href="${base}tracks/${t.slug}.html"${t.slug === slug ? ' aria-current="page"' : ''}>${esc(t.name)}</a>`
  ).join('\n          ');

  const mobileTrackLinks = tracks.map((t) =>
    `<li><a href="${base}tracks/${t.slug}.html">${esc(t.name)}</a></li>`
  ).join('\n            ');

  return `
<header class="header" data-header>
  <div class="shell header__inner">
    <a class="logo" href="${base}index.html" aria-label="DILP — home">
      <span class="logo__plate">
        <img class="logo__img" src="${base}assets/img/dilp-logo.png" width="186" height="68" alt="DILP">
        <span class="logo__word" aria-hidden="true">DILP</span>
      </span>
    </a>

    <nav class="nav" aria-label="Primary">
      <a class="nav__link" href="${base}index.html"${active === 'home' ? ' aria-current="page"' : ''}>Home</a>
      <div class="nav__group" data-dropdown data-open="false">
        <button class="nav__link" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="programmes-menu" data-dropdown-toggle>
          Programmes
          <img class="nav__chevron" src="${base}assets/svg/nav-chevron.svg" alt="" aria-hidden="true">
        </button>
        <div class="dropdown" id="programmes-menu" role="menu">
          <span class="dropdown__label">${TRACK_COUNT_WORD.toUpperCase()} TRACKS</span>
          ${trackLinks}
        </div>
      </div>
      <a class="nav__link" href="${base}articles/index.html"${active === 'leadership' ? ' aria-current="page"' : ''}>Leadership</a>
      <a class="nav__link" href="${base}get-involved.html"${active === 'involved' ? ' aria-current="page"' : ''}>Get Involved</a>
    </nav>

    <div class="header__actions">
      <a class="btn btn--blue btn--nav" href="${base}get-involved.html">Get involved</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu" data-burger>
        <span></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu mirrors the desktop nav exactly: the same four
       destinations, with Programmes expanding to the track list. -->
  <div class="mobile-nav" id="mobile-nav" data-open="false">
    <div class="shell">
      <ul data-accordion>
        <li><a href="${base}index.html">Home</a></li>
        <li class="mobile-nav__group" data-open="false">
          <button class="mobile-nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-programmes" data-accordion-toggle>
            Programmes
            <span class="accordion__sign" aria-hidden="true">+</span>
          </button>
          <div class="accordion__panel" id="mobile-programmes" role="region" aria-label="Tracks">
            <div>
              <ul class="mobile-nav__sub">
                ${mobileTrackLinks}
              </ul>
            </div>
          </div>
        </li>
        <li><a href="${base}articles/index.html">Leadership</a></li>
        <li><a href="${base}get-involved.html">Get Involved</a></li>
      </ul>
      <a class="btn btn--blue btn--lg" href="${base}get-involved.html">Get involved</a>
    </div>
  </div>
</header>`;
}

export function footer(base = '') {
  return `
<footer class="footer">
  <div class="shell footer__inner">
    <div class="footer__top">
      <div class="footer__brand">
        <div class="logo">
          <span class="logo__plate">
            <img class="logo__img" src="${base}assets/img/dilp-logo.png" width="186" height="68" alt="DILP">
            <span class="logo__word" aria-hidden="true">DILP</span>
          </span>
        </div>
        <p>A community-focused talent development programme by Cedars Productivity Centre.</p>
      </div>

      <nav class="footer__col" aria-label="Explore">
        <span class="footer__label">EXPLORE</span>
        <a href="${base}index.html#why">About Cedars</a>
        <a href="${base}index.html#impact">Our Work</a>
        <a href="${base}index.html#tracks">Programmes</a>
      </nav>

      <nav class="footer__col" aria-label="Programme">
        <span class="footer__label">PROGRAMME</span>
        <a href="${base}index.html#impact">Impact</a>
        <a href="${base}get-involved.html">Get Involved</a>
        <a href="${base}index.html#tracks">All ${TRACK_COUNT_WORD} tracks</a>
      </nav>

      <nav class="footer__col" aria-label="Leadership">
        <span class="footer__label">LEADERSHIP</span>
        <a href="${base}articles/index.html">DILP Wednesdays</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </nav>

      <div class="footer__contact">
        <a class="footer__email" href="mailto:hello@cedarsprohub.com">
          <img src="${base}assets/svg/footer-arrow.svg" alt="" aria-hidden="true">
          <span>hello@cedarsprohub.com</span>
        </a>
        <div class="footer__location">
          <span class="footer__label">PROGRAMME LOCATION</span>
          <span>Bonny Island, Rivers State, Nigeria</span>
        </div>
        <div class="chips">
          <span class="chip-outline">Accredited provider</span>
          <span class="chip-outline">Mentor-led</span>
        </div>
      </div>
    </div>

    <div class="footer__divider"></div>

    <div class="footer__bottom">
      <p>© 2025 Cedars Productivity Centre. All rights reserved.</p>
      <div class="socials">
        <a href="#" aria-label="Facebook">f</a>
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="X">X</a>
        <a href="#" aria-label="Instagram">ig</a>
        <a href="#" aria-label="YouTube">yt</a>
      </div>
    </div>
  </div>
</footer>`;
}

export function head(base, title, description, image) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#0040a1">

<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${base}assets/img/${image}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Nunito+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}styles.css">`;
}
