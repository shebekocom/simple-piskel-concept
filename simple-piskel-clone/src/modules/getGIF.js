/* eslint-disable no-undef */
export default function getGIF(arrFrames, fps, canvas) {
  const cloudCanvas = document.createElement('canvas');
  const context = cloudCanvas.getContext('2d');

  const gif = new GIF({
    workers: 2,
    workerScript: 'libraries/gif.worker.js',
    quality: 10,
    width: canvas.width,
    height: canvas.height,
  });

  arrFrames.forEach(el => {
    context.putImageData(el, 0, 0);
    gif.addFrame(cloudCanvas, { delay: 1000 / fps, copy: true });
  });
  const a = document.createElement('a');
  gif.on('finished', blob => {
    a.href = URL.createObjectURL(blob);
    a.download = 'image.gif';
    a.click();
  });
  gif.render();
}
