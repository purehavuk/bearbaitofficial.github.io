    const ASCII_ART = `
WELCOME TO

 ▄▄▄▄   ▓█████  ▄▄▄       ██▀███   ▄▄▄▄    ▄▄▄       ██▓▄▄▄█████▓
▓█████▄ ▓█   ▀ ▒████▄    ▓██ ▒ ██▒▓█████▄ ▒████▄    ▓██▒▓  ██▒ ▓▒
▒██▒ ▄██▒███   ▒██  ▀█▄  ▓██ ░▄█ ▒▒██▒ ▄██▒██  ▀█▄  ▒██▒▒ ▓██░ ▒░
▒██░█▀  ▒▓█  ▄ ░██▄▄▄▄██ ▒██▀▀█▄  ▒██░█▀  ░██▄▄▄▄██ ░██░░ ▓██▓ ░ 
░▓█  ▀█▓░▒████▒ ▓█   ▓██▒░██▓ ▒██▒░▓█  ▀█▓ ▓█   ▓██▒░██░  ▒██▒ ░ 
░▒▓███▀▒░░ ▒░ ░ ▒▒   ▓▒█░░ ▒▓ ░▒▓░░▒▓███▀▒ ▒▒   ▓▒█░░▓    ▒ ░░   
▒░▒   ░  ░ ░  ░  ▒   ▒▒ ░  ░▒ ░ ▒░▒░▒   ░   ▒   ▒▒ ░ ▒ ░    ░    
 ░    ░    ░     ░   ▒     ░░   ░  ░    ░   ░   ▒    ▒ ░  ░      
 ░         ░  ░      ░  ░   ░      ░            ░  ░ ░           
      ░                                 ░                        
    ▒█████    █████▒  █████▒ ██▓ ▄████▄   ██▓ ▄▄▄       ██▓      
   ▒██▒  ██▒▓██   ▒ ▓██   ▒ ▓██▒▒██▀ ▀█  ▓██▒▒████▄    ▓██▒      
   ▒██░  ██▒▒████ ░ ▒████ ░ ▒██▒▒▓█    ▄ ▒██▒▒██  ▀█▄  ▒██░      
   ▒██   ██░░▓█▒  ░ ░▓█▒  ░ ░██░▒▓▓▄ ▄██▒░██░░██▄▄▄▄██ ▒██░      
   ░ ████▓▒░░▒█░    ░▒█░    ░██░▒ ▓███▀ ░░██░ ▓█   ▓██▒░██████▒  
   ░ ▒░▒░▒░  ▒ ░     ▒ ░    ░▓  ░ ░▒ ▒  ░░▓   ▒▒   ▓▒█░░ ▒░▓  ░  
     ░ ▒ ▒░  ░       ░       ▒ ░  ░  ▒    ▒ ░  ▒   ▒▒ ░░ ░ ▒  ░  
   ░ ░ ░ ▒   ░ ░     ░ ░     ▒ ░░         ▒ ░  ░   ▒     ░ ░     
       ░ ░                   ░  ░ ░       ░        ░  ░    ░  ░  
                                ░                                `;

(function () {
    'use strict';

    const SYSTEM_PREAMBLE = `MAL 9000 - UNiX SYSTEM v1.02
(C) purehavuk Industries, 1976-1979 - ALL RIGHTS RESERVED
Atrificial Intelligence Research Division

SHALL WE PLAY A GAME?`;
    const overlay = document.getElementById('terminal-boot');
    const screen = overlay && overlay.querySelector('.terminal-boot-screen');
    const output = document.getElementById('terminal-boot-output');
    const status = document.getElementById('terminal-boot-status');
    const diagnostic = document.getElementById('terminal-boot-diagnostic');
    if (!overlay || !screen || !output || !status || !diagnostic) return;

    const preambleDuration = 1600;
    const transferDuration = 7500;
    const receiveDuration = 5000;
    const lines = ASCII_ART.replace(/^\n|\s+$/g, '').split('\n').map(function (line) {
        return line.trimEnd();
    });
    const totalCharacters = lines.reduce((total, line) => total + line.length + 1, 0);
    const lineMarks = [];
    const diagnostics = [
        'RACCOON FOREMAN APPROVING UNIX LOGIN PROMPT',
        'RACCOON CLAWS ALIGNING PRIMARY CRT TERMINAL',
        'RACCOON CREW RESEATING RS-232 CABLES',
        'RACCOON OPERATOR GUARDING THE CARD READER',
        'RACCOON TECHS WARMING MAINFRAME CABINETS',
        'RACCOON ADMIN SORTING THE BATCH JOB SPOOLER',
        'RACCOON FOREMAN HANDING OUT PUNCH CARD CREDENTIALS',
        'RACCOON ENGINEER POLISHING CORE MEMORY PLANES',
        'RACCOON KERNEL MOUNTING /dev/raccoon0',
        'RACCOON SHIFT LEAD SORTING CARD DECKS BY SMELL',
        'RACCOON TECH RESEATING VACUUM TUBES',
        'RACCOON DROOL PURGED FROM MAGNETIC TAPE DRIVE',
        'RACCOON PARITY CHECK RUNNING ON CORE MEMORY',
        'RACCOON LINE PRINTER NOW BITING PAPER AGAIN',
        'RACCOON STORAGE DRUM SPINNING AT FUTURE SPEED',
        'RACCOON TIME-SHARING CONSENSUS STILL VIOLENT',
        'RACCOON COFFEE FLUSHED FROM SERIAL BUS',
        'RACCOON MICROCODE PATCHED WITH ELECTRICAL TAPE',
        'RACCOON ATTACHED TO POWER DISTRIBUTION CABINET',
        'RACCOON JAM REMOVED FROM CARD SORTER',
        'RACCOON EYE LASERS ALIGNED WITH CRT PHOSPHORS',
        'RACCOON UNIX DAEMON ACCEPTING OFFERINGS',
        'RACCOON TAPE-REEL TORQUE VERIFIED',
        'RACCOON INCIDENT LOGGED IN UNIX FILESYSTEM',
        'RACCOON BAUD RATE INCREASED TO IRRESPONSIBLE',
        'RACCOON TAPE REELS SPINNING FOR CYBERNETIC FUTURE',
        'RACCOON WARNED ABOUT RED BUTTON AGAIN',
        'RACCOON VOLTAGE REGULATORS ARE OSHA-ISH',
        'RACCOON ARITHMETIC UNIT DEMANDS MORE SNACKS',
        'RACCOON SCHEDULED MANDATORY UNION DUMPSTER BREAK',
        'CAFFEINATED HAMSTER SLAVES ENTERING WHEEL MODE',
        'CAFFEINATED HAMSTER WHEEL POWERING CARD READER',
        'HAMSTER WHEEL TOO SMALL: SIZE MATTERS',
        'CAFFEINATED HAMSTERS OVERSPINNING THE TAPE REEL',
        'HAMSTER-PER-SECOND RATING EXCEEDS UNIX LIMITS',
        'CAFFEINATED HAMSTER CREW FEEDING THE LINE PRINTER',
        'HAMSTERS BREWING ESPRESSO IN THE MACHINE ROOM',
        'CAFFEINATED HAMSTER SPIN-UP ON STORAGE DRUM',
        'HAMSTER WHEEL DRIVE COUPLED TO RS-232 MODEM',
        'CAFFEINATED HAMSTERS SORTING PUNCH CARDS BY PANIC',
        'HAMSTER SLAVE CLOCK SYNCHRONIZED TO 300 BAUD',
        'CAFFEINATED HAMSTER CORE MEMORY WARM-UP COMPLETE',
        'HAMSTER WHEEL GOVERNOR SMOKING NEAR VACUUM TUBES',
        'CAFFEINATED HAMSTERS CHEWING BAD UNIX COMMANDS',
        'HAMSTER-DRIVEN BATCH SPOOLER HAS TINY SCREAMS',
        'CAFFEINATED HAMSTER AUXILIARY BACKPLANE ONLINE',
        'HAMSTER WHEEL BELT SLIPPING ON COMMODORE PET',
        'CAFFEINATED HAMSTERS DEGAUSSING THEIR OWN THOUGHTS',
        'HAMSTER SLAVES REQUEST UNION COFFEE BREAK',
        'CAFFEINATED HAMSTER TAILS JAMMED IN CARD SORTER',
        'HAMSTER WHEEL OUTPUT ROUTED TO PAPER TAPE',
        'CAFFEINATED HAMSTERS PRIME THE BOOTSTRAP LOADER',
        'HAMSTER-POWERED ARITHMETIC UNIT MISCOUNTS SNACKS',
        'CAFFEINATED HAMSTER VENTILATION FAN NOW TOO FAST',
        'HAMSTER WHEEL CURRENT BLEEDING INTO SERIAL BUS',
        'CAFFEINATED HAMSTERS CHANTING THE UNIX MANUAL',
        'HAMSTER SLAVE LABOR FEEDS THE DISK PACK ARRAY',
        'CAFFEINATED HAMSTER MAINFRAME COOLANT CHECK PASSED',
        'REBELING HAMSPERS SHOVED EDDIE IN THE HAMPSTER WHEEL! I THINK HE\'S DEAD',
        'CAFFEINATED HAMSTERS DECLARE WAR AGAINST RACCOONS - WE\'RE F*CKED',
    ];
    window.BEARBAIT_TERMINAL_DIAGNOSTICS = diagnostics.slice();
    const shuffledDiagnostics = diagnostics.slice();

    for (let i = shuffledDiagnostics.length - 1; i > 0; i -= 1) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
        const message = shuffledDiagnostics[i];
        shuffledDiagnostics[i] = shuffledDiagnostics[swapIndex];
        shuffledDiagnostics[swapIndex] = message;
    }

    const selectedDiagnostics = shuffledDiagnostics.slice(0, 3);
    let count = 0;

    lines.forEach(function (line) {
        count += line.length + 1;
        lineMarks.push(count / totalCharacters);
    });

    document.documentElement.classList.add('terminal-loading');
    overlay.classList.add('active');
    output.textContent = SYSTEM_PREAMBLE;
    diagnostic.textContent = '';

    let displayedLines = 0;
    const start = performance.now();
    let lastDiagnostic = -1;

    function signalBurst(duration) {
        screen.classList.remove('signal-burst');
        void screen.offsetWidth;
        screen.classList.add('signal-burst');
        window.setTimeout(function () {
            screen.classList.remove('signal-burst');
        }, duration);
    }

    function render(time) {
        const elapsed = time - start;
        const transferElapsed = Math.max(elapsed - preambleDuration, 0);
        const progress = Math.min(transferElapsed / transferDuration, 1);
        const receiveProgress = Math.min(transferElapsed / receiveDuration, 1);
        const diagnosticIndex = Math.min(Math.floor(transferElapsed / (transferDuration / 3)), selectedDiagnostics.length - 1);

        if (elapsed < preambleDuration) {
            status.textContent = 'READY.';
            window.requestAnimationFrame(render);
            return;
        }

        if (displayedLines === 0) {
            output.textContent = '';
        }

        if (diagnosticIndex !== lastDiagnostic) {
            diagnostic.textContent = '> ' + selectedDiagnostics[diagnosticIndex];
            diagnostic.classList.remove('refreshing');
            void diagnostic.offsetWidth;
            diagnostic.classList.add('refreshing');
            signalBurst(90);
            lastDiagnostic = diagnosticIndex;
        }

        while (displayedLines < lines.length && receiveProgress >= lineMarks[displayedLines]) {
            output.textContent += (displayedLines ? '\n' : '') + lines[displayedLines];
            displayedLines += 1;
        }

        if (progress < 0.2) {
            status.textContent = 'DIALING UPLINK... 300 BPS';
        } else if (progress < 0.92) {
            status.textContent = 'RECEIVING WELCOME BUFFER... ' + Math.round(progress * 100) + '%';
        } else if (progress < 1) {
            status.textContent = 'VERIFYING FRAME... ' + Math.round(progress * 100) + '%';
        } else {
            status.textContent = 'LINK ESTABLISHED';
            signalBurst(100);
            overlay.classList.add('complete');
            document.documentElement.classList.remove('terminal-loading');
            window.setTimeout(function () {
                overlay.remove();
            }, 360);
            return;
        }

        window.requestAnimationFrame(render);
    }

    window.requestAnimationFrame(render);
}());

(function () {
    'use strict';

    function initializeOutboundRelay() {
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
        const relayOutput = overlay.querySelector('.terminal-relay-output');
        const relayDiagnostic = overlay.querySelector('.terminal-boot-diagnostic');
        const relayMessages = window.BEARBAIT_TERMINAL_DIAGNOSTICS || [
            'DEPLOYING BACKUP LLAMAS TO PRODUCTION',
            'VERIFYING PENGUIN PARITY BITS',
            'REALIGNING RACCOON WHISKER ANTENNAS'
        ];
        const relaySystemPreamble = [
            'MAL 9000 - UNiX SYSTEM v1.02',
            '(C) purehavuk Industries, 1976-1979 - ALL RIGHTS RESERVED',
            'Atrificial Intelligence Research Division',
            '',
            'SHALL WE PLAY A GAME?'
        ].join('\n');
        const defaultRelayOutput = relayOutput ? relayOutput.textContent.trim() : '';
        const relayLinkOutputs = {
            facebook: {
                label: 'FACEBOOK',
                art: [
                    '  ______             _                 _    ',
                    ' |  ____|           | |               | |   ',
                    ' | |__ __ _  ___ ___| |__   ___   ___ | | __',
                    ' |  __/ _` |/ __/ _ \\ \'_ \\ / _ \\ / _ \\| |/ /',
                    ' | | | (_| | (_|  __/ |_) | (_) | (_) |   < ',
                    ' |_|  \\__,_|\\___\\___|_.__/ \\___/ \\___/|_|\\_\\'
                ].join('\n')
            },
            tiktok: {
                label: 'TIKTOK',
                art: [
                    ' ______   __     __  __     ______   ______     __  __    ',
                    '/\\__  _\\ /\\ \\   /\\ \\/ /    /\\__  _\\ /\\  __ \\   /\\ \\/ /    ',
                    '\\/_/\\ \\/ \\ \\ \\  \\ \\  _"-.  \\/_/\\ \\/ \\ \\ \\/\\ \\  \\ \\  _"-.  ',
                    '   \\ \\_\\  \\ \\_\\  \\ \\_\\ \\_\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\ ',
                    '    \\/_/   \\/_/   \\/_/\\/_/     \\/_/   \\/_____/   \\/_/\\/_/ '
                ].join('\n')
            },
            youtube: {
                label: 'YOUTUBE',
                art: [
                    ' __   __  _______  __   __  _______  __   __  _______  _______ ',
                    '|  | |  ||       ||  | |  ||       ||  | |  ||  _    ||       |',
                    '|  |_|  ||   _   ||  | |  ||_     _||  | |  || |_|   ||    ___|',
                    '|       ||  | |  ||  |_|  |  |   |  |  |_|  ||       ||   |___ ',
                    '|_     _||  |_|  ||       |  |   |  |       ||  _   | |    ___|',
                    '  |   |  |       ||       |  |   |  |       || |_|   ||   |___ ',
                    '  |___|  |_______||_______|  |___|  |_______||_______||_______|'
                ].join('\n')
            },
            discord: {
                label: 'DISCORD',
                art: [
                    '________  .__                              .___',
                    '\\______ \\ |__| ______ ____  ___________  __| _/',
                    ' |    |  \\|  |/  ___// ___\\/  _ \\_  __ \\/ __ | ',
                    ' |    `   \\  |\\___ \\\\  \\__(  <_> )  | \\/ /_/ | ',
                    '/_______  /__/____  >\\___  >____/|__|  \\____ | ',
                    '        \\/        \\/     \\/                 \\/ '
                ].join('\n')
            },
            warsol: {
                label: 'WARSOL',
                art: [
                    '▗▖ ▗▖▗▞▀▜▌ ▄▄▄ ▄▄▄▄   ▄▄▄  ▄▄▄  █ ',
                    '▐▌ ▐▌▝▚▄▟▌█    █   █ ▀▄▄  █   █ █ ',
                    '▐▌ ▐▌     █    █▄▄▄▀ ▄▄▄▀ ▀▄▄▄▀ █ ',
                    '▐▙█▟▌          █                █ ',
                    '               ▀ '
                ].join('\n')
            }
        };

        function getRelayOutputKey(link) {
            const linkSignature = [
                link.getAttribute('aria-label') || '',
                link.textContent || '',
                link.getAttribute('href') || ''
            ].join(' ').toLowerCase();

            if (linkSignature.includes('facebook')) return 'facebook';
            if (linkSignature.includes('tiktok')) return 'tiktok';
            if (linkSignature.includes('youtube')) return 'youtube';
            if (linkSignature.includes('discord')) return 'discord';
            if (linkSignature.includes('warsol') || linkSignature.includes('warpsol')) return 'warsol';

            return '';
        }

        function updateRelayOutput(link) {
            if (!relayOutput) return;

            const outputKey = getRelayOutputKey(link);
            const linkOutput = relayLinkOutputs[outputKey];

            if (!linkOutput) {
                relayOutput.textContent = '\n' + defaultRelayOutput + '\n';
                return;
            }

            relayOutput.textContent = '\n' + [
                relaySystemPreamble,
                '',
                'OPEN "OUTBOUND RELAY",8,1',
                'TARGET: ' + linkOutput.label,
                'CARRIER: 300 BPS',
                'Loading Modern High-Definition Page:',
                '',
                linkOutput.art
            ].join('\n') + '\n';
        }

        function openRelayLink(link, href) {
            const opensInNewTab = link.target && link.target.toLowerCase() === '_blank';

            if (opensInNewTab && !href.startsWith('mailto:')) {
                window.open(href, '_blank', 'noopener,noreferrer');
                return;
            }

            window.location.href = href;
        }

        const relayNavDelay = 3000;
        const mobileSocialGlitchLead = 850;
        const mobileSocialQuery = window.matchMedia('(max-width: 768px)');
        const relayLinks = document.querySelectorAll('.social-card, .cover-credit a[href]');

        relayLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                if (link.classList.contains('glitching')) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault();
                link.classList.add('glitching');
                updateRelayOutput(link);
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

                const href = link.getAttribute('href');
                const glitchLead = link.classList.contains('social-card') && mobileSocialQuery.matches
                    ? mobileSocialGlitchLead
                    : 0;

                window.setTimeout(() => {
                    overlay.classList.add('active');
                }, glitchLead);

                window.setTimeout(() => {
                    openRelayLink(link, href);
                    window.setTimeout(() => {
                        link.classList.remove('glitching');
                        overlay.classList.remove('active');
                        if (relayScreen) relayScreen.classList.remove('signal-burst');
                    }, 1000);
                }, glitchLead + relayNavDelay);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeOutboundRelay, { once: true });
    } else {
        initializeOutboundRelay();
    }
}());
