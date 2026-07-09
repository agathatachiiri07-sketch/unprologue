document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const fadeElements = document.querySelectorAll('.fade-in');
  const blobs = document.querySelectorAll('.blob[data-parallax]');

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    header.classList.toggle('header--scrolled', currentScroll > 40);
    backToTop.classList.toggle('back-to-top--visible', currentScroll > 400);

    // Blob parallax
    blobs.forEach(blob => {
      const speed = parseFloat(blob.dataset.parallax) || 0.03;
      blob.style.transform = `translateY(${currentScroll * speed}px)`;
    });
  }, { passive: true });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('header__menu-btn--active');
    nav.classList.toggle('header__nav--open');
    document.body.style.overflow = nav.classList.contains('header__nav--open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('header__menu-btn--active');
      nav.classList.remove('header__nav--open');
      document.body.style.overflow = '';
    });
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

  fadeElements.forEach(el => observer.observe(el));

  // Trigger hero fade immediately
  const heroContent = document.querySelector('.hero__content.fade-in');
  if (heroContent) {
    requestAnimationFrame(() => heroContent.classList.add('fade-in--visible'));
  }

  // Stagger animations
  document.querySelectorAll('.service-card.fade-in').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });

  document.querySelectorAll('.news-item.fade-in').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
