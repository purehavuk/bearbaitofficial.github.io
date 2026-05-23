(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.querySelector('.antigravity-field')) return;

    function createLayer(options) {
        const {
            className,
            cssPrefix,
            particleCount,
            particleColor,
            particleColorActive,
            driftMin, driftMax,
            sizeMin, sizeMax,
            pushStrength,
            alphaBase, alphaVariance,
            speedMultiplier = 1,
        } = options;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        canvas.className = className;
        canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);

        const pointer = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            tx: window.innerWidth / 2,
            ty: window.innerHeight / 2,
        };
        const particles = [];
        let width = 0, height = 0, dpr = 1, raf = 0, lastTime = 0;
        let noisePattern = null, smoothedPush = 0;

        let config = {};

        function updateConfig() {
            const rootStyles = getComputedStyle(document.documentElement);
            const getVar = (name, fallback, isColor = false) => {
                if (!cssPrefix) return fallback;
                const val = rootStyles.getPropertyValue(`${cssPrefix}-${name}`).trim();
                if (val) return isColor ? val : parseFloat(val);
                return fallback;
            };

            config = {
                particleCount: getVar('count', particleCount),
                particleColor: getVar('color', particleColor, true),
                particleColorActive: getVar('color-active', particleColorActive, true),
                driftMin: getVar('drift-min', driftMin),
                driftMax: getVar('drift-max', driftMax),
                sizeMin: getVar('size-min', sizeMin),
                sizeMax: getVar('size-max', sizeMax),
                pushStrength: getVar('push', pushStrength),
                alphaBase: getVar('alpha', alphaBase),
                alphaVariance: getVar('alpha-var', alphaVariance),
                speedMultiplier: getVar('speed', speedMultiplier),
                
                glowRadius: 2500,
                glowColor1: 'rgba(36, 2, 2, 0.35)',
                glowColor2: 'rgba(18, 1, 1, 0)',
                glowColor3: 'rgba(1, 0, 0, 0)',
                influenceRadius: 4250,
                idleRangeX: 30,
                idleRangeY: 60,
                angleShift: 1.1,
                noiseOpacity: 0,
            };
            config.pointerSmoothing = 0.04 * config.speedMultiplier;
        }

        function createNoise() {
            const nCanvas = document.createElement('canvas');
            nCanvas.width = 128;
            nCanvas.height = 128;
            const nCtx = nCanvas.getContext('2d');
            const idata = nCtx.createImageData(128, 128);
            const data = idata.data;
            for (let i = 0; i < data.length; i += 4) {
                const v = Math.random() * 255;
                data[i] = data[i + 1] = data[i + 2] = v;
                data[i + 3] = 0;
            }
            nCtx.putImageData(idata, 0, 0);
            noisePattern = ctx.createPattern(nCanvas, 'repeat');
        }

        const TWO_PI = Math.PI * 2;

        function resize() {
            updateConfig();

            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Calculate responsive scale factor for particle counts
            let countScale = 1;
            const targetDesktopWidth = 1920;
            const targetMobileWidth = 480;
            const targetMinScale = 335 / 5000; // For a 5000 base total, scales down to ~335.
            
            if (width < targetDesktopWidth) {
                if (width <= targetMobileWidth) {
                    countScale = targetMinScale;
                } else {
                    const ratio = (width - targetMobileWidth) / (targetDesktopWidth - targetMobileWidth);
                    countScale = targetMinScale + ratio * (1 - targetMinScale);
                }
            }

            const responsiveCount = Math.max(1, Math.floor(config.particleCount * countScale));

            particles.length = 0;
            for (let i = 0; i < responsiveCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    phase: Math.random() * TWO_PI,
                    size: config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin),
                    drift: config.driftMin + Math.random() * (config.driftMax - config.driftMin),
                    len: 1.5 + Math.random() * 5,
                });
            }
            createNoise();
        }

        function draw(time) {
            const delta = time - (lastTime || time);
            lastTime = time;
            const dt = Math.min(delta / 16.667, 4);
            const t = time * 0.0015 * config.speedMultiplier;

            const vx = (pointer.tx - pointer.x) * config.pointerSmoothing;
            const vy = (pointer.ty - pointer.y) * config.pointerSmoothing;
            pointer.x += vx * dt;
            pointer.y += vy * dt;

            const speed = Math.sqrt(vx * vx + vy * vy);
            const targetPush = Math.min(speed * 5, config.pushStrength);
            smoothedPush += (targetPush - smoothedPush) * 0.045 * dt;

            ctx.clearRect(0, 0, width, height);

            const bucketCount = 15;
            const buckets = Array.from({ length: bucketCount }, () => []);
            const radius = config.influenceRadius;
            const radiusSq = radius * radius;

            for (let i = 0, len = particles.length; i < len; i++) {
                const p = particles[i];
                const idleX = p.x + Math.cos(t * p.drift + p.phase) * config.idleRangeX;
                const idleY = p.y + Math.sin(t * p.drift + p.phase * 4) * config.idleRangeY;
                const dx = idleX - pointer.x;
                const dy = idleY - pointer.y;
                const distSq = dx * dx + dy * dy;
                if (distSq > radiusSq) continue;
                const dist = Math.sqrt(distSq);
                const influence = Math.max(0, 1 - dist / radius);
                const bIdx = Math.floor(influence * (bucketCount - 1));
                const influenceSq = influence * influence;
                const angle = Math.atan2(dy, dx) + influence * config.angleShift;
                const push = influenceSq * smoothedPush;
                const x = idleX + Math.cos(angle) * push;
                const y = idleY + Math.sin(angle) * push;
                const pLen = p.size + influence * p.len;
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const hL = pLen * 0.15;
                buckets[bIdx].push(x - cosA * hL, y - sinA * hL, x + cosA * hL, y + sinA * hL);
            }

            ctx.lineCap = 'round';
            for (let b = 0; b < bucketCount; b++) {
                const bucket = buckets[b];
                if (!bucket.length) continue;
                const inf = b / (bucketCount - 1);
                const alpha = config.alphaBase + inf * config.alphaVariance;
                ctx.lineWidth = 0.4 + inf * 1.2;
                ctx.strokeStyle = inf > 0.15 ? config.particleColorActive : config.particleColor;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                for (let j = 0; j < bucket.length; j += 4) {
                    ctx.moveTo(bucket[j], bucket[j + 1]);
                    ctx.lineTo(bucket[j + 2], bucket[j + 3]);
                }
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            raf = requestAnimationFrame(draw);
        }

        window.addEventListener('pointermove', e => {
            pointer.tx = e.clientX;
            pointer.ty = e.clientY;
        }, { passive: true });
        window.addEventListener('pointerleave', () => {
            pointer.tx = width / 2;
            pointer.ty = height / 2;
        });
        window.addEventListener('resize', resize);
        window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));

        resize();
        raf = requestAnimationFrame(draw);
    }

    /* ── Layer 1: base field ─────────────────────────────────── */
    createLayer({
        className: 'antigravity-field',
        cssPrefix: '--ag-l1',
        particleCount: 4000,
        particleColor: 'rgba(127, 55, 55, 0.005)',
        particleColorActive: 'rgba(255, 176, 150, 0.1)',
        driftMin: 0.25,
        driftMax: 0.75,
        sizeMin: 0.5,
        sizeMax: 0.5,
        pushStrength: 3072,
        alphaBase: 0.95,
        alphaVariance: 0.15,
        speedMultiplier: 1,
    });

    /* ── Layer 2: large, slow, blurred overlay ───────────────── */
    createLayer({
        className: 'antigravity-field-blur',
        cssPrefix: '--ag-l2',
        particleCount: 250,
        particleColor: 'rgba(127, 55, 55, 0.25)',
        particleColorActive: 'rgba(255, 125, 125, 0.5)',
        driftMin: 0.75,
        driftMax: 1.5,
        sizeMin: 1.5,
        sizeMax: 5,
        pushStrength: 2048,
        alphaBase: 0.5,
        alphaVariance: 0.5,
        speedMultiplier: 0.75,
    });

    createLayer({
        className: 'antigravity-field-blur-2',
        cssPrefix: '--ag-l3',
        particleCount: 750,
        particleColor: 'rgba(127, 55, 55, 0)',
        particleColorActive: 'rgb(167, 130, 130, 0.35)',
        driftMin: 5.0,
        driftMax: 10.0,
        sizeMin: 5,
        sizeMax: 25,
        pushStrength: 1024,
        alphaBase: 0.75,
        alphaVariance: 0.15,
        speedMultiplier: .5,
    });

})();
