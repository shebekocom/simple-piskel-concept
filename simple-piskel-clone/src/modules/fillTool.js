/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
export default function fillTool(ctx, x, y, color, borderColor) {
  // source code http://jsfiddle.net/SSh2C/
  var imageData = ctx.getImageData(0, 0, 512, 512);
  var width = imageData.width;
  var height = imageData.height;
  var stack = [[x, y]];
  var pixel;
  var point = 0;
  console.log('stack: ', stack);
  while (stack.length > 0) {
    pixel = stack.pop();
    if (pixel[0] < 0 || pixel[0] >= width) continue;
    if (pixel[1] < 0 || pixel[1] >= height) continue;

    // Alpha
    point = pixel[1] * 4 * width + pixel[0] * 4 + 3;

    // Если это не рамка и ещё не закрасили
    if (imageData.data[point] !== borderColor && imageData.data[point] !== color) {
      // Закрашиваем
      imageData.data[point] = color;

      // Ставим соседей в стек на проверку
      stack.push([pixel[0] - 1, pixel[1]]);
      stack.push([pixel[0] + 1, pixel[1]]);
      stack.push([pixel[0], pixel[1] - 1]);
      stack.push([pixel[0], pixel[1] + 1]);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
