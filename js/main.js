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

  /* ── Hero carousel ── */
  var carouselSlides = document.querySelectorAll('.carousel__slide');
  if (carouselSlides.length > 1) {
    var carouselDots = document.querySelectorAll('.carousel__dot');
    var prevBtn = document.querySelector('.carousel__btn--prev');
    var nextBtn = document.querySelector('.carousel__btn--next');
    var currentSlide = 0;
    var autoTimer;

    function carouselGoTo(n) {
      carouselSlides[currentSlide].classList.remove('carousel__slide--active');
      carouselDots[currentSlide].classList.remove('carousel__dot--active');
      currentSlide = (n + carouselSlides.length) % carouselSlides.length;
      carouselSlides[currentSlide].classList.add('carousel__slide--active');
      carouselDots[currentSlide].classList.add('carousel__dot--active');
    }

    function startAuto() {
      autoTimer = setInterval(function () { carouselGoTo(currentSlide + 1); }, 5000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () { carouselGoTo(currentSlide - 1); resetAuto(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () { carouselGoTo(currentSlide + 1); resetAuto(); });
    }
    carouselDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { carouselGoTo(i); resetAuto(); });
    });

    startAuto();
  }

})();
