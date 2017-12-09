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

        this.waypoint = 1;
        this.angleFlag = 1;

        this.radius = 10;

        this.reachDesc = false;

        this.ctx = opt.ctx;
    }

    step() {
        if (this.reachDesc) {
            return;
        }

        const path = this.path;
        const waypoint = path[this.waypoint];   // 当前目标点的网格坐标
        const target = index2Px(...waypoint);   // 当前目标点的像素坐标
        this.dx = target.x - this.x;
        this.dy = target.y - this.y;
        this.dist = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        // 判断是否需要转向，如果需要转向，则重新计算角度
        if (this.angleFlag) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.angleFlag = 0;
        }

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
            if (this.waypoint + 1 >= path.length) {
                // 到达终点
                this.reachDest = true;
            } else {
                this.waypoint++;
                this.angleFlag = 1;
            }
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