'use strict';

const cvs = document.getElementById('cvs');
const width = cvs.width;
const height = cvs.height;
const ctx = cvs.getContext('2d');
const pixels = ctx.getImageData(0, 0, width, height);

let t = 0;

const colorAt = (x, y, t) => {
    return [t % 255, t % 255, t % 255];
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