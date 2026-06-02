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
        'NOW WITH 100% MORE RACCOONS',
        'CAFFINATED HAMSTERS ON WHEELS SPINNING UP QUANTUM CO-PROCESSORS',
        'USELESS QUOKKAS ARE SMILING INM WEBCAMS',
        'ASKING CAPYBARAS TO APPROVE THE FIREWALL',
        'RESEATING OTTER-OPERATED NETWORK CABLES',
        'BRIBING POSSUMS TO LEAVE SLEEP MODE SETTINNGS ALONE',
        'FERRET-POWERED SERVERS ARE GETTING WARMED UP',
        'ALIGNING PENGUINS WITH THE LOAD BALANCER',
        'DEPLOYING BACKUP LLAMAS TO PRODUCTION',
        'CONVINCING BEAVERS THIS IS NOT THEIR DAM(N) PROJECT',
        'HANDING NFC BADGES TO BADGERS AS ADMIN CREDENTIALS',
        'POLISHING THE SLOTH-POWERED CACHE',
        'MOUNTING /dev/raccoon0 TO THE AUXILIARY BACKPLANE',
        'WAITING FOR SENIOR POSSUM TO FINISH DEFRAGMENTATION',
        'RESEATING VACUUM TUBES INSIDE THE CYBERNETIC BEAVER',
        'CLOCKING IN NIGHTSHIFT RACCOONS',
        'PURGING DASCHOUND SALIVA FROM MAGNETIC TAPE DRIVE',
        'LOADING RAT-ASSISTED MEMORY MODULES',
        'VERIFYING PENGUIN RAM IS IN PARITY',
        'VALIDATING PENGUIN-POWERED COOLING PUMPS ARE OPERATIONAL',
        'CHECKING RACCOON CLAW ALIGNMENT ON PRIMARY TERMINAL',
        'SPINNING UP MOOSE-DRIVEN STORAGE DRUM',
        'WAITING FOR CAPYBARA CONSENSUS PROTOCOL',
        'DEGAUSSING PARANOID GOOSE',
        'FLUSHING SQUID INK FROM SERIAL BUS',
        'PATCHING CYBORG RACCOON MICROCODE',
        'REATTACHING LLAMA TO POWER DISTRIBUTION UNIT',
        'INITIALIZING WALRUS-OPERATED PUNCH CARD READER',
        'CHECKING FOR FERRETS IN LOGIC CIRCUITS',
        'UNJAMMING POSSUM FROM CARD SORTER',
        'ALIGNING RACOON EYE LASERS WITH CRT PHOSPHORS',
        'LOADING EMOTIONAL SUPPORT OTTER DAEMONS',
        'VERIFYING MOOSE TORQUE SPECIFICATIONS',
        'WARMING MAGNETIC CORE MEMORY WITH CAMELS',
        'REBUILDING FILESYSTEM AFTER GOOSE INCIDENT',
        'INSTALLING ADDITIONAL RACCOON TO INCREASE THROUGHPUT',
        'SPINNING TAPE REELS FOR CYBERNETIC CAPYBARA',
        'MAKING SURE WALRUS DOES HIT RED BUTTON LABELED "DO NOT PRESS"',
        'AWAITING APPROVAL FROM CENTRAL CYBERNETIC RACCOON AUTHORITY',
        'FEEDING SHRIMP TO MAINTENANCE OTTERS',
        'ADJUSTING COYOTE VOLTAGE REGULATORS',
        'RESTARTING POSSUM AFTER FATAL PHILOSOPHY ERROR',
        'TESTING VACUUM TUBE INTEGRITY WITH PENGUIN',
        'VERIFYING THAT MOOSE IS STILL OSHA CERTIFIED',
        'REPLACING BURNT FUSES INSIDE THE RACOON MAINFRAME',
        'LOADING CYBORG GOOSE BOOTSTRAP ROUTINES',
        'INSTALLING OTTER-ASSISTED FLOATING POINT UNIT',
        'CHECKING COOLANT LEVELS IN WALRUS CHAMBER',
        'REALIGNING RACCOON WHISKER ANTENNAS',
        'SCANNING FOR HOSTILE FERRET ACTIVITY',
        'INITIALIZING BEE... ERROR: NO BEES ALLOWED',
        'REMOVING HALF-EATEN PUNCH CARDS EATEN BY GUINEA PIGS',
        'WAITING FOR PENGUIN TO STOP SCREAMING',
        'PATCHING RACCOON KERNEL PANIC',
        'STARTING MOOSE-DRIVEN HYDRAULIC DISK ARRAY',
        'DETECTING POSSUM IN SUPERVISOR MODE',
        'CALIBRATING OTTER TAIL STABILIZERS',
        'FLIPPING GOOSE TO MAINTENANCE POSITION',
        'DETECTING RACCOON UNSCHEDULED UNION COFFEE BREAK',
        'CHECKING TAPE DRIVE FOR FERRET NESTING',
        'DETCTING TO MNAY RACOON TPYOS IN PRMIARY COLONAL - TIME TO PANIC!',
        'DIRECTING LEMMINGS TO SAFELY DISMOUNT FROM POWERED TURNTABLE',
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
