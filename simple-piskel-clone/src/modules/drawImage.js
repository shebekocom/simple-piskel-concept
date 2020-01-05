export default function drawImage(pos0, pos1, ctx, curColor, curTool, pixelSize, canvas) {
  // bresenham algoritm FIRST
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
    if (curTool === 'stroke') {
      ctx.lineWidth = pixelSize;
      ctx.moveTo(x0, y0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    } else if (curTool === 'pensil') {
      ctx.beginPath();
      ctx.fillRect(x0, y0, pixelSize, pixelSize);
      ctx.fill(); // Draw first pixel
    }
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

  // bresenham algoritm SECOND

  // Iterators, counters required by algorithm

  // const x0 = pos0[0];
  // const y0 = pos0[1];
  // const x1 = pos1[0];
  // const y1 = pos1[1];
  // let x;
  // let y;
  // let px;
  // let py;
  // let xe;
  // let ye;
  // let i;

  // function drawPixel() {
  //   if (curTool === 'stroke') {
  //     ctx.lineWidth = pixelSize;
  //     ctx.moveTo(x0, y0);
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.lineTo(x1, y1);
  //     ctx.stroke();
  //   } else if (curTool === 'pensil') {
  //     ctx.beginPath();
  //     ctx.fillRect(x, y, pixelSize, pixelSize);
  //     ctx.fill(); // Draw first pixel
  //   }
  // }

  // // Calculate line deltas
  // const dx = x1 - x0;
  // const dy = y1 - y0;

  // // Create a positive copy of deltas (makes iterating easier)
  // const dx1 = Math.abs(dx);
  // const dy1 = Math.abs(dy);

  // // Calculate error intervals for both axis
  // px = 2 * dy1 - dx1;
  // py = 2 * dx1 - dy1;

  // // The line is X-axis dominant
  // if (dy1 <= dx1) {
  //   // Line is drawn left to right
  //   if (dx >= 0) {
  //     x = x0;
  //     y = y0;
  //     xe = x1;
  //   } else {
  //     // Line is drawn right to left (swap ends)
  //     x = x1;
  //     y = y1;
  //     xe = x0;
  //   }
  //   drawPixel();

  //   // Rasterize the line
  //   for (i = 0; x < xe; i++) {
  //     x += 1;

  //     // Deal with octants...
  //     if (px < 0) {
  //       px += 2 * dy1;
  //     } else {
  //       if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
  //         y += 1;
  //       } else {
  //         y -= 1;
  //       }
  //       px += 2 * (dy1 - dx1);
  //     }

  //     // Draw pixel from line span at currently rasterized position
  //     drawPixel();
  //   }
  // } else {
  //   // The line is Y-axis dominant

  //   // Line is drawn bottom to top
  //   if (dy >= 0) {
  //     x = x0;
  //     y = y0;
  //     ye = y1;
  //   } else {
  //     // Line is drawn top to bottom
  //     x = x1;
  //     y = y1;
  //     ye = y0;
  //   }
  //   drawPixel();
  //   // Rasterize the line
  //   for (i = 0; y < ye; i++) {
  //     y += 1;

  //     // Deal with octants...
  //     if (py <= 0) {
  //       py += 2 * dx1;
  //     } else {
  //       if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
  //         x += 1;
  //       } else {
  //         x -= 1;
  //       }
  //       py += 2 * (dx1 - dy1);
  //     }

  //     // Draw pixel from line span at currently rasterized position
  //     drawPixel();
  //   }
  // }
}
