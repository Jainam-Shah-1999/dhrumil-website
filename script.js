document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 1. Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 2. Smooth Scrolling & Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an internal anchor
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Close the mobile menu if it's open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }

                const targetSection = document.querySelector(targetId);
                
                // Use scrollIntoView for smooth scroll effect
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Optional: Close menu when clicking outside of it on mobile
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});