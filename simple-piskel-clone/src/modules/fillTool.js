export default function fillTool(ctx, startX, startY, canvas, color) {
  let x = startX;
  let y = startY;

  // source this code http://bit.ly/2sLYeev

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  function getPixel() {
    if ((x < 0 || y < 0 || x > imageData.width, y > imageData.height)) {
      return [-1, -1, -1, -1]; // impossible color
    }
    const offset = (y * imageData.width + x) * 4;
    return [
      imageData.data[offset + 0],
      imageData.data[offset + 1],
      imageData.data[offset + 2],
      imageData.data[offset + 3],
    ];
  }

  function setPixel(fillColor) {
    const offset = (y * imageData.width + x) * 4;
    [imageData.data[offset + 0], imageData.data[offset + 1], imageData.data[offset + 2], imageData.data[offset + 3]] = [
      fillColor[0],
      fillColor[1],
      fillColor[2],
      fillColor[3],
    ];
  }

  function colorsMatch(color1, color2) {
    return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
  }

  function floodFill(targetColor, fillColor) {
    // check we are actually filling a different color
    if (!colorsMatch(targetColor, fillColor)) {
      const pixelsToCheck = [x, y];
      while (pixelsToCheck.length > 0) {
        y = pixelsToCheck.pop();
        x = pixelsToCheck.pop();

        const currentColor = getPixel(x, y);
        if (colorsMatch(currentColor, targetColor)) {
          setPixel(fillColor);
          pixelsToCheck.push(x + 1, y);
          pixelsToCheck.push(x - 1, y);
          pixelsToCheck.push(x, y + 1);
          pixelsToCheck.push(x, y - 1);
        }
      }
    }
    // put the data back
    ctx.putImageData(imageData, 0, 0);
  }

  function hexToRgba(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 255];
  }
  // get the color we're filling
  const targetColor = getPixel(x, y);
  const fillColor = hexToRgba(color);
  floodFill(targetColor, fillColor);
}
