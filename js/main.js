document.documentElement.classList.add('js-animating');

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const backToTop = document.getElementById('backToTop');
  const fadeElements = document.querySelectorAll('.fade-in');

  // Header scroll effect + mesh background parallax
  const meshBg = document.querySelector('.mesh-bg');
  let meshTicking = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const updateMeshBackground = () => {
    if (!meshBg || reducedMotion.matches) return;

    const scrollY = window.scrollY;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    const progress = scrollY / maxScroll;

    const pos1X = progress * 58;
    const pos1Y = 28 + progress * 42;
    const pos2X = 100 - progress * 52;
    const pos2Y = 50 - progress * 38;

    meshBg.style.setProperty('--mesh-pos-1', `${pos1X}% ${pos1Y}%`);
    meshBg.style.setProperty('--mesh-pos-2', `${pos2X}% ${pos2Y}%`);
    meshBg.style.setProperty('--mesh-shift-y', `${scrollY * 0.14}px`);
    meshTicking = false;
  };

  const queueMeshUpdate = () => {
    if (!meshTicking) {
      meshTicking = true;
      requestAnimationFrame(updateMeshBackground);
    }
  };

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    header.classList.toggle('header--scrolled', currentScroll > 40);
    backToTop.classList.toggle('back-to-top--visible', currentScroll > 400);
    queueMeshUpdate();
  }, { passive: true });

  updateMeshBackground();

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
  const heroTitle = document.querySelector('.hero__title.fade-in');
  if (heroTitle) {
    requestAnimationFrame(() => heroTitle.classList.add('fade-in--visible'));
  }

  // Hero motto typing effect
  const mottoJa = document.querySelector('.hero__motto-ja[data-typing]');
  const mottoEn = document.querySelector('.hero__motto-en[data-typing]');

  const typeMottoLine = (element, speed) => new Promise((resolve) => {
    const text = element.dataset.typing || '';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!text || reducedMotion) {
      element.textContent = text;
      resolve();
      return;
    }

    element.textContent = '';
    element.classList.add('hero__motto-line--typing');

    let index = 0;
    const step = () => {
      if (index < text.length) {
        element.textContent += text[index];
        index += 1;
        setTimeout(step, speed);
        return;
      }

      element.classList.remove('hero__motto-line--typing');
      resolve();
    };

    step();
  });

  if (mottoJa && mottoEn) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      mottoJa.textContent = mottoJa.dataset.typing || mottoJa.textContent;
      mottoEn.textContent = mottoEn.dataset.typing || mottoEn.textContent;
    } else {
      setTimeout(async () => {
        mottoJa.textContent = '';
        mottoEn.textContent = '';
        await typeMottoLine(mottoJa, 110);
        await new Promise((resolve) => setTimeout(resolve, 500));
        await typeMottoLine(mottoEn, 95);
      }, 400);
    }
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
