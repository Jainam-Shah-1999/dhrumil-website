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