/* Touché Hairdressing — Purley | Main JS */

(function () {
  'use strict';

  /* ── Mobile nav ── */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Sticky nav shadow ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(function (link) {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Contact form submission ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      // Simulate — replace with real form handler (Formspree, Netlify Forms, etc.)
      setTimeout(function () {
        const msg = document.createElement('p');
        msg.style.cssText = 'margin-top:1rem;color:#4a7c4e;font-weight:700;font-size:.9rem;';
        msg.textContent = 'Thank you! We\'ll be in touch shortly.';
        contactForm.appendChild(msg);
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1200);
    });
  }

  /* ── Hero carousel — auto-fade only (no user controls) ── */
  var carouselSlides = document.querySelectorAll('.carousel__slide');
  if (carouselSlides.length > 1) {
    var currentSlide = 0;
    setInterval(function () {
      carouselSlides[currentSlide].classList.remove('carousel__slide--active');
      currentSlide = (currentSlide + 1) % carouselSlides.length;
      carouselSlides[currentSlide].classList.add('carousel__slide--active');
    }, 8000);
  }

  /* ── Scroll reveal ── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Scroll-up button ── */
  var scrollUpBtn = document.createElement('button');
  scrollUpBtn.id = 'scroll-up-btn';
  scrollUpBtn.setAttribute('aria-label', 'Back to top');
  scrollUpBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
  document.body.appendChild(scrollUpBtn);
  window.addEventListener('scroll', function () {
    scrollUpBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  scrollUpBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
