document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 1. Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
    });

    // 2. Smooth Scrolling & Close Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Close the mobile menu if it's open
                if (navWrapper.classList.contains('active')) {
                    navWrapper.classList.remove('active');
                }

                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // 3. Close menu when clicking outside of it on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 && !navWrapper.contains(e.target) && !menuToggle.contains(e.target) && navWrapper.classList.contains('active')) {
            navWrapper.classList.remove('active');
        }
    });
});