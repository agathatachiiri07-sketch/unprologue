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

  // Staggered hero entrance
  const heroFades = document.querySelectorAll('.hero .fade-in');
  heroFades.forEach((el, i) => {
    el.style.transitionDelay = `${0.1 + i * 0.15}s`;
    requestAnimationFrame(() => el.classList.add('fade-in--visible'));
  });

  // Subtle hero parallax on pointer move
  const hero = document.getElementById('hero');
  const heroShape = document.querySelector('.hero__shape');
  if (hero && heroShape && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroShape.style.transform = `translate(calc(-42% + ${x * 24}px), calc(-50% + ${y * 18}px)) rotate(${x * 2}deg)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroShape.style.transform = '';
    });
  }

  // Member accordion
  document.querySelectorAll('.member__toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const member = toggle.closest('.member');
      const details = member.querySelector('.member__details');
      const isOpen = member.classList.contains('is-open');

      document.querySelectorAll('.member.is-open').forEach(openMember => {
        if (openMember !== member) {
          openMember.classList.remove('is-open');
          const openToggle = openMember.querySelector('.member__toggle');
          const openDetails = openMember.querySelector('.member__details');
          openToggle.setAttribute('aria-expanded', 'false');
          openDetails.setAttribute('aria-hidden', 'true');
        }
      });

      member.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      details.setAttribute('aria-hidden', String(isOpen));
    });
  });

  // Stagger animations
  document.querySelectorAll('.member.fade-in').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.service-panel').forEach((panel, i) => {
    const parent = panel.closest('.service-panels');
    if (parent) {
      panel.style.transitionDelay = `${i * 0.05}s`;
    }

    panel.addEventListener('click', () => {
      if (!window.matchMedia('(hover: hover)').matches) {
        const isActive = panel.classList.contains('is-active');
        parent.querySelectorAll('.service-panel.is-active').forEach(activePanel => {
          activePanel.classList.remove('is-active');
        });
        if (!isActive) panel.classList.add('is-active');
      }
    });
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
