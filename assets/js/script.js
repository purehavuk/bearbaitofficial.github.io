/**
 * Prevail — Scroll Spy
 * Watches the page sections and highlights the matching
 * navbar anchor link as the user scrolls.
 */

(function () {
    'use strict';

    const navbarHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
        10
    ) || 56;

    const links    = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

    function onScroll() {
        // Find the last section whose top is at or above the viewport midpoint
        const scrollY    = window.scrollY;
        const midpoint   = scrollY + navbarHeight + 64;
        let activeIndex  = 0;

        sections.forEach((section, i) => {
            if (section.offsetTop <= midpoint) activeIndex = i;
        });

        links.forEach((link, i) => {
            link.classList.toggle('active', i === activeIndex);
        });
    }

    // Immersive CRT loading overlay helper
    let overlay = document.querySelector('.crt-loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'crt-loading-overlay';
        overlay.innerHTML = `
            <div class="loading-title">ESTABLISHING SECURE UPLINK...</div>
            <div class="loading-sub">PLEASE HOLD FOR RELAY TRANSIT...</div>
        `;
        document.body.appendChild(overlay);
    }

    // Desktop & Mobile Click-Delay Glitch & Link Hold (1.5 seconds)
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (card.classList.contains('glitching')) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            card.classList.add('glitching');
            overlay.classList.add('active');

            const href = card.getAttribute('href');

            setTimeout(() => {
                window.location.href = href;
                // Clean up classes after some delay to handle back navigation smoothly
                setTimeout(() => {
                    card.classList.remove('glitching');
                    overlay.classList.remove('active');
                }, 1000);
            }, 1500);
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

})();