export default function drawImage(pos0, pos1, ctx, pixelSize, curColor) {
  // bresenham algoritm
  let x0 = pos0[0];
  let y0 = pos0[1];
  const x1 = pos1[0];
  const y1 = pos1[1];
  // const size = pixelSize;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? pixelSize : -pixelSize;
  const sy = y0 < y1 ? pixelSize : -pixelSize;
  let err = dx - dy;

  while (true) {
    ctx.fillStyle = curColor;
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
