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
    if ('IntersectionObserver' in window === false) return; // graceful fallback

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const groups = [
        { selector: '#about .container', stagger: 20 },
        { selector: '#services .service-box', stagger: 80 },
        { selector: '#why-us .grid-item', stagger: 80 },
        { selector: '#why-us .workflow-steps .step', stagger: 100 },
        { selector: '#infrastructure .infra-list li', stagger: 60 }
    ];

    groups.forEach(({ selector, stagger }) => {
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((el, i) => {
            if (!el.hasAttribute('data-anim')) el.setAttribute('data-anim', 'fade-up');
            el.style.setProperty('--delay', `${i * stagger}ms`);
            // optionally add subtle elevation on reveal for card-like elements
            if (el.classList.contains('software-card') || el.classList.contains('service-box')) {
                el.classList.add('reveal-elevate');
            }
            observer.observe(el);
        });
    });
})();