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
  //   код Дмитрия
  //   function colorPicker(e) {
  //     const x = Math.floor(e.offsetX / (canvas.clientWidth / canvas.width));
  //     const y = Math.floor(e.offsetY / (canvas.clientHeight / canvas.height));
  //     const pixelData = ctx.getImageData(x, y, 1, 1);
  //     const hex = pixelData.data ? `#${
  //         (pixelData.data[0] | 1 << 8).toString(16).slice(1)
  //     }${(pixelData.data[1] | 1 << 8).toString(16).slice(1)
  //     }${(pixelData.data[2] | 1 << 8).toString(16).slice(1)}` : pixelData;
  //     if (e.which === 1 || e.which === 2) {
  //         firstColor = hex;
  //         document.querySelector('#firstColor').value = hex;
  //         document.querySelector('.canvas-tools__change-color__primary-color').style.backgroundColor = hex;
  //     } else if (e.which === 3) {
  //         secondColor = hex;
  //         document.querySelector('#secondColor').value = hex;
  //         document.querySelector('.canvas-tools__change-color__secondary-color').style.backgroundColor = hex;
  //     }
  // }
  // референц https://codepen.io/amwill/pen/ZbdGeW
  //
  // итоговое решение взял отсюда https://youtu.be/HRZG_vsB4ZE
}
