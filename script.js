/* =========================================================================
   DILP landing page — interactions
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------------------
     Marquees — clone the track so the -100% loop is seamless.
     One clone is enough because the animation translates a single track by
     its own full width; the duplicate sits directly behind it.
     -------------------------------------------------------------------- */
  function setUpMarquees() {
    document.querySelectorAll('[data-marquee]').forEach(function (marquee) {
      var track = marquee.querySelector('[data-marquee-track]');
      if (!track) return;

      // Repeat until the track is at least as wide as the viewport, so short
      // content never leaves a gap mid-loop.
      var guard = 0;
      while (track.scrollWidth < window.innerWidth && guard < 4) {
        track.innerHTML += track.innerHTML;
        guard++;
      }

      var clone = track.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marquee.appendChild(clone);
    });
  }

  /* -----------------------------------------------------------------------
     Sticky header shadow
     -------------------------------------------------------------------- */
  function setUpHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -----------------------------------------------------------------------
     Programmes dropdown — click to toggle, hover to preview on pointer
     devices, Escape / outside click to close.
     -------------------------------------------------------------------- */
  function setUpDropdown() {
    var group = document.querySelector('[data-dropdown]');
    if (!group) return;

    var toggle = group.querySelector('[data-dropdown-toggle]');
    var hoverCapable = window.matchMedia('(hover: hover) and (min-width: 981px)');

    function setOpen(open) {
      group.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setOpen(group.dataset.open !== 'true');
    });

    group.addEventListener('mouseenter', function () {
      if (hoverCapable.matches) setOpen(true);
    });
    group.addEventListener('mouseleave', function () {
      if (hoverCapable.matches) setOpen(false);
    });

    group.addEventListener('focusout', function (event) {
      if (!group.contains(event.relatedTarget)) setOpen(false);
    });

    document.addEventListener('click', function (event) {
      if (!group.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && group.dataset.open === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    group.querySelectorAll('.dropdown a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });
  }

  /* -----------------------------------------------------------------------
     Mobile navigation
     -------------------------------------------------------------------- */
  function setUpMobileNav() {
    var burger = document.querySelector('[data-burger]');
    var panel = document.getElementById('mobile-nav');
    if (!burger || !panel) return;

    function setOpen(open) {
      panel.dataset.open = String(open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    burger.addEventListener('click', function () {
      setOpen(panel.dataset.open !== 'true');
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) setOpen(false);
    });
  }

  /* -----------------------------------------------------------------------
     Accordions (Why choose DILP + FAQ)
     data-single="true" keeps one panel open at a time.
     -------------------------------------------------------------------- */
  function setUpAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(function (group) {
      var single = group.dataset.single === 'true';
      var toggles = group.querySelectorAll('[data-accordion-toggle]');

      toggles.forEach(function (toggle) {
        // Every accordion item carries data-open; without it there is
        // nothing to toggle, so skip rather than throwing on click.
        var item = toggle.closest('[data-open]');
        if (!item) return;
        var sign = toggle.querySelector('.accordion__sign');

        function paint(open) {
          item.dataset.open = String(open);
          toggle.setAttribute('aria-expanded', String(open));
          if (sign) sign.textContent = open ? '–' : '+';
        }

        toggle.addEventListener('click', function () {
          var open = item.dataset.open !== 'true';

          if (single && open) {
            toggles.forEach(function (other) {
              if (other === toggle) return;
              var otherItem = other.closest('[data-open]');
              var otherSign = other.querySelector('.accordion__sign');
              otherItem.dataset.open = 'false';
              other.setAttribute('aria-expanded', 'false');
              if (otherSign) otherSign.textContent = '+';
            });
          }

          paint(open);
        });
      });
    });
  }

  /* -----------------------------------------------------------------------
     Testimonial carousel — responsive slides-per-view, arrows, dots,
     keyboard arrows and touch swipe.
     -------------------------------------------------------------------- */
  function setUpCarousel() {
    var carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    var track = carousel.querySelector('[data-carousel-track]');
    var slides = Array.prototype.slice.call(track.children);
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    var dotsHost = document.querySelector('[data-carousel-dots]');
    var gap = 18;
    var index = 0;

    // Two columns only when each still has room to read.
    function perView() {
      return window.innerWidth <= 980 ? 1 : 2;
    }
    function maxIndex() {
      return Math.max(0, slides.length - perView());
    }

    function layout() {
      var view = perView();
      var width = track.parentElement.clientWidth;
      var slideWidth = (width - gap * (view - 1)) / view;

      slides.forEach(function (slide) {
        slide.style.width = slideWidth + 'px';
      });

      index = Math.min(index, maxIndex());
      track.style.transform = 'translate3d(' + (-index * (slideWidth + gap)) + 'px, 0, 0)';

      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index >= maxIndex();

      paintDots();
    }

    function paintDots() {
      if (!dotsHost) return;
      var pages = maxIndex() + 1;

      if (dotsHost.children.length !== pages) {
        dotsHost.innerHTML = '';
        for (var i = 0; i < pages; i++) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
          dot.dataset.index = String(i);
          dot.addEventListener('click', function (event) {
            go(Number(event.currentTarget.dataset.index));
          });
          dotsHost.appendChild(dot);
        }
      }

      Array.prototype.forEach.call(dotsHost.children, function (dot, i) {
        dot.setAttribute('aria-current', String(i === index));
      });

      dotsHost.style.display = pages > 1 ? 'flex' : 'none';
    }

    function go(target) {
      index = Math.max(0, Math.min(target, maxIndex()));
      layout();
    }

    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });

    carousel.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') { go(index - 1); }
      if (event.key === 'ArrowRight') { go(index + 1); }
    });

    // Touch swipe
    var startX = null;
    track.addEventListener('touchstart', function (event) {
      startX = event.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function (event) {
      if (startX === null) return;
      var delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
      startX = null;
    });

    layout();

    // layout() is idempotent, so listen both ways: window resize covers the
    // common case, and a ResizeObserver also catches the viewport changing
    // width without the window doing so (zoom, a sibling reflowing).
    window.addEventListener('resize', layout);
    if ('ResizeObserver' in window) {
      new ResizeObserver(layout).observe(track.parentElement);
    }
  }

  /* -----------------------------------------------------------------------
     Video lightbox — embeds the Vimeo player on open, tears it down on close
     so the video stops playing.
     -------------------------------------------------------------------- */
  function vimeoEmbedUrl(value) {
    if (!value) return '';
    // Accept a bare id, a vimeo.com/123 URL, or an unlisted vimeo.com/123/hash URL.
    var match = String(value).trim().match(/(\d{6,})(?:[/?]([0-9a-zA-Z]+))?/);
    if (!match) return '';

    var url = 'https://player.vimeo.com/video/' + match[1];
    var params = 'badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&title=0&byline=0&portrait=0';
    if (match[2]) params = 'h=' + match[2] + '&' + params;
    return url + '?' + params;
  }

  function setUpLightbox() {
    var lightbox = document.querySelector('[data-lightbox]');
    var openers = document.querySelectorAll('[data-video-open]');
    if (!lightbox || !openers.length) return;

    var frame = lightbox.querySelector('[data-lightbox-frame]');
    var closeBtn = lightbox.querySelector('[data-lightbox-close]');
    var src = vimeoEmbedUrl(lightbox.dataset.vimeo);
    var fallback = frame.innerHTML;
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      if (src) {
        frame.innerHTML =
          '<iframe src="' + src + '" title="Directors Message" frameborder="0" ' +
          'allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" ' +
          'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
      }
      lightbox.dataset.open = 'true';
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      lightbox.dataset.open = 'false';
      document.body.style.overflow = '';
      if (src) frame.innerHTML = fallback;
      if (lastFocus) lastFocus.focus();
    }

    openers.forEach(function (opener) {
      opener.addEventListener('click', open);
    });
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.dataset.open === 'true') close();
    });
  }

  /* -----------------------------------------------------------------------
     Scroll reveal
     -------------------------------------------------------------------- */
  function setUpReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // Stagger siblings inside a grid or row for a softer cascade.
    items.forEach(function (item) {
      var siblings = Array.prototype.slice.call(item.parentElement.children)
        .filter(function (child) { return child.classList.contains('reveal'); });
      var position = siblings.indexOf(item);
      if (position > 0) item.style.transitionDelay = Math.min(position * 70, 280) + 'ms';
      observer.observe(item);
    });
  }

  /* -----------------------------------------------------------------------
     Stat counters — count up once the tile scrolls into view
     -------------------------------------------------------------------- */
  function setUpCounters() {
    var counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) return;

    function run(el) {
      var target = Number(el.dataset.countTo);
      var duration = 1100;
      var start = null;

      function step(now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(step);
      }

      el.textContent = '0';
      requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (counter) { observer.observe(counter); });
  }

  /* -----------------------------------------------------------------------
     Anchor scrolling that clears the sticky header
     -------------------------------------------------------------------- */
  function setUpAnchors() {
    var header = document.querySelector('[data-header]');

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;

        var target = document.querySelector(id);
        if (!target) return;

        event.preventDefault();
        var offset = header ? header.offsetHeight + 12 : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: top,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  /* -------------------------------------------------------------------- */

  /* -----------------------------------------------------------------------
     Logo — fall back to the text wordmark if the image file is missing
     -------------------------------------------------------------------- */
  function setUpLogos() {
    document.querySelectorAll('.logo__img').forEach(function (img) {
      var flag = function () {
        var logo = img.closest('.logo');
        if (logo) logo.classList.add('logo--fallback');
      };
      img.addEventListener('error', flag);
      if (img.complete && img.naturalWidth === 0) flag();
    });
  }

  /* -----------------------------------------------------------------------
     Article library: topic chips + search, filtering the grid in place
     -------------------------------------------------------------------- */
  function setUpArticleLibrary() {
    var grid = document.querySelector('[data-article-grid]');
    if (!grid) return;

    var cards = Array.prototype.slice.call(grid.querySelectorAll('.article-card'));
    var chips = document.querySelectorAll('[data-topic]');
    var search = document.querySelector('[data-article-search]');
    var count = document.querySelector('[data-article-count]');
    var empty = document.querySelector('[data-article-empty]');
    var topic = 'All topics';

    function text(card) {
      return card.textContent.toLowerCase();
    }

    function apply() {
      var term = (search && search.value || '').trim().toLowerCase();
      var shown = 0;

      cards.forEach(function (card) {
        var cardTopic = (card.querySelector('.article-card__topic') || {}).textContent || '';
        var topicOk = topic === 'All topics' || cardTopic.trim() === topic;
        var termOk = !term || text(card).indexOf(term) !== -1;
        var show = topicOk && termOk;
        card.hidden = !show;
        if (show) shown++;
      });

      if (count) count.textContent = 'Showing ' + shown + ' of ' + cards.length + ' articles';
      if (empty) empty.hidden = shown !== 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        topic = chip.dataset.topic;
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        apply();
      });
    });

    if (search) search.addEventListener('input', apply);
  }

  /* -----------------------------------------------------------------------
     Donation enquiry — no backend, so the form composes an email to the
     partnerships address with whatever the person filled in.
     -------------------------------------------------------------------- */
  function setUpDonationForm() {
    var form = document.querySelector('[data-donation-form]');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };

      var lines = [
        'Name: ' + get('name'),
        'Email: ' + get('email'),
        'Organisation: ' + (get('organisation') || '—'),
        'Contribution type: ' + get('contribution'),
        'Proposed contribution: ' + (get('amount') || '—'),
        '',
        get('message') || '(no additional notes)'
      ];

      var href =
        'mailto:partnerships@cedarsprohub.com' +
        '?subject=' + encodeURIComponent('Donation enquiry — DILP') +
        '&body=' + encodeURIComponent(lines.join('\n'));

      // An anchor click opens the mail client more reliably than assigning
      // location.href, and leaves the page where it is.
      var link = document.createElement('a');
      link.href = href;
      link.rel = 'noopener';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  /* -----------------------------------------------------------------------
     Article contents: highlight the section currently on screen
     -------------------------------------------------------------------- */
  function setUpArticleContents() {
    var links = document.querySelectorAll('.contents a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-current'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-current');
      });
    }, { rootMargin: '-120px 0px -70% 0px' });

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  function init() {
    setUpLogos();
    setUpMarquees();
    setUpHeader();
    setUpDropdown();
    setUpMobileNav();
    setUpAccordions();
    setUpCarousel();
    setUpLightbox();
    setUpReveal();
    setUpCounters();
    setUpAnchors();
    setUpArticleLibrary();
    setUpDonationForm();
    setUpArticleContents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
