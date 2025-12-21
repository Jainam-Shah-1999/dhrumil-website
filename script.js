// Mobile Menu Toggle
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#navMenu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
menuLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuLinks.classList.remove('active');
    });
});

// Smooth Scroll for Navigation
menuLinks.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

/* Scroll-triggered animations using IntersectionObserver */
(function() {
    if ('IntersectionObserver' in window === false) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const map = [
        { selector: '#about .section-title', anim: 'slide-left', stagger: 20 },
        { selector: '#about .text-block p', anim: 'fade-up', stagger: 60 },
        { selector: '#services .section-title', anim: 'slide-left', stagger: 20 },
        { selector: '#services .service-box', anim: 'zoom-in', stagger: 80 },
        { selector: '#why-us .grid-item', anim: 'alternate', stagger: 80 },
        { selector: '#why-us .workflow-steps .step', anim: 'fade-up', stagger: 100 },
        { selector: '#infrastructure .infra-list li', anim: 'fade-up', stagger: 50 },
        { selector: '#software .software-card', anim: 'zoom-in', stagger: 60 }
    ];

    map.forEach(({ selector, anim, stagger }) => {
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((el, i) => {
            // determine animation type (support 'alternate')
            let type = anim;
            if (anim === 'alternate') type = (i % 2 === 0) ? 'slide-left' : 'slide-right';

            if (!el.hasAttribute('data-anim')) el.setAttribute('data-anim', type);
            el.style.setProperty('--delay', `${i * stagger}ms`);

            if (el.classList.contains('service-box') || el.classList.contains('software-card')) {
                el.classList.add('reveal-elevate');
            }

            // small accessibility: ensure focusable elements become visible when focused
            el.addEventListener('focus', () => el.classList.add('is-visible'));

            observer.observe(el);
        });
    });

    // Also allow hover to trigger a gentle reveal when element is near viewport (optional)
    document.addEventListener('mouseover', (e) => {
        const el = e.target.closest('[data-anim]');
        if (!el) return;
        // if not visible yet, quickly reveal on hover for better interactivity
        if (!el.classList.contains('is-visible')) {
            el.classList.add('is-visible');
        }
    });
})();