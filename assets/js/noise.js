/**
 * Bottom-edge VHS tracking noise overlay.
 * Precomputes random frames, then cycles them quickly to avoid rebuilding
 * large gradient strings during every paint.
 */

(function () {
    'use strict';

    const vhsTracking = document.querySelector('.vhs-tracking');
    const compositeDropouts = document.querySelector('.composite-dropouts');
    if (!vhsTracking && !compositeDropouts) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frameInterval = 1000 / 30;
    const scanlinePitch = 4;
    const vhsFrameCount = 24;
    const compositeFrameCount = 18;
    const vhsProperties = ['--vhs-bands-opacity', '--vhs-bands', '--vhs-dropouts-opacity', '--vhs-dropouts'];
    const compositeProperties = ['--composite-opacity', '--composite-noise'];
    let resizeFrame = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let trackingHeight = 0;
    let trackingTop = 0;
    let compositeHeight = 0;
    let vhsFrames = [];
    let compositeFrames = [];
    let frameIndex = 0;

    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }

    function snapToScanline(value) {
        return Math.round(value / scanlinePitch) * scanlinePitch;
    }

    function snapWithinLayer(value, layerTop = 0) {
        return snapToScanline(layerTop + value) - layerTop;
    }

    function refreshLayerMetrics() {
        if (vhsTracking) {
            trackingHeight = vhsTracking.clientHeight || window.innerHeight * 0.25;
            trackingTop = vhsTracking.getBoundingClientRect().top;
        }

        if (compositeDropouts) {
            compositeHeight = compositeDropouts.clientHeight || window.innerHeight;
        }
    }

    function createVhsBands(hardTrackingHit, darkDropout = false) {
        const lineCount = Math.round(randomBetween(hardTrackingHit ? 58 : 34, hardTrackingHit ? 86 : 52));
        const lines = [];

        for (let i = 0; i < lineCount; i += 1) {
            const start = randomBetween(-2, 99);
            const widerFragment = Math.random() < (hardTrackingHit ? 0.14 : 0.07);
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

    function createCompositeNoise() {
        const signalTear = Math.random() < 0.12;
        const lineCount = Math.round(randomBetween(signalTear ? 16 : 9, signalTear ? 26 : 16));
        const lines = [];

        for (let i = 0; i < lineCount; i += 1) {
            const x = randomBetween(-1, 100);
            const width = Math.round(randomBetween(2, 16));
            const y = snapToScanline(randomBetween(0, compositeHeight));
            const height = Math.random() < 0.82 ? 1 : signalTear ? 4 : 2;
            const opacity = randomBetween(0.38, signalTear ? 0.74 : 0.6).toFixed(2);

            lines.push(`linear-gradient(rgba(0, 0, 0, ${opacity}) 0 100%) ${x.toFixed(1)}% ${y}px / ${width}px ${height}px no-repeat`);
        }

        return lines.join(', ');
    }

    function buildFrameBanks() {
        vhsFrames = [];
        compositeFrames = [];

        for (let i = 0; i < vhsFrameCount; i += 1) {
            const hardBrightHit = Math.random() < 0.08;
            const hardDropoutHit = Math.random() < 0.08;
            vhsFrames.push({
                bands: createVhsBands(hardBrightHit),
                bandsOpacity: randomBetween(0.3, hardBrightHit ? 0.86 : 0.66).toFixed(2),
                dropouts: createVhsBands(hardDropoutHit, true),
                dropoutsOpacity: randomBetween(0.2, hardDropoutHit ? 0.68 : 0.5).toFixed(2)
            });
        }

        for (let i = 0; i < compositeFrameCount; i += 1) {
            compositeFrames.push({
                noise: createCompositeNoise(),
                opacity: randomBetween(0.18, 0.38).toFixed(2)
            });
        }
    }

    function applyFrame() {
        const vhsFrame = vhsFrames[frameIndex % vhsFrames.length];
        const compositeFrame = compositeFrames[frameIndex % compositeFrames.length];

        if (vhsTracking && vhsFrame) {
            vhsTracking.style.setProperty('--vhs-bands-opacity', vhsFrame.bandsOpacity);
            vhsTracking.style.setProperty('--vhs-bands', vhsFrame.bands);
            vhsTracking.style.setProperty('--vhs-dropouts-opacity', vhsFrame.dropoutsOpacity);
            vhsTracking.style.setProperty('--vhs-dropouts', vhsFrame.dropouts);
        }

        if (compositeDropouts && compositeFrame) {
            compositeDropouts.style.setProperty('--composite-opacity', compositeFrame.opacity);
            compositeDropouts.style.setProperty('--composite-noise', compositeFrame.noise);
        }

        frameIndex += 1;
    }

    function animate(timestamp) {
        if (!lastFrameTime || timestamp - lastFrameTime >= frameInterval) {
            lastFrameTime = timestamp;
            applyFrame();
        }

        animationFrame = window.requestAnimationFrame(animate);
    }

    function clearVhsTrackingMotion() {
        window.cancelAnimationFrame(animationFrame);
        window.cancelAnimationFrame(resizeFrame);
        animationFrame = 0;
        resizeFrame = 0;
        lastFrameTime = 0;
        frameIndex = 0;

        if (vhsTracking) {
            vhsProperties.forEach(property => vhsTracking.style.removeProperty(property));
        }
        if (compositeDropouts) {
            compositeProperties.forEach(property => compositeDropouts.style.removeProperty(property));
        }
    }

    function startVhsTrackingMotion() {
        refreshLayerMetrics();
        buildFrameBanks();
        applyFrame();
        animationFrame = window.requestAnimationFrame(animate);
    }

    function updateVhsTrackingPreference() {
        clearVhsTrackingMotion();
        if (!reducedMotion.matches && !document.hidden) {
            startVhsTrackingMotion();
        }
    }

    function scheduleMetricRefresh() {
        if (resizeFrame) return;

        resizeFrame = window.requestAnimationFrame(() => {
            resizeFrame = 0;
            if (!reducedMotion.matches && !document.hidden) {
                refreshLayerMetrics();
                buildFrameBanks();
            }
        });
    }

    updateVhsTrackingPreference();
    window.addEventListener('resize', scheduleMetricRefresh, { passive: true });
    document.addEventListener('visibilitychange', updateVhsTrackingPreference);
    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', updateVhsTrackingPreference);
    }
})();
