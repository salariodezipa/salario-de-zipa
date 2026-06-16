(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (!loadingScreen) return;

    if (prefersReducedMotion) {
      loadingScreen.remove();
      return;
    }

    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1500);
  }

  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || prefersReducedMotion) return;

    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const lagFactor = 0.12;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseenter', () => {
      cursor.classList.remove('hidden');
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.add('hidden');
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * lagFactor;
      cursorY += (mouseY - cursorY) * lagFactor;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let heroVisible = true;

    function updateNavbar() {
      const scrollY = window.scrollY;

      if (scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        heroVisible = scrollY < heroBottom - 100;
        if (heroVisible) {
          navbar.classList.add('hero-visible');
        } else {
          navbar.classList.remove('hero-visible');
        }
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  function initHeroParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg || prefersReducedMotion) return;

    function updateParallax() {
      const scrollY = window.scrollY;
      const parallaxAmount = scrollY * 0.3;
      heroBg.style.transform = `scale(1) translateX(0) translateY(${parallaxAmount}px)`;
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  function initWordBlurReveal() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent.trim();
    const words = text.split(/\s+/);
    heroTitle.innerHTML = '';

    let delay = 0.4;
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      span.style.animationDelay = delay + 's';

      if (word.includes('recuerdos') || word.includes('inolvidables')) {
        span.classList.add('gold');
      }

      heroTitle.appendChild(span);
      if (index < words.length - 1) {
        heroTitle.appendChild(document.createTextNode(' '));
      }

      delay += 0.05;
    });
  }

  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
  }

  function initFloatingPlates() {
    const plates = document.querySelectorAll('.plate');
    if (plates.length === 0 || prefersReducedMotion) return;

    let lastScrollY = 0;
    const rotations = [0, 0, 0];

    function updatePlates() {
      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;

      plates.forEach((plate, index) => {
        rotations[index] += scrollDelta * 0.05 * (index === 0 ? 1 : index === 1 ? -0.8 : 0.6);
        const baseRotation = index === 0 ? -2 : index === 1 ? -6 : 15;
        const currentRotation = baseRotation + rotations[index];
        plate.style.transform = plate.style.transform.replace(/rotate\([^)]+\)/, `rotate(${currentRotation}deg)`);
      });

      requestAnimationFrame(updatePlates);
    }

    updatePlates();
  }

  function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (prefersReducedMotion) {
      statNumbers.forEach(el => {
        el.textContent = el.dataset.target;
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1500;
          const startTime = performance.now();

          function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
          }

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.floor(easedProgress * target);

            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.5
    });

    statNumbers.forEach(el => observer.observe(el));
  }

  function initEventosCarousel() {
    const container = document.querySelector('.eventos-carousel-container');
    const carousel = document.querySelector('.eventos-carousel');
    if (!container || !carousel) return;

    if (prefersReducedMotion) return;

    function updateCarousel() {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top > viewportHeight || rect.bottom < 0) return;

      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top - 200) / (rect.height + 400)));
      const maxTranslate = -900;
      const translateX = 100 - (progress * (100 + Math.abs(maxTranslate)));

      carousel.style.transform = `translateX(${translateX}px)`;
    }

    window.addEventListener('scroll', updateCarousel, { passive: true });
    updateCarousel();
  }

  function initReservaForm() {
    const form = document.querySelector('.reserva-form form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      let message = `¡Hola! Me gustaría hacer una reserva.\n\n`;
      message += `Nombre: ${data.name || 'No proporcionado'}\n`;
      message += `Teléfono: ${data.phone || 'No proporcionado'}\n`;
      message += `Fecha: ${data.date || 'No proporcionada'}\n`;
      message += `Hora: ${data.time || 'No proporcionada'}\n`;
      message += `Personas: ${data.guests || 'No proporcionado'}\n`;
      message += `Tipo de evento: ${data.event || 'No proporcionado'}\n`;

      if (data.message) {
        message += `\nMensaje adicional: ${data.message}`;
      }

      const whatsappUrl = `https://wa.me/573101234567?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-overlay');
    const closeBtn = document.querySelector('.mobile-drawer-close');
    const drawerLinks = document.querySelectorAll('.mobile-drawer-links a');

    if (!menuBtn || !drawer) return;

    function openMenu() {
      drawer.classList.add('open');
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    drawerLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const items = document.querySelectorAll('.menu-item');

    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        items.forEach(item => {
          if (category === 'todos' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  function initMenuModal() {
    const modal = document.querySelector('.modal-overlay');
    const modalImg = document.querySelector('.modal-content img');
    const closeBtn = document.querySelector('.modal-close');
    const menuItems = document.querySelectorAll('.menu-item');

    if (!modal) return;

    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && modalImg) {
          modalImg.src = img.src;
          modalImg.alt = img.alt;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function initNewsletter() {
    const forms = document.querySelectorAll('.footer-newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input) {
          input.value = '';
          alert('¡Gracias por suscribirte!');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initCustomCursor();
    initNavbar();
    initHeroParallax();
    initWordBlurReveal();
    initScrollReveals();
    initFloatingPlates();
    initCounters();
    initEventosCarousel();
    initReservaForm();
    initMobileMenu();
    initMenuTabs();
    initMenuModal();
    initNewsletter();
  });

})();