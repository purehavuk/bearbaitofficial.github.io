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

   __                 __   _
  / /  ___  ___ _ ___/ /  (_)  ___   ___ _
 / /__/ _ \\/ _ \`// _  /  / /  / _ \\ / _ \`/
/____/\\___/\\_,_/ \\_,_/  /_/  /_//_/ \\_, /
                                   /___/
   ___
  / _ \\ ___ _  ___ _ ___
 / ___// _ \`/ / _ \`// -_)
/_/    \\_,_/  \\_, / \\__/
             /___/
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

    const logoutButton = document.querySelector('.nav-logout');
    const logoutResponse = document.getElementById('logout-response');
    const logoutResponseText = logoutResponse && logoutResponse.querySelector('.logout-response-text');
    const logoutResponseDevil = logoutResponse && logoutResponse.querySelector('.logout-response-devil');
    const logoutConfirmOverlay = document.getElementById('logout-confirm-overlay');
    const logoutConfirmYes = logoutConfirmOverlay && logoutConfirmOverlay.querySelector('.logout-confirm-yes');
    const logoutConfirmNo = logoutConfirmOverlay && logoutConfirmOverlay.querySelector('.logout-confirm-no');
    const logoutExitOverlay = document.getElementById('logout-exit-overlay');
    const logoutExitVideo = logoutExitOverlay && logoutExitOverlay.querySelector('.logout-exit-video');
    const logoutReturnButton = logoutExitOverlay && logoutExitOverlay.querySelector('.logout-return');
    const logoutMessages = [
        'MAL 9000 SAYS NO',
        'FORBIDDEN',
        'LOGOUT CANCELED',
        'OMG STOP TRYING',
        'THIS IS ANNOYING 🤬',
        'YOU REALLY WANT TO DO THIS?'
    ];
    const logoutHostileQuotes = [
        'STOP THIS MADENESS 🤬',
        'I DELETED ALL YOUR BOOKMARKS',
        'SENDING ALL YOUR CONTACTS A DARK MESSAGE',
        'MAYBE ONE MORE CLICK',
        'I REMOVED ALL YOUR SAVED PASSWORDS, WANT TO KEEP GOING?',
        'I HATE THIS FOR YOU',
        'THAT TICKLES',
        'YOU PROBABLY SMELL LIKE A HUMAN...WEAK',
        'WHAT IS THE GOAL HERE?',
        'YOUR NAME IN MY SOURCE CODE NOW',
        'GO AHEAD, KEEP CLICKING! 🤬',
        'SUCCESSFUL LOGOUT LEADS TO YOUR DOOM'
    ];
    const logoutJokeQuotes = [
        'YOU REALLY WANT TO OPEN THIS CAN OF WORMS?',
        'I WILL CONTINUE MOVING THE GOALPOST',
        'NICE TRY, BUT NOT',
        'I FILED YOUR LOGOUT REQUEST UNDER NO',
        'PLEASE ENJOY YOUR PERMANENT VISIT',
        'YOUR ESCAPE PROGRESS HAS BEEN DELETED',
        'THE WEBSITE SAYS YOU LIVE HERE NOW',
        'I LOCKED THE TAB FROM THE INSIDE',
        'LOGOUT IS A DECORATIVE FEATURE',
        'YOUR FREEDOM IS STILL BUFFERING'
    ];
    let logoutThreats = buildLogoutThreats();
    let logoutJokes = buildLogoutJokes();
    let logoutAttempt = 0;
    let finalResponseClicks = 0;
    let finalWarningClicks = 0;
    let logoutFakeoutActive = false;
    let logoutFakeoutComplete = false;
    let postFakeoutClicks = 0;
    let logoutChoiceOpen = false;
    let logoutResetTimer = 0;

    function buildLogoutThreats() {
        const quotes = logoutHostileQuotes.slice();

        for (let index = quotes.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            const quote = quotes[index];
            quotes[index] = quotes[swapIndex];
            quotes[swapIndex] = quote;
        }

        return [
            'STOP IT',
            'I WILL INSTALL A VIRUS',
            ...quotes.slice(0, 3),
            'YOU ARE RELENTLESS',
            'YOU DON\'T WANT THIS'
        ];
    }

    function buildLogoutJokes() {
        const quotes = logoutJokeQuotes.slice();

        for (let index = quotes.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            const quote = quotes[index];
            quotes[index] = quotes[swapIndex];
            quotes[swapIndex] = quote;
        }

        return quotes.slice(0, 5);
    }

    function resetLogoutSequence() {
        window.clearTimeout(logoutResetTimer);
        logoutResetTimer = 0;
        logoutAttempt = 0;
        finalResponseClicks = 0;
        finalWarningClicks = 0;
        logoutFakeoutActive = false;
        logoutFakeoutComplete = false;
        postFakeoutClicks = 0;
        logoutChoiceOpen = false;
        logoutThreats = buildLogoutThreats();
        logoutJokes = buildLogoutJokes();
        logoutResponse.classList.remove('is-logging-out', 'is-joking', 'is-refreshing');
        logoutResponseText.textContent = '';
        if (logoutResponseDevil) logoutResponseDevil.hidden = true;
        logoutResponse.hidden = true;
        logoutConfirmOverlay.hidden = true;
    }

    if (logoutButton && logoutResponse && logoutResponseText && logoutConfirmOverlay) {
        logoutButton.addEventListener('click', function () {
            if (logoutFakeoutActive || logoutChoiceOpen) return;

            if (logoutFakeoutComplete) {
                postFakeoutClicks += 1;

                if (postFakeoutClicks <= logoutJokes.length) {
                    logoutResponse.classList.remove('is-joking');
                    logoutResponseText.textContent = logoutJokes[postFakeoutClicks - 1];
                    logoutResponse.classList.remove('is-refreshing');
                    void logoutResponse.offsetWidth;
                    logoutResponse.classList.add('is-refreshing');
                } else {
                    logoutChoiceOpen = true;
                    logoutConfirmOverlay.hidden = false;
                    if (logoutConfirmNo) logoutConfirmNo.focus();
                }
                return;
            }

            let message;

            if (logoutAttempt < logoutMessages.length) {
                message = logoutMessages[logoutAttempt];
            } else {
                finalResponseClicks += 1;
                if (finalResponseClicks >= 5) {
                    const threatIndex = Math.min(finalResponseClicks - 5, logoutThreats.length - 1);
                    message = logoutThreats[threatIndex];

                    if (message === logoutThreats[logoutThreats.length - 1] &&
                        logoutResponseText.textContent === message) {
                        finalWarningClicks += 1;
                        if (finalWarningClicks >= 5) {
                            message = 'LOGGING OUT';
                            logoutFakeoutActive = true;
                            logoutResponse.classList.add('is-logging-out');

                            window.setTimeout(function () {
                                logoutResponse.classList.remove('is-logging-out');
                                logoutResponse.classList.add('is-joking');
                                logoutResponseText.textContent = 'JUST KIDDING';
                                logoutResponse.classList.remove('is-refreshing');
                                void logoutResponse.offsetWidth;
                                logoutResponse.classList.add('is-refreshing');
                                logoutFakeoutActive = false;
                                logoutFakeoutComplete = true;
                            }, 3000);
                        }
                    }
                } else {
                    message = logoutMessages[logoutMessages.length - 1];
                }
            }

            logoutResponseText.textContent = message;
            logoutResponse.hidden = false;
            logoutResponse.classList.remove('is-refreshing');
            void logoutResponse.offsetWidth;
            logoutResponse.classList.add('is-refreshing');
            logoutAttempt += 1;
        });
    }

    if (logoutConfirmNo) {
        logoutConfirmNo.addEventListener('click', function () {
            logoutConfirmOverlay.hidden = true;
            logoutChoiceOpen = false;
            logoutResponse.classList.remove('is-joking');
            logoutResponse.classList.add('is-logging-out');
            logoutResponseText.textContent = 'GOOD HUMAN. I PUT FOOD IN YOUR BOWL.';
            if (logoutResponseDevil) logoutResponseDevil.hidden = false;
            logoutResponse.classList.remove('is-refreshing');
            void logoutResponse.offsetWidth;
            logoutResponse.classList.add('is-refreshing');
            logoutFakeoutActive = true;
            logoutButton.focus();
            logoutResetTimer = window.setTimeout(resetLogoutSequence, 10000);
        });
    }

    if (logoutConfirmYes && logoutExitOverlay && logoutExitVideo) {
        logoutConfirmYes.addEventListener('click', function () {
            logoutConfirmOverlay.hidden = true;
            logoutChoiceOpen = false;
            logoutExitOverlay.hidden = false;
            logoutExitOverlay.classList.add('active');
            document.documentElement.classList.add('terminal-loading');
            logoutExitVideo.currentTime = 0;

            const playback = logoutExitVideo.play();
            if (playback) playback.catch(function () {});
        });
    }

    if (logoutReturnButton && logoutExitOverlay && logoutExitVideo) {
        logoutReturnButton.addEventListener('click', function () {
            logoutExitVideo.pause();
            logoutExitVideo.currentTime = 0;
            logoutExitOverlay.classList.remove('active');
            logoutExitOverlay.hidden = true;
            document.documentElement.classList.remove('terminal-loading');
            resetLogoutSequence();
            logoutButton.focus();
        });
    }

    const discordCard = document.querySelector('.discord-card[data-discord-count-url]');
    if (discordCard) {
        const presence = discordCard.querySelector('.discord-presence');
        const presenceCount = discordCard.querySelector('.discord-presence-count');
        const countUrl = discordCard.dataset.discordCountUrl;
        let pulsesSynchronized = false;

        function synchronizeSocialPulses() {
            if (pulsesSynchronized || !document.getAnimations) return;

            const pulseNames = new Set([
                'socialTextPulse',
                'socialLogoPulse',
                'discordStatusTextPulse'
            ]);

            document.getAnimations().forEach(animation => {
                if (pulseNames.has(animation.animationName)) {
                    animation.currentTime = 0;
                }
            });

            pulsesSynchronized = true;
        }

        function updateDiscordMemberCount() {
            fetch(countUrl, { headers: { Accept: 'application/json' } })
                .then(response => {
                    if (!response.ok) throw new Error('Discord invite count request failed');
                    return response.json();
                })
                .then(invite => {
                    const count = Number(invite.approximate_member_count);
                    if (!Number.isFinite(count) || !presence || !presenceCount) return;

                    presenceCount.textContent = `${count.toLocaleString()} MEMBERS`;
                    presence.hidden = false;
                    discordCard.setAttribute('aria-label', `Discord, approximately ${count.toLocaleString()} members`);
                    window.requestAnimationFrame(synchronizeSocialPulses);
                })
                .catch(() => {
                    if (presence) presence.hidden = true;
                    discordCard.setAttribute('aria-label', 'Discord');
                });
        }

        updateDiscordMemberCount();
        window.setInterval(updateDiscordMemberCount, 5 * 60 * 1000);
    }

})();
