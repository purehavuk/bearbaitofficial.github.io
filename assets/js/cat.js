(function () {
    'use strict';

    var catEl = document.getElementById('cat');
    var bubbleEl = document.getElementById('cat-bubble');

    if (!catEl || !bubbleEl) return;

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
    'brain jar now singing sea shanties',
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
    'teh lab smells like burnt ethernet',
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
    'murder mittenz compiling doom',
    'i iz adorable extinction event',
    'beep boop, hoomanz go sleep'
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
        var quote = chooseQuote();

        window.clearTimeout(hushTimer);
        bubbleEl.textContent = quote.text;
        catEl.classList.add('speaking');
        catEl.classList.toggle('evil', quote.evil);
        hushTimer = window.setTimeout(hush, 3000);
    }

    function hush() {
        window.clearTimeout(hushTimer);
        hushTimer = 0;
        catEl.classList.remove('speaking');
        catEl.classList.remove('evil');
        bubbleEl.textContent = '';
    }

    catEl.addEventListener('mouseenter', speak);
    catEl.addEventListener('mouseleave', hush);
    catEl.addEventListener('focus', speak);
    catEl.addEventListener('blur', hush);
    catEl.addEventListener('touchstart', speak, { passive: true });
}());
