// add new frame
export default function addNewFrame() {
  const canvasFrames = document.querySelectorAll('[data-title-name]');
  canvasFrames.forEach(item => {
    item.classList.remove('selected_canvas');
  });
  document.querySelector('.frame-list').insertAdjacentHTML(
    'beforeend',
    `<li class="frame-title" data-title-name="${canvasFrames.length}">
  <div class="canvas-bg">
      <div></div>
      <canvas class="frame-canvas" data-canvas-count="${canvasFrames.length}" width="32" height="32"></canvas>
  </div>
  <div class="frame-number">${canvasFrames.length + 1}</div>
  <div class="del-frame"></div>
  <div class="move-frame"></div>
  <div class="duplicate-frame"></div>
</li>`,
  );
  document.querySelector('.frame-title:last-child').classList.add('selected_canvas');
}
