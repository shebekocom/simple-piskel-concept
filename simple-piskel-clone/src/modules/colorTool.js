export default function colorTool(ctx, x, y, canvas) {
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
  const targetColor = getPixel(x, y);
  const newColor = `rgba(${targetColor.join()})`;
  return newColor;
}
