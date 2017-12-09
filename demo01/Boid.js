import { OFFSET_X, OFFSET_Y } from './main';
import { index2Px } from './utils';

export default class Boid {
    constructor(opt) {

        this.x = opt.x || 0;
        this.y = opt.y || 0;

        this.path = opt.path;
        
        this.angle = 0;

        this.vx = 0;
        this.vy = 0;

        this.speed = 2;

        // 离目标点的距离
        this.dx = 0;
        this.dy = 0;
        this.dist = 0;

        this.radius = 10;

        this.reachDesc = false;

        this.ctx = opt.ctx;
    }

    step() {
        if (this.reachDesc) {
            return;
        }

        const end = this.path[this.path.length - 1];    // 终点的网格坐标
        const target = index2Px(...end);                // 终点的像素坐标
        this.dx = target.x - this.x;
        this.dy = target.y - this.y;
        this.dist = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        // 这里根据距离计算出 boid 的运动角度
        this.angle = Math.atan2(this.dy, this.dx);

        const speed = this.speed;
        const angle = this.angle;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        if (this.dist > speed) {
            this.x += this.vx;
            this.y += this.vy;
        } else {
            // 若当前时刻的位置加上速度后超过了目标点
            // 则让物体下一时刻处于当前目标点的位置
            this.x = target.x;
            this.y = target.y;
            this.reachDest = true;
        }
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