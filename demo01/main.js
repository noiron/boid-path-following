import { drawGrid, drawPath, index2Px } from './utils';

const WIDTH = 900;
const HEIGHT = 600;

export const GRID_SIZE = 40;
export const COLS = 20;
export const ROWS = 12;
export const OFFSET_X = (WIDTH - GRID_SIZE * COLS) / 2;
export const OFFSET_Y = (HEIGHT - GRID_SIZE * ROWS) / 2;

const canvas = document.getElementById('drawing');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const path = [[0, 1], [COLS - 4, 1], [COLS - 4, 4], [6, 4], [6, 7], [COLS - 2, 7], [COLS - 2, ROWS - 1], [0, ROWS - 1]];

const boids = [];
let time = new Date().getTime();

function loop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawGrid(ctx, COLS, ROWS, GRID_SIZE, null, OFFSET_X, OFFSET_Y);
    drawPath(ctx, path, OFFSET_X, OFFSET_Y);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop)


export { ctx };
