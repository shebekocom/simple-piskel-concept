import getFps from './utils';
import drawFps from './drawFps';

export default function previewAnimation(canvas, previewCanvas, ctxPreview, arrFrames, fpsparam) {
  const arrFramesNew = arrFrames;
  let fps = fpsparam;
  // let now;
  // let then;
  // let elapsed;
  // let fpsInterval;
  // function animate() {
  //   requestAnimationFrame(animate);
  // elapsed = now - then;
  // if (elapsed > fpsInterval) {
  //   then = now - (elapsed % fpsInterval);
  // const dataURL = arrFramesNew[counter];
  // const img = new Image();
  // img.src = dataURL;
  // ctxPreview.clearRect(0, 0, canvas.width, canvas.height);
  // ctxPreview.drawImage(img, 0, 0);
  // counter++;
  // }
  //   if (counter >= arrFramesNew.length) {
  //     counter = 0;
  //   }
  // }
  // function startAnimating() {
  // fpsInterval = 1000 / fps;
  // then = Date.now();
  //   animate();
  // }
  let counter = 0;
  let stopAnimation = false;
  // fps selection
  document.querySelector('.range-fps').addEventListener('change', function changeFps() {
    fps = this.value;
    drawFps(fps);
  });

  function animate() {
    if (stopAnimation === true) return;
    setTimeout(() => {
      ctxPreview.clearRect(0, 0, canvas.width, canvas.height);
      ctxPreview.putImageData(arrFramesNew[counter], 0, 0);
      counter++;
      if (counter >= arrFramesNew.length) {
        counter = 0;
      }
      requestAnimationFrame(animate);
    }, getFps(fps));
  }
  animate(fps);

  canvas.addEventListener('mousedown', () => {
    stopAnimation = true;
  });

  canvas.addEventListener('mouseup', () => {
    stopAnimation = false;
  });
}
