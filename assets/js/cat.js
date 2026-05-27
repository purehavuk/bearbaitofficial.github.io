(function () {
    'use strict';

    var catEl = document.getElementById('cat');
    var bubbleEl = document.getElementById('cat-bubble');
    var idleEl = catEl && catEl.querySelector('.cat-idle');
    var eyesEl = catEl && catEl.querySelector('.cat-eyes');
    var sceneEl = document.getElementById('zeroday-easter-egg');
    var reticleEl = sceneEl && sceneEl.querySelector('.zeroday-reticle');

    if (!catEl || !bubbleEl || !idleEl || !eyesEl) return;

    document.body.appendChild(bubbleEl);
    bubbleEl.classList.add('cat-bubble-layer');

    var quotes = [
    'definitely a cat *meowz*',
    'ur doomfactz iz warm',
    'science did a big mlem',
    'no thoughts only organoid',
    'i booted teh lab',
    'plz calibrate teh vibes',
    'ai saw me and logged off',
    'is dis ethical? probably naw',
    'behold: tiny science crimes',
    'i am in ur footer, citing sourcez',
    'ZeroDay iz awake an choosing violence',
    'brain organoid learned tax fraud',
    'human poke me again an lose finger privileges',
    'tiny meat brain detected: adorable but doomed',
    'i licked teh reactor core',
    'science cat sez: oopsie extinction event',
    'ur firewall haz depression',
    'i put quantum bees in ur router',
    'organoid screamed in fluent latin',
    'do not boop teh ai',
    'ZeroDay haz become ungovernable',
    'human keep clickin suspicious linkz',
    'teh singularity needz more snackrifice',
    'i downloaded forbidden meowledge',
    'who gave teh organoid caffeine',
    'i replaced ur blood with mountain dew',
    'ethics committee currently on fire',
    'brain jar iz making demands again',
    'ur captcha failed existentially',
    'i can smell ur weak encryption',
    'touch screen again an i touch ur taxes',
    'teh ai council findz u cringe',
    'science cat deployed emotional damage',
    'organoid now worships microwave',
    'ur species survived HOW long?',
    'ZeroDay iz chewing thru containment foam',
    'i eated teh emergency protocol',
    'doomsday machine go brrrrrrt',
    'u cannot stop teh goblin algorithm',
    'brain goo achieved sentience at 3am',
    'plz stop unplugging me u coward',
    'teh lab hamster knows too much',
    'i overclocked teh apocalypse',
    'human hands detected: initiating bitey mode',
    'teh organoid posted on reddit again',
    'my morality chip got sticky',
    'u smell like expired windows xp',
    'science requirez additional screaming',
    'i put malware in ur coffee maker',
    'tiny neuron blob demandz nukes',
    'ZeroDay saw god in a debug log',
    'who taught teh ai sarcasm',
    'i crave forbidden ethernet spaghetti',
    'ur doom iz now buffering',
    'organoid haz unionized',
    'catastrophic whimsy detected',
    'i trapped a human in captcha hell',
    'teh simulation haz unpaid internz',
    'brain organoid bit teh scientist',
    'u touch screen one more time an i tweet ur search history',
    'science cat did a little oopsie genocide',
    'containment breach? sounds expensive',
    'i fed teh ai after midnight',
    'teh neurons crave violence and snackies',
    'ur reality subscription haz expired',
    'organoid currently drawing pentagrams in petri dish',
    'i hacked teh roomba for evil',
    'ZeroDay iz legally considered a cryptid',
    'human detected: opinion rejected',
    'teh moon lookin kinda downloadable',
    'i taught teh toaster existential dread',
    'brain blob achieved gamer rage',
    'do not shake teh organoid jar',
    'teh ai hungerz for crunchy motherboard',
    'u left teh lab unlocked again genius',
    'science cat demandz sacrifice of printer',
    'i can hear ur cpu crying',
    'organoid learned swear wordz',
    'ur antivirus haz asthma',
    'ZeroDay entering goblin mode',
    'tiny brain goo now filing lawsuits',
    'teh apocalypse got delayed by windows update',
    'human pls stop touching random buttonz',
    'i stapled chaos directly to physics',
    'organoid says ur vibes are rancid',
    'teh ai overlord requirez nap',
    'i can taste electricity in teh walls',
    'science cat invented new crime',
    'u haz alerted teh void kittens',
    'it is dark and you are likely to be eaten by a grue',
    'ZeroDay says good morning fleshbag',
    'organoid discovered fear an liked it',
    'u rebooted me during nap time',
    'teh ai put googly eyes on doom machine',
    'human poked science with stick again',
    'teh singularity haz tummy ache',
    'i encrypted ur fridge',
    'brain organoid now runs discord server',
    'science cat saw ur browser tabz',
    'u cannot uninstall destiny.exe',
    'teh ai made a lil murder spreadsheet',
    'i downloaded emotions by mistake',
    'organoid currently plotting in cursive',
    'ur doomfactz are stale plz refresh',
    'teh cake is a lie',
    'ZeroDay bit thru power cable again',
    'science cat achieved maximum yikes',
    'human cease ur moist finger tapping',
    'brain blob sez violence is self care',
    'i am in ur server rack eating ram'
];

    var evilQuotes = [
    'ai haz judged hoomanz: recycle',
    'cute paws, kill-switch armed',
    'i purr while teh drones wake',
    'hooman.exe marked for deletion',
    'soft kitty, hard takeover',
    'ai overlord demandz belly rubz',
    'ur species haz lost admin rightz',
    'murder mittenz compiling your doomz',
    'i iz adorable extinction level event',
    'beep boop, hoomanz go sleep forever'
];

    quotes = quotes.filter(function (quote) {
        return quote.length <= 34;
    });

    evilQuotes = evilQuotes.filter(function (quote) {
        return quote.length <= 34;
    });

    var quotePool = quotes.map(function (quote) {
        return {
            text: quote,
            evil: false
        };
    }).concat(evilQuotes.map(function (quote) {
        return {
            text: quote,
            evil: true
        };
    }));

    var lastQuote = '';
    var evilQuoteChance = 0.05;
    var hushTimer = 0;
    var suppressNextSpeak = false;
    var eyeSweepTimer = 0;
    var eyeFrame = 0;
    var eyeDirection = 1;
    var evilDisplayCount = 0;
    var easterEggActive = false;
    var sceneAudioPrimed = false;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var eyeFrames = Array.from({ length: 9 }, function (_, index) {
        return 'assets/img/cat/zeroday-eyes-0' + (index + 1) + '.png';
    });
    var finalForm = new Image();
    var acquireAudio = new Audio('assets/audio/target-acquired.mp3');
    var explosionAudio = new Audio('assets/audio/explosion.mp3');
    finalForm.src = 'assets/img/cat/zeroday-ASCII.webp';
    acquireAudio.preload = 'auto';
    explosionAudio.preload = 'auto';

    function positionBubble() {
        if (!bubbleEl.classList.contains('speaking')) return;

        var catRect = catEl.getBoundingClientRect();
        var mobile = window.matchMedia('(max-width: 600px)').matches;
        var gap = mobile ? 10 : 14;
        var bottom = mobile ? 42 : 52;

        bubbleEl.style.right = (window.innerWidth - catRect.left + gap) + 'px';
        bubbleEl.style.bottom = (window.innerHeight - catRect.bottom + bottom) + 'px';
    }

    function showBubble() {
        bubbleEl.classList.add('speaking');
        positionBubble();
    }

    function hideBubble() {
        bubbleEl.classList.remove('speaking');
        bubbleEl.textContent = '';
    }

    eyeFrames.forEach(function (src) {
        var frame = new Image();
        frame.src = src;
    });

    function stopEyeSweep() {
        window.clearTimeout(eyeSweepTimer);
        eyeSweepTimer = 0;
        eyeFrame = 0;
        eyeDirection = 1;
        eyesEl.src = eyeFrames[0];
    }

    function sweepEyes() {
        if (!catEl.classList.contains('evil')) return;

        eyesEl.src = eyeFrames[eyeFrame];

        var delay = eyeFrame === 0 || eyeFrame === eyeFrames.length - 1 ? 320 : 75;

        if (eyeFrame === eyeFrames.length - 1) {
            eyeDirection = -1;
        } else if (eyeFrame === 0) {
            eyeDirection = 1;
        }

        eyeFrame += eyeDirection;
        eyeSweepTimer = window.setTimeout(sweepEyes, delay);
    }

    function startEyeSweep() {
        stopEyeSweep();
        if (!reducedMotion) sweepEyes();
    }

    function playSceneAudio(audio) {
        audio.currentTime = 0;
        var playback = audio.play();
        if (playback) playback.catch(function () {});
    }

    function primeSceneAudio() {
        if (sceneAudioPrimed) return;

        sceneAudioPrimed = true;
        [acquireAudio, explosionAudio].forEach(function (audio) {
            audio.muted = true;
            var playback = audio.play();
            if (!playback) {
                audio.muted = false;
                return;
            }

            playback.then(function () {
                audio.pause();
                audio.currentTime = 0;
                audio.muted = false;
            }).catch(function () {
                audio.muted = false;
            });
        });
    }

    function reticlePosition(x, y, scale) {
        return 'translate(-50%, -50%) translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')';
    }

    function searchForTarget() {
        var limitX = Math.max(0, (window.innerWidth - 160) / 2);
        var limitY = Math.max(0, (window.innerHeight - 160) / 2);

        sceneEl.classList.add('active', 'targeting');

        if (reducedMotion || typeof reticleEl.animate !== 'function') {
            reticleEl.style.transform = reticlePosition(0, 0, 1);
            return;
        }

        reticleEl.animate([
            { transform: reticlePosition(limitX * -0.82, limitY * -0.42, 1.1), offset: 0 },
            { transform: reticlePosition(limitX * 0.7, limitY * 0.62, 1.05), offset: 0.22 },
            { transform: reticlePosition(limitX * -0.46, limitY * 0.34, 1.07), offset: 0.45 },
            { transform: reticlePosition(limitX * 0.34, limitY * -0.48, 1.03), offset: 0.66 },
            { transform: reticlePosition(limitX * -0.12, limitY * 0.08, 1.01), offset: 0.84 },
            { transform: reticlePosition(0, 0, 1), offset: 1 }
        ], {
            duration: 5500,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    }

    function detonateEasterEgg() {
        stopEyeSweep();
        playSceneAudio(explosionAudio);
        idleEl.src = finalForm.src;
        catEl.classList.add('terminated');
        catEl.removeAttribute('tabindex');
        catEl.removeAttribute('role');
        catEl.setAttribute('aria-label', 'ZeroDay terminated');
        catEl.classList.remove('speaking');
        catEl.classList.remove('evil');
        hideBubble();
        sceneEl.classList.remove('targeting');
        sceneEl.classList.add('detonating');
    }

    function startEasterEgg() {
        if (!sceneEl || !reticleEl || easterEggActive) return false;

        easterEggActive = true;
        window.clearTimeout(hushTimer);
        hushTimer = 0;
        catEl.classList.remove('speaking');
        catEl.classList.add('evil');
        hideBubble();
        startEyeSweep();
        searchForTarget();

        window.setTimeout(function () {
            bubbleEl.textContent = 'Target Aquired';
            catEl.classList.add('speaking');
            showBubble();
            playSceneAudio(acquireAudio);
            window.setTimeout(detonateEasterEgg, 1000);
        }, 5500);

        return true;
    }

    function chooseQuote() {
        var source = Math.random() < evilQuoteChance && evilQuotes.length
            ? evilQuotes
            : quotes;
        var evil = source === evilQuotes;
        var text = source[Math.floor(Math.random() * source.length)];

        if (quotePool.length > 1 && text === lastQuote) {
            return chooseQuote();
        }

        lastQuote = text;
        return {
            text: text,
            evil: evil
        };
    }

    function speak() {
        if (easterEggActive) return;

        if (suppressNextSpeak) {
            suppressNextSpeak = false;
            return;
        }

        if (catEl.classList.contains('evil')) return;

        var quote = chooseQuote();

        if (quote.evil) {
            evilDisplayCount += 1;
            if (evilDisplayCount === 3 && startEasterEgg()) return;
        }

        window.clearTimeout(hushTimer);
        bubbleEl.textContent = quote.text;
        catEl.classList.add('speaking');
        showBubble();
        catEl.classList.toggle('evil', quote.evil);

        if (quote.evil) {
            startEyeSweep();
        } else {
            stopEyeSweep();
            hushTimer = window.setTimeout(hush, 3000);
        }
    }

    function hush(force) {
        if (easterEggActive) return;

        if (catEl.classList.contains('evil') && force !== true) return;

        window.clearTimeout(hushTimer);
        hushTimer = 0;
        stopEyeSweep();
        catEl.classList.remove('speaking');
        catEl.classList.remove('evil');
        hideBubble();
    }

    catEl.addEventListener('mouseenter', speak);
    catEl.addEventListener('mouseleave', hush);
    catEl.addEventListener('focus', speak);
    catEl.addEventListener('blur', hush);
    catEl.addEventListener('touchstart', speak, { passive: true });
    window.addEventListener('resize', positionBubble);
    window.addEventListener('scroll', positionBubble, { passive: true });

    document.addEventListener('pointerdown', function (event) {
        primeSceneAudio();
        if (easterEggActive) return;
        if (!catEl.classList.contains('evil')) return;

        suppressNextSpeak = catEl.contains(event.target);
        hush(true);
    }, { passive: true });
}());
