export default function previewAnimation(canvas, previewCanvas, ctxPreview, arrFrames) {
  const arrFramesNew = arrFrames;
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
  const fps = 5;
  let counter = 0;
  let stopAnimation = false;
  canvas.addEventListener('mousedown', () => {
    stopAnimation = true;
  });
  canvas.addEventListener('mouseup', () => {
    stopAnimation = false;
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
    }, 1000 / fps);
  }
  animate(fps);
}
