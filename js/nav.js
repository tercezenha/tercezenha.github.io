/* ─── Mobile navigation — hamburger + overlay menu ───────────────
   Reads nav links from the existing #site-header > nav (single
   source of truth) and injects a toggle button + full-screen
   overlay menu into the DOM.  Both elements are display:none on
   desktop (≥769px) so this script has zero effect above the mobile
   breakpoint.
──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  function init() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var existingNav = header.querySelector('nav');
    if (!existingNav) return;

    // Collect links from the existing desktop nav
    var navLinks = Array.prototype.slice.call(existingNav.querySelectorAll('a'));

    /* ── Hamburger toggle button ──────────────────────────────── */
    var toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-label', 'Abrir menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-menu');
    toggle.innerHTML =
      '<span class="nav-toggle__bar"></span>' +
      '<span class="nav-toggle__bar"></span>' +
      '<span class="nav-toggle__bar"></span>';
    header.appendChild(toggle);

    /* ── Overlay menu ─────────────────────────────────────────── */
    var menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'mobile-menu';
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-label', 'Menu de navegação');

    // Logo / home link at top of overlay
    var homeLink = document.createElement('a');
    homeLink.href = 'index.html';
    homeLink.className = 'mobile-menu__home';
    homeLink.textContent = 'TERCEZENHA';
    menu.appendChild(homeLink);

    // Cloned nav links
    var mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-menu__nav';
    navLinks.forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      a.className = 'mobile-menu__link';
      mobileNav.appendChild(a);
    });
    menu.appendChild(mobileNav);

    document.body.appendChild(menu);

    /* ── Active link highlighting ─────────────────────────────── */
    var currentPath = location.pathname;
    menu.querySelectorAll('.mobile-menu__link').forEach(function (a) {
      try {
        var linkPath = new URL(a.href, location.href).pathname;
        if (
          currentPath === linkPath ||
          currentPath.replace(/\/$/, '') === linkPath.replace(/\/$/, '')
        ) {
          a.classList.add('mobile-menu__link--active');
        }
      } catch (e) {
        // Silently ignore malformed hrefs
      }
    });

    /* ── Open / close helpers ─────────────────────────────────── */
    var isOpen = false;

    function openMenu() {
      isOpen = true;
      menu.classList.add('mobile-menu--open');
      toggle.classList.add('nav-toggle--open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
    }

    function closeMenu() {
      isOpen = false;
      menu.classList.remove('mobile-menu--open');
      toggle.classList.remove('nav-toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
    }

    /* ── Event wiring ─────────────────────────────────────────── */
    toggle.addEventListener('click', function () {
      isOpen ? closeMenu() : openMenu();
    });

    // Close when any menu link is tapped (navigation)
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });

    // Backdrop tap (click directly on the overlay, not inside nav)
    menu.addEventListener('click', function (e) {
      if (e.target === menu) closeMenu();
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
