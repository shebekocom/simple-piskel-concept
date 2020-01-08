export default function drawImage(pos0, pos1, ctx, curColor, pixelSize) {
  // bresenham algoritm
  let x0 = pos0[0];
  let y0 = pos0[1];
  const x1 = pos1[0];
  const y1 = pos1[1];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  ctx.strokeStyle = curColor;
  while (true) {
    ctx.fillRect(x0, y0, pixelSize, pixelSize);
    ctx.fill();
    if (x0 === x1 && y0 === y1) {
      break;
    }
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}
