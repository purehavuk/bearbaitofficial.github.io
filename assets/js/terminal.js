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
(C) purehavuk Industries, 1976-1979

COMMAND?`;
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
        'JUMPSTARTING HAMSTERS WITH CAFFEINE',
        'PUTTING SNEAKERS ON QUOKKAS',
        'ASKING CAPYBARAS TO APPROVE THE FIREWALL',
        'RESEATING OTTER-OPERATED NETWORK CABLES',
        'BRIBING POSSUMS TO LEAVE SLEEP MODE',
        'SPINNING UP FERRET-COOLED SERVERS',
        'ALIGNING PENGUINS WITH THE LOAD BALANCER',
        'DEPLOYING BACKUP LLAMAS TO PRODUCTION',
        'CONVINCING BEAVERS THIS IS NOT THEIR DAM(N) PROJECT',
        'HANDING BADGERS THEIR ADMIN CREDENTIALS',
        'POLISHING THE SLOTH-POWERED CACHE',
        'MOUNTING /dev/raccoon0 TO THE AUXILIARY BACKPLANE',
        'WAITING FOR SENIOR POSSUM TO FINISH DEFRAGMENTATION',
        'RESEATING VACUUM TUBES INSIDE THE CYBERNETIC BEAVER',
        'CLOCKING IN NIGHTSHIFT RACCOONS',
        'PURGING WALRUS SALIVA FROM MAGNETIC TAPE DRIVE',
        'LOADING FERRET-ASSISTED MEMORY MODULES',
        'VERIFYING PENGUIN PARITY BITS',
        'RECALIBRATING OTTER-POWERED COOLING PUMPS',
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
        'WARMING MAGNETIC CORE MEMORY WITH PENGUINS',
        'REBUILDING FILESYSTEM AFTER GOOSE INCIDENT',
        'INSTALLING ADDITIONAL RACCOON TO INCREASE THROUGHPUT',
        'SPINNING TAPE REELS FOR CYBERNETIC CAPYBARA',
        'DETECTING ILLEGAL WALRUS OVERCLOCK',
        'AWAITING APPROVAL FROM CENTRAL RACCOON AUTHORITY',
        'FEEDING SHRIMP TO MAINTENANCE OTTERS',
        'ADJUSTING FERRET VOLTAGE REGULATORS',
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
        'REMOVING PUNCH CARDS EATEN BY CAPYBARA',
        'WAITING FOR PENGUIN TO STOP SCREAMING',
        'PATCHING RACCOON KERNEL PANIC',
        'STARTING MOOSE-DRIVEN HYDRAULIC DISK ARRAY',
        'DETECTING POSSUM IN SUPERVISOR MODE',
        'CALIBRATING OTTER TAIL STABILIZERS',
        'FLIPPING GOOSE TO MAINTENANCE POSITION',
        'VERIFYING RACCOON UNION BREAK SCHEDULE',
        'CHECKING TAPE DRIVE FOR FERRET NESTING',
        'LOADING EXPERIMENTAL WALRUS CO-PROCESSOR',
        'SYNCING CYBORG RACCOONS WITH MAINFRAME CLOCK'
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
