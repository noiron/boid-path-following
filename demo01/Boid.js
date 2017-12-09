import { OFFSET_X, OFFSET_Y, index2Px } from './main';

export default class Boid {
    constructor(opt) {

        this.x = opt.x || 0;
        this.y = opt.y || 0;

        this.path = opt.path;
        
        // 路径的起点和终点，据此计算出 boid 行进的角度
        const start = this.path[0];
        const end = this.path[this.path.length - 1];
        this.angle = Math.atan2(end[1] - start[1], end[0] - start[0]);

        this.vx = 0;
        this.vy = 0;

        this.speed = 2;

        this.radius = 10;

        this.ctx = opt.ctx;
    }

    step() {
        const speed = this.speed;
        const angle = this.angle;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}