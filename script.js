document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-overlay ul li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navOverlay.classList.toggle('active');
    });

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
    };

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- Intersection Observer for Alerts ---
    const alertBox = document.getElementById('section-alert');
    const sections = document.querySelectorAll('.content-section');
    let alertTimer;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'hero') {
                    return;
                }

                clearTimeout(alertTimer);

                const title = entry.target.id.replace('-', ' ').toUpperCase();
                
                alertBox.textContent = title;
                alertBox.classList.add('show');

                alertTimer = setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 3000);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
