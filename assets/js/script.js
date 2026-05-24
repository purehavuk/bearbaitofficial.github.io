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

    // Outbound terminal relay overlay helper
    let overlay = document.querySelector('.crt-loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'terminal-boot-overlay terminal-relay-overlay crt-loading-overlay';
        overlay.setAttribute('role', 'status');
        overlay.setAttribute('aria-label', 'Opening external link');
        overlay.innerHTML = `
            <div class="terminal-boot-screen">
                <div class="terminal-boot-header">
                    <span>MAL 9000 - OUTBOUND RELAY</span>
                    <span>MODE 80 / 300 BAUD</span>
                </div>
                <pre class="terminal-boot-output terminal-relay-output" aria-hidden="true">
MAL 9000 OS v1.1
(C) purehavuk Industries, 1974-1979

OPEN "OUTBOUND RELAY",8,1

               +------------------------------------------------+
               |       DESTINATION SIGNAL LOCK ACQUIRED         |
               |       TRANSMISSION CHANNEL STANDING BY         |
               +------------------------------------------------+
                </pre>
                <div class="terminal-boot-prompt" aria-hidden="true">
                    <span class="relay-status">ESTABLISHING SECURE UPLINK... 300 BPS</span><span class="terminal-boot-cursor"></span>
                </div>
                <div class="terminal-boot-diagnostic"></div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    const relayScreen = overlay.querySelector('.terminal-boot-screen');
    const relayDiagnostic = overlay.querySelector('.terminal-boot-diagnostic');
    const relayMessages = window.BEARBAIT_TERMINAL_DIAGNOSTICS || [
        'DEPLOYING BACKUP LLAMAS TO PRODUCTION',
        'VERIFYING PENGUIN PARITY BITS',
        'REALIGNING RACCOON WHISKER ANTENNAS'
    ];

    // Desktop & Mobile Click-Delay Glitch & Link Hold (1.5 seconds)
    const relayLinks = document.querySelectorAll('.social-card, a.btn-primary[href^="mailto:"]');
    relayLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (link.classList.contains('glitching')) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            link.classList.add('glitching');
            if (relayDiagnostic) {
                relayDiagnostic.textContent = '> ' + relayMessages[Math.floor(Math.random() * relayMessages.length)];
                relayDiagnostic.classList.remove('refreshing');
                void relayDiagnostic.offsetWidth;
                relayDiagnostic.classList.add('refreshing');
            }
            if (relayScreen) {
                relayScreen.classList.remove('signal-burst');
                void relayScreen.offsetWidth;
                relayScreen.classList.add('signal-burst');
            }
            overlay.classList.add('active');

            const href = link.getAttribute('href');

            setTimeout(() => {
                window.location.href = href;
                // Clean up classes after some delay to handle back navigation smoothly
                setTimeout(() => {
                    link.classList.remove('glitching');
                    overlay.classList.remove('active');
                    if (relayScreen) relayScreen.classList.remove('signal-burst');
                }, 1000);
            }, 1500);
        });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

})();
