import { GRID_SIZE, OFFSET_X, OFFSET_Y } from './main';

export function drawGrid(
    ctx,
    cols,
    rows,
    gridSize = GRID_SIZE,
    offsetX = 0,
    offsetY = 0,
    strokeStyle = '#aaa'
) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1;

    // Draw vertical lines
    ctx.moveTo(offsetX - 0.5, offsetY);
    ctx.lineTo(offsetX - 0.5, rows * gridSize + offsetY);
    for (let i = 0; i < cols + 1; i++) {
        ctx.moveTo(i * gridSize - 0.5 + offsetX, offsetY);
        ctx.lineTo(i * gridSize - 0.5 + offsetX, rows * gridSize + offsetY);
    }

    // Draw horizontal lines
    ctx.moveTo(offsetX, offsetY - 0.5);
    ctx.lineTo(cols * gridSize + offsetX, offsetY - 0.5);
    for (let i = 0; i < rows + 1; i++) {
        ctx.moveTo(offsetX, i * gridSize - 0.5 + offsetY);
        ctx.lineTo(cols * gridSize + offsetX, i * gridSize - 0.5 + offsetY);
    }
    ctx.stroke();
}

export function drawPath(ctx, path, offsetX = 0, offsetY = 0) {
    ctx.beginPath();
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 1;

    let startCoord = index2Px(...path[0]);
    ctx.moveTo(startCoord.x, startCoord.y);
    for (var i = 0; i < path.length - 1; i++) {
        const end = path[i + 1];
        const endCoord = index2Px(...end);
        ctx.lineTo(endCoord.x - 0.5, endCoord.y - 0.5);
        ctx.moveTo(endCoord.x - 0.5, endCoord.y - 0.5);
    }

    ctx.moveTo(startCoord.x, startCoord.y);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
    ctx.lineWidth = GRID_SIZE - 2;
    ctx.shadowBlur = 0;
    path.forEach(point => {
        const { x, y } = index2Px(...point);
        ctx.lineTo(x, y);
    });
    ctx.stroke();
}

/**
 * 根据一个格子的行和列，计算出其中心在坐标系中用像素表示的坐标
 * @param {number} col 处于第几列，对应于x坐标
 * @param {number} row 处于第几行，对应于y坐标
 */
export function index2Px(col, row, gridSize = GRID_SIZE) {
    const offsetX = OFFSET_X;
    const offsetY = OFFSET_Y;

    const x = col * gridSize + gridSize * 0.5 + offsetX;
    const y = row * gridSize + gridSize * 0.5 + offsetY;

    return { x, y };
}

/**
 * 根据一个点在canvas上的像素坐标，计算出其所在格子的行和列
 * @param {number} x x坐标
 * @param {number} y y坐标
 */
export function px2Index(x, y, gridSize = GRID_SIZE) {
    const offsetX = OFFSET_X;
    const offsetY = OFFSET_Y;

    const col = Math.floor((x - offsetX) / gridSize);
    const row = Math.floor((y - offsetY) / gridSize);

    return { col, row };
}

function grayColor(n, alpha = 1) {
    return `rgba(${n}, ${n}, ${n}, ${alpha})`;
}
