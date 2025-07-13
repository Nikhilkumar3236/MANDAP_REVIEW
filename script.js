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


    // --- FINAL STEP JS: INTERSECTION OBSERVER FOR ALERTS ---
    const alertBox = document.getElementById('section-alert');
    const sections = document.querySelectorAll('.content-section');
    let alertTimer; // To store the timer

    const observerOptions = {
        root: null, // it is the viewport
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // isIntersecting is true when the element is visible
            if (entry.isIntersecting) {
                // Ignore the very first hero section
                if (entry.target.id === 'hero') {
                    return;
                }

                // Clear any existing timer to prevent overlaps
                clearTimeout(alertTimer);

                // Format the ID to a readable title (e.g., "glory-house" -> "GLORY HOUSE")
                const title = entry.target.id.replace('-', ' ').toUpperCase();
                
                // Show the alert
                alertBox.textContent = title;
                alertBox.classList.add('show');

                // Set a timer to hide the alert after 3 seconds
                alertTimer = setTimeout(() => {
                    alertBox.classList.remove('show');
                }, 3000);
            }
        });
    }, observerOptions);

    // Tell the observer to watch each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
