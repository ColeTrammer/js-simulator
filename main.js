'use strict';

const cvs = document.getElementById('cvs');
const width = cvs.width;
const height = cvs.height;
const ctx = cvs.getContext('2d');
const pixels = ctx.getImageData(0, 0, width, height);

let t = 0;

const hsvToRgb = (color) => {
    const H = color[0];
    const S = color[1];
    const L = color[2];
    const f = (n) => {
        const k = (n + H / 30) % 12;
        const a = S * Math.min(L, 1 - L);
        return L - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    return [f(0) * 255, f(8) * 255, f(4) * 255];
};

const colorAt = (x, y, t) => {
    x -= width / 2;
    y -= height / 2;
    const R = Math.sqrt(x * x, y * y);
    let Theta = Math.atan2(y, x);
    if (Theta < 0) {
        Theta += 2 * Math.PI;
    }
    return hsvToRgb([(Theta * 180) / Math.PI + t, (1.0 / R) * 75, 0.5]);
};

const render = () => {
    for (let r = 0; r < pixels.height; r++) {
        for (let c = 0; c < pixels.width; c++) {
            const pos = r * pixels.width + c;
            const color = colorAt(c, r, t);
            pixels.data[4 * pos + 0] = color[0];
            pixels.data[4 * pos + 1] = color[1];
            pixels.data[4 * pos + 2] = color[2];
            pixels.data[4 * pos + 3] = 0xff;
        }
    }

    ctx.putImageData(pixels, 0, 0);
    t++;
    requestAnimationFrame(render);
};

render();
