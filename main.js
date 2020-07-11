'use strict';

const cvs = document.getElementById('cvs');
const width = cvs.width;
const height = cvs.height;
const ctx = cvs.getContext('2d');
const pixels = ctx.getImageData(0, 0, width, height);

let t = 0;
let anf = -1;
let running = false;

const visited = new Array(width * height);

const pos = (t) => {
    return [t, -Math.sin((t * 2 * Math.PI) / width) * (height / 4) + height / 2];
};

const colorAt = (x, y, t) => {
    return visited[y * width + x] ? [0, 0, 123] : [255, 255, 255];
};

const render = () => {
    const position = pos(t);
    visited[Math.round(position[1]) * width + Math.round(position[0])] = 1;

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
    anf = requestAnimationFrame(render);
};

const stop = () => {
    running = false;
    cancelAnimationFrame(anf);
};

const start = () => {
    running = true;
    render();
};

const toggle = () => {
    if (running) {
        stop();
    } else {
        start();
    }
};

start();
