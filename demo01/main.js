import { drawGrid, drawPath, index2Px } from './utils';
import Boid from './Boid';

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

// 可以更改此处的路径起点和终点以查看效果
// const path = [[0, 0], [COLS - 1, ROWS - 1]];
const path = [[0, 0], [COLS - 4, 0], [COLS - 4, 4], [6, 4], [6, 7], [COLS - 1, ROWS - 1]];

let boids = [];     // 保存所有生成的 boid
let time = new Date().getTime();

function loop() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // 画出画面上的网格
    drawGrid(ctx, COLS, ROWS, GRID_SIZE, OFFSET_X, OFFSET_Y);
    // 画出路径
    drawPath(ctx, path, OFFSET_X, OFFSET_Y);

    // 每隔一段时间生成一个新的 boid
    if (new Date().getTime() - time > 2000) {
        const boid = new Boid({
            x: OFFSET_X + 20,
            y: OFFSET_Y + 20,
            path: path,
            ctx: ctx,
        });
        boids.push(boid);
        time = new Date().getTime();
    }

    // 过滤 boids 数组中已经达到了终点的元素
    boids = boids.filter(boid => !boid.reachDest);
    boids.forEach(boid => {
        if (boid.reachDest) {
            console.log('stop!');
        }
        boid.step();
        boid.draw();
    });

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
