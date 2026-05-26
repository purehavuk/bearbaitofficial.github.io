/**
 * Bottom-edge VHS tracking noise overlay.
 * Generates independent bright streaks and dark dropout fragments.
 */

(function () {
    'use strict';

    const vhsTracking = document.querySelector('.vhs-tracking');
    const compositeDropouts = document.querySelector('.composite-dropouts');
    if (!vhsTracking && !compositeDropouts) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const brightFrameInterval = 1000 / 60;
    const dropoutFrameInterval = 1000 / 60;
    const compositePatternIntervals = [5, 5, 5, 5, 4].map(frameCount => dropoutFrameInterval * frameCount);
    const compositePulseInterval = 1000 / 15;
    const compositePulseLevels = [0.18, 0.23, 0.3, 0.38, 0.44, 0.37, 0.29, 0.22];
    const scanlinePitch = 4;
    const vhsProperties = [
        '--vhs-x',
        '--vhs-y-scale',
        '--vhs-bands-x',
        '--vhs-bands-scale',
        '--vhs-bands-opacity',
        '--vhs-bands',
        '--vhs-dropouts-x',
        '--vhs-dropouts-scale',
        '--vhs-dropouts-opacity',
        '--vhs-dropouts'
    ];
    const compositeProperties = ['--composite-x', '--composite-opacity', '--composite-noise'];
    let vhsFrame;
    let lastBrightFrame = -Infinity;
    let lastDropoutFrame = -Infinity;
    let nextCompositePatternFrame = 0;
    let compositePatternStep = 0;
    let lastCompositePulseFrame = -Infinity;
    let compositePulseStep = 0;

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    function snapToScanline(value) {
        return Math.round(value / scanlinePitch) * scanlinePitch;
    }

    function snapWithinLayer(value, layerTop = 0) {
        return snapToScanline(layerTop + value) - layerTop;
    }

    function clearVhsTrackingMotion() {
        window.cancelAnimationFrame(vhsFrame);
        lastBrightFrame = -Infinity;
        lastDropoutFrame = -Infinity;
        nextCompositePatternFrame = 0;
        compositePatternStep = 0;
        lastCompositePulseFrame = -Infinity;
        compositePulseStep = 0;
        if (vhsTracking) {
            vhsProperties.forEach(property => vhsTracking.style.removeProperty(property));
        }
        if (compositeDropouts) {
            compositeProperties.forEach(property => compositeDropouts.style.removeProperty(property));
        }
    }

    function createVhsBands(hardTrackingHit, darkDropout = false) {
        const lineCount = Math.round(randomBetween(hardTrackingHit ? 110 : 72, hardTrackingHit ? 148 : 104));
        const lines = [];
        const trackingHeight = vhsTracking.clientHeight || window.innerHeight * 0.25;
        const trackingTop = vhsTracking.getBoundingClientRect().top;

        for (let i = 0; i < lineCount; i += 1) {
            const start = randomBetween(-2, 99);
            const widerFragment = Math.random() < (hardTrackingHit ? 0.12 : 0.05);
            const width = widerFragment
                ? randomBetween(3.5, hardTrackingHit ? 16 : 10)
                : randomBetween(0.35, hardTrackingHit ? 6.5 : 4.5);
            const end = Math.min(104, start + width);
            const bottomBias = 1 - Math.pow(Math.random(), hardTrackingHit ? 2.8 : 2.25);
            const y = snapWithinLayer(trackingHeight * (0.48 + (bottomBias * 0.53)), trackingTop);
            const heightRoll = Math.random();
            const height = heightRoll < 0.58 ? 1
                : heightRoll < 0.9 ? 2
                    : hardTrackingHit && heightRoll > 0.985 ? 6 : 4;
            const opacity = darkDropout
                ? randomBetween(0.12, hardTrackingHit ? 0.76 : 0.56).toFixed(2)
                : randomBetween(0.09, hardTrackingHit ? 0.7 : 0.48).toFixed(2);
            const color = darkDropout ? '0, 0, 0' : '255, 255, 255';

            lines.push(`linear-gradient(90deg, transparent ${start.toFixed(1)}%, rgba(${color}, ${opacity}) ${start.toFixed(1)}% ${end.toFixed(1)}%, transparent ${end.toFixed(1)}%) 0 ${y}px / 100% ${height}px no-repeat`);
        }

        return lines.join(', ');
    }

    function updateBrightTracking() {
        if (!vhsTracking) return;

        const hardTrackingHit = Math.random() < 0.035;
        const xRange = hardTrackingHit ? 24 : 10;
        const bandRange = hardTrackingHit ? 16 : 8;

        vhsTracking.style.setProperty('--vhs-x', `${randomBetween(-xRange, xRange).toFixed(1)}px`);
        vhsTracking.style.setProperty('--vhs-y-scale', randomBetween(hardTrackingHit ? 0.84 : 0.95, hardTrackingHit ? 1.18 : 1.06).toFixed(3));
        vhsTracking.style.setProperty('--vhs-bands-x', `${randomBetween(-bandRange, bandRange).toFixed(1)}%`);
        vhsTracking.style.setProperty('--vhs-bands-scale', randomBetween(0.9, 1.14).toFixed(3));
        vhsTracking.style.setProperty('--vhs-bands-opacity', randomBetween(0.3, hardTrackingHit ? 0.86 : 0.66).toFixed(2));
        vhsTracking.style.setProperty('--vhs-bands', createVhsBands(hardTrackingHit));
    }

    function updateDarkDropouts() {
        if (!vhsTracking) return;

        const hardTrackingHit = Math.random() < 0.035;
        const bandRange = hardTrackingHit ? 16 : 8;

        vhsTracking.style.setProperty('--vhs-dropouts-x', `${randomBetween(-bandRange, bandRange).toFixed(1)}%`);
        vhsTracking.style.setProperty('--vhs-dropouts-scale', randomBetween(0.9, 1.14).toFixed(3));
        vhsTracking.style.setProperty('--vhs-dropouts-opacity', randomBetween(0.2, hardTrackingHit ? 0.68 : 0.5).toFixed(2));
        vhsTracking.style.setProperty('--vhs-dropouts', createVhsBands(hardTrackingHit, true));
    }

    function updateCompositeDropouts() {
        if (!compositeDropouts) return;

        const signalTear = Math.random() < 0.08;
        const lineCount = Math.round(randomBetween(signalTear ? 20 : 12, signalTear ? 30 : 20));
        const lines = [];
        const screenHeight = compositeDropouts.clientHeight || window.innerHeight;

        for (let i = 0; i < lineCount; i += 1) {
            const x = randomBetween(-1, 100);
            const width = Math.round(randomBetween(2, 16));
            const y = snapToScanline(randomBetween(0, screenHeight));
            const height = Math.random() < 0.82 ? 1 : signalTear ? 4 : 2;
            const opacity = randomBetween(0.38, signalTear ? 0.74 : 0.6).toFixed(2);

            lines.push(`linear-gradient(rgba(0, 0, 0, ${opacity}) 0 100%) ${x.toFixed(1)}% ${y}px / ${width}px ${height}px no-repeat`);
        }

        compositeDropouts.style.setProperty('--composite-x', `${randomBetween(-2, 2).toFixed(1)}%`);
        compositeDropouts.style.setProperty('--composite-noise', lines.join(', '));
    }

    function updateCompositePulse() {
        if (!compositeDropouts) return;

        compositeDropouts.style.setProperty('--composite-opacity', compositePulseLevels[compositePulseStep].toFixed(2));
        compositePulseStep = (compositePulseStep + 1) % compositePulseLevels.length;
    }

    function jumpVhsTracking(timestamp) {
        if (timestamp - lastBrightFrame >= brightFrameInterval - 1) {
            updateBrightTracking();
            lastBrightFrame = timestamp;
        }

        if (timestamp - lastDropoutFrame >= dropoutFrameInterval - 1) {
            updateDarkDropouts();
            lastDropoutFrame = timestamp;
        }

        if (timestamp >= nextCompositePatternFrame) {
            updateCompositeDropouts();
            nextCompositePatternFrame = timestamp + compositePatternIntervals[compositePatternStep];
            compositePatternStep = (compositePatternStep + 1) % compositePatternIntervals.length;
        }

        if (timestamp - lastCompositePulseFrame >= compositePulseInterval - 1) {
            updateCompositePulse();
            lastCompositePulseFrame = timestamp;
        }

        vhsFrame = window.requestAnimationFrame(jumpVhsTracking);
    }

    function updateVhsTrackingPreference() {
        clearVhsTrackingMotion();
        if (!reducedMotion.matches) {
            vhsFrame = window.requestAnimationFrame(jumpVhsTracking);
        }
    }

    updateVhsTrackingPreference();
    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', updateVhsTrackingPreference);
    }
})();
