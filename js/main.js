document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const fadeElements = document.querySelectorAll('.fade-in');

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (currentScroll > 400) {
      backToTop.classList.add('back-to-top--visible');
    } else {
      backToTop.classList.remove('back-to-top--visible');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('header__menu-btn--active');
    nav.classList.toggle('header__nav--open');
    document.body.style.overflow = nav.classList.contains('header__nav--open') ? 'hidden' : '';
  });

  // Close menu on nav link click
  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('header__menu-btn--active');
      nav.classList.remove('header__nav--open');
      document.body.style.overflow = '';
    });
  });

  // Back to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // Stagger animation for service cards
  const serviceCards = document.querySelectorAll('.service-card.fade-in');
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
  });

  // Stagger animation for news items
  const newsItems = document.querySelectorAll('.news-item.fade-in');
  newsItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
